// Single source of truth for the reduced-motion check used by every animation hook
export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
