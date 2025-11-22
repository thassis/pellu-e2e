import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPost } from '../types/post.type';

const POSTS_KEY = 'POSTS_KEY';

export const PostStorage = {
  get: async (): Promise<IPost[]> => {
    const posts = await AsyncStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  },
  set: async (posts: IPost[]) => {
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },
};
