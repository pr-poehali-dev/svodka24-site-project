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

      {/* Верхняя полоса */}
      <div className="bg-black px-6 py-0">
        <div className="max-w-screen-2xl mx-auto flex items-center h-20 gap-6">

          {/* Гамбургер */}
          <button
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={32} />
          </button>

          {/* Логотип */}
          <Link to="/" className="shrink-0 leading-none">
            <div className="text-white font-black text-3xl leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              СВОДКА <span className="text-news-orange">24</span>
            </div>
            <div className="text-white/50 text-xs font-medium tracking-widest uppercase leading-none mt-1">
              Усть-Кут
            </div>
          </Link>

          <div className="flex-1" />

          {/* Дата и время */}
          <div className="shrink-0 text-white/50 text-sm text-right hidden sm:block">
            {getNow()}
          </div>
        </div>
      </div>

      {/* Выпадающее меню из гамбургера */}
      {menuOpen && (
        <div className="bg-[#111] border-t border-white/10 absolute w-full left-0 shadow-xl">
          <div className="max-w-6xl mx-auto px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-3 py-3 text-sm font-medium border-b border-white/10 last:border-0 transition-colors ${
                  location.pathname === link.path
                    ? "text-news-orange font-bold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}