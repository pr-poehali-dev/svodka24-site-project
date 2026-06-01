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
  const [bellOpen, setBellOpen] = useState(false);
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

          {/* Соцсети в шапке */}
          <div className="hidden sm:flex items-center gap-2">
            {[
              { label: "ВКонтакте", url: "https://vk.com/svodka24ustkut", color: "#2787F5", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8bce33af-a1f4-448f-970b-64269f8451ff.png" alt="ВК" width="22" height="22" className="rounded-lg" /> },
              { label: "Одноклассники", url: "https://ok.ru/profile/581825582472", color: "#EE8208", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/d44e5c19-ec02-40fc-bbd1-632c962e28ec.png" alt="ОК" width="22" height="22" className="rounded-lg" /> },
              { label: "Telegram", url: "https://t.me/svodka24ustkut", color: "#26A5E4", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/86f74599-61f0-4ba4-bf07-497c6e273d23.png" alt="Telegram" width="22" height="22" /> },
              { label: "MAX", url: "https://max.ru/join/P_HfSBqoL1_EzOFrrv_IeuUQ7u55zTDXVB0p-ODUk6E", color: "#7B3FE4", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8c98bbd7-2d26-4d5b-8f87-15aa0670acf0.png" alt="MAX" width="22" height="22" className="rounded-lg" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex items-center justify-center w-8 h-8 text-white/60 hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Колокольчик */}
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(menuOpen ? false : menuOpen)}
              id="bell-btn"
              className="relative text-white/70 hover:text-white transition-colors"
              title="Подписаться на новости"
              onClick={() => {
                const popup = document.getElementById('bell-popup');
                if (popup) popup.classList.toggle('hidden');
              }}
            >
              <Icon name="Bell" size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-news-orange rounded-full animate-pulse" />
            </button>
            <div id="bell-popup" className="hidden absolute right-0 top-10 w-64 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100">
              <p className="font-black text-sm text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                🔔 Будьте первыми!
              </p>
              <p className="text-xs text-news-gray mb-3 leading-relaxed">
                Подпишитесь на наш Telegram-канал и получайте новости Усть-Кута мгновенно
              </p>
              <a
                href="https://t.me/svodka24ustkut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#26A5E4] text-white text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/86f74599-61f0-4ba4-bf07-497c6e273d23.png" width="16" height="16" alt="" />
                Подписаться в Telegram
              </a>
            </div>
          </div>

          <div className="shrink-0 text-white/50 text-sm hidden lg:block">{getNow()}</div>
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
              { label: "ВКонтакте", url: "https://vk.com/svodka24ustkut", color: "#2787F5", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8bce33af-a1f4-448f-970b-64269f8451ff.png" alt="ВК" width="24" height="24" className="rounded-lg" /> },
              { label: "Одноклассники", url: "https://ok.ru/profile/581825582472", color: "#EE8208", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/d44e5c19-ec02-40fc-bbd1-632c962e28ec.png" alt="ОК" width="24" height="24" className="rounded-lg" /> },
              { label: "Telegram", url: "https://t.me/svodka24ustkut", color: "#26A5E4", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/86f74599-61f0-4ba4-bf07-497c6e273d23.png" alt="Telegram" width="24" height="24" /> },
              { label: "MAX", url: "https://max.ru/join/P_HfSBqoL1_EzOFrrv_IeuUQ7u55zTDXVB0p-ODUk6E", color: "#7B3FE4", icon: <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8c98bbd7-2d26-4d5b-8f87-15aa0670acf0.png" alt="MAX" width="24" height="24" className="rounded-lg" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:opacity-80 transition-opacity"
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