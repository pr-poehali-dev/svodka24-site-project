import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Icon from "@/components/ui/icon";
import { articles, categories, getFeaturedArticle } from "@/data/articles";

export default function Index() {
  const featured = getFeaturedArticle();
  const topNews = articles.filter((a) => a.id !== featured.id).slice(0, 4);
  const latestNews = articles.slice(0, 6);
  const sidebarNews = articles.slice(2, 7);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* Top grid: Featured + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Featured article */}
            <div className="lg:col-span-2">
              <ArticleCard article={featured} variant="featured" />
            </div>

            {/* Right sidebar - top news */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-[var(--news-red)] inline-block"></span>
                <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-[var(--news-dark)]">
                  Главные новости
                </h2>
              </div>
              <div className="news-divider-red mb-2"></div>
              {topNews.map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
              <Link
                to="/news"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--news-red)] hover:underline"
              >
                Все новости <Icon name="ArrowRight" size={12} />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="news-divider mb-8"></div>

          {/* Categories strip */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/categories"
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 border border-[var(--news-border)] text-[var(--news-dark)] hover:bg-[var(--news-red)] hover:text-white hover:border-[var(--news-red)] transition-colors font-sans-news"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main column - latest news */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[var(--news-dark)] inline-block"></span>
                  <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-[var(--news-dark)]">
                    Последние новости
                  </h2>
                </div>
                <Link
                  to="/news"
                  className="text-xs font-bold uppercase tracking-wider text-[var(--news-red)] hover:underline"
                >
                  Все →
                </Link>
              </div>
              <div className="news-divider-red mb-1"></div>
              {latestNews.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Popular */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 bg-[var(--news-gold)] inline-block"></span>
                  <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-[var(--news-dark)]">
                    Читают сейчас
                  </h2>
                </div>
                <div className="news-divider mb-2" style={{ borderTopColor: "var(--news-gold)" }}></div>
                {sidebarNews
                  .sort((a, b) => b.views - a.views)
                  .map((a, idx) => (
                    <div key={a.id} className="article-card py-3 flex gap-3">
                      <span className="font-headline font-black text-3xl text-gray-200 leading-none w-7 shrink-0">
                        {idx + 1}
                      </span>
                      <Link to={`/article/${a.id}`} className="group">
                        <span className="category-tag block mb-1">{a.category}</span>
                        <h3 className="font-headline font-bold text-sm leading-snug text-[var(--news-dark)] group-hover:text-[var(--news-red)] transition-colors">
                          {a.title}
                        </h3>
                        <span className="text-xs text-[var(--news-gray)] flex items-center gap-1 mt-1">
                          <Icon name="Eye" size={11} />
                          {a.views.toLocaleString("ru-RU")}
                        </span>
                      </Link>
                    </div>
                  ))}
              </div>

              {/* About block */}
              <div className="bg-[var(--news-dark)] text-white p-5">
                <h3 className="font-headline font-bold text-lg mb-2">О портале</h3>
                <p className="text-sm text-gray-300 font-sans-news leading-relaxed mb-4">
                  СВОДКА 24 — независимый новостной портал города Усть-Кут. Мы освещаем главные события города и региона с 2020 года.
                </p>
                <Link
                  to="/about"
                  className="text-xs font-bold uppercase tracking-wider text-[var(--news-gold)] hover:text-white transition-colors"
                >
                  Подробнее →
                </Link>
              </div>

              {/* Contacts CTA */}
              <div className="border-2 border-[var(--news-red)] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Send" size={16} className="text-[var(--news-red)]" />
                  <h3 className="font-headline font-bold text-base text-[var(--news-dark)]">
                    Прислать новость
                  </h3>
                </div>
                <p className="text-sm text-[var(--news-gray)] font-sans-news leading-relaxed mb-3">
                  Стали свидетелем события? Сообщите нам!
                </p>
                <Link
                  to="/contacts"
                  className="block text-center bg-[var(--news-red)] text-white text-xs font-bold uppercase tracking-wider py-2.5 hover:bg-red-900 transition-colors"
                >
                  Написать в редакцию
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
