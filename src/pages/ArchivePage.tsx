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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="border-b-2 border-[var(--news-red)] pb-3 mb-6">
            <h1 className="font-headline font-black text-4xl text-[var(--news-dark)]">Архив</h1>
            <p className="text-sm text-[var(--news-gray)] font-sans-news mt-1">
              Материалы по датам публикации
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar sidebar */}
            <div className="lg:col-span-1">
              {/* Year selector */}
              <div className="mb-5">
                <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-[var(--news-dark)] mb-3">
                  Год
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`px-4 py-2 text-sm font-bold font-sans-news border transition-colors ${
                        selectedYear === y
                          ? "bg-[var(--news-dark)] text-white border-[var(--news-dark)]"
                          : "border-[var(--news-border)] text-[var(--news-dark)] hover:border-[var(--news-dark)]"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month selector */}
              <div>
                <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-[var(--news-dark)] mb-3">
                  Месяц
                </h3>
                <div className="space-y-1">
                  {MONTHS.map((month, idx) => {
                    const count = articles.filter((a) => {
                      const d = new Date(a.date);
                      return d.getFullYear() === selectedYear && d.getMonth() === idx;
                    }).length;
                    return (
                      <button
                        key={month}
                        onClick={() => setSelectedMonth(idx)}
                        className={`w-full text-left px-3 py-2 text-sm font-sans-news flex items-center justify-between transition-colors ${
                          selectedMonth === idx
                            ? "bg-[var(--news-red)] text-white"
                            : "hover:bg-[var(--news-light-gray)] text-[var(--news-dark)]"
                        }`}
                      >
                        <span>{month}</span>
                        <span
                          className={`text-xs font-bold ${
                            selectedMonth === idx ? "text-white/80" : "text-[var(--news-gray)]"
                          }`}
                        >
                          {count > 0 ? count : "—"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Calendar" size={16} className="text-[var(--news-red)]" />
                <h2 className="font-headline font-bold text-lg text-[var(--news-dark)]">
                  {MONTHS[selectedMonth]} {selectedYear}
                </h2>
              </div>
              <div className="news-divider-red mb-2"></div>

              {filtered.length === 0 ? (
                <div className="py-16 text-center text-[var(--news-gray)] font-sans-news">
                  <Icon name="FileX" size={40} className="mx-auto mb-3 text-gray-300" />
                  <p>За этот период материалов не найдено</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-[var(--news-gray)] mb-4 font-sans-news">
                    Найдено: <strong>{filtered.length}</strong>
                  </p>
                  {filtered.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
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
