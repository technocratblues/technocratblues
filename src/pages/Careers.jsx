import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREERS_LISTINGS, CAREERS_META } from '../assets';

gsap.registerPlugin(ScrollTrigger);

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
    'React Native': (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <circle cx="16" cy="16" r="3" fill="#61DAFB" />
            <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.6" fill="none" />
            <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(60 16 16)" />
            <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.6" fill="none" transform="rotate(120 16 16)" />
        </svg>
    ),
    Expo: (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <rect width="32" height="32" rx="6" fill="#000020" />
            <text x="5" y="23" fontFamily="monospace" fontWeight="bold" fontSize="12" fill="white">expo</text>
        </svg>
    ),
    'Android / Kotlin': (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <rect width="32" height="32" rx="6" fill="#A97BFF" />
            <text x="5" y="22" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="white">KT</text>
        </svg>
    ),
    'REST / GraphQL': (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="#E10098" strokeWidth="2" />
            <circle cx="16" cy="7"  r="2.5" fill="#E10098" />
            <circle cx="16" cy="25" r="2.5" fill="#E10098" />
            <circle cx="7"  cy="20" r="2.5" fill="#E10098" />
            <circle cx="25" cy="20" r="2.5" fill="#E10098" />
            <circle cx="7"  cy="12" r="2.5" fill="#E10098" />
            <circle cx="25" cy="12" r="2.5" fill="#E10098" />
        </svg>
    ),
    Firebase: (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <path d="M5 25l5-13 4 6 4-14 9 21H5z" fill="#FFA000" />
            <path d="M13 18l4-6 4 13H5l4-7z" fill="#F57C00" opacity="0.6" />
        </svg>
    ),
};

const GROUP_ICONS = {
    monitor: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="3" width="16" height="12" rx="2" stroke="white" strokeWidth="1.6" />
            <path d="M6 17h8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    server: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="4"  width="16" height="5" rx="1.5" stroke="white" strokeWidth="1.6" />
            <rect x="2" y="11" width="16" height="5" rx="1.5" stroke="white" strokeWidth="1.6" />
            <circle cx="15" cy="6.5"  r="1" fill="white" />
            <circle cx="15" cy="13.5" r="1" fill="white" />
        </svg>
    ),
    mobile: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <rect x="5" y="2" width="10" height="16" rx="2" stroke="white" strokeWidth="1.6" />
            <circle cx="10" cy="15" r="1" fill="white" />
        </svg>
    ),
};

function SkillRow({ title, desc }) {
    return (
        <div className="flex items-start gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-surface-raised border border-[var(--color-border)]">
                {SKILL_ICONS[title] ?? <span className="text-xl">&#9881;</span>}
            </div>
            <div>
                <p className="font-display font-semibold text-base">{title}</p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{desc}</p>
            </div>
        </div>
    );
}

function MetaPill({ icon, label }) {
    return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand text-white">
            {icon}
            {label}
        </span>
    );
}

const BriefcaseIcon = (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="1.6" />
        <path d="M7 6V4a3 3 0 016 0v2" stroke="white" strokeWidth="1.6" />
    </svg>
);
const PinIcon = (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="white" strokeWidth="1.6" />
        <circle cx="10" cy="8" r="2" stroke="white" strokeWidth="1.4" />
    </svg>
);

function JobListing({ job }) {
    const cardRef   = useRef(null);
    const headerRef = useRef(null);
    const skillsRef = useRef(null);
    const whyRef    = useRef(null);
    const ctaRef    = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current.querySelectorAll('.h-anim'),
                { y: 28, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
            );

            const cols = skillsRef.current.querySelectorAll('.skill-col');
            gsap.fromTo(
                cols,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'power3.out',
                  scrollTrigger: { trigger: skillsRef.current, start: 'top 82%' } }
            );

            cols.forEach(col => {
                gsap.fromTo(
                    col.querySelectorAll('.skill-row'),
                    { x: -12, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out',
                      scrollTrigger: { trigger: col, start: 'top 85%' } }
                );
            });

            gsap.fromTo(
                whyRef.current.querySelectorAll('.why-item'),
                { x: -16, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out',
                  scrollTrigger: { trigger: whyRef.current, start: 'top 85%' } }
            );

            gsap.fromTo(
                ctaRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
                  scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' } }
            );
        }, cardRef);

        return () => ctx.revert();
    }, [job.slug]);

    return (
        <section
            id={job.slug}
            ref={cardRef}
            className="scroll-mt-28 space-y-8"
            aria-labelledby={`job-title-${job.slug}`}
        >
            <div ref={headerRef} className="max-w-2xl">
                <div className="h-anim section-eyebrow">
                    <span className="badge-dot" />
                    <span className="badge-label">{job.badge}</span>
                </div>

                <h2
                    id={`job-title-${job.slug}`}
                    className="h-anim font-display font-black tracking-tight leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                >
                    {job.role}
                </h2>

                <div className="h-anim flex flex-wrap items-center gap-2 mb-5">
                    <MetaPill icon={BriefcaseIcon} label={`Experience: ${job.experience}`} />
                    {job.location && <MetaPill icon={PinIcon} label={job.location} />}
                </div>

                <p className="h-anim text-base leading-relaxed text-[var(--color-ink-soft)]">
                    {job.description}
                </p>
            </div>

            <div ref={skillsRef} className="grid md:grid-cols-2 gap-6">
                {job.skillGroups.map(group => (
                    <div key={group.label} className="card-hover skill-col space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-[var(--color-border)]">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-white">
                                {GROUP_ICONS[group.icon] ?? GROUP_ICONS.server}
                            </div>
                            <h3 className="font-display font-bold text-xl tracking-wide text-brand">
                                {group.label}
                            </h3>
                        </div>
                        {group.items.map(skill => (
                            <div key={skill.title} className="skill-row">
                                <SkillRow title={skill.title} desc={skill.desc} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div ref={whyRef} className="card-hover">
                    <div className="flex items-center gap-3 mb-5">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 0v4m0 4v1m-4-5h8" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <h3 className="font-display font-bold text-xl">Why Join Us?</h3>
                    </div>
                    <ul className="space-y-3">
                        {job.whyJoinUs.map(item => (
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

                <div
                    ref={ctaRef}
                    className="card-hover flex flex-col justify-center gap-4 bg-surface-dark border border-white/5"
                >
                    <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                        Interested in this role?
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                        We&apos;d love to hear from you. Send your resume to{' '}
                        <a
                            href={job.apply.mailto}
                            className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
                        >
                            {job.apply.email}
                        </a>
                        {' '}and we&apos;ll get back to you shortly.
                    </p>
                    <p className="text-xs text-white/35 italic">{job.apply.tagline}</p>
                </div>
            </div>
        </section>
    );
}

function JobNav({ listings, activeSlug, onSelect }) {
    return (
        <nav aria-label="Job listings navigation" className="flex flex-wrap gap-2">
            {listings.map(job => {
                const isActive = job.slug === activeSlug;
                return (
                    <button
                        key={job.slug}
                        onClick={() => onSelect(job.slug)}
                        aria-current={isActive ? 'true' : undefined}
                        className={[
                            'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
                            isActive
                                ? 'bg-brand text-white shadow-sm'
                                : 'bg-surface-raised border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-brand hover:text-brand',
                        ].join(' ')}
                    >
                        {job.role}
                    </button>
                );
            })}
        </nav>
    );
}

export default function Careers() {
    const pageRef  = useRef(null);
    const heroRef  = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const activeSlug =
        location.hash
            ? location.hash.replace('#', '')
            : (CAREERS_LISTINGS[0]?.slug ?? '');

    const activeJob = CAREERS_LISTINGS.find(j => j.slug === activeSlug) ?? CAREERS_LISTINGS[0];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSlug]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                heroRef.current.querySelectorAll('.hero-anim'),
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
            );
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const handleJobSelect = (slug) => {
        navigate(`/careers#${slug}`, { replace: false });
    };

    return (
        <div ref={pageRef} className="section pt-[calc(var(--section-py)+4rem)]">
            <div className="container-custom space-y-14">

                <div ref={heroRef} className="max-w-2xl space-y-5">
                    <div className="hero-anim section-eyebrow">
                        <span className="badge-dot" />
                        <span className="badge-label">{CAREERS_META.badge}</span>
                    </div>

                    <h1 className="hero-anim font-display font-black tracking-tight leading-none text-[length:var(--text-hero)]">
                        {CAREERS_META.headline}
                    </h1>

                    <p className="hero-anim text-lg leading-relaxed text-[var(--color-ink-soft)]">
                        {CAREERS_META.subheadline}
                    </p>

                    <div className="hero-anim">
                        <JobNav
                            listings={CAREERS_LISTINGS}
                            activeSlug={activeSlug}
                            onSelect={handleJobSelect}
                        />
                    </div>
                </div>

                {activeJob && <JobListing key={activeJob.slug} job={activeJob} />}

            </div>
        </div>
    );
}
