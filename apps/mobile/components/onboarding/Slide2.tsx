import { View, Text } from "react-native";

export default function Slide2() {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <View className="w-24 h-24 rounded-full bg-[#141824] items-center justify-center mb-8">
        <Text className="text-4xl text-[#7C5CFC]">⇄</Text>
      </View>
      <Text className="text-[#F5F3FF] text-3xl font-black text-center leading-tight">
        Pay anyone,{"\n"}split every bill
      </Text>
      <Text className="text-[#8B8FA3] text-base text-center mt-4 font-mono">
        Scan a QR to pay instantly, or split it across friends.
      </Text>
    </View>
  );
}
