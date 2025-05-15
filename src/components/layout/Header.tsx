import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { scrollToWithOffset } from '../../lib/scrollToWithOffset';

const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/brian-murithi/', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg' },
  { name: 'GitHub', url: 'https://github.com/brayohmurithidev', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg' },
  { name: 'X', url: 'https://x.com/_faztech', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg' },
];

const links = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '#contact' },
];

const sectionIds = ['about', 'services', 'project', 'contact'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
      if (location.pathname === '/') {
        let found = '';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom > 120) {
              found = id;
              break;
            }
          }
        }
        setActiveSection(found);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // set initial
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Smart section navigation
  const navigateToSection = (hash: string) => {
    if (location.pathname === '/') {
      scrollToWithOffset(hash);
    } else {
      navigate('/', { state: { scrollTo: hash } });
    }
    setMenuOpen(false);
  };

  // Helper to determine if a link is active
  const isActive = (link: { name: string; href: string }) => {
    if (link.href.startsWith('/')) {
      return location.pathname === link.href;
    } else if (location.pathname === '/' && link.href.startsWith('#')) {
      return activeSection && link.href.replace('#', '') === activeSection;
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-secondary)] text-white shadow backdrop-blur border-b border-[color:var(--color-primary)]'
          : 'bg-transparent text-black'
      }`}
    >
      <nav className="max-w-[90vw] mx-auto flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
        {/* Logo/Brand */}
        <Link to="/" aria-label="Fazilabs Home" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] min-w-[40px]">
          <img
            src="/images/logo-fazilabs.svg"
            alt="Fazilabs logo"
            className="w-[50px] md:w-[100px] h-auto min-w-[40px] max-w-[180px] object-contain drop-shadow-sm"
            loading="eager"
            draggable="false"
            style={{ display: 'block' }}
          />
        </Link>
        {/* Quick Links */}
        <ul className="hidden md:flex gap-6 md:gap-8 text-inherit">
          {links.map((link) => (
            <li key={link.name}>
              {link.href.startsWith('/') ? (
                <Link
                  to={link.href}
                  className={
                    isActive(link)
                      ? 'text-[#F0CC00] font-bold transition-colors duration-200'
                      : 'hover:text-[color:var(--color-gold)] transition-colors duration-200'
                  }
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => navigateToSection(link.href)}
                  className={
                    isActive(link)
                      ? 'text-[#F0CC00] font-bold transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer'
                      : 'hover:text-[color:var(--color-gold)] transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer'
                  }
                  style={{ background: 'none', padding: 0, margin: 0 }}
                >
                  {link.name}
                </button>
              )}
            </li>
          ))}
        </ul>
        {/* Socials */}
        <div className="hidden md:flex gap-4 items-center">
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[color:var(--color-gold)]/10 hover:bg-[color:var(--color-gold)]/30">
                <img src={s.icon} alt={s.name} className={`w-5 h-5 ${scrolled ? 'invert' : ''}`} />
              </span>
            </a>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded bg-white/80 text-black ml-2"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </nav>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-secondary)] text-white flex flex-col items-center justify-center transition-all">
          <button
            className="absolute top-6 right-6 p-2 rounded hover:bg-[color:var(--color-gold)]/10"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="8" x2="24" y2="24" /><line x1="24" y1="8" x2="8" y2="24" /></svg>
          </button>
          <ul className="flex flex-col gap-8 text-2xl font-semibold">
            {links.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/') ? (
                  <Link
                    to={link.href}
                    className={
                      isActive(link)
                        ? 'text-[#F0CC00] font-bold transition-colors duration-200'
                        : 'hover:text-[color:var(--color-gold)] transition-colors duration-200'
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigateToSection(link.href)}
                    className={
                      isActive(link)
                        ? 'text-[#F0CC00] font-bold transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer'
                        : 'hover:text-[color:var(--color-gold)] transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer'
                    }
                    style={{ background: 'none', padding: 0, margin: 0 }}
                  >
                    {link.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="flex gap-6 mt-10">
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[color:var(--color-gold)]/10 hover:bg-[color:var(--color-gold)]/30">
                  <img src={s.icon} alt={s.name} className="w-5 h-5 invert" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 