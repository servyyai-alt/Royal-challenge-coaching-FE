import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll to that element; otherwise scroll to top.
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, search, hash]);

  return null;
}

