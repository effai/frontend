import React from "react";
import CommentIcon from "../icons/CommentIcon";
import { timeStatus } from '@/utils/times';
import KebabMenu from '@/components/KebabMenu';
import axiosClient from '@/utils/axios';

interface PostProps {
  post: {
    id: number;
    createdAt: number,
    user: {
      email: string;
      username: string;
      avatar_base64: string;
    };
    authorAvatar: string;
    content: string;
    icon: string;
    time: string;
    commentsCount: number;
    edited: boolean;
  }
}

const Post: React.FC<PostProps> = ({ post }) => {
  console.log(post)
  const { user, content, createdAt , icon, time, commentsCount, edited } = post;
  const handleEdit = async () => {
    const newContent = prompt("Edit your post:", content);
    if (newContent && newContent !== content) {
      try {
        await axiosClient.put(`/posts/${post.id}`, { content: newContent });
        // Refresh posts after editing
        // You might want to use some form of global state management (like Redux, React Context API) or event bus to notify the posts list component to refresh.
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axiosClient.delete(`/posts/${post.id}`);
        // Refresh posts after deleting
        // As mentioned above, use a method to notify the posts list component to refresh.
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };
  
  return (
    <div
      className="w-full post-container border-2 border-gray-800 p-5 space-y-4 rounded-md font-basier grid  bg-container">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <img className=" w-12 h-12 rounded-full object-cover shadow" src={`data:image/jpeg;base64,${post.user.avatar_base64}`} alt=""/>
          <div className="flex flex-col justify-center">
            <span className="text-gray-300 text-md">{ user.username ?? 'Anonymous' }</span>
            <span className="text-gray-400 text-sm">{ timeStatus(createdAt) } { edited ? " • Edited" : "" }</span>
          </div>
        </div>
        <KebabMenu onEdit={handleEdit} onDelete={handleDelete}/>
        
      </div>
      <div
        className="bg-message-container flex justify-start p-5 gap-x-5 items-center grid-rows-1 h-24 w-24 min-w-full min-h-[6em] rounded-md bg-gray-900">
        <div
          className="bg-container flex items-center justify-center w-12 h-12   rounded-full">
          { icon }
        </div>
        <div className="col-start-2 text-gray-500 text-lg">{ content }</div>
      
      </div>
      <div className="flex justify-start">
        <CommentIcon/>
        
        <span className="text-gray-500 ml-2">{ commentsCount } comments</span>
      </div>
    </div>
  );
};

export default Post;
