import { useEffect } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from './prefersReducedMotion';

// Yoyo with sine easing loops without a visible seam. Reduced motion keeps it still.
export function useEnvelopeFloat(floatRef, { y = -10, rotate = 2, duration = 2.6 } = {}) {
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.to(floatRef.current, { y, rotate, duration, ease: 'sine.inOut', repeat: -1, yoyo: true });
        }, floatRef);
        return () => ctx.revert();
    }, [floatRef, y, rotate, duration]);
}
