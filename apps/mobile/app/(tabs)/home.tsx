import { View, Text } from "react-native";
import Screen from "@/components/ui/Screen";

export default function home() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-text-primary text-2xl font-sans-bold">Home</Text>
        <Text className="text-text-secondary text-sm mt-2 font-mono">
          Balance and quick actions
        </Text>
      </View>
    </Screen>
  );
}