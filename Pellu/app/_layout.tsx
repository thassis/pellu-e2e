import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { BottomSheetProvider } from "@/components/bottomSheet/BottomSheetContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    dark: false,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider
        settings={{
          icon: props => <MaterialIcons name={props.name as any} size={props.size} color={props.color} />,
        }}
        theme={theme}
      >
        <SafeAreaProvider>
          <BottomSheetProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <BottomSheet />
          </BottomSheetProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
