import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data;
};

// validasi Login via email and password
