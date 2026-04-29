ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.user_module_progress ADD COLUMN IF NOT EXISTS last_watched_at TIMESTAMPTZ DEFAULT now();

-- 2. Create function to update last_message_at
CREATE OR REPLACE FUNCTION public.update_last_message_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create trigger
DROP TRIGGER IF EXISTS on_message_inserted ON public.messages;
CREATE TRIGGER on_message_inserted
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.update_last_message_at();

-- 4. Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 5. Policies for conversation_participants
-- Users can only see entries that belong to them
CREATE POLICY "Users can view their own participant entries"
ON public.conversation_participants
FOR SELECT
USING (auth.uid() = user_id);

-- 6. Policies for conversations
-- Users can only see conversations they are part of
CREATE POLICY "Users can view conversations they are part of"
ON public.conversations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_id = conversations.id
    AND user_id = auth.uid()
  )
);

-- 7. Policies for messages
-- Users can only see messages in conversations they belong to
CREATE POLICY "Users can view messages in their conversations"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_id = messages.conversation_id
    AND user_id = auth.uid()
  )
);

-- Users can only insert messages into conversations they belong to
CREATE POLICY "Users can insert messages into their conversations"
ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_id = messages.conversation_id
    AND user_id = auth.uid()
  )
);
