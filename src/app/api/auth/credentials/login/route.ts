import { createClientClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClientClient();

    const { data, error } = await supabase
      .from("users")
      .select("last_name,id")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message || "Login failed",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
