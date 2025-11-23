import { createWithEqualityFn as create } from 'zustand/traditional';
import { NewPetOfferSlice, createNewPetOfferSlice } from './createNewPetOffer';
import { NewPostSlice, createNewPostSlice } from './createNewPost';
import { PostSlice, createPostSlice } from './createPost';
import { UserSlice, createUserSlice } from './createUser';

export const useStore = create<
  PostSlice & UserSlice & NewPostSlice & NewPetOfferSlice
>()((...a) => ({
  ...createPostSlice(...a),
  ...createUserSlice(...a),
  ...createNewPostSlice(...a),
  ...createNewPetOfferSlice(...a),
}));
