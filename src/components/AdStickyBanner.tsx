import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdStickyBanner() {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
      {/* Раскрытая панель */}
      {open && (
        <div
          className="rounded-l-2xl shadow-2xl p-4 w-52 flex flex-col gap-3"
          style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 60%, #c0390a 100%)" }}
        >
          <div className="flex items-start justify-between">
            <div className="text-xl">📣</div>
            <button
              onClick={() => setClosed(true)}
              className="text-white/40 hover:text-white text-xl leading-none"
            >×</button>
          </div>
          <p className="text-white font-black text-sm leading-snug" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
            Продвигайте свой бизнес в Усть‑Куте вместе со «СВОДКА 24»!
          </p>
          <p className="text-white/50 text-[11px] leading-relaxed">
            Реклама в новостях, баннеры, спецпроекты
          </p>
          <Link
            to="/contacts"
            onClick={() => setOpen(false)}
            className="block text-center text-[11px] font-black uppercase tracking-wider px-3 py-2.5 rounded-lg bg-news-orange text-white hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            Разместить рекламу
          </Link>
        </div>
      )}

      {/* Таб-кнопка сбоку */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-l-xl shadow-xl"
        style={{
          background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 60%, #c0390a 100%)",
          width: "28px",
          minHeight: "100px",
        }}
      >
        <span
          className="text-white font-black text-[10px] uppercase tracking-widest whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "'Roboto Condensed', sans-serif" }}
        >
          Реклама
        </span>
      </button>
    </div>
  );
}
