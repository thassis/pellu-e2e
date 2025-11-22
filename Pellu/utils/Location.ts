import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const alertLocationIsRequired = (reason = 'Precisamos da sua localização para mostrar os pets mais próximos de você!\nPor favor, habilite a localização nas configurações do seu dispositivo.') => {
  Alert.alert(
    'Habilitar localização',
    reason,
  );
};

const requestLocationPermissionAndroid = async (reason?: string) => {
  try {
    const fineLocationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de localização',
        message:
          'Precisamos da sua localização para mostrar os pets mais próximos de você!',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    let coarseLocationGranted;
    if (fineLocationGranted !== PermissionsAndroid.RESULTS.DENIED) {
      coarseLocationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Permissão de localização aproximada',
          message:
            'Precisamos da sua localização para mostrar os pets mais próximos de você!',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
    }

    if (
      fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED ||
      coarseLocationGranted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      alertLocationIsRequired(reason);
      return false;
    }
  } catch (err) {
    return false;
  }
};

const requestLocationPermissionIOS = async (reason?: string) => {
  try {
    await Geolocation.requestAuthorization('whenInUse');
    return true;
  } catch (err) {
    alertLocationIsRequired(reason);
    return false;
  }
};

export const getLocation = async (reason?: string): Promise<
  Geolocation.GeoPosition | undefined
> => {
  const res =
    Platform.OS === 'ios'
      ? await requestLocationPermissionIOS()
      : await requestLocationPermissionAndroid();
  if (res) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          alertLocationIsRequired(reason);
          reject('[LOCATION_ERROR] permission is required');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
      );
    });
  }
};
