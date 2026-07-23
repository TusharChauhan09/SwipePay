import { View, Text } from "react-native";

export default function BoardingScreen1() {
  return (
    <View className="flex-1 items-center justify-center px-10">
      {/* SVG illustration slot — to be added later */}
      <View className="w-24 h-24 rounded-full bg-[#141824] items-center justify-center mb-8">
        <Text className="text-4xl text-[#7C5CFC]">◈</Text>
      </View>
      <Text className="text-[#F5F3FF] text-3xl font-black text-center leading-tight">
        Your wallet{"\n"}is your account
      </Text>
      <Text className="text-[#8B8FA3] text-base text-center mt-4 font-mono">
        No passwords. No email. Just connect and go.
      </Text>
    </View>
  );
}
