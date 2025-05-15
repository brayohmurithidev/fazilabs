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

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Smart section navigation
  const navigateToSection = (hash: string) => {
    if (location.pathname === '/') {
      scrollToWithOffset(hash);
    } else {
      navigate('/', { state: { scrollTo: hash } });
    }
  };

  return (
    <footer className="bg-gradient-to-tr from-[color:var(--color-primary)] to-[color:var(--color-secondary)] text-white mt-16 border-t-2 border-[color:var(--color-olive)]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center md:items-start">
        {/* Brand/About */}
        <div className="flex-1 mb-8 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
          <Link to="/" aria-label="Fazilabs Home" className="flex items-center gap-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] min-w-[40px]">
            <img
              src="/images/logo-fazilabs.svg"
              alt="Fazilabs logo"
              className="w-[48px] md:w-[100px] h-auto min-w-[40px] max-w-[160px] object-contain drop-shadow-sm"
              loading="lazy"
              draggable="false"
              style={{ display: 'block' }}
            />
          </Link>
          <p className="text-white/80 text-sm max-w-xs mx-auto md:mx-0">
            Software Engineer & Web Consultant. I build modern websites, apps, and CMS solutions for businesses and individuals.
          </p>
        </div>
        {/* Quick Links */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="font-semibold mb-2 text-[color:var(--color-gold)]">Quick Links</div>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/') ? (
                  <Link to={link.href} className="hover:text-[color:var(--color-gold)] text-white/90 transition-colors duration-200">
                    {link.name}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigateToSection(link.href)}
                    className="hover:text-[color:var(--color-gold)] text-white/90 transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer"
                    style={{ background: 'none', padding: 0, margin: 0 }}
                  >
                    {link.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Socials */}
        <div className="flex-1 flex flex-col items-center md:items-end">
          <div className="font-semibold mb-2 text-[color:var(--color-gold)]">Connect</div>
          <div className="flex gap-4 mb-4">
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[color:var(--color-gold)]/10 hover:bg-[color:var(--color-gold)]/30">
                  <img src={s.icon} alt={s.name} className="w-5 h-5 invert" />
                </span>
              </a>
            ))}
          </div>
          <div className="text-xs text-white/70">&copy; {new Date().getFullYear()} Fazilabs. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
} 