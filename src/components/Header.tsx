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
        className={`fixed top-0 left-0 z-50 bg-black shadow-lg flex items-center gap-3 px-3 transition-all duration-300 ${
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

        <div className="px-6 py-5 border-t border-white/10 text-white/30 text-xs">
          © {new Date().getFullYear()} СВОДКА 24 · Усть-Кут
        </div>
      </div>
    </>
  );
}