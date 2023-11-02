import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '@/utils/axios';

type Post = {
  id: number;
  uuid: string;
  created_at: number;
  author: {
    email: string;
    username: string;
    avatar: string;
    uuid: string;
  };
  authorAvatar: string;
  content: string;
  emoji: string;
  time: string;
  commentsCount: number;
  edited: boolean;
};

type PostsContextType = {
  posts: Post[];
  refetch: () => void;
  error: any;
  loading: boolean;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

type PostsProviderProps = {
  children: ReactNode;
};

export const PostsProvider: React.FC<PostsProviderProps> = ({children}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/posts');
      setPosts(response.data.posts);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <PostsContext.Provider value={{posts, refetch: fetchPosts, error, loading}}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
