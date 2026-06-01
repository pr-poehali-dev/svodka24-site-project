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
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--news-gray)] font-sans-news mb-5">
            <Link to="/" className="hover:text-[var(--news-red)] transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <Link to="/news" className="hover:text-[var(--news-red)] transition-colors">Новости</Link>
            <Icon name="ChevronRight" size={12} />
            <span className="text-[var(--news-dark)] truncate max-w-xs">{article.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article */}
            <div className="lg:col-span-2">
              <span className="category-tag block mb-3">{article.category}</span>
              <h1 className="font-headline font-black text-3xl md:text-4xl leading-tight text-[var(--news-dark)] mb-4">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--news-gray)] font-sans-news mb-6 pb-4 border-b border-[var(--news-border)]">
                <span className="flex items-center gap-1.5">
                  <Icon name="User" size={12} />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Calendar" size={12} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Eye" size={12} />
                  {article.views.toLocaleString("ru-RU")} просмотров
                </span>
              </div>

              {/* Lead */}
              <p className="font-serif-body text-lg text-[var(--news-dark)] leading-relaxed border-l-4 border-[var(--news-red)] pl-4 mb-6 italic">
                {article.excerpt}
              </p>

              {/* Image placeholder */}
              <div className="w-full aspect-video bg-gray-100 flex items-center justify-center mb-6 border border-[var(--news-border)]">
                <div className="text-center text-[var(--news-gray)]">
                  <Icon name="Image" size={40} className="mx-auto mb-2 text-gray-300" />
                  <span className="text-xs font-sans-news">Фото: Редакция СВОДКА 24</span>
                </div>
              </div>

              {/* Content */}
              <div className="font-serif-body text-[var(--news-dark)] leading-relaxed space-y-5">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 pt-5 border-t border-[var(--news-border)] flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--news-gray)] font-sans-news">
                  Поделиться:
                </span>
                <button className="flex items-center gap-1.5 text-xs font-sans-news text-white bg-[#0077FF] px-3 py-1.5 hover:opacity-90 transition-opacity">
                  <Icon name="Globe" size={12} />ВКонтакте
                </button>
                <button className="flex items-center gap-1.5 text-xs font-sans-news text-white bg-[#229ED9] px-3 py-1.5 hover:opacity-90 transition-opacity">
                  <Icon name="Send" size={12} />Telegram
                </button>
              </div>

              {/* Comments */}
              <CommentSection articleId={article.id} />
            </div>

            {/* Sidebar */}
            <div>
              <div className="flex items-center gap-2 mb-3 sticky top-4">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 bg-[var(--news-red)] inline-block"></span>
                    <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-[var(--news-dark)]">
                      Читайте также
                    </h2>
                  </div>
                  <div className="news-divider-red mb-2"></div>
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} variant="compact" />
                  ))}

                  <div className="mt-6 border-2 border-[var(--news-red)] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Send" size={14} className="text-[var(--news-red)]" />
                      <span className="font-headline font-bold text-sm text-[var(--news-dark)]">
                        Прислать новость
                      </span>
                    </div>
                    <p className="text-xs text-[var(--news-gray)] font-sans-news mb-3 leading-relaxed">
                      Стали свидетелем события? Напишите нам!
                    </p>
                    <Link
                      to="/contacts"
                      className="block text-center bg-[var(--news-red)] text-white text-xs font-bold uppercase tracking-wider py-2 hover:bg-red-900 transition-colors"
                    >
                      В редакцию
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
