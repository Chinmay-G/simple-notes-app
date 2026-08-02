import { supabase } from "@/lib/supabase";

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out: ", error?.message);
  }
}
