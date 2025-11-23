import { Alert, Platform } from "react-native";

export const showAlert = (
  title: string,
  message: string,
  buttons?: Array<{ text: string; onPress?: () => void; style?: 'cancel' | 'default' | 'destructive' }>
) => {
  if (Platform.OS === 'web') {
    const confirmButton = buttons?.find(btn => btn.style !== 'cancel');
    const result = window.confirm(`${title}\n\n${message}`);

    if (result && confirmButton?.onPress) {
      confirmButton.onPress();
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};