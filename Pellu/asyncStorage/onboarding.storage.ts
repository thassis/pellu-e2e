const ONBOARDING_KEY = 'onboardingCompleted';

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

export const OnboardingStorage = {
  get: async (): Promise<string> => {
    return cookieGet(ONBOARDING_KEY) || '';
  },
  set: async (value = 'true') => {
    cookieSet(ONBOARDING_KEY, value);
  },
  getWasShown: async (): Promise<boolean> => {
    const onboardingCompleted = await OnboardingStorage.get();
    return onboardingCompleted !== 'true';
  }
};
