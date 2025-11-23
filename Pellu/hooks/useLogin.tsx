import { LoginNextScreen } from "@/types/screen.type";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { cleanAxiosJwtToken } from "../apis/axios";
import { UserStorage } from "../asyncStorage/user.storage";
import { logEvent } from "../logs/analytics";
import { useStore } from "../zustand/useStore";

const useLogin = () => {
  const { userAuthenticated, cleanUser, cleanPosts } = useStore(state => ({
    userAuthenticated: state.user,
    cleanUser: state.cleanUser,
    cleanPosts: state.cleanPosts,
  }));
  const { navigate, replace } = useRouter();

  const isLoggedIn = !!userAuthenticated;

  const requireLogin = (
    callbackIfLoggedIn: () => void,
    title = 'Login necessário',
    message = 'Faça login para continuar',
    nextScreen: LoginNextScreen = '/home'
  ) => {
    if (!isLoggedIn) {
      Alert.alert(title, message, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Fazer login', onPress: () => navigate({ pathname: '/login', params: { nextScreen } }) },
      ]);
      return false;
    }

    callbackIfLoggedIn();
  }

  const handleLogout = async () => {
    Alert.alert('Logout', 'Deseja realmente sair da sua conta?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: async () => {
          logout();
        },
      },
    ]);
  };

  const logout = async () => {
    logEvent('logout');

    await UserStorage.clear();
    cleanAxiosJwtToken();
    cleanUser();
    cleanPosts();
    Alert.alert('Logout', 'Você saiu da sua conta com sucesso!');
    replace('/home');
  };

  return {
    isLoggedIn,
    requireLogin,
    handleLogout,
    logout,
  };
}

export default useLogin;