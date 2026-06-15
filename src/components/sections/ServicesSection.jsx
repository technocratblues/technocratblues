import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAPABILITY_DETAILS } from '../../assets';
import CapabilityCard from './CapabilityCard';
gsap.registerPlugin(ScrollTrigger);

const WHAT_WE_OFFER = Object.entries(CAPABILITY_DETAILS).map(([title, { emoji, tagline }]) => ({
    title,
    emoji,
    desc: tagline,
}));

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const cardsRef   = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12,
                    scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="section bg-surface">
            <div className="container-custom">

                <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand" />
                    <p className="text-xs font-semibold text-brand tracking-widest uppercase">What We Offer</p>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-[color:var(--color-ink)] mb-10">
                    Our Core Capabilities
                </h3>

                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {WHAT_WE_OFFER.map(({ emoji, title, desc }) => (
                        <CapabilityCard
                            key={title}
                            emoji={emoji}
                            title={title}
                            desc={desc}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
