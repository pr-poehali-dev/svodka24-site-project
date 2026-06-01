import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """API для работы с новостями: GET — список, POST — создать, DELETE — удалить"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    cors = {'Access-Control-Allow-Origin': '*'}
    method = event.get('httpMethod', 'GET')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])

    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            category = params.get('category')
            limit = int(params.get('limit', 50))
            article_id = params.get('id')

            with conn.cursor() as cur:
                if article_id:
                    cur.execute(
                        "SELECT id, title, excerpt, content, category, date::text, author, views, featured, image FROM articles WHERE id = %s",
                        (int(article_id),)
                    )
                    row = cur.fetchone()
                    if not row:
                        return {'statusCode': 404, 'headers': cors, 'body': json.dumps({'error': 'Not found'})}
                    cur.execute("UPDATE articles SET views = views + 1 WHERE id = %s", (int(article_id),))
                    conn.commit()
                    keys = ['id','title','excerpt','content','category','date','author','views','featured','image']
                    article = dict(zip(keys, row))
                    return {'statusCode': 200, 'headers': cors, 'body': json.dumps(article, ensure_ascii=False)}

                if category:
                    cur.execute(
                        "SELECT id, title, excerpt, content, category, date::text, author, views, featured, image FROM articles WHERE category = %s ORDER BY date DESC, id DESC LIMIT %s",
                        (category, limit)
                    )
                else:
                    cur.execute(
                        "SELECT id, title, excerpt, content, category, date::text, author, views, featured, image FROM articles ORDER BY date DESC, id DESC LIMIT %s",
                        (limit,)
                    )
                rows = cur.fetchall()
                keys = ['id','title','excerpt','content','category','date','author','views','featured','image']
                articles = [dict(zip(keys, r)) for r in rows]
                return {'statusCode': 200, 'headers': cors, 'body': json.dumps(articles, ensure_ascii=False)}

        if method == 'POST':
            admin_key = (event.get('headers') or {}).get('X-Admin-Key', '')
            if admin_key != os.environ.get('ADMIN_KEY', ''):
                return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'error': 'Forbidden'})}

            body = json.loads(event.get('body') or '{}')
            title = body.get('title', '').strip()
            excerpt = body.get('excerpt', '').strip()
            content = body.get('content', '').strip()
            category = body.get('category', '').strip()
            author = body.get('author', 'Редакция СВОДКА 24').strip()
            image = body.get('image', None)
            featured = bool(body.get('featured', False))

            if not all([title, excerpt, content, category]):
                return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните все обязательные поля'})}

            with conn.cursor() as cur:
                if featured:
                    cur.execute("UPDATE articles SET featured = FALSE WHERE featured = TRUE")
                cur.execute(
                    "INSERT INTO articles (title, excerpt, content, category, author, image, featured) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
                    (title, excerpt, content, category, author, image, featured)
                )
                new_id = cur.fetchone()[0]
                conn.commit()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'id': new_id, 'ok': True})}

        if method == 'DELETE':
            admin_key = (event.get('headers') or {}).get('X-Admin-Key', '')
            if admin_key != os.environ.get('ADMIN_KEY', ''):
                return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'error': 'Forbidden'})}

            params = event.get('queryStringParameters') or {}
            article_id = params.get('id')
            if not article_id:
                return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'id required'})}

            with conn.cursor() as cur:
                cur.execute("DELETE FROM articles WHERE id = %s", (int(article_id),))
                conn.commit()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    finally:
        conn.close()
