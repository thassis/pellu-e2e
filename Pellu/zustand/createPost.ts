import { StateCreator } from 'zustand';
import { IPost } from '../types/post.type';

export interface PostSlice {
  posts: IPost[] | undefined;
  addPosts: (args: IPost[]) => void;
  cleanPosts: () => void;
}

export const createPostSlice: StateCreator<PostSlice> = (set) => ({
  posts: undefined,
  addPosts: (args: IPost[]) => set(() => ({ posts: args })),
  cleanPosts: () => set(() => ({ posts: undefined })),
});

