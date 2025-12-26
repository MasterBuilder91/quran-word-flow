import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, MessageSquare, Heart, Eye, Clock, Pin, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Thread {
  id: string;
  title: string;
  slug: string;
  content: string;
  user_id: string;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  created_at: string;
  author_name?: string;
  like_count: number;
  post_count: number;
}

export default function ForumCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!categorySlug) return;

      // Fetch category
      const { data: catData, error: catError } = await supabase
        .from('forum_categories')
        .select('*')
        .eq('slug', categorySlug)
        .single();

      if (catError || !catData) {
        navigate('/forum');
        return;
      }

      setCategory(catData);

      // Fetch threads
      const { data: threadData } = await supabase
        .from('forum_threads')
        .select('*')
        .eq('category_id', catData.id)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (threadData) {
        // Fetch additional data for each thread
        const enrichedThreads = await Promise.all(
          threadData.map(async (thread) => {
            // Get author name
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name, email')
              .eq('user_id', thread.user_id)
              .single();

            // Get like count
            const { count: likeCount } = await supabase
              .from('thread_likes')
              .select('*', { count: 'exact', head: true })
              .eq('thread_id', thread.id);

            // Get post count
            const { count: postCount } = await supabase
              .from('forum_posts')
              .select('*', { count: 'exact', head: true })
              .eq('thread_id', thread.id);

            return {
              ...thread,
              author_name: profile?.display_name || profile?.email?.split('@')[0] || 'Anonymous',
              like_count: likeCount || 0,
              post_count: postCount || 0,
            };
          })
        );

        setThreads(enrichedThreads);
      }

      setLoading(false);
    }

    fetchData();
  }, [categorySlug, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Forum</span>
          </Link>
        </motion.div>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-english text-3xl md:text-4xl font-semibold text-foreground mb-2">
              {category?.name || <Skeleton className="h-10 w-48" />}
            </h1>
            <p className="text-muted-foreground">
              {category?.description || <Skeleton className="h-5 w-72" />}
            </p>
          </div>
          {user ? (
            <Link to={`/forum/${categorySlug}/new`}>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Discussion
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="gap-2">
                Sign in to post
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Threads List */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          ) : threads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No discussions yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
              {user && (
                <Link to={`/forum/${categorySlug}/new`}>
                  <Button>Start a Discussion</Button>
                </Link>
              )}
            </motion.div>
          ) : (
            threads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/forum/${categorySlug}/${thread.slug}`}
                  className="block p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 discovery-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {thread.is_pinned && (
                          <Pin className="w-4 h-4 text-gold" />
                        )}
                        {thread.is_locked && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <h3 className="font-english text-lg font-semibold text-foreground truncate">
                          {thread.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {thread.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>by {thread.author_name}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{thread.like_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        <span>{thread.post_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>{thread.view_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
