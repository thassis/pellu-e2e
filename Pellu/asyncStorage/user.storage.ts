import * as Keychain from 'react-native-keychain';
import { initAxiosJwtToken } from '../apis/axios';
import { IUserAuthenticated } from '../types/user.type';
import { OnboardingStorage } from './onboarding.storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserStorage = {
  user: undefined as IUserAuthenticated | undefined,
  get: async (): Promise<IUserAuthenticated | undefined> => {
    if (UserStorage.user) {
      return UserStorage.user;
    }
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        UserStorage.user = JSON.parse(credentials.password);
        return UserStorage.user;
      }
    } catch (e) {
      console.log("Error retrieving user:", e);
    }
    return undefined;
  },
  set: async (user: IUserAuthenticated) => {
    try {
      await Keychain.setGenericPassword('user', JSON.stringify(user));
      UserStorage.user = user;
      initAxiosJwtToken();
    } catch (e) {
      console.log("Error saving user:", e);
    }
  },
  updatePicture: async (picture: string) => {
    if (!UserStorage.user) {
      return;
    }
    try {
      UserStorage.user.picture = picture;
      await Keychain.setGenericPassword('user', JSON.stringify(UserStorage.user));
    } catch (e) {
      console.log("Error updating picture:", e);
    }
  },
  clear: async () => {
    try {
      await Keychain.resetGenericPassword();
      UserStorage.user = undefined;

      const onboarding = await OnboardingStorage.get();
      AsyncStorage.clear();
      await OnboardingStorage.set(onboarding);
    } catch (e) {
      console.log("Error clearing user:", e);
    }
  },
};