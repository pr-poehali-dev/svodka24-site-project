import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", path: "/" },
  { label: "Новости", path: "/news" },
  { label: "Рубрики", path: "/categories" },
  { label: "Архив", path: "/archive" },
  { label: "О нас", path: "/about" },
  { label: "Контакты", path: "/contacts" },
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
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 shadow-lg">

      {/* Верхняя полоса: гамбургер | логотип | дата */}
      <div className="bg-black px-4 py-0">
        <div className="max-w-6xl mx-auto flex items-center h-14 gap-4">

          {/* Гамбургер */}
          <button
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>

          {/* Логотип */}
          <Link to="/" className="shrink-0 leading-none">
            <div className="text-white font-black text-xl leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              СВОДКА <span className="text-news-orange">24</span>
            </div>
            <div className="text-white/50 text-[10px] font-medium tracking-widest uppercase leading-none mt-0.5">
              Усть-Кут
            </div>
          </Link>

          <div className="flex-1" />

          {/* Дата и время */}
          <div className="shrink-0 text-white/50 text-xs text-right hidden sm:block">
            {getNow()}
          </div>
        </div>
      </div>

      {/* Навигационная полоса */}
      <div className="bg-[#111] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="hidden md:flex items-center gap-0 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  location.pathname === link.path
                    ? "border-news-orange text-white font-bold"
                    : "border-transparent text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Мобильное меню (выпадает под шапкой) */}
      {menuOpen && (
        <div className="bg-[#111] border-t border-white/10 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center px-5 py-3.5 text-sm font-medium border-b border-white/10 transition-colors ${
                location.pathname === link.path
                  ? "text-news-orange font-bold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Бегущая строка */}
      <div className="bg-news-orange py-1 px-4 overflow-hidden flex items-center gap-3 text-xs">
        <span className="shrink-0 font-black uppercase px-2 py-0.5 rounded bg-black text-white">
          Срочно
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <span className="inline-block animate-[marquee_35s_linear_infinite] font-medium text-black">
            Добро пожаловать на СВОДКА 24 — главные новости Усть-Кута и Иркутской области • Актуально • Оперативно • Достоверно
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