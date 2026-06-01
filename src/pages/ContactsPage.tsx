import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const SEND_MAIL_URL = "https://functions.poehali.dev/c2fca549-e91a-40cf-8a9f-bf3ee7a72a0d";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected].slice(0, 5));
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      // Конвертируем файлы в base64
      const filesData = await Promise.all(files.map(f => new Promise<{data: string, filename: string, content_type: string}>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
          data: (reader.result as string).split(',')[1],
          filename: f.name,
          content_type: f.type,
        });
        reader.readAsDataURL(f);
      })));

      const res = await fetch(SEND_MAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, files: filesData }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка отправки"); return; }
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setFiles([]);
      setTimeout(() => setSent(false), 6000);
    } catch {
      setError("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSending(false);
    }
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">
                    Фото / Видео <span className="font-normal normal-case text-news-gray">(до 5 файлов)</span>
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded border-2 border-dashed border-news-border bg-news-bg cursor-pointer hover:border-news-blue transition-colors w-fit">
                    <Icon name="Paperclip" size={15} className="text-news-blue" />
                    <span className="text-sm text-news-gray">Прикрепить файлы</span>
                    <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFiles} />
                  </label>
                  {files.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs bg-white border border-news-border rounded px-3 py-1.5">
                          <Icon name={f.type.startsWith('video') ? "Video" : "Image"} size={13} className="text-news-blue shrink-0" />
                          <span className="truncate flex-1 text-news-text">{f.name}</span>
                          <span className="text-news-gray shrink-0">{(f.size / 1024 / 1024).toFixed(1)} МБ</span>
                          <button type="button" onClick={() => removeFile(i)} className="text-news-gray hover:text-red-500 transition-colors shrink-0">
                            <Icon name="X" size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm rounded flex items-center gap-2">
                    <Icon name="AlertCircle" size={15} />{error}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-news-gray">* Поля обязательны</p>
                  <button type="submit" disabled={sending} className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded bg-news-blue text-white hover:opacity-90 transition-opacity disabled:opacity-60">
                    <Icon name={sending ? "Loader" : "Send"} size={14} className={sending ? "animate-spin" : ""} />
                    {sending ? "Отправляю..." : "Отправить"}
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
                    { icon: "Mail", text: "info.svodka24ustkut@mail.ru", href: "mailto:info.svodka24ustkut@mail.ru" },
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
                    { img: "https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/86f74599-61f0-4ba4-bf07-497c6e273d23.png", label: "Telegram-канал", href: "https://t.me/svodka24ustkut" },
                    { img: "https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8bce33af-a1f4-448f-970b-64269f8451ff.png", label: "ВКонтакте", href: "https://vk.com/svodka24ustkut" },
                    { img: "https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/d44e5c19-ec02-40fc-bbd1-632c962e28ec.png", label: "Одноклассники", href: "https://ok.ru/profile/581825582472" },
                    { img: "https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/8c98bbd7-2d26-4d5b-8f87-15aa0670acf0.png", label: "MAX", href: "https://max.ru/join/P_HfSBqoL1_EzOFrrv_IeuUQ7u55zTDXVB0p-ODUk6E" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-news-text hover:text-news-blue transition-colors">
                      <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0">
                        <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
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