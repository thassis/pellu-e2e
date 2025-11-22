import { Alert, Linking, Platform } from 'react-native';

export const Link = {
  openMap: async (address: string, city: string, zipCode: string) => {
    const daddr = encodeURIComponent(`${address} ${zipCode}, ${city}`);
    const provider = Platform.OS === 'ios' ? 'apple' : 'google';
    const link = `https://maps.${provider}.com/?daddr=${daddr}`;

    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) await Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  },
  openWhatsApp: async (phoneNumber: number | string, message: string) => {
    const url = `whatsapp://send?phone=55${phoneNumber}&text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir o WhatsApp:', error);
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    }
  },
};
