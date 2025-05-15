import { useState, useMemo } from 'react';
import blogData from '../data/blog.json';
import type { BlogPost } from '../types/blog';

export function useBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogData.posts;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'readTime-desc':
          return parseInt(b.readTime) - parseInt(a.readTime);
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogData.posts.find(post => post.slug === slug);
  };

  const getFeaturedPosts = (): BlogPost[] => {
    return blogData.posts.filter(post => blogData.featuredPosts.includes(post.id));
  };

  const getLatestPosts = (limit: number = 3): BlogPost[] => {
    return [...blogData.posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  return {
    posts: filteredAndSortedPosts,
    categories: blogData.categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    getPostBySlug,
    getFeaturedPosts,
    getLatestPosts
  };
} 