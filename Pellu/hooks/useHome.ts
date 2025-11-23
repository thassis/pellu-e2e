import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { PostApi } from '../apis/post.api';
import { useStore } from '../zustand/useStore';

const useHome = () => {
  const { posts: oldPosts, addPosts } = useStore(state => ({
    posts: state.posts,
    addPosts: state.addPosts,
  }));
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [pageState, setPage] = useState(1);
  const [canFetchState, setCanFetch] = useState(true);

  const fetchNewPosts = async (canFetch = canFetchState, page = pageState) => {
    if (!canFetch) return;

    setLoading(true);
    setCanFetch(false);
    const posts = await PostApi.getFeed({
      page: page + 1,
    });

    if (posts.length !== 0) {
      setPage(page + 1);
    }

    let mergedPosts;
    if (page > 0) {
      mergedPosts = [...(oldPosts ?? []), ...posts];
    } else {
      mergedPosts = posts;
    }

    addPosts(mergedPosts);

    setLoading(false);
    setTimeout(() => {
      setCanFetch(true);
    }, 3000);
  };

  useEffect(() => {
    if (isFocused && oldPosts === undefined || oldPosts?.length === 0) {
      fetchNewPosts(true, 0);
    }
  }, [isFocused]);

  return { fetchNewPosts, loading };
};

export default useHome;
