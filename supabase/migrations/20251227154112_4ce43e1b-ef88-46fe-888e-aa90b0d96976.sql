-- Add forum content validation triggers (using triggers instead of CHECK constraints for better error messages)

-- Validation function for threads
CREATE OR REPLACE FUNCTION public.validate_thread_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Trim whitespace
  NEW.title := TRIM(NEW.title);
  NEW.content := TRIM(NEW.content);
  
  -- Validate title length
  IF length(NEW.title) < 5 THEN
    RAISE EXCEPTION 'Title must be at least 5 characters';
  END IF;
  
  IF length(NEW.title) > 200 THEN
    RAISE EXCEPTION 'Title must be less than 200 characters';
  END IF;
  
  -- Validate content length
  IF length(NEW.content) < 10 THEN
    RAISE EXCEPTION 'Content must be at least 10 characters';
  END IF;
  
  IF length(NEW.content) > 50000 THEN
    RAISE EXCEPTION 'Content must be less than 50000 characters';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Validation function for posts
CREATE OR REPLACE FUNCTION public.validate_post_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Trim whitespace
  NEW.content := TRIM(NEW.content);
  
  -- Validate content length
  IF length(NEW.content) < 1 THEN
    RAISE EXCEPTION 'Post content cannot be empty';
  END IF;
  
  IF length(NEW.content) > 10000 THEN
    RAISE EXCEPTION 'Post content must be less than 10000 characters';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers
CREATE TRIGGER validate_thread_before_insert_update
  BEFORE INSERT OR UPDATE ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION validate_thread_content();

CREATE TRIGGER validate_post_before_insert_update
  BEFORE INSERT OR UPDATE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION validate_post_content();