import axiosClient from '@/utils/axios';
import { useEffect, useState } from 'react';

function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/posts');
      setPosts(response.data.posts);
    } catch (err) {
      setError(err);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return {posts, loading, error, refetch: fetchData};
}

export default useFetchPosts