import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects.json';

const techColors: Record<string, string> = {
  'React': 'from-[color:var(--color-primary)] to-[color:var(--color-secondary)]',
  'Node.js': 'from-[color:var(--color-secondary)] to-[color:var(--color-primary)]',
  'Python': 'from-[color:var(--color-gold)] to-[color:var(--color-primary)]',
  'React Native': 'from-[color:var(--color-primary)] to-[color:var(--color-gold)]',
  'Expo': 'from-[color:var(--color-olive)] to-[color:var(--color-secondary)]',
  'WordPress': 'from-[color:var(--color-secondary)] to-[color:var(--color-primary)]',
  'PHP': 'from-[color:var(--color-olive)] to-[color:var(--color-secondary)]',
  'Elementor': 'from-[color:var(--color-gold)] to-[color:var(--color-orange)]',
  'WooCommerce': 'from-[color:var(--color-orange)] to-[color:var(--color-gold)]',
  'JS': 'from-[color:var(--color-gold)] to-[color:var(--color-primary)]',
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const [tab, setTab] = useState<'custom' | 'wp'>('custom');
  const projects = tab === 'custom' ? projectsData.projects.filter(p => p.type === 'Custom').slice(0, 3) : projectsData.projects.filter(p => p.type === 'WordPress').slice(0, 3);

  return (
    <section id="projects" className="py-16 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00] mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-[#384470] max-w-2xl mx-auto">
            Explore some of our recent work and success stories
          </p>
        </motion.div>
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            <button
              className={`relative px-4 py-2 rounded-lg font-semibold transition border border-blue-600 dark:border-blue-400 ${tab === 'custom' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300'}`}
              onClick={() => setTab('custom')}
            >
              Custom Projects
              {tab === 'custom' && (
                <motion.div
                  layoutId="project-tab-underline"
                  className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-blue-600 to-blue-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
            <button
              className={`relative px-4 py-2 rounded-lg font-semibold transition border border-blue-600 dark:border-blue-400 ${tab === 'wp' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300'}`}
              onClick={() => setTab('wp')}
            >
              WordPress Projects
              {tab === 'wp' && (
                <motion.div
                  layoutId="project-tab-underline"
                  className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-blue-600 to-blue-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition group border border-slate-100 dark:border-slate-700"
                whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10)' }}
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    whileHover={{ scale: 1.08 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center rounded-md bg-gradient-to-r ${techColors[t] || 'from-slate-400 to-slate-500'} text-white text-xs px-2 py-1 font-medium shadow-sm`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href={project.url} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center mt-8">
          <a href="/projects" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition">View All Projects</a>
        </div>
      </div>
      <style>{`
        .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
      `}</style>
    </section>
  );
} 