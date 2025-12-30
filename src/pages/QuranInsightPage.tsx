import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const QuranInsightPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="w-full h-[calc(100vh-80px)]">
          <iframe
            src="https://quran-language-insight.lovable.app"
            className="w-full h-full border-0"
            title="Quran Language Insight"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </main>
    </div>
  );
};

export default QuranInsightPage;
