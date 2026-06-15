import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function ClientSection() {
    const sectionRef = useRef(null);
    const eyebrowRef = useRef(null);
    const headingRef = useRef(null);
    const placeholderRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
                defaults: { ease: 'power3.out' },
            });
            tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
            tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.2');
            tl.fromTo(placeholderRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="clients" ref={sectionRef} className="section bg-surface">
            <div className="container-custom">

                {/* Eyebrow */}
                <div ref={eyebrowRef}>
                    <span className="section-eyebrow">
                        <span className="badge-dot" />
                        <span className="badge-label">Our Clients</span>
                    </span>
                </div>

                {/* Heading */}
                <div ref={headingRef} className="mt-6 mb-16 text-right">
                    <h2 className="section-title font-display">
                        Great work starts with
                        <br />
                        <em className="font-serif italic text-brand">strong partnerships.</em>
                    </h2>
                </div>

                {/* Placeholder panel */}
                <div
                    ref={placeholderRef}
                    className="rounded-2xl border border-dashed border-[#d1d5e0] bg-[#f8f9fc]
                     flex items-center justify-center py-20"
                >
                    <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase text-[#b0b8cc]">
                        Client Stories Coming Soon
                    </p>
                </div>

            </div>
        </section>
    );
}
