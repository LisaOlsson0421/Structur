
import React, { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import BlogPostCard from './BlogPostCard';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, MessageCircle } from 'lucide-react';

interface BlogThreadProps {
  projectId: string;
}

const MOCK_USER = "Johanna Karlsson";
const MOCK_AVATAR = "https://i.pravatar.cc/150?img=31";

const BlogThread: React.FC<BlogThreadProps> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      projectId,
      author: 'Anders Johansson',
      authorAvatar: 'https://i.pravatar.cc/150?img=68',
      content: 'Vi har fått in bygglovsansökan godkänd för etapp 2. Dokumenten finns nu tillgängliga i projektmappen.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: ['user3', 'user4'],
      comments: [
        {
          id: 'c1',
          postId: '1',
          author: 'Maria Lindberg',
          authorAvatar: 'https://i.pravatar.cc/150?img=47',
          content: 'Tack för uppdateringen! Ska gå igenom dokumenten idag.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          likes: ['user1']
        }
      ]
    },
    {
      id: '2',
      projectId,
      author: 'Emma Svensson',
      authorAvatar: 'https://i.pravatar.cc/150?img=24',
      content: 'Ny kostnadsberäkning för ventilationssystemet behöver gås igenom på nästa projektmöte.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      likes: [],
      comments: []
    }
  ]);

  const handleAddPost = () => {
    if (newPostContent.trim()) {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        projectId,
        author: MOCK_USER,
        authorAvatar: MOCK_AVATAR,
        content: newPostContent,
        timestamp: new Date().toISOString(),
        likes: [],
        comments: []
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(MOCK_USER);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(userId => userId !== MOCK_USER)
            : [...post.likes, MOCK_USER]
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          postId,
          author: MOCK_USER,
          authorAvatar: MOCK_AVATAR,
          content,
          timestamp: new Date().toISOString(),
          likes: []
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            const isLiked = comment.likes.includes(MOCK_USER);
            return {
              ...comment,
              likes: isLiked
                ? comment.likes.filter(userId => userId !== MOCK_USER)
                : [...comment.likes, MOCK_USER]
            };
          }
          return comment;
        });
        return {
          ...post,
          comments: updatedComments
        };
      }
      return post;
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageCircle className="mr-2 text-wastbygg-slate" />
            Projektdiskussion
          </h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              <span className="sr-only">Visa/dölj</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-4">
          <div className="mb-6">
            <Textarea
              placeholder="Skriv ett meddelande..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end mt-2">
              <Button 
                onClick={handleAddPost} 
                disabled={!newPostContent.trim()}
                className="bg-wastbygg-green text-white hover:bg-wastbygg-green/90"
              >
                Publicera
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                currentUser={MOCK_USER}
                onLikePost={handleLikePost}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BlogThread;
