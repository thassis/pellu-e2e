import { fetch } from '@react-native-community/netinfo';
import { useEffect } from 'react';
// import SpInAppUpdates, { IAUInstallStatus, IAUUpdateKind, NeedsUpdateResponse, StartUpdateOptions } from 'sp-react-native-in-app-updates';

import { useRouter } from 'expo-router';
import { initAxiosJwtToken } from '../apis/axios';
import { PostApi } from '../apis/post.api';
import { OnboardingStorage } from '../asyncStorage/onboarding.storage';
// import { requestNotificationPermission } from '../../../../utils/Notifications';
import { PostStorage } from '../asyncStorage/post.storage';
import { UserStorage } from '../asyncStorage/user.storage';
import { useStore } from '../zustand/useStore';

const useSplash = () => {
  const { replace } = useRouter();
  const { addPosts, addUser } = useStore(state => ({
    addPosts: state.addPosts,
    addUser: state.addUser,
  }));

  const fetchPosts = async () => {
    const posts = await PostApi.getFeed({
      page: 1,
      latitude: 20.2,
      longitude: 40.1,
    });
    addPosts(posts);
    PostStorage.set(posts);
  };

  const fetchLocalPosts = async () => {
    const posts = await PostStorage.get();
    addPosts(posts);
  };

  const recoverSession = async () => {
    await initAxiosJwtToken();
    const userFromStorage = await UserStorage.get();
    if (userFromStorage) addUser(userFromStorage);
  };

  const startLoadingPosts = async () => {
    await recoverSession();

    fetch()
      .then(async state => {
        if (state.isConnected) {
          await fetchPosts();
        } else {
          await fetchLocalPosts();
        }

        const goToOnboarding = await OnboardingStorage.getWasShown();

        if (goToOnboarding) {
          replace('/onboarding');
        } else {
          replace('/home');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const checkForUpdates = (callback: () => void) => {
  //   const inAppUpdates = new SpInAppUpdates(
  //     false, // debug mode
  //   );

  //   inAppUpdates
  //     .checkNeedsUpdate()
  //     .then((result: NeedsUpdateResponse) => {
  //       if (result.shouldUpdate) {
  //         Alert.alert(
  //           'Atualização disponível',
  //           'Uma nova versão do aplicativo está disponível. Para continuar, você deve atualizar o app.',
  //           [
  //             { text: 'Atualizar', onPress: () => startUpdating(callback) },
  //           ],
  //           { cancelable: false });
  //       } else {
  //         callback();
  //       }
  //     })
  //     .catch(error => {
  //       if (__DEV__) {
  //         callback();
  //       } else {
  //         Alert.alert('Erro', 'Não foi possível verificar atualizações, tente novamente mais tarde.');
  //       }
  //     });
  // }

  // const startUpdating = (callback: () => void) => {
  //   const inAppUpdates = new SpInAppUpdates(
  //     false, // debug mode
  //   );
  //   if (Platform.OS === 'ios') {
  //     let updateOptions: StartUpdateOptions = {
  //       forceUpgrade: true,
  //     };
  //     inAppUpdates.startUpdate(updateOptions).catch((e) => {
  //       console.log('startUpdate error', e)
  //     });
  //     return;
  //   }
  //   let updateOptions: StartUpdateOptions = {
  //     updateType: IAUUpdateKind.IMMEDIATE,
  //   };

  //   const alertRestartApp = () => {
  //     Alert.alert(
  //       'Atualização disponível',
  //       'A atualização foi interrompida. Será necessário reiniciar o app para continuar.',
  //       [
  //         { text: 'OK, reiniciar', onPress: () => { } },
  //       ],
  //       { cancelable: false });
  //   }

  //   inAppUpdates.addStatusUpdateListener(downloadStatus => {
  //     Alert.alert('Atualização', 'Status: ' + downloadStatus.status);
  //     if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
  //       inAppUpdates.removeStatusUpdateListener(finalStatus => { });
  //       inAppUpdates.installUpdate();
  //     }

  //     if (downloadStatus.status === IAUInstallStatus.FAILED) {
  //       inAppUpdates.removeStatusUpdateListener(finalStatus => { });
  //       alertRestartApp();
  //     }

  //     if (downloadStatus.status === IAUInstallStatus.CANCELED) {
  //       inAppUpdates.removeStatusUpdateListener(finalStatus => { });
  //       alertRestartApp();
  //     }
  //   });

  //   inAppUpdates.startUpdate(updateOptions);
  // }

  useEffect(() => {
    // checkForUpdates(() => {
    // requestNotificationPermission();
    startLoadingPosts();
    // });
  }, []);

  return {};
};

export default useSplash;
