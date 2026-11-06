import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './prefersReducedMotion';
gsap.registerPlugin(ScrollTrigger);

export function useSlideIn(scopeRef, items, { duration = 0.8, start = 'top 80%' } = {}) {
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            items.forEach(({ ref, x }) => {
                gsap.fromTo(ref.current,
                    { x, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration, ease: 'power3.out',
                        scrollTrigger: { trigger: ref.current, start },
                    }
                );
            });
        }, scopeRef);
        return () => ctx.revert();
    }, [scopeRef, items, duration, start]);
}
