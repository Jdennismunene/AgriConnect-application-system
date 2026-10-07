import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useLanguage } from "@/context/LanguageContext";

const SignIn = () => {
  const { t } = useLanguage();

  // =====================================================
  // ANIMATION
  // =====================================================

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  const modalFadeAnim = useRef(new Animated.Value(0)).current;
  const modalSlideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // FORGOT PASSWORD STATE
  // =====================================================

  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const [resetContact, setResetContact] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  // =====================================================
  // OPEN FORGOT PASSWORD MODAL
  // =====================================================

  const openForgotPassword = () => {
    setResetContact(identifier);
    setResetError("");
    setForgotPasswordVisible(true);

    modalFadeAnim.setValue(0);
    modalSlideAnim.setValue(40);

    Animated.parallel([
      Animated.timing(modalFadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(modalSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // =====================================================
  // CLOSE FORGOT PASSWORD MODAL
  // =====================================================

  const closeForgotPassword = () => {
    Animated.parallel([
      Animated.timing(modalFadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(modalSlideAnim, {
        toValue: 40,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setForgotPasswordVisible(false);
      setResetError("");
    });
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    if (!identifier.trim()) {
      Alert.alert(t.emailOrPhoneNumber, t.enterEmailOrPhoneNumber);

      return false;
    }

    if (!password) {
      Alert.alert(t.password, t.enterPassword);

      return false;
    }

    return true;
  };

  // =====================================================
  // SIGN IN
  // =====================================================

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const loginData = {
        identifier: identifier.trim(),
        password,
      };

      console.log("AgriConnect login:", loginData);

      /*
       * BACKEND LOGIN WILL BE CONNECTED HERE.
       */

      Alert.alert(t.signIn, t.loginSuccessful);
    } catch (error) {
      console.log("Login error:", error);

      Alert.alert(t.error, t.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEND RESET CODE
  // =====================================================

  const handleSendResetCode = async () => {
    setResetError("");

    if (!resetContact.trim()) {
      setResetError(t.enterEmailOrPhoneNumber);
      return;
    }

    try {
      setResetLoading(true);

      const resetData = {
        identifier: resetContact.trim(),
      };

      console.log("AgriConnect password reset:", resetData);

      /*
       * BACKEND PASSWORD RESET WILL BE CONNECTED HERE.
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(t.forgotPassword, t.resetCodeSent);

      closeForgotPassword();
    } catch (error) {
      console.log("Password reset error:", error);

      setResetError(t.loginFailed);
    } finally {
      setResetLoading(false);
    }
  };

  // =====================================================
  // INPUT STYLE
  // =====================================================

  const inputClass =
    "flex-row items-center rounded-2xl border border-white/70 bg-white/55 px-4";

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#DFE0C3]">
        <KeyboardAwareScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={120}
          extraHeight={120}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            }}
          >
            {/* =====================================================
                HEADER
            ===================================================== */}

            <View className="px-5 pt-3">
              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.8}
                  className="h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/55"
                >
                  <Feather name="arrow-left" size={21} color="#344C4B" />
                </TouchableOpacity>

                <View className="h-14 w-14 items-center justify-center rounded-full bg-white/50">
                  <Image
                    source={require("@/assets/images/AgriConnect-logo.png")}
                    className="h-11 w-11"
                    resizeMode="contain"
                  />
                </View>

                <View className="w-11" />
              </View>
            </View>

            {/* =====================================================
                TITLE
            ===================================================== */}

            <View className="px-6 pt-8">
              <View className="mb-3 self-start rounded-full bg-[#A8E063]/35 px-4 py-2">
                <Text className="text-xs font-bold text-[#5F8D37]">
                  {t.signInWelcome}
                </Text>
              </View>

              <Text className="text-3xl font-extrabold text-[#344C4B]">
                {t.welcomeBack}
              </Text>

              <Text className="mt-2 max-w-[340px] text-sm leading-5 text-[#5F8D37]">
                {t.signInSubtitle}
              </Text>
            </View>

            {/* =====================================================
                LOGIN FORM
            ===================================================== */}

            <View className="mt-10 px-5">
              {/* EMAIL / PHONE */}

              <View>
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.emailOrPhoneNumber}
                </Text>

                <View className={inputClass}>
                  <Feather name="user" size={18} color="#5F8D37" />

                  <TextInput
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholder={t.emailOrPhonePlaceholder}
                    placeholderTextColor="#8A967D"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>
              </View>

              {/* PASSWORD */}

              <View className="mt-5">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.password}
                </Text>

                <View className={inputClass}>
                  <Feather name="lock" size={18} color="#5F8D37" />

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t.passwordPlaceholder}
                    placeholderTextColor="#8A967D"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={19}
                      color="#5F8D37"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* FORGOT PASSWORD */}

              <View className="mt-4 items-end">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={openForgotPassword}
                >
                  <Text className="text-sm font-bold text-[#5F8D37]">
                    {t.forgotPassword}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* SIGN IN BUTTON */}

              <View className="mt-8">
                <TouchableOpacity
                  onPress={handleSignIn}
                  disabled={loading}
                  activeOpacity={0.85}
                  className={`flex-row items-center justify-center rounded-2xl bg-[#344C4B] py-4 ${
                    loading ? "opacity-70" : ""
                  }`}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text className="mr-3 text-base font-bold text-white">
                        {t.signIn}
                      </Text>

                      <View className="h-8 w-8 items-center justify-center rounded-full bg-[#A8E063]">
                        <Feather name="arrow-right" size={17} color="#344C4B" />
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* =====================================================
                SIGN UP
            ===================================================== */}

            <View className="mt-7 flex-row items-center justify-center px-5">
              <Text className="text-sm text-[#6E796A]">
                {t.dontHaveAccount}{" "}
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/SignUp")}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-bold text-[#5F8D37]">
                  {t.signUp}
                </Text>
              </TouchableOpacity>
            </View>

            {/* =====================================================
                FARMING MESSAGE
            ===================================================== */}

            <View className="mt-12 items-center px-6">
              <View className="mb-3 h-1 w-12 rounded-full bg-[#A8E063]" />

              <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-[#A8E063]/25">
                <Ionicons name="leaf-outline" size={23} color="#5F8D37" />
              </View>

              <Text className="text-center text-xs leading-5 text-[#6E796A]">
                {t.smarterFarming}
              </Text>
            </View>
          </Animated.View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* ===========================================================
          FORGOT PASSWORD MODAL
      =========================================================== */}

      <Modal
        visible={forgotPasswordVisible}
        transparent
        animationType="none"
        onRequestClose={closeForgotPassword}
      >
        <View className="flex-1 justify-end bg-[#344C4B]/40">
          {/* Outside press area */}

          <Pressable
            className="absolute inset-0"
            onPress={closeForgotPassword}
          />

          <Animated.View
            style={{
              opacity: modalFadeAnim,
              transform: [
                {
                  translateY: modalSlideAnim,
                },
              ],
            }}
            className="rounded-t-[32px] bg-[#DFE0C3] px-6 pb-8 pt-5"
          >
            {/* Modal Handle */}

            <View className="mb-5 items-center">
              <View className="h-1.5 w-12 rounded-full bg-[#344C4B]/20" />
            </View>

            {/* Header */}

            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-[#F4C95D]/70">
                  <Feather name="lock" size={22} color="#5F8D37" />
                </View>

                <Text className="text-2xl font-extrabold text-[#344C4B]">
                  {t.forgotPasswordTitle}
                </Text>

                <Text className="mt-2 text-sm leading-5 text-[#5F6865]">
                  {t.forgotPasswordDescription}
                </Text>
              </View>

              {/* Close */}

              <TouchableOpacity
                onPress={closeForgotPassword}
                activeOpacity={0.8}
                className="h-10 w-10 items-center justify-center rounded-full bg-white/70"
              >
                <Feather name="x" size={20} color="#344C4B" />
              </TouchableOpacity>
            </View>

            {/* Reset Contact */}

            <View className="mt-6">
              <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                {t.resetContact}
              </Text>

              <View
                className={`flex-row items-center rounded-2xl border bg-white/60 px-4 ${
                  resetError ? "border-[#E89B5A]" : "border-white/70"
                }`}
              >
                <Feather name="user" size={18} color="#5F8D37" />

                <TextInput
                  value={resetContact}
                  onChangeText={(value) => {
                    setResetContact(value);
                    setResetError("");
                  }}
                  placeholder={t.resetContactPlaceholder}
                  placeholderTextColor="#8A967D"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                />
              </View>

              {resetError ? (
                <Text className="mt-2 text-xs font-semibold text-[#B86535]">
                  {resetError}
                </Text>
              ) : null}
            </View>

            {/* Send Code */}

            <TouchableOpacity
              onPress={handleSendResetCode}
              disabled={resetLoading}
              activeOpacity={0.85}
              className={`mt-6 flex-row items-center justify-center rounded-2xl bg-[#A8E063] py-4 ${
                resetLoading ? "opacity-70" : ""
              }`}
            >
              {resetLoading ? (
                <ActivityIndicator color="#344C4B" />
              ) : (
                <>
                  <Text className="mr-3 text-base font-extrabold text-[#344C4B]">
                    {t.sendResetCode}
                  </Text>

                  <View className="h-8 w-8 items-center justify-center rounded-full bg-[#344C4B]">
                    <Feather name="arrow-right" size={17} color="#A8E063" />
                  </View>
                </>
              )}
            </TouchableOpacity>

            {/* Cancel */}

            <TouchableOpacity
              onPress={closeForgotPassword}
              activeOpacity={0.7}
              className="mt-3 items-center py-2"
            >
              <Text className="text-sm font-bold text-[#5F8D37]">
                {t.close}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default SignIn;
