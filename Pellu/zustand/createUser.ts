import { StateCreator } from 'zustand';
import { IUserAuthenticated } from '../types/user.type';

export interface UserSlice {
  user: IUserAuthenticated | undefined;
  addUser: (args: IUserAuthenticated) => void;
  cleanUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: undefined,
  addUser: (args: IUserAuthenticated) => set(() => ({ user: args })),
  cleanUser: () => set(() => ({ user: undefined })),
});
