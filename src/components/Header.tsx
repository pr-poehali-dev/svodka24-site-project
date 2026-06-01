import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", path: "/", icon: "Home" },
  { label: "Новости", path: "/news", icon: "Newspaper" },
  { label: "Рубрики", path: "/categories", icon: "LayoutGrid" },
  { label: "Архив", path: "/archive", icon: "Archive" },
  { label: "О нас", path: "/about", icon: "Info" },
  { label: "Контакты", path: "/contacts", icon: "Mail" },
];

function getNow() {
  return new Date().toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Полная шапка */}
      <header className="bg-black w-full z-40">
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center h-20 gap-6">
          <button
            className="text-white/80 hover:text-white transition-colors shrink-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Меню"
          >
            <Icon name="Menu" size={32} />
          </button>
          <Link to="/" className="shrink-0 leading-none">
            <div className="text-white font-black text-3xl leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              СВОДКА <span className="text-news-orange">24</span>
            </div>
            <div className="text-white/50 text-xs font-medium tracking-widest uppercase leading-none mt-1">
              Усть-Кут
            </div>
          </Link>
          <div className="flex-1" />
          <div className="shrink-0 text-white/50 text-sm hidden sm:block">{getNow()}</div>
        </div>
      </header>

      {/* Компактный квадрат — появляется при скролле, прилипает слева */}
      <div
        className={`fixed top-3 left-3 z-50 bg-black shadow-xl flex items-center gap-3 px-3 rounded-xl transition-all duration-300 ${
          scrolled ? "h-12 w-auto opacity-100 pointer-events-auto" : "h-0 w-0 opacity-0 pointer-events-none overflow-hidden"
        }`}
      >
        <button
          className="text-white/80 hover:text-white transition-colors shrink-0"
          onClick={() => setMenuOpen(true)}
          aria-label="Меню"
        >
          <Icon name="Menu" size={20} />
        </button>
        <Link to="/" className="shrink-0 leading-none whitespace-nowrap">
          <span className="text-white font-black text-base" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
            СВОДКА <span className="text-news-orange">24</span>
          </span>
        </Link>
      </div>

      {/* Затемнение */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Боковая панель */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-[70] bg-[#111] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 bg-black shrink-0">
          <Link to="/" onClick={() => setMenuOpen(false)} className="leading-none">
            <div className="text-white font-black text-2xl leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              СВОДКА <span className="text-news-orange">24</span>
            </div>
            <div className="text-white/40 text-[10px] tracking-widest uppercase mt-0.5">Усть-Кут</div>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">
            <Icon name="X" size={24} />
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 text-base font-medium border-b border-white/5 transition-colors ${
                location.pathname === link.path
                  ? "text-news-orange bg-white/5"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={link.icon} size={20} className="shrink-0 opacity-60" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Соцсети */}
        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-white/40 text-[11px] uppercase tracking-widest font-medium mb-3">Подпишись на наши соц. сети</p>
          <div className="flex gap-2">
            {[
              { label: "ВКонтакте", url: "https://vk.com/svodka24ustkut", color: "#0077FF", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.79 3.236c-1.23 2.127-1.75 1.746-1.75 1.746V7.5a.5.5 0 0 0-.5-.5H9.75S9.5 7 9.5 7.5c0 0 .75.154.75 1.23V15s-.25 1.25-1.856 1.25C6.607 16.25 5 14.5 5 12.5c0-1.969 1.25-4.5 1.25-4.5H2.5S1 11 1 13.5C1 17.5 4.5 20 8 20c2.844 0 4-1.5 4-1.5v1a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 .5-.5V14s.5-1 1.5 0c.77.77 1.5 2 2.5 4.5.156.39.516.5.75.5H23s1.25-.125.5-1.5c-.625-1.125-2-3-2-3s-.625-.875 0-1.75C22.5 11.5 23.5 9 23.5 9S24 7 21.547 7z"/></svg> },
              { label: "Одноклассники", url: "https://ok.ru/profile/581825582472", color: "#EE8208", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 5a3.5 3.5 0 1 1-3.5 3.5A3.5 3.5 0 0 1 12 6zm5.5 10.5c-.4.9-1.5 1.5-3 1.9l1.6 1.6a1 1 0 0 1-1.4 1.4L12 19.1l-2.7 2.3a1 1 0 0 1-1.4-1.4l1.6-1.6c-1.5-.4-2.6-1-3-1.9a1 1 0 0 1 1.8-.8c.4.8 1.8 1.4 3.7 1.4s3.3-.6 3.7-1.4a1 1 0 0 1 1.8.8z"/></svg> },
              { label: "Telegram", url: "https://t.me/svodka24ustkut", color: "#26A5E4", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
              { label: "MAX", url: "https://max.ru/join/P_HfSBqoL1_EzOFrrv_IeuUQ7u55zTDXVB0p-ODUk6E", color: "#7B3FE4", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8c98bbd7-2d26-4d5b-8f87-15aa0670acf0.png" alt="MAX" width="20" height="20" className="rounded-sm" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: s.color }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 text-white/30 text-xs">
          © {new Date().getFullYear()} СВОДКА 24 · Усть-Кут
        </div>
      </div>
    </>
  );
}