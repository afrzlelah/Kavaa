import { createClientClient } from "@/utils/supabase/client";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const supabase = createClientClient();
  const { slug } = await params;

  const { data, error } = await supabase
    .from("users")
    .select("last_name, email, first_name ")
    .eq("id", slug)
    .single();

  if (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
  console.log("Data user:", data);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
