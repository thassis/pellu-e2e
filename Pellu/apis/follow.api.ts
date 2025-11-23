import { IFollower, IFollowing } from '../types/follow.type';
import api from './axios';

export class FollowApi {
  static async getFollowers(userId: string, lastId?: string): Promise<IFollower[]> {
    try {
      const res = await api.get(
        `/follow/followers/${userId}`,
        { params: { lastId } }
      );
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }

  static async getFollowings(userId: string, lastId?: string): Promise<IFollowing[]> {
    try {
      const res = await api.get(
        `/follow/following/${userId}`,
        { params: { lastId } }
      );
      return res.data;
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }

  static async follow(userId: string): Promise<void> {
    try {
      await api.post(`/follow/${userId}`);
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }

  static async unfollow(userId: string): Promise<void> {
    try {
      await api.delete(`/follow/${userId}`);
    } catch (error) {
      console.error('Error response data:', error);
      return Promise.reject(error);
    }
  }
}
