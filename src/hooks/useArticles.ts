import { useState, useEffect } from "react";

const API_URL = "https://functions.poehali.dev/2cdc5e6d-7a6f-402b-baa5-6bbb647f3a5d";

export interface ApiArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  views: number;
  featured: boolean;
  image?: string;
}

export function useArticles(category?: string) {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = category ? `${API_URL}?category=${encodeURIComponent(category)}` : API_URL;
    fetch(url)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data); })
      .finally(() => setLoading(false));
  }, [category]);

  return { articles, loading };
}

export function useArticle(id: number) {
  const [article, setArticle] = useState<ApiArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?id=${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setArticle(data))
      .finally(() => setLoading(false));
  }, [id]);

  return { article, loading };
}
