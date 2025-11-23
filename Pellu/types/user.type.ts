export type IUserAuthenticated = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
  username: string;
  phone: string;
  address: string;
  pix: string;
  bio: string;
  type: UserTypes;
}

export type IUser = {
  _id: string;
  name: string;
  picture: string;
  followersCount: number;
  followingCount: number;
  bio: string;
  postsCount: number;
  username: string;
  isFollowing?: boolean;
}

export type ParamsPostLogin = {
  email: string;
  password: string;
};

export type UserTypes = 'USER' | 'ONG';

export type LocationCoords = {
  latitude: number;
  longitude: number;
}