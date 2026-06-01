import os
import json
import uuid
import base64
import smtplib
import boto3
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

SUBJECTS = {
    'news': 'Прислать новость',
    'ad': 'Реклама',
    'correction': 'Поправка к материалу',
    'complaint': 'Жалоба',
    'other': 'Другое',
}

def upload_file(file_data, filename, content_type):
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else 'bin'
    key = f"contacts/{uuid.uuid4()}.{ext}"
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(Bucket='files', Key=key, Body=base64.b64decode(file_data), ContentType=content_type)
    return f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

def handler(event: dict, context) -> dict:
    """Отправка сообщения с формы контактов на почту редакции. Поддерживает прикреплённые файлы (фото/видео)."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    email = body.get('email', '')
    phone = body.get('phone', '')
    subject_key = body.get('subject', 'other')
    message = body.get('message', '')
    files = body.get('files', [])  # [{data, filename, content_type}]

    if not name or not email or not message:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Заполните обязательные поля'})}

    subject_label = SUBJECTS.get(subject_key, 'Другое')

    # Загружаем файлы в S3
    file_urls = []
    for f in files:
        try:
            url = upload_file(f['data'], f['filename'], f.get('content_type', 'application/octet-stream'))
            file_urls.append({'name': f['filename'], 'url': url})
        except Exception:
            pass

    # Формируем блок с файлами
    files_html = ''
    if file_urls:
        files_html = '<div style="margin-top:20px;padding:16px;background:#f5f7fa;border-left:4px solid #FF6D00;border-radius:4px;"><b style="color:#546e7a;">Прикреплённые файлы:</b><ul style="margin-top:8px;padding-left:16px;">'
        for f in file_urls:
            files_html += f'<li style="margin-bottom:6px;"><a href="{f["url"]}" style="color:#1565C0;">{f["name"]}</a></li>'
        files_html += '</ul></div>'

    mail_from = os.environ['MAIL_FROM']
    mail_password = os.environ['MAIL_PASSWORD']
    mail_to = 'info.svodka24ustkut@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'[СВОДКА 24] {subject_label} от {name}'
    msg['From'] = mail_from
    msg['To'] = mail_to
    msg['Reply-To'] = email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #0D47A1; border-bottom: 2px solid #FF6D00; padding-bottom: 8px;">
        Новое сообщение с сайта СВОДКА 24
      </h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; color: #546e7a; width: 140px;"><b>Тема:</b></td><td style="padding: 8px;">{subject_label}</td></tr>
        <tr style="background:#f5f7fa"><td style="padding: 8px; color: #546e7a;"><b>Имя:</b></td><td style="padding: 8px;">{name}</td></tr>
        <tr><td style="padding: 8px; color: #546e7a;"><b>Email:</b></td><td style="padding: 8px;"><a href="mailto:{email}">{email}</a></td></tr>
        <tr style="background:#f5f7fa"><td style="padding: 8px; color: #546e7a;"><b>Телефон:</b></td><td style="padding: 8px;">{phone or '—'}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f5f7fa; border-left: 4px solid #0D47A1; border-radius: 4px;">
        <b style="color: #546e7a;">Сообщение:</b>
        <p style="margin-top: 8px; color: #1a1a2e; line-height: 1.6;">{message.replace(chr(10), '<br>')}</p>
      </div>
      {files_html}
      <p style="margin-top: 20px; font-size: 12px; color: #999;">Письмо отправлено с сайта svodka24-site-project.poehali.dev</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(mail_from, mail_password)
        server.sendmail(mail_from, mail_to, msg.as_string())

    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}
