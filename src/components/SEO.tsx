import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = "Fazilabs | Modern Web Development & WordPress Solutions",
  description = "Brian Murithi's portfolio showcasing modern web development, WordPress solutions, and custom CMS platforms. Expert in React, Node.js, and WordPress development.",
  image = "/images/brian.jpg",
  url = "https://fazilabs.com",
  type = "website"
}: SEOProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Brian Murithi",
    "url": "https://fazilabs.com",
    "image": "https://fazilabs.com/images/brian.jpg",
    "sameAs": [
      "https://github.com/fazilabs",
      "https://linkedin.com/in/brian-murithi",
      "https://twitter.com/fazilabs"
    ],
    "jobTitle": "Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Fazilabs"
    },
    "description": "Full-stack web developer specializing in React, Node.js, and WordPress development. Creating modern, responsive web solutions for businesses and organizations."
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
} 