import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const requestPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

async function requestPermissionIos() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function requestNotificationPermission() {
  if (Platform.OS === 'ios') {
    await requestPermissionIos();
  } else {
    await requestPermissionAndroid();
  }
  // const checkToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   if (fcmToken) {
  //      console.log(fcmToken);
  //   }
  //  }

  //  checkToken();
}
