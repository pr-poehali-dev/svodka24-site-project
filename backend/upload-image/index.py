import os
import uuid
import base64
import boto3

def handler(event: dict, context) -> dict:
    """Загрузка изображения в S3 хранилище. Принимает base64 файл, возвращает публичный URL."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    import json
    body = json.loads(event.get('body') or '{}')
    file_data = body.get('file')
    file_name = body.get('filename', 'image.jpg')
    content_type = body.get('content_type', 'image/jpeg')

    if not file_data:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'No file provided'})}

    image_bytes = base64.b64decode(file_data)

    ext = file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else 'jpg'
    key = f"articles/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(Bucket='files', Key=key, Body=image_bytes, ContentType=content_type)

    url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': url})
    }
