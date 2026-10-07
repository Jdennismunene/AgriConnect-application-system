import "../../global.css";
import { Stack } from "expo-router";
import { LanguageProvider } from "@/context/LanguageContext";

const RootLayout = () => {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Welcome" />
        <Stack.Screen name="Language" />
        <Stack.Screen name="SignUp"/>
        <Stack.Screen name="SignIn"/>
        <Stack.Screen name="Verification" />
      </Stack>
    </LanguageProvider>
  );
};

export default RootLayout;