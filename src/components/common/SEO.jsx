import { useEffect } from 'react';

const SITE_NAME = 'Royal Coaching Centre';
const DEFAULT_TITLE = 'Royal Coaching Centre | Vellore';
const DEFAULT_DESCRIPTION = 'Royal Coaching Centre in Vellore offers 6th to 12th Std tuition, Abacus, Robotics, Spoken English, and Hindi coaching with expert teachers and personalized attention.';
const DEFAULT_IMAGE = '/logo.png';
const DEFAULT_KEYWORDS = 'best tuition in vellore, coaching centre in vellore, tuition in vellore, abacus classes vellore, robotics classes vellore, spoken english vellore, hindi classes vellore';
const DEFAULT_AUTHOR = SITE_NAME;
const DEFAULT_APPLICATION_NAME = SITE_NAME;

const setMetaTag = (selector, attributes) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
    return;
  }

  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
};

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  author = DEFAULT_AUTHOR,
  applicationName = DEFAULT_APPLICATION_NAME,
  noindex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${window.location.origin}${path}`;

    document.title = fullTitle;

    setMetaTag('meta[name="description"]', { name: 'description', content: description });
    setMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMetaTag('meta[name="author"]', { name: 'author', content: author });
    setMetaTag('meta[name="application-name"]', { name: 'application-name', content: applicationName });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' });
    setMetaTag('meta[name="googlebot"]', { name: 'googlebot', content: 'index, follow' });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: image });
    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let ld = document.getElementById('structured-data');
    if (jsonLd) {
      if (!ld) {
        ld = document.createElement('script');
        ld.id = 'structured-data';
        ld.type = 'application/ld+json';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(jsonLd);
    } else if (ld) {
      ld.remove();
    }
  }, [title, description, path, image, keywords, author, applicationName, noindex, jsonLd]);

  return null;
}
