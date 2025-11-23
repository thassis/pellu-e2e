import {
  IPost,
  ParamsAddPost,
  ParamsGetByPage,
  ResAddPost,
} from '../types/post.type';
import api from './axios';

export class PostApi {
  static getFeed = async (params: ParamsGetByPage): Promise<IPost[]> => {
    try {
      const res = await api.get(`/posts/feed`, {
        params: {
          page: params.page,
          latitude: params.latitude,
          longitude: params.longitude,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static getByUser = async (params: ParamsGetByPage): Promise<IPost[]> => {
    try {
      const res = await api.get(`/posts/user`, {
        params: {
          page: params.page,
          latitude: params.latitude,
          longitude: params.longitude,
          userId: params.userId,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static addPost = async (params: ParamsAddPost): Promise<ResAddPost> => {
    try {
      const res = await api.post('/posts', params);
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static uploadImage = async (postId: string, pictureUrl: string) => {
    try {
      const fileExtension = pictureUrl.split('.').pop()?.toLowerCase();

      const formData = new FormData();
      formData.append('picture', {
        uri: pictureUrl,
        type: fileExtension === 'png' ? 'image/png' : 'image/jpeg',
        name: `picture.${fileExtension}`,
      });

      const res = await api.post(`/posts/${postId}/picture`, formData, {
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

  static like = async (postId: string) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);
      return res.status === 204;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static dislike = async (postId: string) => {
    try {
      const res = await api.delete(`/posts/${postId}/like`);
      return res.status === 204;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static votePoll = async (postId: string, pollQuestionId: string | null) => {
    try {
      const res = await api.put(`/posts/${postId}/vote`, { pollQuestionId });
      return res.status === 204;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }
}
