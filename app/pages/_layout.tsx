import { useState } from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Colors from "@/constants/Colors";

export default function Layout() {
  const colorScheme = useColorScheme();
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTintColor: Colors[colorScheme ?? "light"].tint,
          headerTitleStyle: { fontWeight: "600" },
          title: "Pokédex",
        }}
      />
    </QueryClientProvider>
  );
}
