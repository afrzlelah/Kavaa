import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

async function check() {
  const { data, error } = await supabase.from("courses").select("id").limit(1);
  console.log("COURSE ID SAMPLE:", data);
  if (error) console.error("ERROR:", error);
}

check();
