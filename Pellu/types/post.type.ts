export const MY_POSTS_PER_PAGE = 20;

export type PostStatus =
  | 'DELETED'
  | 'MODERATED'
  | 'PUBLISHED';

export type UserPost = {
  name: string;
  picture: string;
};

export type IPollQuestion = {
  _id: string;
  title: string;
  numberVotes: number;
};

type VotedPost = {
  postId: string;
  pollQuestionId: string;
}

export type IPost = {
  _id: string;
  userId: string;
  type: 'IMAGE' | 'POLL' | 'VIDEO';
  description: string;
  status: PostStatus;
  numberComments: number;
  numberLikes: number;
  user: UserPost;
  pictures: string[];
  pollQuestions?: IPollQuestion[];
  youtubeVideoId?: string;
  isLiked: boolean;
  pollQuestionId?: string;
};

export type ParamsGetByPage = {
  page: number;
  latitude?: number;
  longitude?: number;
  userId?: string;
};

export type ParamsAddPost = {
  type: 'VIDEO' | 'IMAGE' | 'POLL';
  description: string;
  pollQuestions: string[] | null;
  youtubeVideoId?: string | null;
  boost?: boolean;
};

export type ResAddPost = {
  postId: string;
};
