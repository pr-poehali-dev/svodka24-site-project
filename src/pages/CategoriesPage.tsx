import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles, categories, getArticlesByCategory } from "@/data/articles";
import Icon from "@/components/ui/icon";

const categoryIcons: Record<string, string> = {
  "Общество": "Users",
  "Политика": "Landmark",
  "Экономика": "TrendingUp",
  "Происшествия": "AlertTriangle",
  "Спорт": "Trophy",
  "Культура": "Palette",
  "ЖКХ": "Home",
  "Транспорт": "Car",
};

export default function CategoriesPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeArticles = active ? getArticlesByCategory(active) : [];

  return (
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="mb-5">
            <h1 className="font-black text-3xl text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Рубрики</h1>
            <p className="text-sm text-news-gray">Выберите интересующую вас тему</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {categories.map((cat) => {
              const count = articles.filter((a) => a.category === cat).length;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(isActive ? null : cat)}
                  className={`news-card p-4 text-left transition-all ${isActive ? "!bg-news-blue !border-news-blue" : ""}`}
                >
                  <Icon
                    name={categoryIcons[cat] || "Newspaper"}
                    size={20}
                    className={`mb-2 ${isActive ? "text-news-orange" : "text-news-blue"}`}
                  />
                  <div className={`font-bold text-sm ${isActive ? "text-white" : "text-news-text"}`} style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                    {cat}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? "text-white/70" : "text-news-gray"}`}>
                    {count} материалов
                  </div>
                </button>
              );
            })}
          </div>

          {active && (
            <div className="news-card p-4">
              <h2 className="section-title mb-4">{active}</h2>
              {activeArticles.length === 0
                ? <p className="text-center py-10 text-news-gray">В этой рубрике пока нет материалов</p>
                : <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                    {activeArticles.map((a) => <ArticleCard key={a.id} article={a} />)}
                  </div>
              }
            </div>
          )}

          {!active && (
            <div className="news-card p-4">
              <h2 className="section-title mb-4">Все материалы</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
