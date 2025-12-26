-- Forum Categories
CREATE TABLE public.forum_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  color_class text DEFAULT 'forum-general',
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Forum Threads
CREATE TABLE public.forum_threads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  content text NOT NULL,
  is_pinned boolean DEFAULT false,
  is_locked boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- Forum Posts (replies)
CREATE TABLE public.forum_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id uuid NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  is_solution boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Thread Likes
CREATE TABLE public.thread_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id uuid NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(thread_id, user_id)
);

-- Post Likes
CREATE TABLE public.post_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Bookmarks
CREATE TABLE public.forum_bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id uuid NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(thread_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thread_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_bookmarks ENABLE ROW LEVEL SECURITY;

-- Categories: Public read (for SEO)
CREATE POLICY "Anyone can view categories"
ON public.forum_categories FOR SELECT
USING (true);

-- Threads: Public read, authenticated write
CREATE POLICY "Anyone can view threads"
ON public.forum_threads FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create threads"
ON public.forum_threads FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own threads"
ON public.forum_threads FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own threads"
ON public.forum_threads FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Posts: Public read, authenticated write
CREATE POLICY "Anyone can view posts"
ON public.forum_posts FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create posts"
ON public.forum_posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
ON public.forum_posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
ON public.forum_posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Thread Likes: Authenticated only
CREATE POLICY "Authenticated users can view thread likes"
ON public.thread_likes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can like threads"
ON public.thread_likes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike threads"
ON public.thread_likes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Post Likes: Authenticated only
CREATE POLICY "Authenticated users can view post likes"
ON public.post_likes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can like posts"
ON public.post_likes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
ON public.post_likes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Bookmarks: Users can only see their own
CREATE POLICY "Users can view their own bookmarks"
ON public.forum_bookmarks FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can bookmark threads"
ON public.forum_bookmarks FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their bookmarks"
ON public.forum_bookmarks FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Update timestamp trigger for threads
CREATE TRIGGER update_forum_threads_updated_at
BEFORE UPDATE ON public.forum_threads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update timestamp trigger for posts
CREATE TRIGGER update_forum_posts_updated_at
BEFORE UPDATE ON public.forum_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.forum_categories (name, slug, description, icon, color_class, display_order) VALUES
('Quranic Studies', 'quran', 'Discussions about Quranic vocabulary, verses, and understanding', 'book-open', 'forum-quran', 1),
('Hadith & Sunnah', 'hadith', 'Explore prophetic traditions and their linguistic aspects', 'scroll', 'forum-hadith', 2),
('Arabic Poetry', 'poetry', 'Classical and modern Arabic poetry appreciation', 'feather', 'forum-poetry', 3),
('Adab & Literature', 'adab', 'Islamic etiquette, ethics, and literary works', 'heart', 'forum-adab', 4),
('Arabic Language', 'arabic', 'Grammar, morphology, and language learning discussions', 'languages', 'forum-arabic', 5),
('General Discussion', 'general', 'Community conversations and off-topic discussions', 'message-circle', 'forum-general', 6);