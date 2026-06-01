interface AdBannerProps {
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  label?: string;
}

export default function AdBanner({
  imageUrl,
  linkUrl = "#",
  linkText = "Подробнее",
  label = "Реклама",
}: AdBannerProps) {
  return (
    <div className="news-card overflow-hidden">
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-news-gray font-medium">
          {label}
        </span>
      </div>

      {imageUrl ? (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={imageUrl}
            alt="Реклама"
            className="w-full object-cover"
          />
        </a>
      ) : (
        <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-news-blue-dark to-news-blue flex flex-col items-center justify-center text-white text-center p-6 min-h-[200px]">
          <div className="text-4xl mb-3">📢</div>
          <p className="text-sm font-bold mb-1">Ваша реклама здесь</p>
          <p className="text-xs opacity-70 mb-4">Охват: Усть-Кут и район</p>
          <a
            href="/contacts"
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded bg-news-orange text-news-blue-dark hover:opacity-90 transition-opacity"
          >
            Разместить рекламу
          </a>
        </div>
      )}
    </div>
  );
}
