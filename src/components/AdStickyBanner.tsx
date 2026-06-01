import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdStickyBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      {/* Мобильная версия — маленькая */}
      <div
        className="flex sm:hidden rounded-l-xl shadow-2xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 60%, #c0390a 100%)" }}
      >
        <Link to="/contacts" className="flex items-center gap-1.5 px-3 py-2.5">
          <span className="text-base">📣</span>
          <span className="text-white font-black text-[11px] leading-tight whitespace-nowrap" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
            Реклама
          </span>
        </Link>
        <button onClick={() => setClosed(true)} className="px-2 text-white/40 hover:text-white text-lg border-l border-white/10">×</button>
      </div>

      {/* Десктоп версия — полная */}
      <div
        className="hidden sm:flex rounded-l-2xl shadow-2xl p-5 w-56 flex-col gap-3"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 60%, #c0390a 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div className="text-2xl">📣</div>
          <button onClick={() => setClosed(true)} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
        </div>
        <p className="text-white font-black text-base leading-snug" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          Продвигайте свой бизнес в Усть‑Куте вместе со «СВОДКА 24 УСТЬ‑КУТ»!
        </p>
        <p className="text-white/60 text-xs leading-relaxed">
          Реклама в новостях, баннеры, спецпроекты — охват тысячи жителей города.
        </p>
        <Link
          to="/contacts"
          className="block text-center text-xs font-black uppercase tracking-wider px-3 py-2.5 rounded-lg bg-news-orange text-white hover:opacity-90 transition-opacity"
          style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
        >
          Разместить рекламу
        </Link>
      </div>
    </div>
  );
}