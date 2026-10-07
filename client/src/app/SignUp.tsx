  import React, { useEffect, useRef, useState } from "react";
  import { ActivityIndicator, Alert, Animated, Image, Pressable, Text, TextInput, TouchableOpacity, View,}from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Feather, Ionicons } from "@expo/vector-icons";
  import { router } from "expo-router";

  import { useLanguage } from "@/context/LanguageContext";
  import { apiUrl, API_ENDPOINTS } from "../../services/api";
  import { farmingTypes, type FarmingType } from "../../services/farmingTypes";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

  interface LocationResult {
    id?: string;
    name?: string;
    formatted?: string;
    country?: string;
    countryCode?: string;
    county?: string;
    state?: string;
    stateCode?: string;
    city?: string;
    suburb?: string;
    district?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    type?: string;
  }

  const SignUp = () => {
    const { language, t } = useLanguage();

    const isSwahili = language === "sw";

    // =====================================================
    // ANIMATION
    // =====================================================

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(25)).current;

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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [locationSearch, setLocationSearch] = useState("");
    const [locationResults, setLocationResults] = useState<LocationResult[]>([]);

    const [selectedLocation, setSelectedLocation] =
      useState<LocationResult | null>(null);

    const [farmName, setFarmName] = useState("");
    const [farmSize, setFarmSize] = useState("");
    const [primaryCrops, setPrimaryCrops] = useState("");

    const [farmingType, setFarmingType] = useState("");
    const [showFarmingTypes, setShowFarmingTypes] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [searchingLocations, setSearchingLocations] = useState(false);
    const [loading, setLoading] = useState(false);

    // =====================================================
    // LOCATION SEARCH
    // =====================================================

    useEffect(() => {
      const search = async () => {
        const query = locationSearch.trim();

        if (query.length < 2) {
          setLocationResults([]);
          setSearchingLocations(false);
          return;
        }

        setSearchingLocations(true);

        try {
          const response = await fetch(
            `${apiUrl(API_ENDPOINTS.locationSearch)}?q=${encodeURIComponent(
              query,
            )}&lang=${language}`,
          );

          const data = await response.json();

          if (data.success && Array.isArray(data.data)) {
            setLocationResults(data.data);
          } else {
            setLocationResults([]);
          }
        } catch (error) {
          console.log("Location search failed:", error);

          setLocationResults([]);
        } finally {
          setSearchingLocations(false);
        }
      };

      const timeout = setTimeout(search, 450);

      return () => clearTimeout(timeout);
    }, [locationSearch, language]);

    // =====================================================
    // LOCATION SELECTION
    // =====================================================

    const handleLocationSelect = (location: LocationResult) => {
      setSelectedLocation(location);

      setLocationSearch(location.formatted || location.name || "");

      setLocationResults([]);
    };

    // =====================================================
    // FARMING TYPE
    // =====================================================

    const handleFarmingTypeSelect = (type: FarmingType) => {
      setFarmingType(isSwahili ? type.sw : type.en);

      setShowFarmingTypes(false);
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {
      if (!firstName.trim()) {
        Alert.alert(t.firstName, t.enterFirstName);

        return false;
      }

      if (!lastName.trim()) {
        Alert.alert(t.lastName, t.enterLastName);

        return false;
      }

      if (!phone.trim()) {
        Alert.alert(t.phoneNumber, t.enterPhone);

        return false;
      }

      if (!email.trim()) {
        Alert.alert(t.emailAddress, t.enterEmail);

        return false;
      }

      if (!selectedLocation) {
        Alert.alert(t.countyLocation, t.selectLocation);

        return false;
      }

      if (!farmName.trim()) {
        Alert.alert(t.farmName, t.enterFarmName);

        return false;
      }

      if (!farmSize.trim()) {
        Alert.alert(t.farmSize, t.enterFarmSize);

        return false;
      }

      if (!primaryCrops.trim()) {
        Alert.alert(t.primaryCrops, t.enterPrimaryCrops);

        return false;
      }

      if (!farmingType) {
        Alert.alert(t.farmingType, t.selectFarmingTypeValidation);

        return false;
      }

      if (!password) {
        Alert.alert(t.password, t.enterPassword);

        return false;
      }

      if (password.length < 6) {
        Alert.alert(t.password, t.passwordMinimum);

        return false;
      }

      if (password !== confirmPassword) {
        Alert.alert(t.confirmPassword, t.passwordsDoNotMatch);

        return false;
      }

      return true;
    };

    // =====================================================
    // CREATE ACCOUNT
    // =====================================================

    const handleCreateAccount = async () => {
      if (!validateForm()) {
        return;
      }

      try {
        setLoading(true);

        const accountData = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),

          location: {
            id: selectedLocation?.id,
            name: selectedLocation?.name,
            formatted: selectedLocation?.formatted,
            country: selectedLocation?.country,
            countryCode: selectedLocation?.countryCode,
            county: selectedLocation?.county,
            state: selectedLocation?.state,
            city: selectedLocation?.city,
            suburb: selectedLocation?.suburb,
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
          },

          farmName: farmName.trim(),
          farmSize: Number(farmSize),

          primaryCrops: primaryCrops
            .split(",")
            .map((crop) => crop.trim())
            .filter(Boolean),

          farmingType,

          password,
        };

        console.log("AgriConnect account:", accountData);

        /*
        * BACKEND REGISTRATION WILL BE CONNECTED HERE.
        */

        Alert.alert(t.accountCreated, t.registrationCompleted);
      } catch (error) {
        console.log("Registration error:", error);

        Alert.alert(t.error, t.accountCreationFailed);
      } finally {
        setLoading(false);
      }
    };

    // =====================================================
    // INPUT COMPONENT
    // =====================================================

    const inputClass =
      "flex-row items-center rounded-2xl border border-white/70 bg-white/55 px-4";

    // =====================================================
    // UI
    // =====================================================

    return (
      <SafeAreaView className="flex-1 bg-[#DFE0C3]">
        <KeyboardAwareScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={120}
          extraHeight={120}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          <Animated.View
            style={{
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
            <View className="px-6 pt-6">
              <View className="mb-3 self-start rounded-full bg-[#A8E063]/35 px-4 py-2">
                <Text className="text-xs font-bold text-[#5F8D37]">
                  {t.signupWelcome}
                </Text>
              </View>

              <Text className="text-3xl font-extrabold text-[#344C4B]">
                {t.createYourAccount}
              </Text>

              <Text className="mt-2 max-w-[340px] text-sm leading-5 text-[#5F8D37]">
                {t.signupSubtitle}
              </Text>
            </View>
            {/* =====================================================
              PERSONAL INFORMATION
          ===================================================== */}
            <View className="mt-8 px-5">
              <View className="mb-4 flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#A8E063]/40">
                  <Ionicons name="person-outline" size={20} color="#5F8D37" />
                </View>

                <View className="ml-3">
                  <Text className="text-lg font-bold text-[#344C4B]">
                    {t.personalInformation}
                  </Text>

                  <Text className="mt-0.5 text-xs text-[#6E796A]">
                    {t.personalInformationSubtitle}
                  </Text>
                </View>
              </View>

              {/* FIRST NAME */}

              <View>
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.firstName}
                </Text>

                <View className={inputClass}>
                  <Feather name="user" size={18} color="#5F8D37" />

                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder={t.firstName}
                    placeholderTextColor="#8A967D"
                    autoCapitalize="words"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>
              </View>

              {/* LAST NAME */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.lastName}
                </Text>

                <View className={inputClass}>
                  <Feather name="user" size={18} color="#5F8D37" />

                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder={t.lastName}
                    placeholderTextColor="#8A967D"
                    autoCapitalize="words"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>
              </View>

              {/* PHONE */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.phoneNumber}
                </Text>

                <View className={inputClass}>
                  <Feather name="phone" size={18} color="#5F8D37" />

                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="07XX XXX XXX"
                    placeholderTextColor="#8A967D"
                    keyboardType="phone-pad"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>
              </View>

              {/* EMAIL */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.emailAddress}
                </Text>

                <View className={inputClass}>
                  <Feather name="mail" size={18} color="#5F8D37" />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@email.com"
                    placeholderTextColor="#8A967D"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>
              </View>

              {/* LOCATION */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.countyLocation}
                </Text>

                <View className={inputClass}>
                  <Feather name="map-pin" size={18} color="#5F8D37" />

                  <TextInput
                    value={locationSearch}
                    onChangeText={(value) => {
                      setLocationSearch(value);
                      setSelectedLocation(null);
                    }}
                    placeholder={t.searchCountyLocation}
                    placeholderTextColor="#8A967D"
                    autoCapitalize="words"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />

                  {searchingLocations && (
                    <ActivityIndicator size="small" color="#5F8D37" />
                  )}

                  {!searchingLocations && locationSearch.length > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        setLocationSearch("");
                        setLocationResults([]);
                        setSelectedLocation(null);
                      }}
                    >
                      <Feather name="x" size={18} color="#5F8D37" />
                    </TouchableOpacity>
                  )}
                </View>

                {locationSearch.trim().length === 1 && (
                  <Text className="mt-2 px-1 text-xs text-[#5F8D37]">
                    {t.searchMinimum}
                  </Text>
                )}

                {/* LOCATION RESULTS */}

                {locationResults.length > 0 && (
                  <View className="mt-2 overflow-hidden rounded-2xl border border-white/70 bg-white">
                    {locationResults.map((location, index) => (
                      <Pressable
                        key={location.id || `${location.name}-${index}`}
                        onPress={() => handleLocationSelect(location)}
                        className={`px-4 py-4 ${
                          index !== locationResults.length - 1
                            ? "border-b border-[#DFE0C3]"
                            : ""
                        }`}
                      >
                        <View className="flex-row items-start">
                          <View className="mr-3 mt-1 h-9 w-9 items-center justify-center rounded-full bg-[#DFE0C3]">
                            <Ionicons
                              name="location-outline"
                              size={18}
                              color="#5F8D37"
                            />
                          </View>

                          <View className="flex-1">
                            <Text className="font-bold text-[#344C4B]">
                              {location.name ||
                                location.city ||
                                location.state ||
                                "Location"}
                            </Text>

                            <Text className="mt-1 text-xs leading-4 text-[#6E796A]">
                              {location.formatted || location.country}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                )}

                {/* SELECTED LOCATION */}

                {selectedLocation && (
                  <View className="mt-2 flex-row items-center rounded-2xl border border-[#A8E063] bg-[#A8E063]/20 px-4 py-3">
                    <Ionicons name="checkmark-circle" size={20} color="#5F8D37" />

                    <View className="ml-3 flex-1">
                      <Text className="text-xs font-semibold text-[#5F8D37]">
                        {t.selectedLocation}
                      </Text>

                      <Text className="mt-1 text-sm font-bold text-[#344C4B]">
                        {selectedLocation.formatted || selectedLocation.name}
                      </Text>
                    </View>
                  </View>
                )}

                {!searchingLocations &&
                  locationSearch.trim().length >= 2 &&
                  locationResults.length === 0 &&
                  !selectedLocation && (
                    <Text className="mt-2 px-1 text-xs text-[#6E796A]">
                      {t.noLocations}
                    </Text>
                  )}
              </View>
            </View>
            {/* =====================================================
              FARM DETAILS
          ===================================================== */}
            <View className="mt-9 px-5">
              <View className="mb-4 flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#F4C95D]/35">
                  <Ionicons name="leaf-outline" size={21} color="#5F8D37" />
                </View>

                <View className="ml-3">
                  <Text className="text-lg font-bold text-[#344C4B]">
                    {t.farmDetails}
                  </Text>

                  <Text className="mt-0.5 text-xs text-[#6E796A]">
                    {t.farmDetailsSubtitle}
                  </Text>
                </View>
              </View>

              {/* FARM NAME */}

              <View>
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.farmName}
                </Text>

                <View className={inputClass}>
                  <Ionicons name="business-outline" size={19} color="#5F8D37" />

                  <TextInput
                    value={farmName}
                    onChangeText={setFarmName}
                    placeholder={t.farmNamePlaceholder}
                    placeholderTextColor="#8A967D"
                    autoCapitalize="words"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>
              </View>

              {/* FARM SIZE */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.farmSize}
                </Text>

                <View className={inputClass}>
                  <Ionicons name="resize-outline" size={19} color="#5F8D37" />

                  <TextInput
                    value={farmSize}
                    onChangeText={setFarmSize}
                    placeholder="e.g. 5"
                    placeholderTextColor="#8A967D"
                    keyboardType="decimal-pad"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />

                  <Text className="text-sm font-bold text-[#5F8D37]">
                    {t.acres}
                  </Text>
                </View>
              </View>

              {/* PRIMARY CROPS */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.primaryCrops}
                </Text>

                <View className="flex-row items-start rounded-2xl border border-white/70 bg-white/55 px-4">
                  <Ionicons
                    name="leaf-outline"
                    size={19}
                    color="#5F8D37"
                    style={{
                      marginTop: 17,
                    }}
                  />

                  <TextInput
                    value={primaryCrops}
                    onChangeText={setPrimaryCrops}
                    placeholder={t.primaryCropsPlaceholder}
                    placeholderTextColor="#8A967D"
                    multiline
                    textAlignVertical="top"
                    className="ml-3 min-h-[90px] flex-1 py-4 text-[15px] text-[#344C4B]"
                  />
                </View>

                <Text className="mt-2 px-1 text-xs text-[#6E796A]">
                  {t.primaryCropsHint}
                </Text>
              </View>

              {/* FARMING TYPE */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.farmingType}
                </Text>

                <TouchableOpacity
                  onPress={() => setShowFarmingTypes(!showFarmingTypes)}
                  activeOpacity={0.8}
                  className="flex-row items-center rounded-2xl border border-white/70 bg-white/55 px-4 py-4"
                >
                  <Ionicons name="leaf-outline" size={19} color="#5F8D37" />

                  <Text
                    className={`ml-3 flex-1 text-[15px] ${
                      farmingType ? "text-[#344C4B]" : "text-[#8A967D]"
                    }`}
                  >
                    {farmingType || t.selectFarmingType}
                  </Text>

                  <Feather
                    name={showFarmingTypes ? "chevron-up" : "chevron-down"}
                    size={19}
                    color="#5F8D37"
                  />
                </TouchableOpacity>

                {showFarmingTypes && (
                  <View className="mt-2 overflow-hidden rounded-2xl border border-white/70 bg-white">
                    {farmingTypes.map((type, index) => {
                      const typeLabel = isSwahili ? type.sw : type.en;

                      return (
                        <Pressable
                          key={type.en}
                          onPress={() => handleFarmingTypeSelect(type)}
                          className={`px-4 py-4 ${
                            index !== farmingTypes.length - 1
                              ? "border-b border-[#DFE0C3]"
                              : ""
                          }`}
                        >
                          <View className="flex-row items-center">
                            <View className="h-9 w-9 items-center justify-center rounded-full bg-[#DFE0C3]">
                              <Ionicons
                                name={type.icon}
                                size={17}
                                color="#5F8D37"
                              />
                            </View>

                            <Text className="ml-3 flex-1 text-sm font-semibold text-[#344C4B]">
                              {typeLabel}
                            </Text>

                            {farmingType === typeLabel && (
                              <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color="#5F8D37"
                              />
                            )}
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
            {/* =====================================================
              ACCOUNT SECURITY
          ===================================================== */}
            <View className="mt-9 px-5">
              <View className="mb-4 flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E89B5A]/30">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={21}
                    color="#5F8D37"
                  />
                </View>

                <View className="ml-3">
                  <Text className="text-lg font-bold text-[#344C4B]">
                    {t.accountSecurity}
                  </Text>

                  <Text className="mt-0.5 text-xs text-[#6E796A]">
                    {t.accountSecuritySubtitle}
                  </Text>
                </View>
              </View>

              {/* PASSWORD */}

              <View>
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
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={19}
                      color="#5F8D37"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* CONFIRM PASSWORD */}

              <View className="mt-4">
                <Text className="mb-2 text-sm font-semibold text-[#344C4B]">
                  {t.confirmPassword}
                </Text>

                <View className={inputClass}>
                  <Feather name="lock" size={18} color="#5F8D37" />

                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={t.confirmPasswordPlaceholder}
                    placeholderTextColor="#8A967D"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    className="ml-3 flex-1 py-4 text-[15px] text-[#344C4B]"
                  />

                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Feather
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={19}
                      color="#5F8D37"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* =====================================================
              CREATE ACCOUNT
          ===================================================== */}
            <View className="mt-9 px-5">
              <TouchableOpacity
                onPress={() => router.push("/Verification")}
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
                      {t.createAccount}
                    </Text>

                    <View className="h-8 w-8 items-center justify-center rounded-full bg-[#A8E063]">
                      <Feather name="arrow-right" size={17} color="#344C4B" />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
            {/* =====================================================
              LOGIN
          ===================================================== */}
            <View className="mt-5 flex-row items-center justify-center px-5">
              <Text className="text-sm text-[#6E796A]">
                {t.alreadyHaveAccount}{" "}
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/SignIn")}
              >
                <Text className="text-sm font-bold text-[#5F8D37]">
                  {t.login}
                </Text>
              </TouchableOpacity>
            </View>
            {/* =====================================================
              BOTTOM BRANDING
          ===================================================== */}
            <View className="mt-8 items-center px-6">
              <View className="mb-3 h-1 w-12 rounded-full bg-[#A8E063]" />

              <Text className="text-center text-xs leading-5 text-[#6E796A]">
                {t.smarterFarming}
              </Text>
            </View>
          </Animated.View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };

  export default SignUp;
