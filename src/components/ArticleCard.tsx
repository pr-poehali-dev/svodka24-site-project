import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (variant === "compact") {
    return (
      <div className="article-card py-3 px-0">
        <Link to={`/article/${article.id}`} className="group">
          <span className="category-tag block mb-1">{article.category}</span>
          <h3 className="font-headline font-bold text-sm leading-snug text-[var(--news-dark)] group-hover:text-[var(--news-red)] transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--news-gray)]">
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={11} />
              {article.views.toLocaleString("ru-RU")}
            </span>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="bg-white border border-[var(--news-border)] group cursor-pointer">
        <Link to={`/article/${article.id}`}>
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Icon name="Newspaper" size={48} className="text-gray-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <span className="category-tag text-white bg-[var(--news-red)] px-2 py-0.5 inline-block mb-2">
                {article.category}
              </span>
              <h2 className="font-headline font-black text-white text-2xl md:text-3xl leading-tight">
                {article.title}
              </h2>
            </div>
          </div>
          <div className="p-4">
            <p className="font-serif-body text-sm text-[var(--news-gray)] leading-relaxed mb-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-[var(--news-gray)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Icon name="User" size={11} />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={11} />
                  {formattedDate}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={11} />
                {article.views.toLocaleString("ru-RU")}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="article-card py-4">
      <Link to={`/article/${article.id}`} className="group flex gap-4">
        <div className="flex-1">
          <span className="category-tag block mb-1.5">{article.category}</span>
          <h3 className="font-headline font-bold text-base leading-snug text-[var(--news-dark)] group-hover:text-[var(--news-red)] transition-colors mb-2">
            {article.title}
          </h3>
          <p className="font-serif-body text-sm text-[var(--news-gray)] leading-relaxed line-clamp-2 mb-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-[var(--news-gray)]">
            <span className="flex items-center gap-1">
              <Icon name="User" size={11} />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={11} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={11} />
              {article.views.toLocaleString("ru-RU")}
            </span>
          </div>
        </div>
        <div className="w-24 h-20 bg-gray-100 shrink-0 flex items-center justify-center">
          <Icon name="Newspaper" size={24} className="text-gray-300" />
        </div>
      </Link>
    </div>
  );
}
