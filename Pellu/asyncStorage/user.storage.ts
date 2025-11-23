// import * as Keychain from 'react-native-keychain';
import { initAxiosJwtToken } from '@/apis/axios';
import { IUserAuthenticated } from '../types/user.type';
import { OnboardingStorage } from './onboarding.storage';

const USER_STORAGE_KEY = 'user';

const storageGet = (key: string): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.log('Error accessing localStorage:', e);
    return null;
  }
};

const storageSet = (key: string, value: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log('Error writing to localStorage:', e);
  }
};

const storageRemove = (key: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing from localStorage:', e);
  }
};

export const UserStorage = {
  user: undefined as IUserAuthenticated | undefined,
  get: async (): Promise<IUserAuthenticated | undefined> => {
    if (UserStorage.user) {
      return UserStorage.user;
    }
    try {
      const raw = storageGet(USER_STORAGE_KEY);
      if (!raw) return undefined;
      UserStorage.user = JSON.parse(raw) as IUserAuthenticated;
      return UserStorage.user;
    } catch (e) {
      // keep it silent; return undefined on parse error
      console.log('Error retrieving user from localStorage:', e);
      return undefined;
    }
  },
  set: async (user: IUserAuthenticated) => {
    try {
      storageSet(USER_STORAGE_KEY, JSON.stringify(user));
      UserStorage.user = user;
      initAxiosJwtToken();
    } catch (e) {
      console.log('Error saving user to localStorage:', e);
    }
  },
  updatePicture: async (picture: string) => {
    if (!UserStorage.user) {
      return;
    }
    try {
      UserStorage.user.picture = picture;
      storageSet(USER_STORAGE_KEY, JSON.stringify(UserStorage.user));
    } catch (e) {
      console.log('Error updating picture in localStorage:', e);
    }
  },
  clear: async () => {
    try {
      storageRemove(USER_STORAGE_KEY);
      UserStorage.user = undefined;

      // Preserve onboarding state (kept from original behavior).
      const onboarding = await OnboardingStorage.get();
      await OnboardingStorage.set(onboarding);
    } catch (e) {
      console.log('Error clearing user:', e);
    }
  },
};