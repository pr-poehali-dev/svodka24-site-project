import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdStickyBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-stretch" style={{ writingMode: "horizontal-tb" }}>
      <div
        className="relative rounded-r-2xl shadow-2xl overflow-hidden w-12 hover:w-56 transition-all duration-300 group cursor-pointer"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 40%, #FF6D00 100%)" }}
      >
        {/* Вертикальный текст когда свёрнута */}
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
          <span
            className="text-white font-black text-[11px] uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            Реклама
          </span>
        </div>

        {/* Контент когда раскрыта */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 min-h-[180px] flex flex-col justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); setClosed(true); }}
            className="absolute top-2 right-2 text-white/50 hover:text-white text-lg leading-none"
          >
            ×
          </button>
          <div>
            <div className="text-xl mb-2">📣</div>
            <p className="text-white font-black text-sm leading-snug mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              Продвигайте бизнес в Усть‑Куте!
            </p>
            <p className="text-white/60 text-[11px] leading-relaxed">
              Вместе со «СВОДКА 24 УСТЬ‑КУТ»
            </p>
          </div>
          <Link
            to="/contacts"
            className="mt-3 block text-center text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-lg bg-news-orange text-white hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            Разместить рекламу
          </Link>
        </div>
      </div>
    </div>
  );
}
