import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const rotating = [
  'Custom Websites',
  'WordPress & CMS',
  'UI/UX Design',
  'Business Solutions',
  'E-commerce Platforms',
];

export default function HeroAbout() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % rotating.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative min-h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#0034EF]/10 to-white pt-32 pb-20"
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2070&q=80"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-primary)]/90 via-[color:var(--color-secondary)]/80 to-black/90" />

      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-40 flex flex-col items-center max-w-4xl text-center px-4 py-12 gap-6 md:gap-8">
        {/* Tagline */}
        <span className="inline-block text-[color:var(--color-gold)] text-base md:text-lg font-semibold tracking-widest uppercase mb-2 md:mb-4 animate-fadein">Empowering Digital Ambitions</span>
        {/* Animated Rotating Services */}
        <div className="h-14 md:h-16 flex items-center justify-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white transition-all duration-500 animate-typewriter bg-black/30 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-sm border-2 border-[color:var(--color-gold)]">
            {rotating[index]}
          </h1>
        </div>
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fadein delay-200 bg-black/30 px-6 py-4 rounded-2xl backdrop-blur-sm leading-relaxed shadow-lg">
          Fazilabs crafts <span className="text-[color:var(--color-gold)] font-bold">impactful digital experiences</span> for businesses, creators, and agencies. From <span className="text-[color:var(--color-gold)] font-semibold">bespoke websites</span> to <span className="text-[color:var(--color-gold)] font-semibold">powerful CMS</span> and <span className="text-[color:var(--color-gold)] font-semibold">e-commerce</span>, we help you <span className="text-[color:var(--color-orange)] font-bold">stand out</span>, <span className="text-[color:var(--color-orange)] font-bold">grow</span>, and <span className="text-[color:var(--color-orange)] font-bold">succeed</span> online.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadein delay-300 mt-2">
          <a 
            href="#project" 
            className="group relative px-10 py-5 rounded-xl font-semibold overflow-hidden text-lg"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] transition-transform group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white">See Our Work</span>
          </a>
          <a 
            href="#contact" 
            className="group relative px-10 py-5 rounded-xl font-semibold overflow-hidden text-lg"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] transition-transform group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-black">Get Started</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
        <span className="text-white/80 text-sm mb-2 font-light tracking-wider">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full mx-auto animate-scroll" />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadein { 
          animation: fadeIn 1s both; 
        }
        .animate-slidein { 
          animation: slideIn 1s both; 
        }
        .animate-typewriter { 
          animation: typewriter 1.2s steps(20) 1 both; 
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes slideIn { 
          from { 
            opacity: 0; 
            transform: translateY(40px);
          } 
          to { 
            opacity: 1; 
            transform: none; 
          } 
        }
        @keyframes typewriter { 
          from { width: 0; } 
          to { width: 100%; } 
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
      `}</style>
    </motion.section>
  );
} 