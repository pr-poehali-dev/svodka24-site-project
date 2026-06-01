import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--news-dark)] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-headline font-black text-3xl text-[var(--news-red)] leading-none mb-2">
              СВОДКА 24
            </div>
            <div className="text-xs tracking-widest text-gray-400 uppercase mb-4">
              Усть-Кут
            </div>
            <p className="text-sm text-gray-400 font-sans-news leading-relaxed">
              Независимый новостной портал города Усть-Кут. Актуальные новости, события и репортажи.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Send" size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Globe" size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Youtube" size={18} />
              </a>
            </div>
          </div>

          {/* Разделы */}
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-gray-300 mb-4 border-b border-gray-700 pb-2">
              Разделы
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Главная", path: "/" },
                { label: "Новости", path: "/news" },
                { label: "Рубрики", path: "/categories" },
                { label: "Архив", path: "/archive" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-sans-news"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Рубрики */}
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-gray-300 mb-4 border-b border-gray-700 pb-2">
              Рубрики
            </h4>
            <ul className="space-y-2">
              {["Общество", "Политика", "Экономика", "Происшествия", "Спорт", "Культура"].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/categories`}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-sans-news"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-gray-300 mb-4 border-b border-gray-700 pb-2">
              Контакты
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Icon name="MapPin" size={14} className="mt-0.5 shrink-0 text-[var(--news-red)]" />
                г. Усть-Кут, Иркутская область
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Icon name="Mail" size={14} className="shrink-0 text-[var(--news-red)]" />
                <a href="mailto:info@svodka24.ru" className="hover:text-white transition-colors">
                  info@svodka24.ru
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Icon name="Phone" size={14} className="shrink-0 text-[var(--news-red)]" />
                <a href="tel:+7" className="hover:text-white transition-colors">
                  +7 (XXX) XXX-XX-XX
                </a>
              </li>
            </ul>
            <Link
              to="/contacts"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[var(--news-red)] hover:text-white transition-colors"
            >
              Написать в редакцию →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {year} СВОДКА 24 Усть-Кут. Все права защищены.</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-gray-300 transition-colors">О портале</Link>
            <Link to="/contacts" className="hover:text-gray-300 transition-colors">Редакция</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
