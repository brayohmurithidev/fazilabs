import { useBlog } from '../../hooks/useBlog';
import { Link } from 'react-router';
import type { BlogPost } from '../../types/blog';
import { SEO } from '../SEO';

export default function BlogArchive() {
  const {
    posts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useBlog();

  return (
    <>
      <SEO 
        title="Blog | Fazilabs - Web Development Insights & Tutorials"
        description="Explore our latest articles on web development, WordPress tips, and industry insights. Stay updated with the latest trends in web technology."
        type="blog"
        url="https://fazilabs.com/blog"
      />
      <section className="py-20 bg-gradient-to-b from-[#eaf0fa] via-[#f8fafc] to-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">
              Blog Archive
            </h1>
            <p className="text-lg text-[#384470] max-w-2xl mx-auto">
              Explore our latest insights, tutorials, and updates from the world of web development and design.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#384470]/20 focus:border-[#0034EF] focus:ring-2 focus:ring-[#0034EF]/20 outline-none transition-all bg-white text-[#384470] placeholder-[#706838]/60"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-[#384470]/20 focus:border-[#0034EF] focus:ring-2 focus:ring-[#0034EF]/20 outline-none transition-all bg-white text-[#384470]"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-[#384470]/20 focus:border-[#0034EF] focus:ring-2 focus:ring-[#0034EF]/20 outline-none transition-all bg-white text-[#384470]"
                >
                  <option value="date-desc">Latest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="readTime-desc">Most Read</option>
                </select>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-[#0034EF] mb-2">
                No posts found
              </h3>
              <p className="text-[#384470]">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden group border border-[#384470]/10 hover:border-[#F0CC00] transition-all"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0034EF]/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2 items-center">
            <span className="inline-block px-3 py-1 bg-[#706838] text-[#F0CC00] text-sm rounded-full font-semibold shadow-md">
              {post.category}
            </span>
            <span className="inline-block px-2 py-1 bg-[#F0CC00] text-[#384470] text-xs rounded-full font-bold shadow-sm">
              {post.readTime}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-[#0034EF] text-[#384470] transition-colors">
            {post.title}
          </h2>
          <p className="text-[#706838] mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-[#384470]/80">
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="#F09400" className="inline-block mr-1" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" /></svg>
              {post.date}
            </span>
            <span className="font-semibold text-[#F09400]">Read</span>
          </div>
        </div>
      </Link>
    </article>
  );
} 