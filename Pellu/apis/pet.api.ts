import {
  ParamsAddPet,
  ParamsAddVaccine,
  ResGetPet,
  ResGetPets,
} from '../types/pet.type';
import api from './axios';

export class PetApi {
  static post = async (
    params: ParamsAddPet,
  ): Promise<{petId: string | undefined}> => {
    try {
      const res = await api.post('/pets', params);
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static getAll = async (): Promise<ResGetPets> => {
    try {
      const res = await api.get('/pets');
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static getOne = async (petId: string): Promise<ResGetPet> => {
    try {
      const res = await api.get(`/pets/${petId}`);
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static postVaccine = async (
    petId: string,
    params: ParamsAddVaccine,
  ): Promise<void> => {
    try {
      await api.post(`/pets/${petId}/vaccines`, params);
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static deleteVaccine = async (
    petId: string,
    vaccineId: string,
  ): Promise<void> => {
    try {
      await api.delete(`/pets/${petId}/vaccines/${vaccineId}`);
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static deleteOne = async (petId: string): Promise<void> => {
    try {
      await api.delete(`/pets/${petId}`);
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static uploadImage = async (petId: string, pictureUrl: string) => {
    try {
      const fileExtension = pictureUrl.split('.').pop()?.toLowerCase();

      const formData = new FormData();
      formData.append('picture', {
        uri: pictureUrl,
        type: fileExtension === 'png' ? 'image/png' : 'image/jpeg',
        name: `picture.${fileExtension}`,
      });

      const res = await api.post(`/pets/${petId}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.status === 204;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };
}
