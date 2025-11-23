// import * as Keychain from 'react-native-keychain';
import { IUserAuthenticated } from '../types/user.type';
import { OnboardingStorage } from './onboarding.storage';

const USER_COOKIE = 'user';

const cookieGet = (name: string): string => {
  if (typeof document === 'undefined') return '';
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const match = cookies.find((row) => row.startsWith(name + '='));
  if (!match) return '';
  const value = match.split('=').slice(1).join('=');
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const cookieSet = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  document.cookie = cookie;
};

const cookieRemove = (name: string) => {
  if (typeof document === 'undefined') return;
  // set expire in the past
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const UserStorage = {
  user: undefined as IUserAuthenticated | undefined,
  get: async (): Promise<IUserAuthenticated | undefined> => {
    if (UserStorage.user) {
      return UserStorage.user;
    }
    try {
      const raw = cookieGet(USER_COOKIE);
      if (!raw) return undefined;
      UserStorage.user = JSON.parse(raw) as IUserAuthenticated;
      return UserStorage.user;
    } catch (e) {
      // keep it silent; return undefined on parse error
      console.log('Error retrieving user from cookie:', e);
      return undefined;
    }
  },
  set: async (user: IUserAuthenticated) => {
    try {
      cookieSet(USER_COOKIE, JSON.stringify(user));
      UserStorage.user = user;
      // initAxiosJwtToken();
    } catch (e) {
      console.log('Error saving user to cookie:', e);
    }
  },
  updatePicture: async (picture: string) => {
    if (!UserStorage.user) {
      return;
    }
    try {
      UserStorage.user.picture = picture;
      cookieSet(USER_COOKIE, JSON.stringify(UserStorage.user));
    } catch (e) {
      console.log('Error updating picture in cookie:', e);
    }
  },
  clear: async () => {
    try {
      cookieRemove(USER_COOKIE);
      UserStorage.user = undefined;

      // Preserve onboarding state (kept from original behavior).
      const onboarding = await OnboardingStorage.get();
      await OnboardingStorage.set(onboarding);
    } catch (e) {
      console.log('Error clearing user:', e);
    }
  },
};