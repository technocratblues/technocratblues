import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_VALUES } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);



    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: leftRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo(rightRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: rightRef.current, start: 'top 80%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="section bg-surface">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

                    {/* ── LEFT ── */}
                    <div ref={leftRef}>
                        <span className="section-eyebrow">
                            <span className="badge-dot" />
                            <span className="badge-label">About Us</span>
                        </span>

                        <h2 className="section-title font-display mb-5">
                            Built for what&apos;s next.
                            <br />
                            <em className="font-serif italic text-brand not-italic">
                                Grounded in what works.
                            </em>
                        </h2>

                        <p className="section-subtitle mb-6">
                            We build and ship software products that solve real problems —
                            fast, focused, and made to grow.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <p className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                                We are a tech startup dedicated to building software that solves real-world problems. 
                                From architecture to deployment, we handle every layer of the stack.
                            </p>
                            <p className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                                We ship fast, iterate with purpose, and stay close to every
                                client — because great software is built on trust as much as code.
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div ref={rightRef} className="flex flex-col gap-5">

                        {/* Dark highlight card */}
                        <div className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #1e1d3a 0%, #16223a 60%, #1a1f3a 100%)',
                                border: '1px solid rgba(112,120,208,0.18)',
                                boxShadow: '0 8px 40px rgba(112,120,208,0.12), 0 2px 8px rgba(0,0,0,0.10)',
                            }}
                        >
                            <div
                                className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                                style={{ background: 'rgba(112,120,208,0.18)' }}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl pointer-events-none"
                                style={{ background: 'rgba(90,140,200,0.10)' }}
                            />

                            <div className="flex items-center gap-3 mb-6">
                                <div className="icon-box-brand rounded-xl">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                            stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="font-display font-black text-white text-base">What we stand for</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {ABOUT_VALUES.map(({ label, desc }) => (
                                    <div key={label} className="flex gap-3">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                                        <div>
                                            <p className="text-white font-semibold text-sm">{label}</p>
                                            <p className="text-white/50 text-xs mt-0.5">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}