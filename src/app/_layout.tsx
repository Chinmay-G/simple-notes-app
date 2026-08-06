import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useTanStackQueryDevTools } from "@rozenite/tanstack-query-plugin";
import { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);

  // Enable DevTools in development
  useTanStackQueryDevTools(queryClient);

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
      setIsLoadingSession(true);
      const currentSession = await supabase.auth.getSession();
      setSession(currentSession?.data?.session);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSession(false);
    }
  }

  const sessionActive = session ? true : false;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

          <Stack
            initialRouteName={
              isLoadingSession ? "loading" : sessionActive ? "home" : "auth"
            }
          >
            <Stack.Protected guard={isLoadingSession}>
              <Stack.Screen name="loading" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Protected guard={sessionActive}>
              <Stack.Screen
                name="home"
                options={{ headerShown: false }}
                initialParams={{ userEmail: session?.user?.email }}
              />
            </Stack.Protected>
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
