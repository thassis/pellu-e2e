import { CommentType } from '../types/comment.type';
import api from './axios';

export class CommentApi {
  static getByPage = async (
    page: number,
    postId: string,
  ): Promise<CommentType[]> => {
    try {
      const res = await api.get('/comments', { params: { postId, page } });
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };

  static post = async (postId: string, comment: string): Promise<boolean> => {
    try {
      const res = await api.post('/comments', {
        postId,
        comment,
        parentCommentId: null,
      });
      return res.status === 204;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  };
}
