import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";
import Icon from "@/components/ui/icon";

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

export default function ArchivePage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const years = [currentYear, currentYear - 1, currentYear - 2];

  const filtered = articles.filter((a) => {
    const d = new Date(a.date);
    return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
  });

  return (
    <div className="min-h-screen flex flex-col bg-news-bg">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="mb-5">
            <h1 className="font-black text-3xl text-news-text mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Архив</h1>
            <p className="text-sm text-news-gray">Материалы по датам публикации</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="news-card p-4 h-fit">
              <div className="mb-4">
                <h3 className="section-title mb-3">Год</h3>
                <div className="flex gap-2 flex-wrap">
                  {years.map((y) => (
                    <button key={y} onClick={() => setSelectedYear(y)}
                      className={`px-3 py-1.5 text-sm font-bold rounded border transition-colors ${selectedYear === y ? "bg-news-blue text-white border-news-blue" : "border-news-border text-news-gray"}`}>
                      {y}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="section-title mb-3">Месяц</h3>
                <div className="space-y-0.5">
                  {MONTHS.map((month, idx) => {
                    const count = articles.filter((a) => {
                      const d = new Date(a.date);
                      return d.getFullYear() === selectedYear && d.getMonth() === idx;
                    }).length;
                    return (
                      <button key={month} onClick={() => setSelectedMonth(idx)}
                        className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between rounded transition-colors ${selectedMonth === idx ? "bg-news-blue text-white" : "text-news-text hover:bg-news-bg"}`}>
                        <span>{month}</span>
                        <span className="text-xs font-bold opacity-60">{count > 0 ? count : "—"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 news-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Calendar" size={16} className="text-news-blue" />
                <h2 className="section-title">{MONTHS[selectedMonth]} {selectedYear}</h2>
              </div>
              {filtered.length === 0 ? (
                <div className="py-14 text-center text-news-gray">
                  <Icon name="FileX" size={36} className="mx-auto mb-3 text-gray-300" />
                  <p>За этот период материалов не найдено</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-news-gray mb-4">Найдено: <strong>{filtered.length}</strong></p>
                  {filtered.map((a) => <ArticleCard key={a.id} article={a} />)}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
