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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="border-b-2 border-[var(--news-red)] pb-3 mb-8">
            <h1 className="font-headline font-black text-4xl text-[var(--news-dark)]">Рубрики</h1>
            <p className="text-sm text-[var(--news-gray)] font-sans-news mt-1">
              Выберите интересующую вас тему
            </p>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {categories.map((cat) => {
              const count = articles.filter((a) => a.category === cat).length;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(isActive ? null : cat)}
                  className={`p-4 border-2 text-left transition-all group ${
                    isActive
                      ? "border-[var(--news-red)] bg-[var(--news-red)] text-white"
                      : "border-[var(--news-border)] bg-white hover:border-[var(--news-red)]"
                  }`}
                >
                  <Icon
                    name={categoryIcons[cat] || "Newspaper"}
                    size={22}
                    className={`mb-2 ${isActive ? "text-white" : "text-[var(--news-red)]"}`}
                  />
                  <div className={`font-headline font-bold text-sm ${isActive ? "text-white" : "text-[var(--news-dark)]"}`}>
                    {cat}
                  </div>
                  <div className={`text-xs mt-0.5 font-sans-news ${isActive ? "text-white/80" : "text-[var(--news-gray)]"}`}>
                    {count} {count === 1 ? "материал" : count < 5 ? "материала" : "материалов"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Articles for selected category */}
          {active && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="news-divider-red flex-1 border-t-2 border-[var(--news-red)] h-0"></div>
                <h2 className="font-headline font-bold text-xl text-[var(--news-dark)] whitespace-nowrap">
                  {active}
                </h2>
                <div className="news-divider-red flex-1 border-t-2 border-[var(--news-red)] h-0"></div>
              </div>

              {activeArticles.length === 0 ? (
                <p className="text-center py-12 text-[var(--news-gray)] font-sans-news">
                  В этой рубрике пока нет материалов
                </p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                  {activeArticles.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              )}
            </div>
          )}

          {!active && (
            <div>
              <div className="news-divider mb-6"></div>
              <h2 className="font-headline font-bold text-xl text-[var(--news-dark)] mb-4">
                Все материалы
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                {articles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
