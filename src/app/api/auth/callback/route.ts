import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Check if user exists in public.users, if not create them
      const { data: dbUser } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (!dbUser) {
        await supabase.from("users").insert([
          {
            id: data.user.id,
            email: data.user.email,
            first_name: data.user.user_metadata?.full_name?.split(" ")[0] || data.user.user_metadata?.name?.split(" ")[0] || "User",
            last_name: data.user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || data.user.user_metadata?.name?.split(" ").slice(1).join(" ") || "",
          }
        ]);
      }

      return NextResponse.redirect(`${origin}/dashboard/${data.user.id}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
