import { useState, useMemo } from 'react';
import projectsData from '../data/projects.json';

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: string;
  techStack: string[];
  image: string;
  url: string;
  featured: boolean;
  date: string;
}

export function useProjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    let filtered = projectsData.projects as Project[];

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filter by tech stack
    if (selectedTech.length > 0) {
      filtered = filtered.filter(p =>
        selectedTech.every(tech => p.techStack.includes(tech))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(tech => tech.toLowerCase().includes(q))
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedType, selectedTech, searchQuery]);

  return {
    projects: filteredProjects,
    allProjects: projectsData.projects as Project[],
    types: projectsData.types as string[],
    techStacks: projectsData.techStacks as string[],
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedTech,
    setSelectedTech,
  };
} 