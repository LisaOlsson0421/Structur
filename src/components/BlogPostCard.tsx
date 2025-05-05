
import React, { useState } from 'react';
import { BlogPost, BlogComment } from '@/types/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Send, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';

interface BlogPostCardProps {
  post: BlogPost;
  currentUser: string;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  currentUser,
  onLikePost,
  onAddComment,
  onLikeComment,
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = () => {
    if (commentContent.trim()) {
      onAddComment(post.id, commentContent);
      setCommentContent('');
    }
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: sv });
  };

  const isLikedByUser = post.likes.includes(currentUser);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.authorAvatar} alt={post.author} />
          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{post.author}</h3>
            <span className="text-xs text-gray-500 flex items-center">
              <Calendar size={12} className="mr-1" />
              {formatDate(post.timestamp)}
            </span>
          </div>
          <p className="mt-2 text-sm">{post.content}</p>
          <div className="flex items-center gap-4 mt-3">
            <Button 
              variant="ghost" 
              size="sm"
              className={`flex items-center gap-1 text-xs px-2 ${isLikedByUser ? 'text-red-500' : ''}`}
              onClick={() => onLikePost(post.id)}
            >
              <Heart size={14} className={isLikedByUser ? 'fill-red-500' : ''} />
              {post.likes.length > 0 && (
                <span>{post.likes.length}</span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-xs px-2"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle size={14} />
              {post.comments.length > 0 && (
                <span>{post.comments.length}</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="mt-4 pl-12">
          {post.comments.map((comment) => (
            <div key={comment.id} className="py-3 border-t border-gray-100">
              <div className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-medium">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`mt-1 h-6 flex items-center gap-1 text-xs px-2 ${comment.likes.includes(currentUser) ? 'text-red-500' : ''}`}
                    onClick={() => onLikeComment(post.id, comment.id)}
                  >
                    <Heart size={12} className={comment.likes.includes(currentUser) ? 'fill-red-500' : ''} />
                    {comment.likes.length > 0 && (
                      <span>{comment.likes.length}</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-3 flex gap-2">
            <Textarea 
              placeholder="Skriv en kommentar..."
              className="text-sm min-h-[60px]"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSubmitComment}
              disabled={!commentContent.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostCard;
