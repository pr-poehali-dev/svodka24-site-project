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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Шапка */}
      <div className="bg-news-blue-dark px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/4c9fb864-06bd-46fc-8e04-6c53903a73de.jpg"
              alt="СВОДКА 24 Усть-Кут"
              className="h-10 w-10 rounded object-cover"
            />
            <div>
              <div className="text-white font-black text-lg leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                СВОДКА 24
              </div>
              <div className="text-news-orange text-xs leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                УСТЬ-КУТ
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-news-orange text-news-blue-dark font-bold"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden bg-news-blue">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-3 text-sm font-medium border-b border-white/10 transition-colors ${
                location.pathname === link.path
                  ? "bg-news-orange text-news-blue-dark font-bold"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Бегущая строка */}
      <div className="bg-news-orange py-1 px-4 overflow-hidden flex items-center gap-3 text-xs">
        <span className="shrink-0 font-black uppercase px-2 py-0.5 rounded bg-news-blue-dark text-white">
          Срочно
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <span className="inline-block animate-[marquee_35s_linear_infinite] font-medium text-news-blue-dark">
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