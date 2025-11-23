import { CommentApi } from '../apis/comments.api';
import { PostApi } from '../apis/post.api';
import { CommentType } from '../types/comment.type';

export class HomeService {
  static getCommentsByPage = (
    page: number,
    postId: string,
  ): Promise<CommentType[]> => {
    return CommentApi.getByPage(page, postId);
  };

  static postComment = (postId: string, comment: string): Promise<boolean> => {
    return CommentApi.post(postId, comment);
  };

  static postLike = async (
    postId: string,
    liked: boolean,
  ): Promise<boolean> => {
    if (liked) {
      const success = await PostApi.like(postId);
      return success;
    }

    const success = await PostApi.dislike(postId);
    return success;

  };

  static votePoll = async (
    postId: string,
    pollId: string,
    isRemovingVote: boolean,
  ): Promise<boolean> => {
    if (isRemovingVote) {
      return PostApi.votePoll(postId, null);
    }
    return PostApi.votePoll(postId, pollId);
  };
}
