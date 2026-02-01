import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/ui/AudioButton";
import { listeningStories, getStoryById, ListeningStory, StorySegment, ComprehensionQuestion } from "@/data/immersiveListening";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Headphones,
  BookOpen,
  CheckCircle,
  XCircle,
  Volume2,
  Eye,
  EyeOff
} from "lucide-react";
import { useInstantAudio } from "@/hooks/useInstantAudio";
import { cn } from "@/lib/utils";

type PageMode = "list" | "story";
type StoryPhase = "intro" | "listening" | "quiz" | "complete";

const ImmersiveListeningPage = () => {
  const { storyId } = useParams();
  const [phase, setPhase] = useState<StoryPhase>("intro");
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const story = storyId ? getStoryById(storyId) : null;
  const { speak, stop, isPlaying } = useInstantAudio();

  // Story list view
  if (!storyId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Headphones className="w-3 h-3 mr-1" />
                Immersive Listening
              </Badge>
              <h1 className="text-4xl font-english font-bold text-foreground mb-4">
                Learn Through Stories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in Arabic through engaging stories. Listen, comprehend, and master vocabulary in context.
              </p>
            </div>

            {/* Level filters */}
            <div className="flex justify-center gap-2 mb-8">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">Beginner</Badge>
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">Intermediate</Badge>
              <Badge variant="secondary" className="bg-red-500/10 text-red-600">Advanced</Badge>
            </div>

            {/* Story cards */}
            <div className="grid gap-6">
              {listeningStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/listening/${story.id}`}>
                    <Card className="hover:border-primary/50 transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge 
                                variant="secondary"
                                className={cn(
                                  story.level === 'beginner' && "bg-green-500/10 text-green-600",
                                  story.level === 'intermediate' && "bg-yellow-500/10 text-yellow-600",
                                  story.level === 'advanced' && "bg-red-500/10 text-red-600"
                                )}
                              >
                                {story.level}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{story.duration}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {story.title}
                            </h3>
                            <p className="text-gold font-arabic text-lg mt-1">{story.titleArabic}</p>
                            <p className="text-muted-foreground mt-2">{story.description}</p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Play className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground">{story.segments.length} parts</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Story not found
  if (!story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Story not found</p>
          <Link to="/listening">
            <Button>Back to Stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentSegment = story.segments[currentSegmentIndex];
  const currentQuestion = story.comprehensionQuestions[quizIndex];
  const progress = ((currentSegmentIndex + 1) / story.segments.length) * 100;

  // Play all segments
  const playAllSegments = async () => {
    setIsAutoPlaying(true);
    for (let i = currentSegmentIndex; i < story.segments.length; i++) {
      setCurrentSegmentIndex(i);
      await speak(story.segments[i].arabic);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Pause between segments
    }
    setIsAutoPlaying(false);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === currentQuestion.correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < story.comprehensionQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setPhase("complete");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link to="/listening" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Link>

          {/* Intro Phase */}
          {phase === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Badge 
                variant="secondary"
                className={cn(
                  "mb-4",
                  story.level === 'beginner' && "bg-green-500/10 text-green-600",
                  story.level === 'intermediate' && "bg-yellow-500/10 text-yellow-600",
                  story.level === 'advanced' && "bg-red-500/10 text-red-600"
                )}
              >
                {story.level} • {story.duration}
              </Badge>
              
              <h1 className="font-arabic text-4xl text-gold mb-2">{story.titleArabic}</h1>
              <h2 className="text-2xl font-english font-semibold text-foreground mb-4">{story.title}</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{story.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setPhase("listening")}>
                  <Headphones className="w-4 h-4 mr-2" />
                  Start Listening
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-semibold text-foreground">{story.segments.length}</p>
                  <p className="text-sm text-muted-foreground">Audio Segments</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-semibold text-foreground">{story.comprehensionQuestions.length}</p>
                  <p className="text-sm text-muted-foreground">Quiz Questions</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Listening Phase */}
          {phase === "listening" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Segment {currentSegmentIndex + 1} of {story.segments.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Current Segment Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSegmentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="mb-6">
                    <CardContent className="p-8 text-center">
                      {/* Arabic text */}
                      <p className="font-arabic text-4xl text-foreground leading-loose mb-4">
                        {currentSegment.arabic}
                      </p>
                      
                      {/* Audio button */}
                      <AudioButton 
                        text={currentSegment.arabic}
                        showLabel
                        label="Listen"
                        size="lg"
                        className="mb-4"
                      />

                      {/* Transliteration */}
                      <p className="text-lg text-gold italic mb-4">
                        {currentSegment.transliteration}
                      </p>

                      {/* Toggle translation */}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowTranslation(!showTranslation)}
                        className="mb-4"
                      >
                        {showTranslation ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {showTranslation ? "Hide Translation" : "Show Translation"}
                      </Button>

                      {/* English translation */}
                      <AnimatePresence>
                        {showTranslation && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-muted-foreground text-lg"
                          >
                            {currentSegment.english}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Vocabulary highlights */}
                      {currentSegment.vocabularyHighlights && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Key Vocabulary:</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {currentSegment.vocabularyHighlights.map((word, idx) => (
                              <Badge key={idx} variant="secondary" className="font-arabic text-base px-3 py-1">
                                {word}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSegmentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentSegmentIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  onClick={isAutoPlaying ? () => { stop(); setIsAutoPlaying(false); } : playAllSegments}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play All
                    </>
                  )}
                </Button>

                {currentSegmentIndex === story.segments.length - 1 ? (
                  <Button onClick={() => setPhase("quiz")}>
                    Start Quiz
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentSegmentIndex(prev => prev + 1)}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Quiz Phase */}
          {phase === "quiz" && currentQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Comprehension Quiz
                </Badge>
                <h2 className="text-2xl font-semibold text-foreground">Test Your Understanding</h2>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {quizIndex + 1} of {story.comprehensionQuestions.length}</span>
                  <span>Score: {quizScore}/{quizIndex + (selectedAnswer !== null ? 1 : 0)}</span>
                </div>
                <Progress value={((quizIndex + 1) / story.comprehensionQuestions.length) * 100} className="h-2" />
              </div>

              <Card>
                <CardContent className="p-8">
                  <p className="font-arabic text-xl text-gold mb-2 text-center">{currentQuestion.questionArabic}</p>
                  <p className="text-lg text-foreground mb-6 text-center">{currentQuestion.question}</p>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === currentQuestion.correctAnswer;
                      const showResult = selectedAnswer !== null;

                      return (
                        <button
                          key={idx}
                          onClick={() => !showResult && handleQuizAnswer(idx)}
                          disabled={showResult}
                          className={cn(
                            "w-full p-4 text-left rounded-lg border-2 transition-all",
                            !showResult && "hover:border-primary hover:bg-primary/5",
                            showResult && isCorrect && "border-green-500 bg-green-500/10",
                            showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                            !showResult && "border-border"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-center"
                    >
                      <Button onClick={nextQuizQuestion}>
                        {quizIndex === story.comprehensionQuestions.length - 1 ? "See Results" : "Next Question"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Complete Phase */}
          {phase === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Story Complete!</h2>
              <p className="text-muted-foreground mb-6">
                You scored <span className="text-primary font-semibold">{quizScore}</span> out of{" "}
                <span className="text-primary font-semibold">{story.comprehensionQuestions.length}</span> on the comprehension quiz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => {
                  setPhase("intro");
                  setCurrentSegmentIndex(0);
                  setQuizIndex(0);
                  setQuizScore(0);
                  setSelectedAnswer(null);
                }}>
                  <Play className="w-4 h-4 mr-2" />
                  Replay Story
                </Button>
                <Link to="/listening">
                  <Button>
                    More Stories
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImmersiveListeningPage;
