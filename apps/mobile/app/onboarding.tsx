import "../global.css";
import { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { router } from "expo-router";
import Screen from "@/components/ui/Screen";
import { useAuthStore } from "@/store/useAuthStore";
import Slide1 from "../components/onboarding/Slide1";
import Slide2 from "../components/onboarding/Slide2";
import Slide3 from "../components/onboarding/Slide3";

const { width } = Dimensions.get("window");
const slides = [Slide1, Slide2, Slide3];

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const setOnboarded = useAuthStore((s) => s.setOnboarded);

  const finishOnboarding = () => {
    setOnboarded();
    router.replace("/connect");
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      finishOnboarding();
      return;
    }
    listRef.current?.scrollToIndex({ index: activeIndex + 1 });
  };

  return (
    <Screen>
      <View className="flex-row justify-end px-6 pt-2">
        <Pressable onPress={finishOnboarding}>
          <Text className="text-[#8B8FA3] text-sm font-mono">Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item: Slide }) => (
          <View style={{ width }} className="flex-1">
            <Slide />
          </View>
        )}
      />

      <View className="flex-row justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full ${
              i === activeIndex ? "w-6 bg-[#7C5CFC]" : "w-2 bg-[#2A2F3E]"
            }`}
          />
        ))}
      </View>

      <View className="px-6 pb-6">
        <Pressable
          onPress={handleNext}
          className="w-full py-4 rounded-2xl items-center bg-[#7C5CFC]"
        >
          <Text className="text-white text-base font-bold">
            {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
