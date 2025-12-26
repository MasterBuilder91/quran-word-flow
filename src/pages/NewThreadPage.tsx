import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

export default function NewThreadPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    async function fetchCategory() {
      if (!categorySlug) return;

      const { data, error } = await supabase
        .from('forum_categories')
        .select('id, name')
        .eq('slug', categorySlug)
        .single();

      if (error || !data) {
        navigate('/forum');
        return;
      }

      setCategoryId(data.id);
      setCategoryName(data.name);
    }

    fetchCategory();
  }, [categorySlug, navigate]);

  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100) + '-' + Date.now().toString(36);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user || !categoryId || !title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    const slug = generateSlug(title);

    const { error } = await supabase.from('forum_threads').insert({
      category_id: categoryId,
      user_id: user.id,
      title: title.trim(),
      slug,
      content: content.trim(),
    });

    if (error) {
      toast.error("Failed to create discussion");
      setSubmitting(false);
      return;
    }

    toast.success("Discussion created!");
    navigate(`/forum/${categorySlug}/${slug}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link
            to={`/forum/${categorySlug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {categoryName}</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-card border border-border"
        >
          <h1 className="font-english text-2xl font-semibold text-foreground mb-6">
            Start a New Discussion
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                className="mt-2"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {title.length}/200 characters
              </p>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, questions, or insights..."
                className="mt-2 min-h-[200px]"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-muted-foreground">
                Posting in: <span className="text-foreground">{categoryName}</span>
              </p>
              <Button
                type="submit"
                disabled={!title.trim() || !content.trim() || submitting}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Posting..." : "Post Discussion"}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
