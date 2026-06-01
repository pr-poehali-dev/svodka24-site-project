import { Link } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="mb-5">
            <h1 className="font-black text-3xl text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>О портале</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="news-card p-5">
                <h2 className="font-black text-xl mb-4 pl-3 border-l-4 border-news-orange text-news-text" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  СВОДКА 24 Усть-Кут
                </h2>
                <div className="text-sm text-news-text leading-relaxed space-y-3">
                  <p>Информационный портал <strong>СВОДКА 24</strong> — независимое городское издание, основанное в 2020 году. Мы освещаем ключевые события города Усть-Кута, Киренского района и Иркутской области.</p>
                  <p>Наша миссия — честная, оперативная и объективная журналистика. Мы рассказываем о том, что важно для каждого жителя города.</p>
                  <p>Редакция работает круглосуточно. Мы первыми сообщаем о происшествиях, следим за развитием событий и даём слово экспертам и жителям города.</p>
                </div>
              </div>
              <div className="news-card p-5">
                <h3 className="section-title mb-4">Принципы работы</h3>
                <ul className="space-y-3">
                  {[
                    { icon: "Shield", text: "Независимость — редакционная политика не зависит от рекламодателей и политических структур" },
                    { icon: "Zap", text: "Оперативность — новости выходят в момент события, без задержек" },
                    { icon: "CheckCircle", text: "Достоверность — все факты проверяются в нескольких источниках" },
                    { icon: "Users", text: "Открытость — мы публикуем письма читателей и отвечаем на критику" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm text-news-text">
                      <Icon name={item.icon} size={16} className="mt-0.5 shrink-0 text-news-blue" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="news-card p-5">
                <h3 className="section-title mb-4">Команда редакции</h3>
                <div className="grid grid-cols-2 gap-3">
                  {team.map((member) => (
                    <div key={member.name} className="flex items-center gap-3 p-3 rounded border border-news-border bg-news-bg">
                      <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 bg-news-blue">
                        <Icon name={member.icon} size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-news-text">{member.name}</div>
                        <div className="text-xs text-news-gray">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-news-blue rounded-lg p-5 text-white">
                <h3 className="font-bold text-base mb-4" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Портал в цифрах</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-black text-2xl text-news-orange" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>{s.value}</div>
                      <div className="text-xs opacity-70 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="news-card p-4">
                <h3 className="section-title mb-3">Реквизиты</h3>
                <dl className="space-y-2 text-sm">
                  {[
                    { label: "Название", value: "СВОДКА 24 Усть-Кут" },
                    { label: "Регион", value: "Иркутская область" },
                    { label: "Основан", value: "2020 год" },
                    { label: "Формат", value: "Электронное СМИ" },
                  ].map((r) => (
                    <div key={r.label}>
                      <dt className="text-xs text-news-gray uppercase tracking-wider">{r.label}</dt>
                      <dd className="font-medium text-news-text">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="news-card p-4">
                <h3 className="section-title mb-3">Соцсети</h3>
                <div className="space-y-2">
                  {[
                    { icon: "Send", label: "Telegram-канал" },
                    { icon: "Globe", label: "ВКонтакте" },
                    { icon: "Youtube", label: "YouTube" },
                  ].map((s) => (
                    <a key={s.label} href="#" className="flex items-center gap-2 text-sm text-news-text hover:text-news-blue transition-colors">
                      <Icon name={s.icon} size={15} className="text-news-blue" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <Link to="/contacts" className="block text-center text-sm font-bold py-2.5 rounded bg-news-orange text-news-blue-dark hover:opacity-90 transition-opacity">
                Написать в редакцию
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
