
export interface BlogPost {
  id: string;
  projectId: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: BlogComment[];
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: string[]; // Array of user IDs who liked the comment
}
