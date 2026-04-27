import { createClientClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
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
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 },
    );
  }
  console.log("Data user:", data);
  return NextResponse.json(data, { status: 200 });
}
