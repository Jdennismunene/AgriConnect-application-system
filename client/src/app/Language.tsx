import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import { useLanguage } from "@/context/LanguageContext";

const Language = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <SafeAreaView className="flex-1 bg-[#DFE0C3]">
      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      {/* Top Left */}
      <View className="absolute -left-14 -top-10 h-36 w-36 rounded-full bg-[#A8E063]/40" />

      {/* Top Right */}
      <View className="absolute -right-12 top-20 h-28 w-28 rounded-full bg-[#F4C95D]/40" />

      {/* Bottom Left */}
      <View className="absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-[#E89B5A]/30" />

      {/* Bottom Right */}
      <View className="absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-[#A8E063]/30" />

      {/* Small decorative dots */}
      <View className="absolute left-8 top-40 h-3 w-3 rounded-full bg-[#5F8D37]" />
      <View className="absolute right-10 top-44 h-4 w-4 rounded-full bg-[#F4C95D]" />
      <View className="absolute bottom-36 left-12 h-3 w-3 rounded-full bg-[#E89B5A]" />
      <View className="absolute bottom-28 right-14 h-3 w-3 rounded-full bg-[#A8E063]" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <View className="flex-1 px-7">
        {/* Logo */}
        <View className="items-center pt-8">
          <View className="h-36 w-36 items-center justify-center rounded-full bg-white/30">
            <Image
              source={require("@/assets/images/AgriConnect-logo.png")}
              className="h-32 w-32"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Heading */}
        <View className="mt-6 items-center">
          <Text className="text-center text-3xl font-bold leading-10 text-[#344C4B]">
            {t.everythingYourFarm}
            {"\n"}
            <Text className="text-[#5F8D37]">{t.needsInOnePlace}</Text>
          </Text>

          {/* Description */}
          <Text className="mt-4 max-w-[330px] text-center text-base leading-6 text-[#344C4B]/80">
            {t.languageDescription}
          </Text>
        </View>

        {/* =================================================
            LANGUAGE CARD
        ================================================== */}

        <View className="mt-8 rounded-[28px] border border-white/50 bg-white/35 p-5">
          {/* Card Header */}
          <View className="mb-5 flex-row items-center">
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#A8E063]">
              <Text className="text-xl">🌐</Text>
            </View>

            <View>
              <Text className="text-lg font-bold text-[#344C4B]">
                {t.chooseLanguage}
              </Text>

              <Text className="mt-0.5 text-xs text-[#344C4B]/60">
                {t.changeLanguageLater}
              </Text>
            </View>
          </View>

          {/* =================================================
              ENGLISH OPTION
          ================================================== */}

          <Pressable
            onPress={() => setLanguage("en")}
            className={`mb-3 flex-row items-center rounded-2xl border p-4 ${
              language === "en"
                ? "border-[#A8E063] bg-[#A8E063]/25"
                : "border-white/50 bg-white/30"
            }`}
          >
            {/* Radio */}
            <View
              className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                language === "en" ? "border-[#5F8D37]" : "border-[#344C4B]/40"
              }`}
            >
              {language === "en" && (
                <View className="h-3 w-3 rounded-full bg-[#5F8D37]" />
              )}
            </View>

            {/* Language text */}
            <View className="ml-4 flex-1">
              <Text className="text-base font-bold text-[#344C4B]">
                {t.english}
              </Text>

              <Text className="mt-0.5 text-xs text-[#344C4B]/60">English</Text>
            </View>

            {/* Selected check */}
            {language === "en" && (
              <View className="h-7 w-7 items-center justify-center rounded-full bg-[#5F8D37]">
                <Text className="font-bold text-white">✓</Text>
              </View>
            )}
          </Pressable>

          {/* =================================================
              KISWAHILI OPTION
          ================================================== */}

          <Pressable
            onPress={() => setLanguage("sw")}
            className={`flex-row items-center rounded-2xl border p-4 ${
              language === "sw"
                ? "border-[#A8E063] bg-[#A8E063]/25"
                : "border-white/50 bg-white/30"
            }`}
          >
            {/* Radio */}
            <View
              className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                language === "sw" ? "border-[#5F8D37]" : "border-[#344C4B]/40"
              }`}
            >
              {language === "sw" && (
                <View className="h-3 w-3 rounded-full bg-[#5F8D37]" />
              )}
            </View>

            {/* Language text */}
            <View className="ml-4 flex-1">
              <Text className="text-base font-bold text-[#344C4B]">
                {t.kiswahili}
              </Text>

              <Text className="mt-0.5 text-xs text-[#344C4B]/60">
                {language === "sw" ? "Kiswahili" : "Swahili"}
              </Text>
            </View>

            {/* Selected check */}
            {language === "sw" && (
              <View className="h-7 w-7 items-center justify-center rounded-full bg-[#5F8D37]">
                <Text className="font-bold text-white">✓</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* =================================================
            CONTINUE BUTTON
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          className="mt-7 flex-row items-center justify-center gap-1 rounded-2xl bg-[#344C4B] px-6 py-4"
          onPress={() => router.push('/SignUp')}
        >
          <Text className="text-lg font-bold text-white">{t.continue}</Text>

          <Feather name="arrow-right" color="white" size={18} />
        </TouchableOpacity>

        {/* Bottom message */}
        <View className="mt-auto items-center pb-7">
          <Text className="text-center text-xs font-medium text-[#344C4B]/60">
            {t.smartFarming}
          </Text>

          {/* Color indicators */}
          <View className="mt-3 flex-row">
            <View className="mx-1 h-2 w-2 rounded-full bg-[#A8E063]" />
            <View className="mx-1 h-2 w-2 rounded-full bg-[#F4C95D]" />
            <View className="mx-1 h-2 w-2 rounded-full bg-[#E89B5A]" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Language;
