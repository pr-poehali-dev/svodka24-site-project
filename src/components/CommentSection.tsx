import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
  likes: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    name: "Николай В.",
    text: "Важная новость! Надеюсь, что планы будут реализованы в срок, а не останутся только на бумаге.",
    date: "2026-06-01T08:30:00",
    likes: 12,
  },
  {
    id: 2,
    name: "Татьяна М.",
    text: "Давно пора заняться инфраструктурой. Дороги в нашем районе в ужасном состоянии уже несколько лет.",
    date: "2026-06-01T10:15:00",
    likes: 8,
  },
];

interface Props {
  articleId: number;
}

export default function CommentSection({ articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
      likes: 0,
    };
    setComments((prev) => [...prev, newComment]);
    setName("");
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleLike = (id: number) => {
    if (likedIds.has(id)) return;
    setLikedIds((prev) => new Set(prev).add(id));
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="mt-10 border-t-2 border-[var(--news-red)] pt-6">
      <h3 className="font-headline font-bold text-2xl text-[var(--news-dark)] mb-6 flex items-center gap-2">
        <Icon name="MessageSquare" size={22} />
        Комментарии
        <span className="text-base font-sans-news font-normal text-[var(--news-gray)] ml-2">
          ({comments.length})
        </span>
      </h3>

      {/* Comments list */}
      <div className="space-y-0 mb-8">
        {comments.map((comment, idx) => (
          <div
            key={comment.id}
            className={`py-4 ${idx < comments.length - 1 ? "border-b border-[var(--news-border)]" : ""}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--news-dark)] text-white flex items-center justify-center text-sm font-bold shrink-0 font-headline">
                {comment.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-sm text-[var(--news-dark)] font-sans-news">
                    {comment.name}
                  </span>
                  <span className="text-xs text-[var(--news-gray)]">
                    {formatDate(comment.date)}
                  </span>
                </div>
                <p className="font-serif-body text-sm text-[var(--news-dark)] leading-relaxed">
                  {comment.text}
                </p>
                <button
                  onClick={() => handleLike(comment.id)}
                  disabled={likedIds.has(comment.id)}
                  className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${
                    likedIds.has(comment.id)
                      ? "text-[var(--news-red)] cursor-default"
                      : "text-[var(--news-gray)] hover:text-[var(--news-red)]"
                  }`}
                >
                  <Icon name="ThumbsUp" size={12} />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-[var(--news-light-gray)] p-5 border border-[var(--news-border)]">
        <h4 className="font-headline font-bold text-lg mb-4 text-[var(--news-dark)]">
          Оставить комментарий
        </h4>
        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 mb-4 font-sans-news">
            Ваш комментарий опубликован. Спасибо!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Ваше имя *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-[var(--news-border)] bg-white px-3 py-2 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors"
          />
          <textarea
            placeholder="Текст комментария *"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            className="w-full border border-[var(--news-border)] bg-white px-3 py-2 text-sm font-sans-news focus:outline-none focus:border-[var(--news-red)] transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--news-gray)] font-sans-news">
              * Поля обязательны для заполнения
            </p>
            <button
              type="submit"
              className="bg-[var(--news-red)] text-white text-sm font-bold font-sans-news uppercase tracking-wider px-6 py-2.5 hover:bg-red-900 transition-colors"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
