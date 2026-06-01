import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured" | "grid";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (variant === "compact") {
    return (
      <div className="py-2.5 border-b border-news-border last:border-0">
        <Link to={`/article/${article.id}`} className="group">
          <span className="tag block mb-1">{article.category}</span>
          <h3 className="font-bold text-sm leading-snug text-news-text group-hover:text-news-blue transition-colors">
            {article.title}
          </h3>
          <span className="text-xs text-news-gray mt-1 block">{formattedDate}</span>
        </Link>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <Link to={`/article/${article.id}`} className="news-card block group">
        <div className="aspect-square bg-gray-100 relative flex items-center justify-center overflow-hidden">
          {article.image
            ? <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-contain" />
            : <Icon name="Newspaper" size={48} className="text-gray-300" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-5">
            <span className="text-xs font-bold uppercase px-2 py-0.5 rounded mb-2 inline-block w-fit bg-news-orange text-news-blue-dark">
              {article.category}
            </span>
            <h2 className="text-white font-black text-xl md:text-2xl leading-snug group-hover:text-orange-200 transition-colors" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              {article.title}
            </h2>
            <div className="flex items-center gap-3 mt-2 text-white/70 text-xs">
              <span>{formattedDate}</span>
              <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{article.views.toLocaleString("ru-RU")}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-news-gray leading-relaxed line-clamp-2">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  if (variant === "grid") {
    return (
      <Link to={`/article/${article.id}`} className="news-card block group">
        <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
          {article.image && <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-contain" />}
          {!article.image && <Icon name="Newspaper" size={32} className="text-gray-300" />}
        </div>
        <div className="p-3">
          <span className="tag block mb-1.5">{article.category}</span>
          <h3 className="font-bold text-sm leading-snug text-news-text group-hover:text-news-blue transition-colors mb-2 line-clamp-3">
            {article.title}
          </h3>
          <span className="text-xs text-news-gray">{formattedDate}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="border-b border-news-border py-4 last:border-0">
      <Link to={`/article/${article.id}`} className="group flex gap-4 items-start">
        <div className="flex-1 min-w-0">
          <span className="tag block mb-1.5">{article.category}</span>
          <h3 className="font-bold text-base leading-snug text-news-text group-hover:text-news-blue transition-colors mb-1.5">
            {article.title}
          </h3>
          <p className="text-sm text-news-gray leading-relaxed line-clamp-2 mb-2">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-news-gray">
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{article.views.toLocaleString("ru-RU")}</span>
          </div>
        </div>
        <div className="w-20 h-16 bg-gray-100 rounded shrink-0 flex items-center justify-center">
          <Icon name="Newspaper" size={22} className="text-gray-300" />
        </div>
      </Link>
    </div>
  );
}