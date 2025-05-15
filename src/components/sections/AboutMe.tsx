import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function AboutMe() {
  return (
    <section id="about" className="relative py-20 px-4 md:px-0 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a] overflow-hidden">
      {/* Decorative SVG background shape */}
      <svg className="absolute left-0 top-0 w-64 h-64 opacity-10 text-[color:var(--color-gold)] -z-10" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="200" fill="currentColor" />
      </svg>
      {/* Animated floating dots */}
      <div className="absolute right-8 bottom-8 z-0">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-4 h-4 rounded-full bg-[color:var(--color-gold)] mb-2"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
          className="w-2 h-2 rounded-full bg-[color:var(--color-orange)] ml-4"
        />
      </div>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-shrink-0"
        >
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: '0 0 0 6px var(--color-gold, #F0CC00)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[color:var(--color-gold)] shadow-lg bg-white cursor-pointer group"
          >
            <img
              src="/images/brian.jpg" // Updated to use brian.jpg from public/images
              alt="Brian Murithi"
              className="w-full h-full object-cover group-hover:brightness-110 transition duration-300"
            />
          </motion.div>
        </motion.div>
        {/* Description & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">Mind Behind Fazilabs</h2>
          <p className="text-lg text-[color:var(--color-secondary)] mb-6 max-w-xl mx-auto md:mx-0">
            Meet Brian Murithi — the mind behind Fazilabs. I'm a passionate Software Engineer and Web Consultant, specializing in building modern, scalable web solutions and CMS platforms for businesses and individuals. My focus is on clean code, creative design, and delivering real value to my clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/Brian-Murithi-resume.pdf"
              download
              className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden text-lg bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] text-black shadow-none hover:from-[color:var(--color-orange)] hover:to-[color:var(--color-gold)] transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden text-lg bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] text-white shadow-none hover:from-[color:var(--color-secondary)] hover:to-[color:var(--color-primary)] transition"
            >
              Hire Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 