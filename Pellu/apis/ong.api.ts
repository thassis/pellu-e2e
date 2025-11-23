import { IOng } from "../types/ong.type"
import api from "./axios";

export class OngApi {
  static getAll = async (latitude?: number, longitude?: number, search?: string, lastId?: string): Promise<IOng[]> => {
    try {
      const res = await api.get('/accounts/ongs', {
        params: {
          latitude,
          longitude,
          search,
          lastId,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };
}