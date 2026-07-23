import "../global.css";
import { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import { router } from "expo-router";
import Screen from "../components/ui/Screen";
import { useAuthStore } from "../store/useAuthStore";
import { verifyWallet } from "../lib/api/auth";
import { checkProfileExists } from "../lib/api/profile";

export default function ConnectWallet() {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const pulse = useRef(new Animated.Value(0)).current;
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    if (status !== "connecting") return;
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [status]);

  const handleConnect = async () => {
    setStatus("connecting");
    setErrorMsg("");

    try {
      // TODO (later step): replace with real MWA connect() + signMessage()
      // For now, simulate a wallet signing a login message
      const fakeWallet = "7xKXtg2CW87d97TXh8X5MknkHsKe9PzEHmzEuBc3PUKW";
      const fakeMessage = `Sign in to SwipePay at ${Date.now()}`;
      const fakeSignature = "SIMULATED_SIGNATURE_FOR_DEV_ONLY";

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const { token } = await verifyWallet(fakeWallet, fakeMessage, fakeSignature);

      setSession(fakeWallet, token);
      setStatus("connected");

      const profileExists = await checkProfileExists(fakeWallet);

      setTimeout(() => {
        router.replace(profileExists ? "/home" : "/profile-setup");
      }, 600);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.response?.data || "Connection failed. Try again.");
    }
  };

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });

  return (
    <Screen>
      <View className="absolute w-72 h-72 rounded-full bg-[#7C5CFC] opacity-[0.12] -top-10 -left-16" />
      <View className="absolute w-72 h-72 rounded-full bg-[#3DDC97] opacity-[0.08] bottom-0 -right-20" />

      <View className="flex-1 items-center justify-between px-6 py-10">
        <View className="items-center mt-4">
          <Text className="text-[#F5F3FF] text-3xl font-black tracking-tight">
            SwipePay
          </Text>
          <Text className="text-[#8B8FA3] text-sm mt-1 font-mono">
            wallet-native payments
          </Text>
        </View>

        <View className="items-center justify-center">
          <View className="items-center justify-center w-40 h-40">
            {status === "connecting" && (
              <Animated.View
                style={{
                  transform: [{ scale: ringScale }],
                  opacity: ringOpacity,
                }}
                className="absolute w-24 h-24 rounded-full border-2 border-[#7C5CFC]"
              />
            )}
            <View
              className={`w-24 h-24 rounded-full items-center justify-center ${
                status === "connected"
                  ? "bg-[#3DDC97]"
                  : status === "error"
                  ? "bg-[#141824]"
                  : "bg-[#141824]"
              }`}
              style={{
                borderWidth: 1,
                borderColor:
                  status === "connected"
                    ? "#3DDC97"
                    : status === "error"
                    ? "#FF6B6B"
                    : "#2A2F3E",
              }}
            >
              <Text className="text-3xl">
                {status === "connected" && "✓"}
                {status === "error" && "!"}
                {(status === "idle" || status === "connecting") && "◈"}
              </Text>
            </View>
          </View>

          <Text className="text-[#F5F3FF] text-lg font-semibold mt-6 text-center">
            {status === "idle" && "Connect your wallet"}
            {status === "connecting" && "Waiting for signature…"}
            {status === "connected" && "Wallet connected"}
            {status === "error" && "Something went wrong"}
          </Text>
          <Text className="text-[#8B8FA3] text-sm mt-2 text-center px-8 font-mono">
            {status === "idle" && "No password. No email. Just your wallet."}
            {status === "connecting" && "Approve the request in your wallet app"}
            {status === "connected" && "7xKX...PUKW"}
            {status === "error" && errorMsg}
          </Text>
        </View>

        <View className="w-full">
          <Pressable
            onPress={handleConnect}
            disabled={status === "connecting" || status === "connected"}
            className={`w-full py-4 rounded-2xl items-center ${
              status === "idle" || status === "error" ? "bg-[#7C5CFC]" : "bg-[#141824]"
            }`}
          >
            <Text
              className={`text-base font-bold ${
                status === "idle" || status === "error" ? "text-white" : "text-[#8B8FA3]"
              }`}
            >
              {status === "idle" && "Connect Wallet"}
              {status === "connecting" && "Connecting…"}
              {status === "connected" && "Continue →"}
              {status === "error" && "Try Again"}
            </Text>
          </Pressable>
          <Text className="text-[#8B8FA3] text-xs text-center mt-4 font-mono">
            Solana · Devnet
          </Text>
        </View>
      </View>
    </Screen>
  );
}
