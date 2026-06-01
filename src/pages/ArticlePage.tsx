import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import CommentSection from "@/components/CommentSection";
import Icon from "@/components/ui/icon";
import { getArticleById, getRecentArticles } from "@/data/articles";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(Number(id));
  if (!article) return <Navigate to="/news" />;

  const related = getRecentArticles(4, article.id);

  const formattedDate = new Date(article.date).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <nav className="flex items-center gap-1.5 text-xs text-news-gray mb-4">
            <Link to="/" className="hover:text-news-blue transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <Link to="/news" className="hover:text-news-blue transition-colors">Новости</Link>
            <Icon name="ChevronRight" size={12} />
            <span className="text-news-text truncate max-w-xs">{article.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="news-card p-5 md:p-7">
                <span className="tag block mb-2">{article.category}</span>
                <h1 className="font-black text-2xl md:text-3xl leading-tight text-news-text mb-4" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  {article.title}
                </h1>

                <div className="flex flex-wrap gap-3 text-xs text-news-gray mb-5 pb-4 border-b border-news-border">
                  <span className="flex items-center gap-1"><Icon name="User" size={12} />{article.author}</span>
                  <span className="flex items-center gap-1"><Icon name="Calendar" size={12} />{formattedDate}</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={12} />{article.views.toLocaleString("ru-RU")}</span>
                </div>

                <p className="text-base text-news-text leading-relaxed mb-5 pl-4 italic border-l-4 border-news-orange">
                  {article.excerpt}
                </p>

                <div className="w-full aspect-video bg-gray-100 rounded flex items-center justify-center mb-6 border border-news-border">
                  <div className="text-center text-news-gray">
                    <Icon name="Image" size={36} className="mx-auto mb-1 text-gray-300" />
                    <span className="text-xs">Фото: Редакция СВОДКА 24</span>
                  </div>
                </div>

                <div className="text-news-text leading-relaxed space-y-4 text-sm md:text-base">
                  {paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
                </div>

                <div className="mt-7 pt-5 border-t border-news-border flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-news-gray">Поделиться:</span>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded bg-[#0077FF] hover:opacity-90 transition-opacity">
                    <Icon name="Globe" size={12} />ВКонтакте
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded bg-[#229ED9] hover:opacity-90 transition-opacity">
                    <Icon name="Send" size={12} />Telegram
                  </button>
                </div>

                <CommentSection articleId={article.id} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="news-card p-4">
                <h2 className="section-title mb-4">Читайте также</h2>
                {related.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
              </div>
              <div className="bg-news-blue rounded-lg p-5 text-white text-center">
                <Icon name="Send" size={24} className="mx-auto mb-2 opacity-80" />
                <h3 className="font-bold text-sm mb-1">Прислать новость</h3>
                <p className="text-xs opacity-80 mb-3">Стали свидетелем события?</p>
                <Link to="/contacts" className="inline-block text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded bg-news-orange text-news-blue-dark hover:opacity-90">
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
