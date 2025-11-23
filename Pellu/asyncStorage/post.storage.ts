import { IPost } from '../types/post.type';

const POSTS_KEY = 'POSTS_KEY';

export const PostStorage = {
  get: async (): Promise<IPost[]> => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }

    try {
      const postsValue = localStorage.getItem(POSTS_KEY);
      if (!postsValue) {
        return [];
      }
      return JSON.parse(postsValue);
    } catch (error) {
      console.error('[POST_STORAGE_GET_ERROR]', error);
      return [];
    }
  },

  set: async (posts: IPost[]) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error('[POST_STORAGE_SET_ERROR]', error);
    }
  },
};