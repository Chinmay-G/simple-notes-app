import { supabase } from "@/lib/supabase";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession?.data?.session);
    console.log(currentSession);
  }
  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
