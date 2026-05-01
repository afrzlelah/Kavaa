import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Sign in using Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || "Email atau password salah." },
        { status: 401 },
      );
    }

    // Verify profile existence (Ensure sync trigger worked)
    const { data: profile } = await supabase
      .from("users")
      .select("id")
      .eq("id", data.user.id)
      .single();

    if (!profile) {
       // Force sync if missing (Fall back if trigger failed)
       await supabase.from("users").insert({
         id: data.user.id,
         email: data.user.email,
         first_name: data.user.user_metadata?.first_name || "User",
         last_name: data.user.user_metadata?.last_name || "",
       });
    }

    // Return user data for redirection
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error: unknown) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

