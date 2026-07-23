import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-[#0B0E14]">
      {children}
    </SafeAreaView>
  );
}
