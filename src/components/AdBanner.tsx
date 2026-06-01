import { useEffect, useState } from "react";

const BANNERS_URL = "https://functions.poehali.dev/cc70a8eb-2952-4967-8043-fe5523700395";

interface Banner {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  button_text: string;
}

export default function AdBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch(BANNERS_URL)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setBanners(data); })
      .catch(() => {});
  }, []);

  if (banners.length === 0) {
    return (
      <div className="news-card overflow-hidden">
        <div className="px-3 pt-3 pb-1">
          <span className="text-[10px] uppercase tracking-widest text-news-gray font-medium">Реклама</span>
        </div>
        <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-news-blue-dark to-news-blue flex flex-col items-center justify-center text-white text-center p-6 min-h-[160px]">
          <div className="text-3xl mb-2">📢</div>
          <p className="text-sm font-bold mb-1">Ваша реклама здесь</p>
          <p className="text-xs opacity-70 mb-4">Охват: Усть-Кут и район</p>
          <a href="/contacts" className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded bg-news-orange text-white hover:opacity-90 transition-opacity">
            Разместить рекламу
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {banners.map((b) => (
        <div key={b.id} className="news-card overflow-hidden">
          <div className="px-3 pt-3 pb-1">
            <span className="text-[10px] uppercase tracking-widest text-news-gray font-medium">Реклама</span>
          </div>
          {b.image_url && (
            <img src={b.image_url} alt={b.title} className="w-full object-contain max-h-40" />
          )}
          <div className="px-4 py-3">
            {b.title && (
              <p className="font-black text-sm text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                {b.title}
              </p>
            )}
            {b.description && (
              <p className="text-xs text-news-gray leading-relaxed mb-3">{b.description}</p>
            )}
            {b.link_url && (
              <a
                href={b.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold uppercase tracking-wider px-4 py-2 rounded bg-news-orange text-white hover:opacity-90 transition-opacity"
              >
                {b.button_text || "Подробнее"}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
