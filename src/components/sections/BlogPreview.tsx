import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useBlog } from '../../hooks/useBlog';

export default function BlogPreview() {
  const { getFeaturedPosts } = useBlog();
  const featuredPosts = getFeaturedPosts();

  return (
    <section className="py-20 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">
            Latest Insights
          </h2>
          <p className="text-lg text-[#384470] max-w-2xl mx-auto">
            Explore our latest articles, tutorials, and updates from the world of web development and design.
          </p>
        </motion.div>

        {/* Featured Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredPosts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -5 }}
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
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#0034EF] text-[#384470] transition-colors">
                    {post.title}
                  </h3>
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
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 