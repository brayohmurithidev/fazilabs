import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router';
import { useBlog } from '../../hooks/useBlog';
import type { BlogPost } from '../../types/blog';

export default function BlogSingle() {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, getLatestPosts } = useBlog();
  
  const post = slug ? getPostBySlug(slug) : null;
  const latestPosts = getLatestPosts(3);

  if (!post) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#eaf0fa] via-[#f8fafc] to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">Post Not Found</h1>
          <p className="text-[#384470] mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            to="/blog"
            className="inline-block px-6 py-3 bg-[#0034EF] text-white rounded-lg hover:bg-[#F0CC00] hover:text-[#384470] font-bold shadow transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#eaf0fa] via-[#f8fafc] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/blog"
                className="text-[#0034EF] hover:text-[#F0CC00] font-semibold transition-colors"
              >
                ← Back to Blog
              </Link>
              <span className="text-[#706838]">/</span>
              <span className="text-[#384470] font-semibold">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-[#384470]">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full border-2 border-[#F0CC00] shadow"
                />
                <div>
                  <p className="font-medium text-[#0034EF]">{post.author.name}</p>
                  <p className="text-sm text-[#706838]">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <time className="text-[#F09400] font-semibold">{post.date}</time>
                <span className="text-[#706838]">•</span>
                <span className="text-[#384470]">{post.readTime} min read</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-xl overflow-hidden border-4 border-[#0034EF]/10 shadow-lg"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none mb-12 text-[#384470] prose-h2:text-[#0034EF] prose-strong:text-[#F09400] prose-blockquote:border-l-4 prose-blockquote:border-[#F0CC00] prose-blockquote:bg-[#F0CC00]/10 prose-blockquote:text-[#706838]"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          {/* Latest Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border-t border-[#384470]/20 pt-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((latestPost: BlogPost) => (
                <Link
                  key={latestPost.id}
                  to={`/blog/${latestPost.slug}`}
                  className="group"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4 border-2 border-[#0034EF]/10 group-hover:border-[#F0CC00] transition-all">
                    <img
                      src={latestPost.image}
                      alt={latestPost.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0034EF]/60 to-transparent" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#384470] group-hover:text-[#0034EF] transition-colors">
                    {latestPost.title}
                  </h3>
                  <p className="text-sm text-[#706838] mt-2">
                    {latestPost.date} • {latestPost.readTime} min read
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 