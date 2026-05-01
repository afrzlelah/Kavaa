// app/api/register/route.ts
import { createClient } from "@/utilitas/supabase/server"; // Pastikan pakai utilitas server
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const body = await request.json();
  const { email, password, first_name, last_name, country, state, phone } =
    body;

  const supabase = await createClient(cookieStore);

  // 1. Validasi Input
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email dan password wajib diisi" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        country,
        state,
        phone_number: phone,
        access: "user",
      },
    },
  });

  if (error) {
    const status = error.message.includes("already registered") ? 409 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  // Sync to public.users table is now handled by a database trigger 
  // (src/utils/supabase/auth_sync_trigger.sql) for better reliability and security.
  // We no longer manually insert the password into the public table.

  return NextResponse.json(
    {
      message: "Registrasi berhasil. Silakan cek email konfirmasi.",
      user: data.user,
    },
    { status: 201 },
  );
}

