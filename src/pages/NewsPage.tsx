import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import AdBanner from "@/components/AdBanner";
import { articles, categories } from "@/data/articles";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const allCategories = ["Все", ...categories];

  const filtered = articles.filter((a) => {
    const matchCat = selectedCategory === "Все" || a.category === selectedCategory;
    const matchSearch = search.trim() === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="mb-5">
            <h1 className="font-black text-3xl text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Новости</h1>
            <p className="text-sm text-news-gray">Усть-Кут и Иркутская область</p>
          </div>

          <div className="news-card p-4 mb-5">
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded border transition-colors ${
                      selectedCategory === cat
                        ? "bg-news-blue text-white border-news-blue"
                        : "border-news-border text-news-gray hover:border-news-blue hover:text-news-blue"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:ml-auto border border-news-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-news-blue w-full md:w-56"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 news-card p-4">
              <p className="text-xs text-news-gray mb-4">Найдено: <strong>{filtered.length}</strong></p>
              {filtered.length === 0
                ? <p className="py-12 text-center text-news-gray">Ничего не найдено</p>
                : filtered.map((a) => <ArticleCard key={a.id} article={a} />)
              }
            </div>
            <div className="space-y-4">
              <div className="news-card p-4 h-fit">
                <h2 className="section-title mb-4">Популярное</h2>
                {[...articles].sort((a, b) => b.views - a.views).slice(0, 5).map((a, idx) => (
                  <div key={a.id} className="border-b border-news-border last:border-0 py-2.5 flex gap-2 items-start">
                    <span className="font-black text-xl leading-none shrink-0 text-news-orange" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>{idx + 1}</span>
                    <Link to={`/article/${a.id}`} className="group">
                      <span className="tag block mb-0.5">{a.category}</span>
                      <span className="text-sm font-medium leading-snug text-news-text group-hover:text-news-blue transition-colors">{a.title}</span>
                    </Link>
                  </div>
                ))}
              </div>
              <AdBanner />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}