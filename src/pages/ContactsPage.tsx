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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="border-b-2 border-[var(--news-red)] pb-3 mb-8">
            <h1 className="font-headline font-black text-4xl text-[var(--news-dark)]">Контакты</h1>
            <p className="text-sm text-[var(--news-gray)] font-sans-news mt-1">
              Свяжитесь с редакцией СВОДКА 24
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-headline font-bold text-xl mb-5 text-[var(--news-dark)]">
                Написать в редакцию
              </h2>

              {sent && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 mb-5 font-sans-news text-sm flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} />
                  Ваше сообщение отправлено! Мы ответим в ближайшее время.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--news-gray)] mb-1.5 font-sans-news">
                      Ваше имя *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-[var(--news-border)] px-3 py-2.5 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--news-gray)] mb-1.5 font-sans-news">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-[var(--news-border)] px-3 py-2.5 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors"
                      placeholder="email@example.ru"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--news-gray)] mb-1.5 font-sans-news">
                      Телефон
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-[var(--news-border)] px-3 py-2.5 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors"
                      placeholder="+7 (XXX) XXX-XX-XX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--news-gray)] mb-1.5 font-sans-news">
                      Тема обращения *
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-[var(--news-border)] px-3 py-2.5 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors bg-white"
                    >
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--news-gray)] mb-1.5 font-sans-news">
                    Сообщение *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border border-[var(--news-border)] px-3 py-2.5 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors resize-none"
                    placeholder="Опишите вашу новость или вопрос..."
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-[var(--news-gray)] font-sans-news">
                    * Поля обязательны для заполнения
                  </p>
                  <button
                    type="submit"
                    className="bg-[var(--news-red)] text-white font-bold font-sans-news uppercase tracking-wider text-sm px-8 py-3 hover:bg-red-900 transition-colors flex items-center gap-2"
                  >
                    <Icon name="Send" size={14} />
                    Отправить
                  </button>
                </div>
              </form>
            </div>

            {/* Contacts info */}
            <div className="space-y-5">
              <div className="bg-[var(--news-dark)] text-white p-6">
                <h3 className="font-headline font-bold text-lg mb-5">Редакция</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={16} className="text-[var(--news-gold)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400 font-sans-news mb-0.5">Адрес</div>
                      <div className="text-sm font-sans-news">г. Усть-Кут, Иркутская область</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={16} className="text-[var(--news-gold)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400 font-sans-news mb-0.5">Email редакции</div>
                      <a href="mailto:info@svodka24.ru" className="text-sm font-sans-news hover:text-[var(--news-gold)] transition-colors">
                        info@svodka24.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={16} className="text-[var(--news-gold)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400 font-sans-news mb-0.5">Телефон</div>
                      <a href="tel:+7" className="text-sm font-sans-news hover:text-[var(--news-gold)] transition-colors">
                        +7 (XXX) XXX-XX-XX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={16} className="text-[var(--news-gold)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400 font-sans-news mb-0.5">Режим работы</div>
                      <div className="text-sm font-sans-news">Круглосуточно</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--news-border)] p-5 bg-white">
                <h3 className="font-headline font-bold text-base mb-4 text-[var(--news-dark)]">
                  Социальные сети
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-sm font-sans-news text-[var(--news-dark)] hover:text-[var(--news-red)] transition-colors group">
                    <div className="w-8 h-8 bg-[var(--news-light-gray)] group-hover:bg-[var(--news-red)] flex items-center justify-center transition-colors">
                      <Icon name="Send" size={14} className="group-hover:text-white" />
                    </div>
                    Telegram-канал
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm font-sans-news text-[var(--news-dark)] hover:text-[var(--news-red)] transition-colors group">
                    <div className="w-8 h-8 bg-[var(--news-light-gray)] group-hover:bg-[var(--news-red)] flex items-center justify-center transition-colors">
                      <Icon name="Globe" size={14} className="group-hover:text-white" />
                    </div>
                    ВКонтакте
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm font-sans-news text-[var(--news-dark)] hover:text-[var(--news-red)] transition-colors group">
                    <div className="w-8 h-8 bg-[var(--news-light-gray)] group-hover:bg-[var(--news-red)] flex items-center justify-center transition-colors">
                      <Icon name="Youtube" size={14} className="group-hover:text-white" />
                    </div>
                    YouTube
                  </a>
                </div>
              </div>

              <div className="bg-[var(--news-light-gray)] border border-[var(--news-border)] p-5">
                <h3 className="font-headline font-bold text-base mb-2 text-[var(--news-dark)]">
                  Реклама
                </h3>
                <p className="text-sm text-[var(--news-gray)] font-sans-news leading-relaxed">
                  По вопросам размещения рекламы пишите на почту редакции или звоните по телефону.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
