import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Bookmark, MessageSquare, Clock, User, Send, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Thread {
  id: string;
  title: string;
  content: string;
  user_id: string;
  is_locked: boolean;
  view_count: number;
  created_at: string;
  category_id: string;
}

interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  author_name?: string;
  like_count: number;
  is_liked?: boolean;
}

export default function ForumThreadPage() {
  const { categorySlug, threadSlug } = useParams<{ categorySlug: string; threadSlug: string }>();
  const navigate = useNavigate();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
      if (!categorySlug || !threadSlug) return;

      // First get category
      const { data: catData } = await supabase
        .from('forum_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (!catData) {
        navigate('/forum');
        return;
      }

      // Fetch thread
      const { data: threadData, error: threadError } = await supabase
        .from('forum_threads')
        .select('*')
        .eq('category_id', catData.id)
        .eq('slug', threadSlug)
        .single();

      if (threadError || !threadData) {
        navigate(`/forum/${categorySlug}`);
        return;
      }

      setThread(threadData);

      // Increment view count
      await supabase
        .from('forum_threads')
        .update({ view_count: threadData.view_count + 1 })
        .eq('id', threadData.id);

      // Get author (only select display_name, not email for privacy)
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', threadData.user_id)
        .maybeSingle();

      setAuthorName(profile?.display_name || 'Anonymous');

      // Get thread likes
      const { count } = await supabase
        .from('thread_likes')
        .select('*', { count: 'exact', head: true })
        .eq('thread_id', threadData.id);

      setLikeCount(count || 0);

      // Fetch posts
      await fetchPosts(threadData.id);

      setLoading(false);
    }

    fetchData();
  }, [categorySlug, threadSlug, navigate]);

  useEffect(() => {
    async function checkUserActions() {
      if (!user || !thread) return;

      // Check if liked
      const { data: likeData } = await supabase
        .from('thread_likes')
        .select('id')
        .eq('thread_id', thread.id)
        .eq('user_id', user.id)
        .single();

      setIsLiked(!!likeData);

      // Check if bookmarked
      const { data: bookmarkData } = await supabase
        .from('forum_bookmarks')
        .select('id')
        .eq('thread_id', thread.id)
        .eq('user_id', user.id)
        .single();

      setIsBookmarked(!!bookmarkData);
    }

    checkUserActions();
  }, [user, thread]);

  async function fetchPosts(threadId: string) {
    const { data: postsData } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (postsData) {
      const enrichedPosts = await Promise.all(
        postsData.map(async (post) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('user_id', post.user_id)
            .maybeSingle();

          const { count } = await supabase
            .from('post_likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            author_name: profile?.display_name || 'Anonymous',
            like_count: count || 0,
          };
        })
      );

      setPosts(enrichedPosts);
    }
  }

  async function handleLikeThread() {
    if (!user || !thread) {
      toast.error("Please sign in to like posts");
      return;
    }

    if (isLiked) {
      await supabase.from('thread_likes').delete().eq('thread_id', thread.id).eq('user_id', user.id);
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      await supabase.from('thread_likes').insert({ thread_id: thread.id, user_id: user.id });
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  }

  async function handleBookmark() {
    if (!user || !thread) {
      toast.error("Please sign in to bookmark");
      return;
    }

    if (isBookmarked) {
      await supabase.from('forum_bookmarks').delete().eq('thread_id', thread.id).eq('user_id', user.id);
      setIsBookmarked(false);
      toast.success("Bookmark removed");
    } else {
      await supabase.from('forum_bookmarks').insert({ thread_id: thread.id, user_id: user.id });
      setIsBookmarked(true);
      toast.success("Thread bookmarked");
    }
  }

  async function handleSubmitReply() {
    if (!user || !thread || !newReply.trim()) return;

    setSubmitting(true);

    const { error } = await supabase.from('forum_posts').insert({
      thread_id: thread.id,
      user_id: user.id,
      content: newReply.trim(),
    });

    if (error) {
      toast.error("Failed to post reply");
    } else {
      toast.success("Reply posted!");
      setNewReply("");
      await fetchPosts(thread.id);
    }

    setSubmitting(false);
  }

  async function handleDeletePost(postId: string) {
    const { error } = await supabase.from('forum_posts').delete().eq('id', postId);

    if (error) {
      toast.error("Failed to delete post");
    } else {
      toast.success("Post deleted");
      setPosts(posts.filter(p => p.id !== postId));
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
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
            <span>Back to Category</span>
          </Link>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : thread ? (
          <>
            {/* Thread */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-card border border-border mb-8"
            >
              <h1 className="font-english text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {thread.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-foreground whitespace-pre-wrap">{thread.content}</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeThread}
                  className={isLiked ? "text-pink-400" : "text-muted-foreground"}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {likeCount}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className={isBookmarked ? "text-gold" : "text-muted-foreground"}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground text-sm ml-auto">
                  <MessageSquare className="w-4 h-4" />
                  <span>{posts.length} replies</span>
                </div>
              </div>
            </motion.div>

            {/* Replies */}
            <div className="space-y-4 mb-8">
              <h2 className="font-english text-lg font-semibold text-foreground">
                Replies ({posts.length})
              </h2>

              {posts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No replies yet. Be the first to respond!</p>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-xl bg-card/50 border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{post.author_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      {user?.id === post.user_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Reply Form */}
            {user ? (
              thread.is_locked ? (
                <div className="text-center py-8 text-muted-foreground">
                  This thread is locked and no longer accepting replies.
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <h3 className="font-english font-semibold text-foreground mb-4">Write a Reply</h3>
                  <Textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="mb-4 min-h-[120px]"
                  />
                  <Button
                    onClick={handleSubmitReply}
                    disabled={!newReply.trim() || submitting}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Posting..." : "Post Reply"}
                  </Button>
                </motion.div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Sign in to join the conversation</p>
                <Link to="/auth">
                  <Button>Sign In</Button>
                </Link>
              </div>
            )}
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
