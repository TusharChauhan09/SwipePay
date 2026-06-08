import "../global.css";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-2xl font-bold">SwipePay 💸</Text>
      <Text className="text-gray-400 text-sm mt-2">Solana Payments</Text>
    </View>
  );
}
