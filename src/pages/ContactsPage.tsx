import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="mb-5">
            <h1 className="font-black text-3xl text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Контакты</h1>
            <p className="text-sm text-news-gray">Свяжитесь с редакцией СВОДКА 24</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 news-card p-5">
              <h2 className="section-title mb-5">Написать в редакцию</h2>
              {sent && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 mb-4 text-sm flex items-center gap-2 rounded">
                  <Icon name="CheckCircle" size={15} />
                  Ваше сообщение отправлено! Мы ответим в ближайшее время.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Ваше имя *</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      className="w-full border border-news-border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-blue"
                      placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-news-border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-blue"
                      placeholder="email@example.ru" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Телефон</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      className="w-full border border-news-border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-blue"
                      placeholder="+7 (XXX) XXX-XX-XX" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Тема *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full border border-news-border rounded px-3 py-2 text-sm focus:outline-none bg-white">
                      <option value="">Выберите тему</option>
                      <option value="news">Прислать новость</option>
                      <option value="ad">Реклама</option>
                      <option value="correction">Поправка к материалу</option>
                      <option value="complaint">Жалоба</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Сообщение *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    className="w-full border border-news-border rounded px-3 py-2 text-sm focus:outline-none resize-none"
                    placeholder="Опишите вашу новость или вопрос..." />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-news-gray">* Поля обязательны</p>
                  <button type="submit" className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded bg-news-blue text-white hover:opacity-90 transition-opacity">
                    <Icon name="Send" size={14} />Отправить
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <div className="bg-news-blue-dark rounded-lg p-5 text-white">
                <h3 className="font-bold text-base mb-4" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Редакция</h3>
                <div className="space-y-3">
                  {[
                    { icon: "MapPin", text: "г. Усть-Кут, Иркутская область" },
                    { icon: "Mail", text: "info@svodka24.ru", href: "mailto:info@svodka24.ru" },
                    { icon: "Phone", text: "+7 (XXX) XXX-XX-XX", href: "tel:+7" },
                    { icon: "Clock", text: "Круглосуточно" },
                  ].map((c) => (
                    <div key={c.text} className="flex items-start gap-2.5">
                      <Icon name={c.icon} size={14} className="mt-0.5 shrink-0 text-news-orange" />
                      {c.href
                        ? <a href={c.href} className="text-sm text-white/80 hover:text-white transition-colors">{c.text}</a>
                        : <span className="text-sm text-white/80">{c.text}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className="news-card p-4">
                <h3 className="section-title mb-3">Соцсети</h3>
                <div className="space-y-2">
                  {[
                    { icon: "Send", label: "Telegram-канал" },
                    { icon: "Globe", label: "ВКонтакте" },
                    { icon: "Youtube", label: "YouTube" },
                  ].map((s) => (
                    <a key={s.label} href="#" className="flex items-center gap-2.5 text-sm text-news-text hover:text-news-blue transition-colors">
                      <div className="w-7 h-7 rounded flex items-center justify-center bg-news-bg">
                        <Icon name={s.icon} size={13} className="text-news-blue" />
                      </div>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="news-card p-4">
                <h3 className="section-title mb-2">Реклама</h3>
                <p className="text-sm text-news-gray">По вопросам размещения рекламы пишите на почту редакции.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
