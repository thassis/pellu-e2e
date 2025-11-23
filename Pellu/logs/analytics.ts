import NetInfo from '@react-native-community/netinfo';
// import analytics from '@react-native-firebase/analytics';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { UserStorage } from '../asyncStorage/user.storage';

const getCommonParams = async () => ({
  timestamp: new Date().toISOString(),
  user_id: UserStorage.user?.email || '',
  app_version: '1.0.0'/*Device.getVersion()*/,
  device_model: Device.modelName,
  platform: Platform.OS,
  network_status: await getNetworkStatus(),
});

export const logEvent = async (eventName: EventType, params?: Record<string, any>) => {
  try {
    const commonParams = await getCommonParams();
    // await analytics().logEvent(eventName, { ...commonParams, ...params });

    console.log(`Logged event: ${eventName}`, { ...commonParams, ...params });
  } catch (error) {
    console.error(`Error logging event: ${eventName}`, error);
  }
};

const getNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) return "offline";
  return state.type;
};

export type EventType =
  | "share_post_home" //
  | "help_ong_home" //
  | "help_ong_detail" //
  | "help_ong_pix" //
  | "create_post" //
  | "create_pet_offer" //
  | "create_add_hub" //
  | "create_new_my_pet" //
  | "delete_my_pet"  //
  | "create_new_vaccine" //
  | "delete_vaccine" //
  | "logout" //
  | "my_posts" //
  | "my_post_details" //
  | "delete_account" //
  | "login" //
  | "login_from_comment" //
  | "login_from_add_hub" //
  | "login_from_my_pets" //
  | "pet_clicked"
  | "pet_contact_clicked"
  | "share_user" //
  | "go_to_profile_from_post" //
  | "follow_user" //

