import { IPost } from '../types/post.type';

const POSTS_KEY = 'POSTS_KEY';

export const PostStorage = {
  get: async (): Promise<IPost[]> => {
    if (typeof document === 'undefined') {
      return [];
    }

    const cookies = document.cookie.split('; ');
    const postsCookie = cookies.find(cookie => cookie.startsWith(`${POSTS_KEY}=`));

    if (!postsCookie) {
      return [];
    }

    try {
      const postsValue = postsCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(postsValue));
    } catch (error) {
      console.error('[POST_STORAGE_GET_ERROR]', error);
      return [];
    }
  },

  set: async (posts: IPost[]) => {
    if (typeof document === 'undefined') {
      return;
    }

    try {
      const postsString = encodeURIComponent(JSON.stringify(posts));
      // Cookie expira em 365 dias
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      document.cookie = `${POSTS_KEY}=${postsString}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.error('[POST_STORAGE_SET_ERROR]', error);
    }
  },
};