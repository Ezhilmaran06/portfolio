import { useEffect } from 'react';

/**
 * useScrollReveal — IntersectionObserver hook that adds 'is-revealed'
 * to any elements marked with 'reveal-on-scroll' as they enter the focal viewport.
 */
export function useScrollReveal(dependency) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Re-check shortly after mount or state change
    const t1 = setTimeout(observeElements, 250);
    const t2 = setTimeout(observeElements, 800);

    // Also observe DOM additions if dynamically mounted
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    if (document.body) {
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [dependency]);
}
