import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const team = [
  { name: "Главный редактор", role: "Руководство", icon: "User" },
  { name: "Журналист", role: "Общество, Культура", icon: "PenLine" },
  { name: "Репортёр", role: "Происшествия, Спорт", icon: "Camera" },
  { name: "Редактор", role: "Политика, Экономика", icon: "Edit" },
];

const stats = [
  { label: "лет в эфире", value: "6+" },
  { label: "материалов", value: "4 000+" },
  { label: "читателей в месяц", value: "50 000+" },
  { label: "рубрик", value: "8" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="border-b-2 border-[var(--news-red)] pb-3 mb-8">
            <h1 className="font-headline font-black text-4xl text-[var(--news-dark)]">О портале</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main text */}
            <div className="lg:col-span-2 font-serif-body text-[var(--news-dark)] leading-relaxed space-y-5">
              <h2 className="font-headline font-bold text-2xl text-[var(--news-dark)] border-l-4 border-[var(--news-red)] pl-4">
                СВОДКА 24 Усть-Кут
              </h2>
              <p>
                Информационный портал <strong>СВОДКА 24</strong> — независимое городское издание, основанное в 2020 году. Мы освещаем ключевые события города Усть-Кута, Киренского района и Иркутской области в целом.
              </p>
              <p>
                Наша миссия — честная, оперативная и объективная журналистика. Мы рассказываем о том, что важно для каждого жителя города: от решений городской администрации до культурных событий и спортивных достижений.
              </p>
              <p>
                Редакция работает круглосуточно. Мы первыми сообщаем о происшествиях, следим за развитием событий и даём слово экспертам и обычным жителям города.
              </p>

              <div className="news-divider my-6"></div>

              <h3 className="font-headline font-bold text-xl">Принципы работы</h3>
              <ul className="space-y-3">
                {[
                  { icon: "Shield", text: "Независимость — редакционная политика не зависит от рекламодателей и политических структур" },
                  { icon: "Zap", text: "Оперативность — новости выходят в момент события, без задержек" },
                  { icon: "CheckCircle", text: "Достоверность — все факты проверяются в нескольких источниках" },
                  { icon: "Users", text: "Открытость — мы публикуем письма читателей и отвечаем на критику" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <Icon name={item.icon} size={18} className="text-[var(--news-red)] mt-0.5 shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="news-divider my-6"></div>

              <h3 className="font-headline font-bold text-xl">Команда редакции</h3>
              <div className="grid grid-cols-2 gap-4">
                {team.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 p-4 border border-[var(--news-border)] bg-white"
                  >
                    <div className="w-10 h-10 bg-[var(--news-dark)] flex items-center justify-center shrink-0">
                      <Icon name={member.icon} size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-headline font-bold text-sm text-[var(--news-dark)]">
                        {member.name}
                      </div>
                      <div className="text-xs text-[var(--news-gray)] font-sans-news">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-[var(--news-dark)] text-white p-6">
                <h3 className="font-headline font-bold text-lg mb-5 border-b border-white/20 pb-3">
                  Портал в цифрах
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-headline font-black text-3xl text-[var(--news-gold)]">
                        {s.value}
                      </div>
                      <div className="text-xs text-gray-400 font-sans-news mt-1 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requisites */}
              <div className="border border-[var(--news-border)] p-5 bg-white">
                <h3 className="font-headline font-bold text-base mb-4 text-[var(--news-dark)]">
                  Реквизиты
                </h3>
                <dl className="space-y-2 text-sm font-sans-news">
                  <div>
                    <dt className="text-xs text-[var(--news-gray)] uppercase tracking-wider">Название</dt>
                    <dd className="text-[var(--news-dark)] font-semibold">СВОДКА 24 Усть-Кут</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--news-gray)] uppercase tracking-wider">Регион</dt>
                    <dd className="text-[var(--news-dark)]">Иркутская область</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--news-gray)] uppercase tracking-wider">Основан</dt>
                    <dd className="text-[var(--news-dark)]">2020 год</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--news-gray)] uppercase tracking-wider">Формат</dt>
                    <dd className="text-[var(--news-dark)]">Электронное СМИ</dd>
                  </div>
                </dl>
              </div>

              {/* Social */}
              <div className="border-2 border-[var(--news-red)] p-5">
                <h3 className="font-headline font-bold text-base mb-3 text-[var(--news-dark)]">
                  Мы в соцсетях
                </h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-[var(--news-dark)] hover:text-[var(--news-red)] transition-colors font-sans-news">
                    <Icon name="Send" size={16} />Telegram-канал
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[var(--news-dark)] hover:text-[var(--news-red)] transition-colors font-sans-news">
                    <Icon name="Globe" size={16} />ВКонтакте
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[var(--news-dark)] hover:text-[var(--news-red)] transition-colors font-sans-news">
                    <Icon name="Youtube" size={16} />YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
