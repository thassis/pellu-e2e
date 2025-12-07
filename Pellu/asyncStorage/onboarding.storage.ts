const ONBOARDING_KEY = 'onboardingCompleted';

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

export const OnboardingStorage = {
  get: async (): Promise<string> => {
    return storageGet(ONBOARDING_KEY) || '';
  },
  set: async (value = 'true') => {
    storageSet(ONBOARDING_KEY, value);
  },
  getWasShown: async (): Promise<boolean> => {
    const onboardingCompleted = await OnboardingStorage.get();
    console.log({ onboardingCompleted })
    return onboardingCompleted !== 'true';
  }
};
