import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function Index() {
  const hasOnboarded = useAuthStore((s) => s.hasOnboarded);
  const walletAddress = useAuthStore((s) => s.walletAddress);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!useAuthStore.persist.hasHydrated()) return;

    if (!hasOnboarded) {
      router.replace("/onboarding");
    } else if (!walletAddress || !token) {
      router.replace("/connect");
    } else {
      router.replace("/(tabs)/home");
    }
  }, [hasOnboarded, walletAddress, token]);

  return (
    <View className="flex-1 bg-[#0B0E14] items-center justify-center">
      <ActivityIndicator color="#7C5CFC" />
    </View>
  );
}