import { IUser, IUserAuthenticated, LocationCoords, ParamsPostLogin, UserTypes } from '../types/user.type';
import api from './axios';

export class UserApi {
  static doLogin = async (params: ParamsPostLogin): Promise<IUserAuthenticated> => {
    try {
      const res = await api.post(`/accounts/login`, {
        email: params.email,
        password: params.password,
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static checkEmail = async (
    email: string,
  ): Promise<{ registeredEmail: boolean }> => {
    try {
      const res = await api.post(`/accounts/check-email`, { email });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    isOng: boolean,
    publicPhone?: string,
    publicEmail?: string,
    publicInstagram?: string,
    bio?: string,
    address?: string,
    pix?: string,
    location?: LocationCoords,
  ): Promise<IUserAuthenticated> => {
    try {
      const res = await api.post(`/accounts/register`, {
        name,
        username,
        email,
        password,
        type: isOng ? 'ONG' : 'USER',
        publicPhone: publicPhone || undefined,
        publicEmail: publicEmail || undefined,
        publicInstagram: publicInstagram || undefined,
        bio,
        address,
        pix,
        location: isOng ? location : undefined,
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static edit = async (
    name: string,
    username: string,
    phone?: string,
    bio?: string,
    address?: string,
    pix?: string,
  ): Promise<IUserAuthenticated> => {
    try {
      const res = await api.put(`/accounts/edit`, {
        name,
        username,
        phone,
        bio,
        address,
        pix,
        location: {
          latitude: -20,
          longitude: -43,
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static delete = async (): Promise<void> => {
    try {
      await api.delete(`/accounts`);
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static uploadPicture = async (pictureUrl: string): Promise<string> => {
    try {
      const fileExtension = pictureUrl.split('.').pop()?.toLowerCase();

      const formData = new FormData();
      formData.append('picture', {
        uri: pictureUrl,
        type: fileExtension === 'png' ? 'image/png' : 'image/jpeg',
        name: `picture.${fileExtension}`,
      });

      const res = await api.put(`/accounts/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data?.picture || '';
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static getUser = async (userId: string): Promise<IUser> => {
    try {
      const res = await api.get(`/accounts/users/${userId}`);
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }

  static requestResetPassword = async (email: string): Promise<number> => {
    const res = await api.post(`/accounts/recovery-password-request`, { email });
    return res.status;
  }

  static resetPassword = async (email: string, code: string, newPassword: string): Promise<number> => {
    const res = await api.post(`/accounts/recovery-password-check`, { email, code, newPassword });
    return res.status;
  }

  static searchUsers = async (search?: string, lastId?: string, type?: UserTypes): Promise<IUser[]> => {
    try {
      const res = await api.get('/accounts/users', {
        params: { search, lastId, type },
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }

  static checkUsername = async (username: string): Promise<boolean> => {
    try {
      const res = await api.get(`/accounts/check-username/${username}`);
      return res.data?.exists || false;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }
}
