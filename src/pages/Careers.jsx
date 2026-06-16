import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREERS_PAGE } from '../assets';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG icons for each tech skill — no external icon dep needed
const SKILL_ICONS = {
    React: (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <circle cx="16" cy="16" r="3" fill="#61DAFB" />
            <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.6" fill="none" />
            <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(60 16 16)" />
            <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(120 16 16)" />
        </svg>
    ),
    TypeScript: (
        <svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" rx="4" fill="#3178C6" />
            <text x="4" y="24" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="white">TS</text>
        </svg>
    ),
    'Tailwind CSS': (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <path d="M16 6c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25C14.91 10.07 15.74 10.97 16.65 11.96 18.19 13.59 19.96 15.5 24 15.5c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.16-.32-1.99-1.22-2.9-2.21C21.81 7.91 20.04 6 16 6zM8.5 15.5c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.16.32 1.99 1.22 2.9 2.21C10.69 23.09 12.46 25 16.5 25c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.16-.32-1.99-1.22-2.9-2.21C14.31 17.41 12.54 15.5 8.5 15.5z" fill="#38BDF8" />
        </svg>
    ),
    'Spring Boot': (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#6DB33F" />
            <path d="M10 22c0-5 3-9 6-10-1 3-1 7 4 8-1-4 1-8 4-10-1 5 0 10-5 13-1.5.8-3 1-4.5.5A6 6 0 0110 22z" fill="white" />
        </svg>
    ),
    Java: (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <path d="M13 22s-1.5.9 1.1 1.2c3.2.4 4.8.3 8.3-.3 0 0 .9.6 2.2 1.1-7.8 3.3-17.6-.2-11.6-2z" fill="#E76F00" />
            <path d="M12 19.4s-1.7 1.3 1.8 1.5c2.5.2 4.4.2 7.7-.3 0 0 .6.7 1.6.9-6.8 2-14.4.2-11.1-2.1z" fill="#E76F00" />
            <path d="M17.3 14.5c1.4 1.6-.4 3-.4 3s3.5-1.8 1.9-4c-1.5-2.1-2.7-3.2 3.6-6.8 0 0-9.8 2.5-5.1 7.8z" fill="#E76F00" />
            <path d="M23.4 24.6s1.1.9-1.2 1.7c-4.5 1.3-18.6 1.7-22.5.1-1.4-.6 1.3-1.5 2.1-1.7.9-.2 1.4-.2 1.4-.2-1.6-1.1-10.4 2.2-4.5 3.2 16.2 2.6 29.5-1.2 24.7-3.1z" fill="#E76F00" />
            <path d="M13.7 16.5s-7.3 1.7-2.6 2.3c2 .3 5.9.2 9.6-.1 3-.3 6-.9 6-.9s-1.1.5-1.8.9c-7.4 2-21.6 1.1-17.5-.9 3.5-1.7 6.3-1.3 6.3-1.3z" fill="#5382A1" />
            <path d="M20.5 20.1c7.5-3.9 4-7.7 1.6-7.2-.6.1-.9.3-.9.3s.2-.4.6-.5c4.5-1.6 8 4.6-1.5 7.1 0 0 .1-.1.2-.2v.5z" fill="#5382A1" />
            <path d="M15.4 28.5c7.2.5 18.2-.3 18.5-3.8 0 0-.5 1.3-5.9 2.3-6.2 1.2-13.8 1-18.3.3 0 0 .9.8 5.7 1.2z" fill="#5382A1" />
        </svg>
    ),
    PostgreSQL: (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <ellipse cx="16" cy="9" rx="9" ry="4" fill="#336791" />
            <path d="M7 9v6c0 2.2 4 4 9 4s9-1.8 9-4V9" stroke="#336791" strokeWidth="2" fill="none" />
            <path d="M7 15v6c0 2.2 4 4 9 4s9-1.8 9-4v-6" stroke="#336791" strokeWidth="2" fill="none" />
            <ellipse cx="16" cy="9" rx="9" ry="4" fill="none" stroke="#6BA4CE" strokeWidth="1.5" />
        </svg>
    ),
};

// Single skill row: icon + title + description
function SkillRow({ title, desc }) {
    return (
        <div className="flex items-start gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-surface-raised border border-[var(--color-border)]">
                {SKILL_ICONS[title] ?? <span className="text-xl">⚙️</span>}
            </div>
            <div>
                <p className="font-display font-semibold text-base">{title}</p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{desc}</p>
            </div>
        </div>
    );
}

export default function Careers() {
    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const whyRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });

        const ctx = gsap.context(() => {
            // Hero header: badge → title → pill → description cascade on mount
            gsap.fromTo(
                headerRef.current.querySelectorAll('.h-anim'),
                { y: 28, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
            );

            // Skill columns slide up when scrolled into view
            const cols = gridRef.current.querySelectorAll('.skill-col');
            gsap.fromTo(
                cols,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
                }
            );

            // Individual skill rows stagger inside each column
            cols.forEach(col => {
                gsap.fromTo(
                    col.querySelectorAll('.skill-row'),
                    { x: -12, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out',
                        scrollTrigger: { trigger: col, start: 'top 85%' },
                    }
                );
            });

            // Why Join Us bullet items stagger in from the left
            gsap.fromTo(
                whyRef.current.querySelectorAll('.why-item'),
                { x: -16, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out',
                    scrollTrigger: { trigger: whyRef.current, start: 'top 85%' },
                }
            );

            // Apply CTA card fades up last
            gsap.fromTo(
                ctaRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="section pt-[calc(var(--section-py)+4rem)]">
            <div className="container-custom space-y-14">

                {/* Page header: badge, role title, experience pill, description */}
                <div ref={headerRef} className="max-w-2xl">
                    <div className="h-anim section-eyebrow">
                        <span className="badge-dot" />
                        <span className="badge-label">{CAREERS_PAGE.badge}</span>
                    </div>

                    <h1 className="h-anim font-display font-black tracking-tight leading-none mb-4 text-[length:var(--text-hero)]">
                        {CAREERS_PAGE.role}
                    </h1>

                    <div className="h-anim flex items-center gap-2 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand text-white">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <rect x="2" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="1.6" />
                                <path d="M7 6V4a3 3 0 016 0v2" stroke="white" strokeWidth="1.6" />
                            </svg>
                            Experience: {CAREERS_PAGE.experience}
                        </span>
                    </div>

                    <p className="h-anim text-lg leading-relaxed text-[var(--color-ink-soft)]">
                        {CAREERS_PAGE.description}
                    </p>
                </div>

                {/* Frontend and Backend skill cards side by side */}
                <div ref={gridRef} className="grid md:grid-cols-2 gap-6">

                    {/* Frontend skills */}
                    <div className="card-hover skill-col space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-[var(--color-border)]">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-white">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                    <rect x="2" y="3" width="16" height="12" rx="2" stroke="white" strokeWidth="1.6" />
                                    <path d="M6 17h8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className="font-display font-bold text-xl tracking-wide text-brand">Frontend</h2>
                        </div>
                        {CAREERS_PAGE.frontend.map(s => (
                            <div key={s.title} className="skill-row">
                                <SkillRow title={s.title} desc={s.desc} />
                            </div>
                        ))}
                    </div>

                    {/* Backend skills */}
                    <div className="card-hover skill-col space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-[var(--color-border)]">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-white">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.6" />
                                    <path d="M10 7v3l2 2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className="font-display font-bold text-xl tracking-wide text-brand">Backend</h2>
                        </div>
                        {CAREERS_PAGE.backend.map(s => (
                            <div key={s.title} className="skill-row">
                                <SkillRow title={s.title} desc={s.desc} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Join Us and Apply CTA side by side */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Why Join Us bullet list */}
                    <div ref={whyRef} className="card-hover">
                        <div className="flex items-center gap-3 mb-6">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 0v4m0 4v1m-4-5h8" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                            <h2 className="font-display font-bold text-xl">Why Join Us?</h2>
                        </div>
                        <ul className="space-y-3">
                            {CAREERS_PAGE.whyJoinUs.map(item => (
                                <li key={item} className="why-item flex items-start gap-3">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
                                        <circle cx="9" cy="9" r="8" fill="var(--color-brand)" opacity="0.12" />
                                        <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Apply Now dark CTA card */}
                    <div
                        ref={ctaRef}
                        className="card-hover flex flex-col justify-between gap-8 bg-surface-dark border border-white/5"
                    >
                        <div>
                            <h2 className="font-display font-black text-[length:var(--text-h2)] text-white tracking-tight leading-tight mb-2">
                                Apply Now!
                            </h2>
                            <p className="text-sm text-white/55">We're building something meaningful—come build it with us</p>
                        </div>

                        <div>
                            <a
                                href={CAREERS_PAGE.apply.mailto}
                                className="btn btn-primary block w-full text-center mb-5"
                            >
                                Send your resume to →
                            </a>

                            <p className="text-center italic text-sm text-white/50">
                                {CAREERS_PAGE.apply.tagline}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}