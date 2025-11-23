export const MAX_COMMENTS_PER_PAGE = 20;

export type CommentType = {
  _id: string;
  postId: string;
  parentCommentId?: number | null;
  comment: string;
  user: {
    name: string;
    picture: string;
  };
  numberChildrenComments?: number | null;
};
