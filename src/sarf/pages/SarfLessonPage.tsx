import { useParams, useNavigate } from 'react-router-dom';
import { LESSONS } from '@/sarf/data/lessonContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageSEO } from '@/components/layout/PageSEO';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SarfLessonPage = () => {
  const { lessonSlug } = useParams();
  const navigate = useNavigate();
  const lesson = lessonSlug ? LESSONS[lessonSlug] : null;
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  if (!lesson) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found.</p>
      </div>
      <Footer />
    </div>
  );

  const toggleSection = (i: number) => {
    setExpandedSections(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === lesson.quiz[currentQ].correctIndex) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= lesson.quiz.length) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
    }
  };

  const q = lesson.quiz[currentQ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO title={`${lesson.name} — Sarf`} description={lesson.intro} path={`/sarf/lesson/${lessonSlug}`} />
      <Header />
      <div className="pt-20">
        <div className="border-b border-border bg-card/80">
          <div className="container max-w-3xl mx-auto py-6 px-4">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="arabic text-2xl text-accent">{lesson.nameAr}</h1>
            <p className="text-foreground font-semibold text-lg">{lesson.name}</p>
            <p className="text-muted-foreground text-sm mt-1">{lesson.intro}</p>
          </div>
        </div>
      </div>

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* LESSON SECTIONS */}
        {!quizStarted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {lesson.sections.map((sec, i) => {
              const isExpanded = expandedSections[i] !== false; // default open
              return (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <span className="arabic text-lg text-accent">{sec.titleAr}</span>
                      <p className="text-foreground font-medium text-sm">{sec.title}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">{sec.explanation}</p>

                      <div className="space-y-2">
                        {sec.examples.map((ex, j) => (
                          <div key={j} className="bg-muted/30 rounded-lg p-4 space-y-1">
                            <p className="arabic text-xl text-accent text-right">{ex.arabic}</p>
                            <p className="text-foreground text-sm font-medium">{ex.transliteration}</p>
                            <p className="text-muted-foreground text-sm">{ex.translation}</p>
                            {ex.breakdown && (
                              <p className="text-xs text-primary/80 mt-1 border-t border-border/50 pt-1">{ex.breakdown}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      {sec.tip && (
                        <div className="flex gap-2 items-start bg-primary/5 border border-primary/20 rounded-lg p-3">
                          <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{sec.tip}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {lesson.quiz.length > 0 && (
              <div className="pt-4 text-center">
                <Button onClick={() => setQuizStarted(true)} size="lg" className="px-8">
                  Test Your Understanding →
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* QUIZ */}
        {quizStarted && !finished && q && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={currentQ} className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Question {currentQ + 1} of {lesson.quiz.length}
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-foreground font-semibold text-lg">{q.question}</h2>
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isCorrect = idx === q.correctIndex;
                  const isSelected = idx === selected;
                  let bg = 'bg-muted/30 hover:bg-muted/50 border-border';
                  if (selected !== null) {
                    if (isCorrect) bg = 'bg-emerald-500/10 border-emerald-500/50';
                    else if (isSelected) bg = 'bg-destructive/10 border-destructive/50';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selected !== null}
                      className={`w-full text-left rounded-lg p-4 border transition-colors flex items-center gap-3 ${bg}`}
                    >
                      <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-foreground text-sm">{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive ml-auto" />}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  </div>
                  <Button onClick={nextQuestion} className="w-full">
                    {currentQ + 1 >= lesson.quiz.length ? 'See Results' : 'Next Question →'}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* RESULTS */}
        {finished && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-8">
            <div className="text-5xl">{score === lesson.quiz.length ? '🎉' : score >= lesson.quiz.length / 2 ? '👏' : '💪'}</div>
            <h2 className="text-foreground font-bold text-2xl">
              {score} / {lesson.quiz.length}
            </h2>
            <p className="text-muted-foreground">
              {score === lesson.quiz.length ? 'Perfect! You\'ve mastered this topic.' : score >= lesson.quiz.length / 2 ? 'Good work! Review the sections you missed.' : 'Keep studying — you\'ll get there!'}
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <Button variant="outline" onClick={() => { setQuizStarted(false); setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); }}>
                Review Lesson
              </Button>
              <Button onClick={() => navigate(-1)}>Back to Stage</Button>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SarfLessonPage;
