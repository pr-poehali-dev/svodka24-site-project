import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles, categories } from "@/data/articles";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [search, setSearch] = useState("");

  const allCategories = ["Все", ...categories];

  const filtered = articles.filter((a) => {
    const matchCat = selectedCategory === "Все" || a.category === selectedCategory;
    const matchSearch =
      search.trim() === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Page header */}
          <div className="border-b-2 border-[var(--news-red)] pb-3 mb-6">
            <h1 className="font-headline font-black text-4xl text-[var(--news-dark)]">Новости</h1>
            <p className="text-sm text-[var(--news-gray)] font-sans-news mt-1">
              Актуальные события Усть-Кута и Иркутской области
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors font-sans-news ${
                    selectedCategory === cat
                      ? "bg-[var(--news-red)] text-white border-[var(--news-red)]"
                      : "border-[var(--news-border)] text-[var(--news-dark)] hover:bg-[var(--news-red)] hover:text-white hover:border-[var(--news-red)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Поиск новостей..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:ml-auto border border-[var(--news-border)] px-3 py-1.5 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] w-full md:w-64"
            />
          </div>

          {/* Results count */}
          <p className="text-xs text-[var(--news-gray)] mb-4 font-sans-news">
            Найдено материалов: <strong>{filtered.length}</strong>
          </p>

          {/* Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-[var(--news-gray)] font-sans-news">
                  По вашему запросу ничего не найдено
                </div>
              ) : (
                filtered.map((a) => <ArticleCard key={a.id} article={a} />)
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-[var(--news-light-gray)] border border-[var(--news-border)] p-5">
                <h3 className="font-headline font-bold text-base uppercase tracking-wider mb-4 text-[var(--news-dark)]">
                  Популярные
                </h3>
                <div className="news-divider-red mb-3"></div>
                {articles
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((a, idx) => (
                    <div key={a.id} className="article-card py-2.5 flex gap-2">
                      <span className="font-headline font-black text-2xl text-gray-200 leading-none w-6 shrink-0">
                        {idx + 1}
                      </span>
                      <a href={`/article/${a.id}`} className="group">
                        <span className="category-tag block mb-0.5">{a.category}</span>
                        <span className="font-headline font-bold text-sm leading-snug text-[var(--news-dark)] group-hover:text-[var(--news-red)] transition-colors">
                          {a.title}
                        </span>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
