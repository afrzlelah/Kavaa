import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { slug } = await params;

  // Prevent querying with invalid slugs like "undefined"
  if (!slug || slug === "undefined") {
    return NextResponse.json(
      { error: "Invalid user slug provided" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("users")
    .select("last_name, email, first_name")
    .eq("id", slug)
    .single();

  if (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 },
    );
  }
  
  return NextResponse.json(data, { status: 200 });
}
