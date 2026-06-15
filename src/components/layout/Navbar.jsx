import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const LINKS = [
    { label: 'Home',     href: '#home'     },
    { label: 'About',    href: '#about'    },
    { label: 'Services', href: '#services' },
    { label: 'Clients',  href: '#clients'  },
];

function scrollTo(href) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.refresh();

    const pinSpacer = el.closest('[data-scrolltrigger-pin-spacer]') ?? el.parentElement?.closest('[data-scrolltrigger-pin-spacer]');
    const target = pinSpacer ?? el;
    const top = target.getBoundingClientRect().top + window.scrollY;

    const serviceEl = document.getElementById('services');
    const servicePinSpacer = serviceEl
        ? (serviceEl.closest('[data-scrolltrigger-pin-spacer]') ?? serviceEl.parentElement?.closest('[data-scrolltrigger-pin-spacer]'))
        : null;
    const servicePinTop = servicePinSpacer
        ? servicePinSpacer.getBoundingClientRect().top + window.scrollY
        : null;

    const crossesPinnedSection = servicePinTop !== null && top >= servicePinTop;
    window.scrollTo({ top, behavior: crossesPinnedSection ? 'instant' : 'smooth' });
}

export default function Navbar() {
    const navRef  = useRef(null);
    const pillRef = useRef(null);
    const [activeSection, setActiveSection] = useState('home');

    /* ── Entry animation ── */
    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        );
    }, []);

    /* ── Hide / reveal + shadow on scroll ── */
    useEffect(() => {
        let lastY   = window.scrollY;
        let hidden  = false;
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y     = window.scrollY;
                const delta = y - lastY;

                gsap.to(pillRef.current, {
                    boxShadow: y > 20 ? 'var(--shadow-nav-scrolled)' : 'var(--shadow-nav)',
                    duration: 0.3,
                });

                if (delta > 4 && y > 80 && !hidden) {
                    gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.38, ease: 'power2.inOut' });
                    hidden = true;
                }
                if (delta < -4 && hidden) {
                    gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' });
                    hidden = false;
                }

                lastY   = y;
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Active section tracking ── */
    useEffect(() => {
        const NAV_HEIGHT = 80;       // navbar height in px
        const BUFFER     = 40;       // extra px — prevents early activation of short/nested sections
        const TRIGGER    = NAV_HEIGHT + BUFFER;

        const getActiveId = () => {
            const sections = LINKS
                .map(l => document.getElementById(l.href.replace('#', '')))
                .filter(Boolean);

            const scrollY = window.scrollY + TRIGGER;

            // Walk bottom→top; first section whose top is above the trigger wins
            for (let i = sections.length - 1; i >= 0; i--) {
                const top = sections[i].getBoundingClientRect().top + window.scrollY;
                if (scrollY >= top) return sections[i].id;
            }
            return sections[0]?.id ?? 'home';
        };

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                setActiveSection(getActiveId());
                ticking = false;
            });
        };

        setActiveSection(getActiveId()); // set immediately on mount
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            ref={navRef}
            style={{ opacity: 0 }}
            className="navbar"
        >
            {/* Pill */}
            <div
                ref={pillRef}
                className="pointer-events-auto w-[calc(100%-2rem)] max-w-5xl"
                style={{
                    padding    : '1.5px',
                    background : 'linear-gradient(135deg, rgba(26,71,232,0.5) 0%, rgba(160,180,255,0.22) 45%, rgba(255,255,255,0.12) 60%, rgba(26,71,232,0.38) 100%)',
                    borderRadius: '1rem',
                    boxShadow  : 'var(--shadow-nav)',
                }}
            >
                <div className="rounded-[calc(1rem-1.5px)] glass px-3 sm:px-5">
                    <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-4 overflow-x-auto scrollbar-none">

                        {/* Nav links — always visible */}
                        <nav className="flex items-center gap-0.5 shrink-0">
                            {LINKS.map(({ label, href }) => {
                                const id = href.replace('#', '');
                                return (
                                    <button
                                        key={label}
                                        onClick={() => scrollTo(href)}
                                        className={`nav-link whitespace-nowrap text-xs sm:text-[0.905rem] px-2.5 sm:px-4 py-2
                                            ${activeSection === id ? 'text-brand nav-active' : 'text-[#1a1a2e]'}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Let's talk CTA — always visible */}
                        <button
                            onClick={() => scrollTo('#contact')}
                            className="btn btn-primary shrink-0 text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
                        >
                            Let's talk
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </header>
    );
}