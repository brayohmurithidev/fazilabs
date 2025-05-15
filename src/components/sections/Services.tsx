import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    title: 'Custom Web Development',
    description: 'Building modern, responsive websites and web applications using React, Node.js, and other cutting-edge technologies.',
    icon: (
      <svg className="w-6 h-6 text-[color:var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-[color:var(--color-primary)] to-[color:var(--color-secondary)]',
    features: ['React & Next.js', 'Node.js & Express', 'Modern UI/UX', 'API Integration'],
    dot: 'bg-[color:var(--color-gold)]'
  },
  {
    title: 'WordPress Development',
    description: 'Creating custom WordPress themes, plugins, and full-featured websites with modern design and functionality.',
    icon: (
      <svg className="w-6 h-6 text-[color:var(--color-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: 'from-[color:var(--color-secondary)] to-[color:var(--color-primary)]',
    features: ['Custom Themes', 'Plugin Development', 'WooCommerce', 'Performance'],
    dot: 'bg-[color:var(--color-orange)]'
  },
  {
    title: 'UI/UX Design',
    description: 'Creating beautiful, intuitive user interfaces and experiences that engage users and drive results.',
    icon: (
      <svg className="w-6 h-6 text-[color:var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: 'from-[color:var(--color-gold)] to-[color:var(--color-primary)]',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    dot: 'bg-[color:var(--color-primary)]'
  },
  {
    title: 'CMS Solutions',
    description: 'Implementing and customizing content management systems to make your website easy to maintain and update.',
    icon: (
      <svg className="w-6 h-6 text-[color:var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'from-[color:var(--color-olive)] to-[color:var(--color-secondary)]',
    features: ['Content Strategy', 'Custom Workflows', 'SEO Integration', 'Analytics'],
    dot: 'bg-[color:var(--color-olive)]'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ServicesModern() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00] mb-4">
            Services I Offer
          </h2>
          <p className="text-lg text-[#384470] max-w-2xl mx-auto">
            Comprehensive web development solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative h-[420px]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Background with Gradient Border */}
              <div 
                className={`absolute -inset-0.5 opacity-75 group-hover:opacity-100 blur transition duration-700 animate-gradient-x rounded-2xl bg-gradient-to-r ${service.color}`}
              />
              
              {/* Card Content */}
              <motion.div 
                className="relative h-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg transition-all duration-300 flex flex-col"
                animate={{
                  scale: hoveredIndex === index ? 1.03 : 1,
                  boxShadow: hoveredIndex === index
                    ? '0 8px 32px 0 rgba(31, 41, 55, 0.15)'
                    : '0 4px 16px 0 rgba(31, 41, 55, 0.08)',
                }}
                transition={{ duration: 0.25 }}
              >
                {/* Icon Header */}
                <motion.div 
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} text-white mb-6`}
                  animate={{
                    scale: hoveredIndex === index ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title and Description */}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center text-sm"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0.85,
                        scale: hoveredIndex === index ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${service.dot} mr-2`} />
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
} 