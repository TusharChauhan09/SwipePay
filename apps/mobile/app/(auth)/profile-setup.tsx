import "../../global.css";
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import Screen from "@/components/ui/Screen";
import { colors } from "@/theme/tokens";
import { createProfile } from "@/lib/api/profile";

export default function ProfileSetup() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = username.trim().length >= 3 && displayName.trim().length >= 2;

  const handleContinue = async () => {
    if (!isValid) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      await createProfile({
        username: username.trim(),
        display_name: displayName.trim(),
      });
      router.replace("/home");
    } catch (err: any) {
      setErrorMsg(
        err.response?.data || "Couldn't save your profile. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <View className="flex-1 px-6 pt-6">
        <Text className="text-text-primary text-2xl font-sans-black">
          Complete your profile
        </Text>
        <Text className="text-text-secondary text-sm mt-2 font-mono">
          This is how friends will find and pay you.
        </Text>

        <View className="items-center my-8">
          <View className="w-24 h-24 rounded-full bg-surface-raised items-center justify-center border border-border-subtle">
            <Text className="text-3xl text-text-secondary">
              {displayName.trim().charAt(0).toUpperCase() || "?"}
            </Text>
          </View>
          <Pressable className="mt-3">
            <Text className="text-brand-primary text-sm font-mono">
              Add photo
            </Text>
          </Pressable>
        </View>

        <Text className="text-text-secondary text-xs font-mono mb-2">
          USERNAME
        </Text>
        <View className="flex-row items-center bg-surface-raised rounded-2xl px-4 mb-5 border border-border-subtle">
          <Text className="text-text-secondary font-mono">@</Text>
          <TextInput
            value={username}
            onChangeText={(t) => setUsername(t.replace(/[^a-zA-Z0-9_]/g, ""))}
            placeholder="tushar_09"
            placeholderTextColor={colors.text.secondary}
            autoCapitalize="none"
            className="flex-1 text-text-primary font-mono py-4 px-1"
          />
        </View>

        <Text className="text-text-secondary text-xs font-mono mb-2">
          DISPLAY NAME
        </Text>
        <View className="bg-surface-raised rounded-2xl px-4 mb-2 border border-border-subtle">
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Tushar Chauhan"
            placeholderTextColor={colors.text.secondary}
            className="text-text-primary py-4"
          />
        </View>

        {errorMsg ? (
          <Text className="text-brand-danger text-xs font-mono mt-2">
            {errorMsg}
          </Text>
        ) : null}
      </View>

      <View className="px-6 pb-6">
        <Pressable
          onPress={handleContinue}
          disabled={!isValid || submitting}
          className={`w-full py-4 rounded-2xl items-center ${
            isValid && !submitting ? "bg-brand-primary" : "bg-surface-raised"
          }`}
        >
          <Text
            className={`text-base font-sans-bold ${
              isValid && !submitting ? "text-text-primary" : "text-text-secondary"
            }`}
          >
            {submitting ? "Saving…" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
