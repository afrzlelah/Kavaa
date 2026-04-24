import { createClientClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export const cekUserLogin = async (email: string, password: string) => {
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
};
