import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageSEO } from "@/components/layout/PageSEO";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Scroll, Feather, Heart, Languages, MessageCircle, Users, MessageSquare, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color_class: string;
  display_order: number;
}

interface CategoryStats {
  thread_count: number;
  post_count: number;
  latest_thread?: {
    title: string;
    created_at: string;
  };
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'book-open': BookOpen,
  'scroll': Scroll,
  'feather': Feather,
  'heart': Heart,
  'languages': Languages,
  'message-circle': MessageCircle,
};

const colorMap: Record<string, string> = {
  'forum-quran': 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50',
  'forum-hadith': 'from-gold/20 to-gold/5 border-gold/30 hover:border-gold/50',
  'forum-poetry': 'from-purple/20 to-purple/5 border-purple/30 hover:border-purple/50',
  'forum-adab': 'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-500/50',
  'forum-arabic': 'from-green-500/20 to-green-500/5 border-green-500/30 hover:border-green-500/50',
  'forum-general': 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50',
};

const iconColorMap: Record<string, string> = {
  'forum-quran': 'text-primary',
  'forum-hadith': 'text-gold',
  'forum-poetry': 'text-purple',
  'forum-adab': 'text-pink-400',
  'forum-arabic': 'text-green-400',
  'forum-general': 'text-blue-400',
};

export default function ForumPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Record<string, CategoryStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('display_order');

      if (!error && data) {
        setCategories(data);
        
        // Fetch stats for each category
        const statsPromises = data.map(async (cat) => {
          const { count: threadCount } = await supabase
            .from('forum_threads')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);

          const { data: threads } = await supabase
            .from('forum_threads')
            .select('id')
            .eq('category_id', cat.id);

          let postCount = 0;
          if (threads && threads.length > 0) {
            const { count } = await supabase
              .from('forum_posts')
              .select('*', { count: 'exact', head: true })
              .in('thread_id', threads.map(t => t.id));
            postCount = count || 0;
          }

          const { data: latestThread } = await supabase
            .from('forum_threads')
            .select('title, created_at')
            .eq('category_id', cat.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            categoryId: cat.id,
            stats: {
              thread_count: threadCount || 0,
              post_count: postCount,
              latest_thread: latestThread || undefined,
            }
          };
        });

        const results = await Promise.all(statsPromises);
        const statsMap: Record<string, CategoryStats> = {};
        results.forEach(r => {
          statsMap[r.categoryId] = r.stats;
        });
        setStats(statsMap);
      }
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Forum" description="Join the Quranic Arabic learning community. Discuss topics, share insights, and ask questions." path="/forum" />
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Community Forum</span>
          </div>
          <h1 className="font-english text-4xl md:text-5xl font-semibold text-foreground mb-4">
            The <span className="text-gradient-cosmic">Knowledge Circle</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-ui">
            Join fellow seekers of knowledge. Discuss Quranic vocabulary, explore classical poetry, 
            and connect with a community passionate about the Arabic language.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
        >
          <div className="text-center p-4 rounded-xl bg-card border border-border">
            <MessageSquare className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-semibold text-foreground">{categories.length}</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-card border border-border">
            <TrendingUp className="w-5 h-5 text-gold mx-auto mb-2" />
            <p className="text-2xl font-semibold text-foreground">
              {Object.values(stats).reduce((acc, s) => acc + s.thread_count, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Discussions</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-card border border-border">
            <MessageCircle className="w-5 h-5 text-purple mx-auto mb-2" />
            <p className="text-2xl font-semibold text-foreground">
              {Object.values(stats).reduce((acc, s) => acc + s.post_count, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Replies</p>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))
          ) : (
            categories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || MessageCircle;
              const categoryStats = stats[category.id] || { thread_count: 0, post_count: 0 };

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={`/forum/${category.slug}`}
                    className={`block p-6 rounded-2xl bg-gradient-to-br border transition-all duration-300 discovery-card ${colorMap[category.color_class] || colorMap['forum-general']}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center ${iconColorMap[category.color_class] || iconColorMap['forum-general']}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-english text-xl font-semibold text-foreground mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{categoryStats.thread_count} discussions</span>
                          <span>•</span>
                          <span>{categoryStats.post_count} replies</span>
                        </div>
                        {categoryStats.latest_thread && (
                          <p className="mt-2 text-xs text-muted-foreground truncate">
                            Latest: {categoryStats.latest_thread.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-card/50 border border-border text-center"
        >
          <h3 className="font-english text-lg font-semibold text-foreground mb-3">
            Community Guidelines
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            This is a space for respectful knowledge-sharing. Be kind, cite sources when possible, 
            and remember we're all here to learn together. Inappropriate content or disrespectful 
            behavior will not be tolerated.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
