import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  // Animation values for the corner decorations
  const topLeft = useRef(new Animated.Value(1)).current;
  const topRight = useRef(new Animated.Value(1)).current;
  const bottomLeft = useRef(new Animated.Value(1)).current;
  const bottomRight = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createPulse = (animation: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animation, {
            toValue: 1.25,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    createPulse(topLeft, 0);
    createPulse(topRight, 400);
    createPulse(bottomLeft, 800);
    createPulse(bottomRight, 1200);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#DFE0C3]">
      {/* =====================================================
          TOP SECTION
      ====================================================== */}
      <View className="items-center justify-center pt-8">
        <Text className="text-3xl font-bold text-green-900">Welcome To</Text>

        <Image
          source={require("@/assets/images/AgriConnect-logo.png")}
          className="h-56 w-56 -mt-4"
          resizeMode="contain"
        />

        {/* AI Badge */}
        <View className="rounded-3xl border border-white/50 bg-white/40 px-6 py-2">
          <Text className="font-semibold text-black">
            AI-POWERED AGRICULTURAL PLATFORM
          </Text>
        </View>
      </View>

      {/* =====================================================
          BOTTOM SECTION
      ====================================================== */}
      <View className="relative mt-6 flex-1 overflow-hidden rounded-t-[40px] bg-[#344C4B] px-7 pt-10">
        {/* =================================================
            ANIMATED CORNER DECORATIONS
        ================================================== */}

        {/* Top Left */}
        <Animated.View
          style={{ transform: [{ scale: topLeft }] }}
          className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#A8E063]/40"
        />

        {/* Top Right */}
        <Animated.View
          style={{ transform: [{ scale: topRight }] }}
          className="absolute -right-7 top-6 h-20 w-20 rounded-full bg-[#F4C95D]/40"
        />

        {/* Bottom Left */}
        <Animated.View
          style={{ transform: [{ scale: bottomLeft }] }}
          className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#E89B5A]/35"
        />

        {/* Bottom Right */}
        <Animated.View
          style={{ transform: [{ scale: bottomRight }] }}
          className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-[#A8E063]/30"
        />

        {/* Small decorative dots */}
        <View className="absolute left-10 top-20 h-3 w-3 rounded-full bg-[#A8E063]" />
        <View className="absolute right-14 top-28 h-2 w-2 rounded-full bg-[#F4C95D]" />
        <View className="absolute bottom-24 left-12 h-2 w-2 rounded-full bg-[#E89B5A]" />
        <View className="absolute bottom-32 right-16 h-3 w-3 rounded-full bg-[#A8E063]" />

        {/* =================================================
            MAIN CONTENT
        ================================================== */}
        <View className="z-10 mt-4 items-center">
          {/* Small label */}
          <View className="mb-5 flex-row items-center rounded-full border border-[#A8E063]/30 bg-[#A8E063]/10 px-4 py-2">
            <View className="mr-2 h-2 w-2 rounded-full bg-[#A8E063]" />

            <Text className="text-xs font-semibold tracking-widest text-[#A8E063]">
              SMART AGRICULTURE
            </Text>
          </View>

          {/* Main heading */}
          <Text className="text-center text-3xl font-bold leading-10 text-white">
            Connecting Farmers{"\n"}
            <Text className="text-[#A8E063]">to Smart Markets</Text> & Services
          </Text>

          {/* Description */}
          <Text className="mt-5 text-center text-base leading-7 text-gray-200">
            AgriConnect brings together farmers, buyers, suppliers, experts and
            transporters in one intelligent ecosystem powered by AI to reduce
            fragmentation and grow your income.
          </Text>

          {/* Get Started */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-8 w-full overflow-hidden rounded-2xl border border-white/40 bg-white/20"
            onPress={() => router.push('/Language')}
          >
            <View className="items-center justify-center px-6 py-4">
              <Text className="text-lg font-bold text-white">Get Started</Text>
            </View>
          </TouchableOpacity>

          {/* Bottom tagline */}
          <Text className="mt-4 text-center text-xs text-gray-300">
            Grow smarter. Connect better. Earn more.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
