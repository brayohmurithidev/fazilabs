import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
  article?: boolean;
}

export function SEO({
  title = "Fazilabs | Modern Web Development & WordPress Solutions",
  description = "Brian Murithi's Fazilabs portfolio: modern web development, WordPress solutions, and custom CMS platforms. Expert in React, Node.js, and WordPress.",
  type = "website",
  url = "https://fazilabs.com",
  image = "/images/brian.jpg",
  article = false,
}: SEOProps) {
  const siteTitle = "Fazilabs";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const imageUrl = image.startsWith('http') ? image : `${url}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0034EF" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Brian Murithi" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": article ? "Article" : "WebSite",
          "name": fullTitle,
          "url": url,
          "description": description,
          "image": imageUrl,
          "publisher": {
            "@type": "Organization",
            "name": siteTitle,
            "logo": {
              "@type": "ImageObject",
              "url": `${url}/logo.png`
            }
          },
          "author": {
            "@type": "Person",
            "name": "Brian Murithi",
            "url": "https://fazilabs.com",
            "jobTitle": "Web Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Fazilabs"
            }
          }
        })}
      </script>
    </Helmet>
  );
} 