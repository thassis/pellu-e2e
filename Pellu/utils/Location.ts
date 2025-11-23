import { Alert } from 'react-native';

const alertLocationIsRequired = (reason = 'Precisamos da sua localização para mostrar os pets mais próximos de você!\nPor favor, habilite a localização nas configurações do seu dispositivo.') => {
  Alert.alert(
    'Habilitar localização',
    reason,
  );
};

const getLocationWeb = async (reason?: string): Promise<GeolocationPosition | undefined> => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by this browser.');
    alertLocationIsRequired(reason);
    return undefined;
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        console.error('[LOCATION_ERROR]', error.message);
        alertLocationIsRequired(reason);
        reject('[LOCATION_ERROR] permission is required');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
    );
  });
};

export const getLocation = async (reason?: string): Promise<GeolocationPosition | undefined> => {
  return getLocationWeb(reason);
};