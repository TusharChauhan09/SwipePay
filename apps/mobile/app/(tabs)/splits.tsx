import { View, Text } from "react-native";
import Screen from "@/components/ui/Screen";

export default function splits() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-text-primary text-2xl font-sans-bold">Splits</Text>
        <Text className="text-text-secondary text-sm mt-2 font-mono">
          Split a bill
        </Text>
      </View>
    </Screen>
  );
}