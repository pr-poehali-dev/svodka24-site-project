import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Редакция", path: "/about" },
  { label: "Реклама", path: "/contacts" },
  { label: "Контакты", path: "/contacts" },
  { label: "Пресс-релизы", path: "/contacts" },
  { label: "Вакансии", path: "/about" },
  { label: "RSS", path: "/news" },
  { label: "Правовая информация", path: "/about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f5] border-t border-gray-200 mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 py-10">

        {/* Ссылки */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {footerLinks.map((l) => (
            <Link
              key={l.label}
              to={l.path}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Копирайт */}
        <div className="text-center space-y-1">
          <p className="text-sm text-gray-500">
            © {year}–{year + 1} СВОДКА 24 · Усть-Кут
          </p>
          <p className="text-xs text-gray-400">
            Нашли опечатку? Выделите текст и нажмите <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-500 font-mono text-[11px]">Ctrl+Enter</kbd>
          </p>
        </div>
      </div>
    </footer>
  );
}
