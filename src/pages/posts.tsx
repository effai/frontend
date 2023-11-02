import React, { useState } from 'react';
import Post from '../components/Post';
import axiosClient from '@/utils/axios';
import { useAuth } from '@/context/AuthContext';

import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import InputPopover from '@/components/InputPopover';
import { usePosts } from '@/context/PostsContext';

type Post = {
  id: number;
  uuid: string;
  created_at: number,
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
}
export type PostProps = {
  post: Post
}

const Posts: React.FC = () => {
  
  const {isAuthenticated, user} = useAuth();
  const [postData, setPostData] = useState({
    uuid: '',
    content: '',
    username: '',
    emoji: '1f4ac',
    is_anon: false
  })
  const {posts, refetch} = usePosts();
  const [showPicker, setShowPicker] = useState(false);
  
  const handleEmojiClick = (emoji: EmojiClickData) => {
    setPostData({...postData, emoji: emoji.unified})
    setShowPicker(false);
  };
  console.log(posts)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postData.content && isAuthenticated) {
      try {
        const data = postData.is_anon || !isAuthenticated
          ? {...postData, uuid: user?.uuid}
          : {...postData, username: user?.username};
        await axiosClient.post('/posts', data);
        setPostData({
          uuid: '',
          content: '',
          username: '',
          emoji: '1f4ac',
          is_anon: false
        })
        refetch()
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };
  
  return (
    <div className="w-[48rem] mt-10 space-y-4 mx-auto flex flex-col">
      <div className="mb-5">
        <h1 className="text-gray-400 text-2xl">
          Hello {isAuthenticated ? user?.username : 'Anonymous = )'}
        </h1>
        <p className="text-gray-200 text-md">How are you doing today? Would you like to share something with the
          community 🤗</p>
      </div>
      <div
        className="w-full post-container border-2 border-gray-800 p-5 space-y-4 rounded-md font-basier grid bg-container">
        <div className="text-gray-300 text-xl">Create post</div>
        <form action="#" onSubmit={handleSubmit}>
          <div
            className="bg-message-container flex justify-start p-5 gap-x-5 items-center grid-rows-1 h-24 w-24 min-w-full min-h-[6em] rounded-md bg-gray-900">
            <div
              className="bg-container cursor-pointer flex items-center justify-center relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full"
              onClick={() => isAuthenticated && setShowPicker(!showPicker)}>
              {postData.emoji ? <Emoji unified={postData.emoji} size={24}/> : null}
            </div>
            
            <InputPopover className="flex-1" isAuthenticated={isAuthenticated}
                          popoverContent={'You must register to leave a message'}>
              <input
                className="bg-transparent text-gray-300 border-b text-md block p-2.5 focus:outline-none w-full"
                placeholder="How are you feeling today?"
                id="content"
                disabled={!isAuthenticated}
                value={postData.content}
                onChange={(e) => setPostData({...postData, content: e.target.value})}
              />
            </InputPopover>
          </div>
          <div className={`flex ${isAuthenticated ? 'justify-between' : 'justify-end'} gap-4 mt-4 pl-4`}>
            {isAuthenticated &&
              <label htmlFor="anonymous" className="flex cursor-pointer gap-4 items-center text-white text-md">
                <input
                  type="checkbox"
                  name="anonymous"
                  id="anonymous"
                  checked={postData.is_anon}
                  onChange={(e) => setPostData({...postData, is_anon: e.target.checked})}
                />
                Post anonymously
              </label>
            }
            <button type="submit"
                    disabled={!isAuthenticated}
                    className="bg-blue-500 text-white text-lg font-medium rounded-md text-md px-12 py-2.5 text-center">
              Post
            </button>
          </div>
        </form>
        {showPicker && (
          <div className="absolute">
            <EmojiPicker lazyLoadEmojis onEmojiClick={handleEmojiClick}/>
          </div>
        )}
      </div>
      {posts && posts.map((post: Post) => <Post post={post} key={post.uuid}/>)}
    </div>
  );
};

export default Posts;
