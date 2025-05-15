export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export interface BlogArchiveProps {
  posts?: BlogPost[];
}

export interface BlogSingleProps {
  post?: BlogPost;
} 