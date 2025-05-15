import './App.css'
import MainLayout from './components/layout/MainLayout';
import Header from './components/layout/Header';
import HeroAbout from './components/sections/Hero';
import ServicesModern from './components/sections/Services';
import ProjectsShowcase from './components/sections/Projects';
import { Testimonials } from './components/sections/Testimonials';
import BlogPreview from './components/sections/BlogPreview';
import ContactModern from './components/sections/Contact';
import AboutMe from './components/sections/AboutMe';
import BlogArchive from './components/sections/BlogArchive';
import BlogSingle from './components/sections/BlogSingle';
import ProjectsArchive from './components/sections/ProjectsArchive';
import NotFound from './components/sections/NotFound';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { scrollToWithOffset } from './lib/scrollToWithOffset';
import { SEO } from './components/SEO';

function HomeSections() {
  return (
    <>
      <HeroAbout />
      <ServicesModern />
      <div className="my-20" />
      <ProjectsShowcase />
      <Testimonials />
      <BlogPreview />
      <AboutMe />
      <ContactModern />
    </>
  );
}

function RootLayout() {
  const location = useLocation();
  const justNavigated = useRef(false);
  const scrollTarget = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (location.pathname === '/' && location.state && location.state.scrollTo) {
      scrollTarget.current = location.state.scrollTo;
    } else {
      scrollTarget.current = null;
    }
    justNavigated.current = true;
  }, [location.key]);

  // After navigation, scroll to section or top
  useEffect(() => {
    if (justNavigated.current) {
      if (scrollTarget.current) {
        scrollToWithOffset(scrollTarget.current);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      justNavigated.current = false;
      setTimeout(() => setLoading(false), 300);
    }
  }, [location.key]);

  return (
    <MainLayout>
      <Header />
      {/* Loading Bar */}
      <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
        <div
          className={`h-1 bg-gradient-to-r from-[#0034EF] via-[#F0CC00] to-[#384470] transition-all duration-300 ${loading ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
        />
      </div>
      <div className="w-full md:w-[90vw] mx-auto pt-24">
        <Outlet />
      </div>
    </MainLayout>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeSections />,
      },
      {
        path: "/projects",
        element: <ProjectsArchive />,
      },
      {
        path: "/blog",
        element: <BlogArchive />,
      },
      {
        path: "/blog/:slug",
        element: <BlogSingle />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <SEO />
      <RouterProvider router={router} />
    </>
  );
}
