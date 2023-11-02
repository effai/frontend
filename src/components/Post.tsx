import React, { useEffect, useState } from 'react';
import CommentIcon from '../icons/CommentIcon';
import { timeStatus } from '@/utils/times';
import KebabMenu from '@/components/KebabMenu';
import axiosClient from '@/utils/axios';
import { Emoji } from 'emoji-picker-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { PostProps } from '@/pages/posts';
import { usePosts } from '@/context/PostsContext';


type Author = {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

type CommentsProps = {
  id: number;
  content: string;
  author_id: number;
  post_id: number;
  author: Author;
}[]

const Post: React.FC<PostProps> = ({post}) => {
  const {author, content, created_at: createdAt, emoji, commentsCount, edited} = post;
  const {isAuthenticated, user} = useAuth();
  const {refetch} = usePosts();
  
  const [comments, setComments] = useState<CommentsProps | undefined>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  useEffect(() => {
    fetchComments();
  }, [post.id]);
  
  const fetchComments = async () => {
    try {
      const response = await axiosClient.get(`/comments/${post.id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  const handleAddComment = async () => {
    try {
      await axiosClient.post('/comments', {content: newComment, post_id: post.id});
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const handleEdit = async () => {
    const newContent = prompt('Edit your post:', content);
    if (newContent && newContent !== content) {
      try {
        const dataToSend = {
          content: newContent,
          user_uuid: user?.uuid
        };
        await axiosClient.put(`/posts/${post.uuid}`, dataToSend);
        toast.success('Post updated successfully');
        refetch();  // Refetch the posts to update the UI
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const dataToSend = {
          user_uuid: user?.uuid,
          author_uuid: post.author.uuid
        };
        await axiosClient.delete(`/posts/${post.uuid}`, {data: dataToSend});
        refetch()
        toast.success('Post deleted successfully');
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
          <img className=" w-12 h-12 rounded-full object-cover shadow"
               src={`data:image/jpeg;base64,${post.author.avatar}`} alt=""/>
          <div className="flex flex-col justify-center">
            <span className="text-gray-300 text-md">{author.username ?? 'Anonymous'}</span>
            <span className="text-gray-400 text-sm">{timeStatus(createdAt)} {edited ? ' • Edited' : ''}</span>
          </div>
        </div>
        {isAuthenticated && user && author && user.uuid === author.uuid &&
          <KebabMenu onEdit={handleEdit} onDelete={handleDelete}/>
        }
      </div>
      <div
        className="bg-message-container flex justify-start p-5 gap-x-5 items-center grid-rows-1 h-24 w-24 min-w-full min-h-[6em] rounded-md bg-gray-900">
        <div
          className="bg-container flex items-center justify-center w-12 h-12   rounded-full">
          {emoji ? <Emoji lazyLoad unified={emoji} size={24}/> : null}
        
        </div>
        <div className="col-start-2 text-gray-500 text-lg">{content}</div>
      
      </div>
      <div className="flex justify-start" onClick={() => setShowComments(!showComments)}>
        <CommentIcon/>
        
        <span
          className={`text-gray-500 ml-2 border-b border-gray-400 ${commentsCount && 'cursor-pointer'}`}>{commentsCount} comments</span>
      </div>
      
      
      {showComments && comments && (
        <div className="flex flex-col gap-4">
          
          {isAuthenticated && (
            <div className="flex gap-4 items-end justify-end">
            <textarea
              className="bg-transparent text-gray-300 border-b text-md block p-1 focus:outline-none w-full"
              placeholder="Add a comment..."
              rows={1}
              disabled={!isAuthenticated}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
              
              <button onClick={handleAddComment}
                      disabled={!isAuthenticated}
                      className="bg-blue-500 text-white text-sm font-medium rounded-md text-md px-2 py-2 text-center">
                Comment
              </button>
            </div>
          )}
          <ul className="flex flex-col gap-4"> {comments.map(comment => (
            <li key={comment.id}>
              <div className="p-2 border border-gray-400 rounded-md font-basier">
                <div className="flex gap-4">
                  <img className=" w-12 h-12 rounded-full object-cover shadow"
                       src={`data:image/jpeg;base64,${comment.author.avatar}`} alt=""/>
                  <div className="flex flex-col justify-center">
                    <div className="col-start-2 text-gray-500 text-lg">{comment.content}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}</ul>
        </div>
      )}
    </div>
  );
};

export default Post;
