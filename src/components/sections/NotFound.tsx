import { Link } from 'react-router';
import { SEO } from '../SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404 Not Found | Fazilabs" description="Sorry, the page you are looking for does not exist." url="https://fazilabs.com/404" />
      <section className="flex flex-col items-center justify-center min-h-[70vh] py-16 bg-gradient-to-br from-[#0034EF]/10 via-[#F0CC00]/10 to-[#F09400]/10 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0034EF]/20 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#F0CC00]/20 rounded-full blur-2xl z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-[#384470]/10 rounded-3xl blur-3xl z-0" />
        <img
          src="/images/404-illustration.svg"
          alt="404 Not Found"
          className="w-72 md:w-96 mb-8 drop-shadow-lg z-10"
          loading="lazy"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00] z-10">
          404 - Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-[#384470] mb-8 text-center max-w-xl z-10">
          Oops! The page you are looking for doesn't exist or has been moved.<br />
          <span className="text-[#F09400] font-semibold">Let's get you back to something awesome.</span>
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition z-10"
        >
          Go Home
        </Link>
      </section>
    </>
  );
} 