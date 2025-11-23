import { useEffect, useState } from 'react';
import { HomeService } from '../../../services/home';
import {
  CommentType,
  MAX_COMMENTS_PER_PAGE,
} from '../../../types/comment.type';
import { useStore } from '../../../zustand/useStore';

const useComments = (postId: string) => {
  const { user } = useStore(state => ({ user: state.user }));
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const handleNextPage = async (nextComments: CommentType[]) => {
    if (nextComments.length <= MAX_COMMENTS_PER_PAGE) {
      setLastPage(true);
    } else {
      setPage(page + 1);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    const comments = await HomeService.getCommentsByPage(1, postId);
    handleNextPage(comments);

    const commentsState = comments.map(comment => ({
      ...comment,
      loading: false,
      childrenPage: 1,
    }));
    setComments(commentsState);

    setLoading(false);
  };

  const postComment = async (comment: string) => {
    if (!comment) return;
    const success = await HomeService.postComment(postId, comment);

    if (success && user) {
      const newComment: CommentType = {
        _id: `local_id_${new Date().getTime().toString()}`,
        comment,
        postId,
        user: { ...user },
      };
      setComments([{ ...newComment }, ...comments]);
    }
  };

  useEffect(() => {
    if (!postId) return;

    fetchComments();
  }, [postId]);

  return {
    loading,
    comments,
    lastPage,
    postComment,
  };
};

export default useComments;
