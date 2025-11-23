import {
  ParamsAddPetOffer,
  ParamsGetOffers,
  ResGetOffers,
} from '../types/offer.type';
import api from './axios';

export class OfferApi {
  static post = async (
    params: ParamsAddPetOffer,
  ): Promise<{offerId: string | undefined}> => {
    try {
      const res = await api.post('/offers', params);
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static getByPage = async (body: ParamsGetOffers): Promise<ResGetOffers> => {
    try {
      const res = await api.get('/offers', {params: body});
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static uploadImage = async (offerId: string, pictureUrl: string) => {
    try {
      const fileExtension = pictureUrl.split('.').pop()?.toLowerCase();

      const formData = new FormData();
      formData.append('picture', {
        uri: pictureUrl,
        type: fileExtension === 'png' ? 'image/png' : 'image/jpeg',
        name: `picture.${fileExtension}`,
      });

      const res = await api.post(`/offers/${offerId}/picture`, formData, {
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
