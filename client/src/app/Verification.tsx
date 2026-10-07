import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useLanguage } from "@/context/LanguageContext";

export default function Verification() {
  const { t } = useLanguage();

  const params = useLocalSearchParams<{
    email?: string;
    phone?: string;
  }>();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const contact = params.email || params.phone || "your contact";

  const handleVerify = async () => {
    setError("");

    if (!code.trim()) {
      setError(t.enterVerificationCode);
      return;
    }

    if (code.trim().length < 4) {
      setError(t.verificationFailed);
      return;
    }

    try {
      setLoading(true);

      // Temporary verification.
      // We will connect this to the backend OTP endpoint later.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.replace("/");
    } catch (error) {
      console.error("Verification error:", error);
      setError(t.verificationFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);

    try {
      // Temporary resend.
      // Backend resend functionality will be connected later.
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Resend error:", error);
      setError(t.verificationFailed);
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#DFE0C3]">
      {/* Decorative background circles */}

      <View className="absolute -right-16 top-28 h-32 w-32 rounded-full bg-[#A8E063]/20" />

      <View className="absolute -bottom-20 -left-24 h-48 w-48 rounded-full bg-[#F4C95D]/15" />

      {/* Back button */}

      <View className="px-5 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="h-11 w-11 items-center justify-center rounded-full bg-white/70"
        >
          <Feather name="arrow-left" size={22} color="#344C4B" />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-7 pb-8"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={120}
        extraHeight={120}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1 items-center pt-2"
        >
          {/* Logo */}

          <View className="mb-2 h-14 w-24 items-center justify-center">
            <Image
              source={require("@/assets/images/AgriConnect-logo.png")}
              resizeMode="contain"
              className="h-12 w-24"
            />
          </View>

          {/* Verification icon */}

          <View className="mb-4 mt-1">
            <View className="relative h-[86px] w-[86px] items-center justify-center rounded-full bg-[#F4C95D]">
              <Feather name="shield" size={42} color="#5F8D37" />

              <View className="absolute bottom-1 right-0 h-6 w-6 items-center justify-center rounded-full bg-[#A8E063]">
                <Feather name="check" size={13} color="#344C4B" />
              </View>
            </View>
          </View>

          {/* Title */}

          <Text className="text-center text-[25px] font-extrabold tracking-wide text-[#344C4B]">
            {t.verificationWelcome}
          </Text>

          {/* Subtitle */}

          <Text className="mt-2 max-w-[330px] text-center text-sm leading-[21px] text-[#5F6865]">
            {t.verificationSubtitle}
          </Text>

          {/* Email / Phone */}

          <Text className="mt-2 text-center text-sm font-bold text-[#5F8D37]">
            {contact}
          </Text>

          {/* Verification input */}

          <View className="mt-6 w-full">
            <Text className="mb-2 text-sm font-bold text-[#344C4B]">
              {t.verificationCode}
            </Text>

            <View
              className={`h-[58px] w-full flex-row items-center rounded-[18px] border bg-white/80 px-4 ${
                error ? "border-[#E89B5A]" : "border-[#5F8D37]/20"
              }`}
            >
              <Feather name="key" size={20} color="#5F8D37" />

              <TextInput
                value={code}
                onChangeText={(value) => {
                  setCode(value.replace(/[^0-9]/g, ""));
                  setError("");
                }}
                placeholder={t.verificationCodePlaceholder}
                placeholderTextColor="#8B938F"
                keyboardType="number-pad"
                maxLength={6}
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                returnKeyType="done"
                className="ml-3 h-full flex-1 text-base font-semibold text-[#344C4B]"
              />
            </View>

            {error ? (
              <Text className="mt-2 text-xs font-semibold text-[#B86535]">
                {error}
              </Text>
            ) : null}
          </View>

          {/* Resend */}

          <View className="mt-4 flex-row items-center justify-center">
            <Text className="text-[13px] text-[#5F6865]">
              {t.didntReceiveCode}{" "}
            </Text>

            <TouchableOpacity
              onPress={handleResend}
              disabled={resending}
              activeOpacity={0.7}
            >
              {resending ? (
                <ActivityIndicator size="small" color="#5F8D37" />
              ) : (
                <Text className="text-[13px] font-extrabold text-[#5F8D37]">
                  {t.resendCode}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Verify button */}

          <TouchableOpacity
            onPress={handleVerify}
            disabled={loading}
            activeOpacity={0.85}
            className={`mt-6 h-[58px] w-full flex-row items-center justify-center gap-2 rounded-[20px] bg-[#A8E063] ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#344C4B" />
            ) : (
              <>
                <Text className="text-base font-extrabold text-[#344C4B]">
                  {t.verifyAccount}
                </Text>

                <Feather name="arrow-right" size={20} color="#344C4B" />
              </>
            )}
          </TouchableOpacity>

          {/* Change contact */}

          <Pressable onPress={() => router.back()} className="mt-4 px-2 py-2">
            <Text className="text-[13px] font-bold text-[#5F8D37]">
              {t.changePhoneNumber}
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
