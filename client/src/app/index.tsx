import { useEffect, useRef, useState } from "react";
import { View, Image, Text, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Index() {
  const [dots, setDots] = useState("");

  // Animated values
  const logoScale = useRef(new Animated.Value(1)).current;
  const circleOne = useRef(new Animated.Value(1)).current;
  const circleTwo = useRef(new Animated.Value(1)).current;
  const circleThree = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // ==========================================
    // Loading dots
    // ==========================================
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") {
          return "";
        }

        return prev + ".";
      });
    }, 400);

    // ==========================================
    // Logo breathing animation
    // ==========================================
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // ==========================================
    // Decorative circles
    // ==========================================
    const animateCircle = (animation: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),

          Animated.timing(animation, {
            toValue: 1.3,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(animation, {
            toValue: 1,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateCircle(circleOne, 0);
    animateCircle(circleTwo, 500);
    animateCircle(circleThree, 1000);

    // ==========================================
    // Navigate to Welcome screen
    // ==========================================
    const navigationTimer = setTimeout(() => {
      router.replace("/Welcome");
    }, 5000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(navigationTimer);
    };
  }, []);

  return (
    <SafeAreaView className="relative flex-1 items-center justify-center overflow-hidden bg-[#DFE0C3]">
      {/* =================================================
          DECORATIVE BACKGROUND CIRCLES
      ================================================== */}

      {/* Green - Top Left */}
      <Animated.View
        style={{ transform: [{ scale: circleOne }] }}
        className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#A8E063]/50"
      />

      {/* Yellow - Top Right */}
      <Animated.View
        style={{ transform: [{ scale: circleTwo }] }}
        className="absolute -right-14 top-16 h-32 w-32 rounded-full bg-[#F4C95D]/50"
      />

      {/* Orange - Bottom Left */}
      <Animated.View
        style={{ transform: [{ scale: circleThree }] }}
        className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#E89B5A]/40"
      />

      {/* Green - Bottom Right */}
      <View className="absolute -bottom-20 -right-16 h-44 w-44 rounded-full bg-[#7CB342]/30" />

      {/* =================================================
          SMALL DECORATIVE DOTS
      ================================================== */}

      <View className="absolute left-12 top-40 h-3 w-3 rounded-full bg-[#5F8D37]" />

      <View className="absolute right-14 top-44 h-4 w-4 rounded-full bg-[#F4C95D]" />

      <View className="absolute bottom-40 left-16 h-4 w-4 rounded-full bg-[#E89B5A]" />

      <View className="absolute bottom-32 right-12 h-3 w-3 rounded-full bg-[#A8E063]" />

      {/* =================================================
          LOGO
      ================================================== */}

      <Animated.View
        style={{
          transform: [{ scale: logoScale }],
        }}
        className="items-center"
      >
        {/* Logo glow/background */}
        <View className="absolute h-72 w-72 rounded-full bg-white/30" />

        <Image
          source={require("@/assets/images/AgriConnect-logo.png")}
          className="h-64 w-64"
          resizeMode="contain"
        />
      </Animated.View>

      {/* =================================================
          WELCOME TEXT
      ================================================== */}

      <View className="mt-10 items-center">
        <Text className="text-2xl font-bold text-green-900">Welcome{dots}</Text>

        <Text className="mt-2 text-sm font-medium tracking-widest text-[#5F8D37]">
          SMART • CONNECTED • AGRICULTURE
        </Text>
      </View>

      {/* =================================================
          BOTTOM MESSAGE
      ================================================== */}

      <View className="absolute bottom-10 items-center">
        <Text className="text-xs font-medium text-green-900/60">
          Connecting farmers to smarter opportunities
        </Text>

        {/* Progress-style dots */}
        <View className="mt-3 flex-row items-center">
          <View className="mx-1 h-2 w-2 rounded-full bg-[#A8E063]" />

          <View className="mx-1 h-2 w-2 rounded-full bg-[#F4C95D]" />

          <View className="mx-1 h-2 w-2 rounded-full bg-[#E89B5A]" />
        </View>
      </View>
    </SafeAreaView>
  );
}
