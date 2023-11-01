import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import axiosClient from '@/utils/axios';
import { useAuth } from '@/context/AuthContext';

import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';

const Posts: React.FC = () => {
  
  const {isAuthenticated, user} = useAuth();
  const [postData, setPostData] = useState({
    content: '',
    author: false,
    emoji: '1f4ac',
    anon: false
  })
  const [posts, setPosts] = useState([]);
  const [postAnonymous, setPostAnonymous] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<string>('1f4ac');
  const [showPicker, setShowPicker] = useState(false);
  
  const handleEmojiClick = (emoji: EmojiClickData) => {
    setPostData({...postData, emoji: emoji.unified})
    setShowPicker(false);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      const response = await axiosClient.get('/posts');
      console.log(response)
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postData.content) {
      try {
        const data = postAnonymous || !isAuthenticated
          ? postData
          : {...postData, username: user?.username};
        await axiosClient.post('/posts', data);
        setPostData({anon: false, author: false, content: '', emoji: ''})
        fetchPosts();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };
  console.log(posts)
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
              onClick={() => setShowPicker(!showPicker)}>
              {postData.emoji ? <Emoji unified={postData.emoji } size={24}/> : null}
            
            </div>
            {showPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick}/>
            )}
            
            <input
              className="bg-transparent text-gray-300 text-md block p-2.5 focus:outline-none"
              placeholder="How are you feeling today?"
              value={postData.content}
              onChange={(e) => setPostData({...postData, content: e.target.value})}
            />
          </div>
          <div className={`flex ${isAuthenticated ? 'justify-between' : 'justify-end'} gap-4 mt-4 pl-4`}>
            {isAuthenticated &&
              <label htmlFor="anonymous" className="flex cursor-pointer gap-4 items-center text-white text-md">
                <input
                  type="checkbox"
                  name="anonymous"
                  id="anonymous"
                  checked={postAnonymous}
                  onChange={(e) => setPostData({...postData, anon: e.target.checked})}
                />
                Post anonymously
              </label>
            }
            <button type="submit"
                    className="bg-blue-500 text-white text-lg font-medium rounded-md text-md px-12 py-2.5 text-center">Post
            </button>
          </div>
        </form>
      </div>
      {posts && posts.map((post) => <Post post={post} key={post}/>)}
    </div>
  );
};

export default Posts;
