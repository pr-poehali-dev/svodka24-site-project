import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Icon from "@/components/ui/icon";
import { articles as staticArticles, categories, getFeaturedArticle } from "@/data/articles";
import { useArticles } from "@/hooks/useArticles";
import AdBanner from "@/components/AdBanner";

const API_URL = "https://functions.poehali.dev/2cdc5e6d-7a6f-402b-baa5-6bbb647f3a5d";

export default function Index() {
  const { articles: apiArticles, loading } = useArticles();
  const [articles, setArticles] = useState(apiArticles.length > 0 ? apiArticles : staticArticles);
  const [newCount, setNewCount] = useState(0);
  const lastIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (apiArticles.length > 0) {
      setArticles(apiArticles);
      if (lastIdRef.current === null) {
        lastIdRef.current = apiArticles[0]?.id ?? null;
      }
    }
  }, [apiArticles]);

  // Polling каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;
        const latestId = data[0]?.id;
        if (lastIdRef.current !== null && latestId > lastIdRef.current) {
          const count = data.filter((a: { id: number }) => a.id > lastIdRef.current!).length;
          setNewCount(count);
        }
      } catch (_) { /* ignore */ }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setArticles(data);
        lastIdRef.current = data[0]?.id ?? null;
        setNewCount(0);
      }
    } catch (_) { /* ignore */ }
  };

  const featured = articles.find(a => a.featured) || articles[0];
  const gridNews = articles.filter((a) => a.id !== featured?.id).slice(0, 3);
  const latestNews = articles.slice(0, 7);
  const popularNews = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!featured) return null;

  return (
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">

          {loading && (
            <div className="flex items-center gap-2 text-xs text-news-gray mb-4">
              <Icon name="Loader" size={13} className="animate-spin text-news-blue" />
              Загрузка новостей...
            </div>
          )}

          {newCount > 0 && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-news-blue text-white text-sm font-bold shadow-lg hover:bg-news-blue-dark transition-colors animate-bounce"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
              >
                <Icon name="Bell" size={15} className="text-news-orange" />
                Новые материалы +{newCount}
              </button>
            </div>
          )}

          {/* Топ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <ArticleCard article={featured} variant="featured" />
            </div>
            <div className="news-card p-4">
              <h2 className="section-title mb-4">Главное</h2>
              {articles.filter((a) => a.id !== featured.id).slice(0, 5).map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </div>

          {/* Карточки */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Свежие новости</h2>
              <Link to="/news" className="text-xs font-bold uppercase tracking-wider text-news-blue hover:underline">
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {gridNews.map((a) => (
                <ArticleCard key={a.id} article={a} variant="grid" />
              ))}
            </div>
          </div>

          {/* Рубрики */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/categories"
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-news-blue text-news-blue hover:bg-news-blue hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Лента + сайдбар */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 news-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">Лента новостей</h2>
                <Link to="/news" className="text-xs font-bold text-news-blue">Все →</Link>
              </div>
              {latestNews.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>

            <div className="space-y-4">
              <div className="news-card p-4">
                <h2 className="section-title mb-4">Читают сейчас</h2>
                {popularNews.map((a, idx) => (
                  <div key={a.id} className="border-b border-news-border last:border-0 py-2.5 flex gap-3 items-start">
                    <span className="font-black text-2xl leading-none shrink-0 text-news-orange" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                      {idx + 1}
                    </span>
                    <Link to={`/article/${a.id}`} className="group">
                      <span className="tag block mb-0.5">{a.category}</span>
                      <span className="text-sm font-medium leading-snug text-news-text group-hover:text-news-blue transition-colors">
                        {a.title}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              <AdBanner />

              <div className="bg-news-blue rounded-lg p-5 text-white text-center">
                <Icon name="Send" size={28} className="mx-auto mb-2 opacity-80" />
                <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  Прислать новость
                </h3>
                <p className="text-sm opacity-80 mb-3">Стали свидетелем события?</p>
                <Link
                  to="/contacts"
                  className="inline-block text-xs font-bold uppercase tracking-wider px-5 py-2 rounded bg-news-orange text-news-blue-dark hover:opacity-90 transition-opacity"
                >
                  Написать
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