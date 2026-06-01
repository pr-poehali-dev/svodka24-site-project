import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", path: "/" },
  { label: "Новости", path: "/news" },
  { label: "Рубрики", path: "/categories" },
  { label: "Архив", path: "/archive" },
  { label: "О портале", path: "/about" },
  { label: "Контакты", path: "/contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header>
      {/* Top bar */}
      <div className="bg-[var(--news-dark)] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-sans-news capitalize">{dateStr}</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={11} />
              Усть-Кут, Иркутская область
            </span>
            <a href="#" className="hover:text-[var(--news-gold)] transition-colors">
              <Icon name="Send" size={12} />
            </a>
            <a href="#" className="hover:text-[var(--news-gold)] transition-colors">
              <Icon name="Globe" size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="bg-white border-b-2 border-[var(--news-red)] py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span
              className="font-headline font-black text-4xl md:text-5xl leading-none tracking-tight"
              style={{ color: "var(--news-red)" }}
            >
              СВОДКА 24
            </span>
            <span className="font-sans-news text-xs tracking-[0.25em] text-[var(--news-gray)] uppercase mt-0.5">
              Усть-Кут · Главные новости
            </span>
          </Link>
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-xs text-[var(--news-gray)]">
              <Icon name="Clock" size={12} />
              <span id="live-time" className="font-mono tabular-nums">
                {now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <span className="text-xs text-[var(--news-gray)]">Новости круглосуточно</span>
          </div>
          <button
            className="md:hidden text-[var(--news-dark)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[var(--news-dark)] text-white">
        <div className="max-w-7xl mx-auto">
          {/* Desktop nav */}
          <div className="hidden md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-sm font-bold font-sans-news tracking-wide uppercase transition-colors hover:bg-[var(--news-red)] ${
                  location.pathname === link.path ? "bg-[var(--news-red)]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile nav */}
          {menuOpen && (
            <div className="md:hidden flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-bold font-sans-news uppercase border-b border-white/10 hover:bg-[var(--news-red)] transition-colors ${
                    location.pathname === link.path ? "bg-[var(--news-red)]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Breaking news ticker */}
      <div className="breaking-ticker py-1.5 px-4 flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 bg-white text-[var(--news-red)] text-xs font-black px-2 py-0.5 uppercase tracking-wider">
          Срочно
        </span>
        <div className="overflow-hidden whitespace-nowrap">
          <span className="inline-block animate-[marquee_30s_linear_infinite] text-sm">
            &nbsp;&nbsp;&nbsp;Добро пожаловать на информационный портал СВОДКА 24 — главные новости Усть-Кута и Иркутской области&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Актуальные новости, репортажи и аналитика круглосуточно&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Оставайтесь в курсе событий вашего города
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </header>
  );
}
