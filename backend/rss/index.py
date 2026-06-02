import os
import psycopg2
from datetime import datetime, timezone, timedelta
from xml.sax.saxutils import escape

SITE_URL = "https://svodka24-site-project.poehali.dev"
SITE_TITLE = "СВОДКА 24 Усть-Кут"
SITE_DESC = "Независимый новостной портал Усть-Кута и Иркутской области"
SITE_LOGO = "https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/0a760592-cbc4-4df1-8724-c572365cffcf.jpg"

def format_rfc822(dt_str: str) -> str:
    try:
        dt = datetime.fromisoformat(str(dt_str))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone(timedelta(hours=8)))
        return dt.strftime("%a, %d %b %Y %H:%M:%S %z")
    except Exception:
        return datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S %z")

def handler(event: dict, context) -> dict:
    """Генерация RSS-ленты в формате Яндекс.Новостей"""

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, title, excerpt, content, category, date::text, author, image "
                "FROM articles ORDER BY date DESC, id DESC LIMIT 50"
            )
            rows = cur.fetchall()
    finally:
        conn.close()

    items_xml = ""
    for row in rows:
        art_id, title, excerpt, content, category, date, author, image = row
        url = f"{SITE_URL}/article/{art_id}"
        pub_date = format_rfc822(date)
        full_text = escape(content or excerpt or "")
        enclosure = ""
        if image:
            enclosure = f'<enclosure url="{escape(image)}" type="image/jpeg"/>'

        items_xml += f"""
  <item>
    <title>{escape(title)}</title>
    <link>{url}</link>
    <description>{escape(excerpt or "")}</description>
    <full-text xmlns="http://www.yandex.ru/xsd/nownews">{full_text}</full-text>
    <category>{escape(category)}</category>
    <author>{escape(author)}</author>
    <pubDate>{pub_date}</pubDate>
    <guid isPermaLink="true">{url}</guid>
    {enclosure}
  </item>"""

    now = datetime.now(timezone(timedelta(hours=8))).strftime("%a, %d %b %Y %H:%M:%S %z")

    rss_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:yandex="http://news.yandex.ru"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:full-text="http://www.yandex.ru/xsd/nownews">
  <channel>
    <title>{SITE_TITLE}</title>
    <link>{SITE_URL}</link>
    <description>{SITE_DESC}</description>
    <language>ru</language>
    <lastBuildDate>{now}</lastBuildDate>
    <image>
      <url>{SITE_LOGO}</url>
      <title>{SITE_TITLE}</title>
      <link>{SITE_URL}</link>
    </image>{items_xml}
  </channel>
</rss>"""

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=600',
        },
        'body': rss_xml,
    }
