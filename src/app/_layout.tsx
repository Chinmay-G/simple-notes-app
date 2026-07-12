import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) router.dismissTo("/home");
        else router.dismissTo("/auth");
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchSession() {
    try {
      setLoading(true);
      const currentSession = await supabase.auth.getSession();
      setSession(currentSession?.data?.session);
      console.log(currentSession);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  }

  console.log("Session DATA: ", session, session ? true : false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack initialRouteName={session ? "home" : "auth"}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
    // <Stack>
    //   <Stack.Screen name="home" options={{ headerShown: false }} />
    // </Stack>
  );
}
