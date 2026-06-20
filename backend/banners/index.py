import os
import json
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def check_admin(event, body=None):
    key = (body or {}).get('admin_key') or \
          (event.get('queryStringParameters') or {}).get('admin_key') or \
          (event.get('headers') or {}).get('X-Admin-Key') or \
          (event.get('headers') or {}).get('x-admin-key')
    return key == os.environ.get('ADMIN_KEY')

def handler(event: dict, context) -> dict:
    """Управление рекламными баннерами: GET — список активных, POST/PUT/DELETE — управление через админку."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    body = json.loads(event.get('body') or '{}')

    conn = get_conn()
    cur = conn.cursor()

    # GET — вернуть активные баннеры (публично)
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        if params.get('all') and check_admin(event, body):
            cur.execute(f"SELECT id, title, description, image_url, link_url, button_text, active, created_at FROM {SCHEMA}.banners ORDER BY created_at DESC")
        else:
            cur.execute(f"SELECT id, title, description, image_url, link_url, button_text, active, created_at FROM {SCHEMA}.banners WHERE active = true ORDER BY created_at DESC")
        rows = cur.fetchall()
        cols = ['id', 'title', 'description', 'image_url', 'link_url', 'button_text', 'active', 'created_at']
        result = [{c: (str(r[i]) if i == 7 else r[i]) for i, c in enumerate(cols)} for r in rows]
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(result, ensure_ascii=False)}

    if not check_admin(event, body):
        conn.close()
        return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}

    # POST — создать баннер
    if method == 'POST':
        title = body.get('title', '')
        description = body.get('description', '')
        image_url = body.get('image_url', '')
        link_url = body.get('link_url', '')
        button_text = body.get('button_text', 'Подробнее')
        active = body.get('active', True)
        cur.execute(
            f"INSERT INTO {SCHEMA}.banners (title, description, image_url, link_url, button_text, active) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (title, description, image_url, link_url, button_text, active)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

    # PUT — обновить баннер
    if method == 'PUT':
        bid = body.get('id')
        title = body.get('title', '')
        description = body.get('description', '')
        image_url = body.get('image_url', '')
        link_url = body.get('link_url', '')
        button_text = body.get('button_text', 'Подробнее')
        active = body.get('active', True)
        cur.execute(
            f"UPDATE {SCHEMA}.banners SET title=%s, description=%s, image_url=%s, link_url=%s, button_text=%s, active=%s WHERE id=%s",
            (title, description, image_url, link_url, button_text, active, bid)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    # DELETE — удалить баннер
    if method == 'DELETE':
        bid = body.get('id')
        cur.execute(f"DELETE FROM {SCHEMA}.banners WHERE id=%s", (bid,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    conn.close()
    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}