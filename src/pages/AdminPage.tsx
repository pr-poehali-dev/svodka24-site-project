import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { categories } from "@/data/articles";

const API_URL = "https://functions.poehali.dev/2cdc5e6d-7a6f-402b-baa5-6bbb647f3a5d";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  views: number;
  featured: boolean;
  image?: string;
}

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  category: categories[0],
  author: "Редакция СВОДКА 24",
  image: "",
  featured: false,
};

export default function AdminPage() {
  const [key, setKey] = useState(() => localStorage.getItem("admin_key") || "");
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"list" | "add">("list");

  const fetchArticles = async (adminKey: string) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Проверяем ключ отправив тестовый POST
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Key': keyInput },
      body: JSON.stringify({ title: '', excerpt: '', content: '', category: '' }),
    });
    if (res.status === 403) {
      setAuthError(true);
      return;
    }
    // 400 = неверные поля, но ключ правильный
    localStorage.setItem("admin_key", keyInput);
    setKey(keyInput);
    setAuthed(true);
    setAuthError(false);
    fetchArticles(keyInput);
  };

  useEffect(() => {
    if (key) {
      setAuthed(true);
      fetchArticles(key);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': key },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка"); return; }
      setSaved(true);
      setForm(EMPTY_FORM);
      fetchArticles(key);
      setTab("list");
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить новость?")) return;
    await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Key': key },
    });
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_key");
    setKey("");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-news-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/4c9fb864-06bd-46fc-8e04-6c53903a73de.jpg" alt="СВОДКА 24" className="h-10 w-10 rounded object-cover" />
              <span className="font-black text-xl text-news-text" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>СВОДКА 24</span>
            </div>
            <h1 className="font-black text-2xl text-news-text" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Панель редактора</h1>
            <p className="text-sm text-news-gray mt-1">Введите пароль для входа</p>
          </div>
          <form onSubmit={handleLogin} className="news-card p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Пароль</label>
              <input
                type="password"
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                required
                placeholder="Введите пароль"
                className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-news-blue"
              />
              {authError && <p className="text-red-500 text-xs mt-1">Неверный пароль</p>}
            </div>
            <button type="submit" className="w-full bg-news-blue text-white font-bold py-2.5 rounded hover:opacity-90 transition-opacity">
              Войти
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/" className="text-xs text-news-gray hover:text-news-blue transition-colors">← На сайт</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-news-bg">
      {/* Header */}
      <div className="bg-news-blue-dark text-white px-4 py-3 sticky top-0 z-50 shadow">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/4c9fb864-06bd-46fc-8e04-6c53903a73de.jpg" alt="СВОДКА 24" className="h-8 w-8 rounded object-cover" />
            <span className="font-black text-base" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Панель редактора</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1">
              <Icon name="ExternalLink" size={12} /> Сайт
            </Link>
            <button onClick={handleLogout} className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1">
              <Icon name="LogOut" size={12} /> Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-5 text-sm flex items-center gap-2">
            <Icon name="CheckCircle" size={15} /> Новость успешно опубликована!
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("list")}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${tab === "list" ? "bg-news-blue text-white" : "bg-white border border-news-border text-news-text hover:border-news-blue"}`}
          >
            <Icon name="List" size={14} className="inline mr-1.5" />
            Все новости ({articles.length})
          </button>
          <button
            onClick={() => setTab("add")}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${tab === "add" ? "bg-news-blue text-white" : "bg-white border border-news-border text-news-text hover:border-news-blue"}`}
          >
            <Icon name="Plus" size={14} className="inline mr-1.5" />
            Добавить новость
          </button>
        </div>

        {/* Список новостей */}
        {tab === "list" && (
          <div className="news-card overflow-hidden">
            {loading ? (
              <div className="py-16 text-center text-news-gray">
                <Icon name="Loader" size={28} className="mx-auto mb-2 animate-spin text-news-blue" />
                <p className="text-sm">Загрузка...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="py-16 text-center text-news-gray">
                <Icon name="Newspaper" size={36} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm mb-4">Новостей пока нет</p>
                <button onClick={() => setTab("add")} className="bg-news-blue text-white text-sm font-bold px-5 py-2 rounded hover:opacity-90">
                  Добавить первую
                </button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-news-bg border-b border-news-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-news-gray">Заголовок</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-news-gray hidden md:table-cell">Рубрика</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-news-gray hidden md:table-cell">Дата</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-news-gray hidden sm:table-cell">Просмотры</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a) => (
                    <tr key={a.id} className="border-b border-news-border last:border-0 hover:bg-news-bg transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          {a.featured && <span className="shrink-0 text-xs font-bold px-1.5 py-0.5 rounded bg-news-orange text-news-blue-dark mt-0.5">Главная</span>}
                          <Link to={`/article/${a.id}`} target="_blank" className="font-medium text-news-text hover:text-news-blue transition-colors line-clamp-2">
                            {a.title}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-news-gray hidden md:table-cell whitespace-nowrap">{a.category}</td>
                      <td className="px-4 py-3 text-news-gray hidden md:table-cell whitespace-nowrap">
                        {new Date(a.date).toLocaleDateString("ru-RU")}
                      </td>
                      <td className="px-4 py-3 text-news-gray hidden sm:table-cell">{a.views}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                          title="Удалить"
                        >
                          <Icon name="Trash2" size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Форма добавления */}
        {tab === "add" && (
          <form onSubmit={handleSubmit} className="news-card p-6 space-y-5">
            <h2 className="section-title">Новая публикация</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Заголовок *</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-news-blue"
                placeholder="Введите заголовок новости" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Рубрика *</label>
                <select name="category" value={form.category} onChange={handleChange} required
                  className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none bg-white">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Автор</label>
                <input name="author" value={form.author} onChange={handleChange}
                  className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-news-blue"
                  placeholder="Редакция СВОДКА 24" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Краткое описание *</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} required rows={2}
                className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-news-blue resize-none"
                placeholder="1–2 предложения для анонса новости" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Текст новости *</label>
              <textarea name="content" value={form.content} onChange={handleChange} required rows={8}
                className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-news-blue resize-y"
                placeholder="Полный текст новости. Абзацы разделяйте пустой строкой." />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-news-gray mb-1.5">Ссылка на фото</label>
              <input name="image" value={form.image} onChange={handleChange}
                className="w-full border border-news-border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-news-blue"
                placeholder="https://..." />
              {form.image && (
                <img src={form.image} alt="preview" className="mt-2 h-32 rounded object-cover border border-news-border" />
              )}
            </div>

            <div className="flex items-center gap-3 p-3 rounded border border-news-border bg-news-bg">
              <input type="checkbox" id="featured" name="featured" checked={form.featured}
                onChange={handleChange} className="w-4 h-4 accent-news-blue" />
              <label htmlFor="featured" className="text-sm font-medium text-news-text cursor-pointer">
                Сделать главной новостью на главной странице
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="bg-news-blue text-white font-bold px-8 py-2.5 rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
                {saving ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Send" size={15} />}
                {saving ? "Публикую..." : "Опубликовать"}
              </button>
              <button type="button" onClick={() => setForm(EMPTY_FORM)}
                className="text-sm text-news-gray hover:text-news-text transition-colors">
                Очистить
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}