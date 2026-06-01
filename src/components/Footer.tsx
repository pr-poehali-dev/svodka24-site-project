import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-news-blue-dark text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/4c9fb864-06bd-46fc-8e04-6c53903a73de.jpg"
                alt="СВОДКА 24 Усть-Кут"
                className="h-9 w-9 rounded object-cover"
              />
              <div>
                <div className="font-black text-base leading-none" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>СВОДКА 24</div>
                <div className="text-news-orange text-xs leading-none">УСТЬ-КУТ</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Новостной портал Усть-Кута и Иркутской области
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Icon name="Send" size={17} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Icon name="Globe" size={17} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-news-orange">Разделы</h4>
            <div className="space-y-1.5">
              {[
                { label: "Главная", path: "/" },
                { label: "Новости", path: "/news" },
                { label: "Рубрики", path: "/categories" },
                { label: "Архив", path: "/archive" },
                { label: "О нас", path: "/about" },
                { label: "Контакты", path: "/contacts" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="block text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-news-orange">Контакты</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Icon name="MapPin" size={14} className="text-news-orange" />
                г. Усть-Кут, Иркутская область
              </div>
              <a href="mailto:info@svodka24.ru" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Mail" size={14} className="text-news-orange" />
                info@svodka24.ru
              </a>
              <Link to="/contacts" className="inline-block mt-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded bg-news-orange text-news-blue-dark hover:opacity-90 transition-opacity">
                Написать в редакцию
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {year} СВОДКА 24 Усть-Кут. Все права защищены.</span>
          <Link to="/about" className="hover:text-white/70 transition-colors">О портале</Link>
        </div>
      </div>
    </footer>
  );
}