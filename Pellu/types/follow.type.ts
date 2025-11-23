export type FollowUser = {
  _id: string,
  name: string,
  username: string,
  picture: string
}

export type IFollower = {
  _id: string,
  from: string,
  fromUser: FollowUser
};

export type IFollowing = {
  _id: string,
  to: string,
  toUser: FollowUser
}