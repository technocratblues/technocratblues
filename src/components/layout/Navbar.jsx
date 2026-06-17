import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

// Separate links into hash-based and route-based
const LINKS = NAV_LINKS.map(link => ({
    label: link.label,
    href: link.href,
    isRoute: !!link.isRoute,
}));

// Hash-scroll helper (only used when on the home page)
function scrollToHash(href) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.refresh();

    const pinSpacer =
        el.closest('[data-scrolltrigger-pin-spacer]') ??
        el.parentElement?.closest('[data-scrolltrigger-pin-spacer]');
    const target = pinSpacer ?? el;
    const top = target.getBoundingClientRect().top + window.scrollY;

    const serviceEl = document.getElementById('services');
    const servicePinSpacer = serviceEl
        ? (serviceEl.closest('[data-scrolltrigger-pin-spacer]') ??
          serviceEl.parentElement?.closest('[data-scrolltrigger-pin-spacer]'))
        : null;
    const servicePinTop = servicePinSpacer
        ? servicePinSpacer.getBoundingClientRect().top + window.scrollY
        : null;

    const crossesPinned = servicePinTop !== null && top >= servicePinTop;
    window.scrollTo({ top, behavior: crossesPinned ? 'instant' : 'smooth' });
}

export default function Navbar() {
    const navRef      = useRef(null);
    const pillRef     = useRef(null);
    const dropdownRef = useRef(null);
    const linesRef    = useRef([]);
    const itemsRef    = useRef([]);

    const [menuOpen,      setMenuOpen]      = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';

    // ── Entry animation ────────────────────────────────────────────────────
    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        );
    }, []);

    // ── Hide / reveal + shadow on scroll ──────────────────────────────────
    useEffect(() => {
        let lastY = window.scrollY;
        let hidden = false;
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY;
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

                lastY = y;
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ── Active section tracking (home only) ───────────────────────────────
    useEffect(() => {
        if (!isHome) {
            // On /careers or other routes, highlight that nav item
            const matched = LINKS.find(l => l.isRoute && location.pathname === l.href);
            if (matched) setActiveSection(matched.href);
            return;
        }

        const NAV_HEIGHT = 80;
        const BUFFER     = 40;
        const TRIGGER    = NAV_HEIGHT + BUFFER;

        const hashLinks = LINKS.filter(l => !l.isRoute);

        const getActiveId = () => {
            const sections = hashLinks
                .map(l => document.getElementById(l.href.replace('#', '')))
                .filter(Boolean);

            const scrollY = window.scrollY + TRIGGER;

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

        setActiveSection(getActiveId());
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome, location.pathname]);

    // ── Hamburger → × morph ───────────────────────────────────────────────
    useEffect(() => {
        const [l1, l2, l3] = linesRef.current;
        const tl = gsap.timeline({ defaults: { duration: 0.25, ease: 'power2.inOut' } });

        if (menuOpen) {
            tl.to(l2, { opacity: 0, scaleX: 0.5, duration: 0.15 })
              .to(l1, { y: 4,  rotate:  45, transformOrigin: '50% 50%' }, '<')
              .to(l3, { y: -4, rotate: -45, transformOrigin: '50% 50%' }, '<');
        } else {
            tl.to(l2, { opacity: 1, scaleX: 1 })
              .to(l1, { y: 0, rotate: 0 }, '<')
              .to(l3, { y: 0, rotate: 0 }, '<');
        }
    }, [menuOpen]);

    // ── Dropdown clip-path reveal ─────────────────────────────────────────
    useEffect(() => {
        const el = dropdownRef.current;
        if (!el) return;

        if (menuOpen) {
            gsap.set(el, { display: 'block' });
            gsap.fromTo(el,
                { opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' },
                { opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)', duration: 0.35, ease: 'power3.out' }
            );
            gsap.fromTo(itemsRef.current,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0,  duration: 0.25, ease: 'power2.out', stagger: 0.06, delay: 0.1 }
            );
        } else {
            gsap.to(el, {
                opacity: 0, y: -6, clipPath: 'inset(0 0 100% 0)',
                duration: 0.25, ease: 'power2.in',
                onComplete: () => gsap.set(el, { display: 'none' }),
            });
        }
    }, [menuOpen]);

    // ── Unified click handler ──────────────────────────────────────────────
    const handleNav = (link, closeMobile = false) => {
        if (closeMobile) setMenuOpen(false);

        if (link.isRoute) {
            navigate(link.href);
        } else {
            // If not on home, navigate there first then scroll
            if (!isHome) {
                navigate('/');
                // Small delay to let the DOM render before scrolling
                setTimeout(() => scrollToHash(link.href), 120);
            } else {
                scrollToHash(link.href);
            }
        }
    };

    const isActive = (link) => {
        if (link.isRoute) return location.pathname === link.href;
        if (!isHome) return false;
        return activeSection === link.href.replace('#', '');
    };

    const handleContactClick = () => {
        if (!isHome) {
            navigate('/');
            setTimeout(() => scrollToHash('#contact'), 120);
        } else {
            scrollToHash('#contact');
        }
    };

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
                    padding: '1.5px',
                    background: 'linear-gradient(135deg, rgba(26,71,232,0.5) 0%, rgba(160,180,255,0.22) 45%, rgba(255,255,255,0.12) 60%, rgba(26,71,232,0.38) 100%)',
                    borderRadius: '1rem',
                    boxShadow: 'var(--shadow-nav)',
                }}
            >
                <div className="rounded-[calc(1rem-1.5px)] glass px-3 sm:px-5">
                    <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-4 overflow-x-auto scrollbar-none">

                        {/* Mobile: CTA left · hamburger right */}
                        <div className="flex items-center justify-between w-full sm:hidden">
                            <button
                                onClick={handleContactClick}
                                className="btn btn-primary text-xs px-3 py-1.5"
                            >
                                Get in touch
                                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setMenuOpen(p => !p)}
                                className="p-2 rounded-lg transition-colors"
                                style={{ color: 'var(--color-ink)' }}
                                aria-label="Toggle menu"
                                aria-expanded={menuOpen}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    {[6, 10, 14].map((y, i) => (
                                        <line key={y} ref={el => (linesRef.current[i] = el)}
                                            x1="3" y1={y} x2="17" y2={y}
                                            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                                        />
                                    ))}
                                </svg>
                            </button>
                        </div>

                        {/* Nav links — desktop */}
                        <nav className="hidden sm:flex items-center gap-0.5 shrink-0">
                            {LINKS.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNav(link)}
                                    className={`nav-link whitespace-nowrap text-xs sm:text-[0.905rem] px-2.5 sm:px-4 py-2 cursor-pointer
                                        ${isActive(link) ? 'text-brand nav-active' : 'text-[#1a1a2e]'}`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>

                        {/* CTA — desktop */}
                        <button
                            onClick={handleContactClick}
                            className="hidden sm:flex btn btn-primary shrink-0 text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
                        >
                            Get in touch
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                ref={dropdownRef}
                style={{ display: 'none' }}
                className="pointer-events-auto sm:hidden w-[calc(100%-2rem)] max-w-5xl mt-2"
            >
                <div style={{
                    padding: '1.5px',
                    background: 'linear-gradient(135deg, rgba(26,71,232,0.5) 0%, rgba(160,180,255,0.22) 45%, rgba(255,255,255,0.12) 60%, rgba(26,71,232,0.38) 100%)',
                    borderRadius: '1rem',
                    boxShadow: 'var(--shadow-nav)',
                }}>
                    <div className="rounded-[calc(1rem-1.5px)] glass overflow-hidden">
                        <div
                            className="h-px mx-4"
                            style={{ background: 'linear-gradient(90deg, rgba(26,71,232,0.35) 0%, rgba(160,180,255,0.15) 60%, transparent 100%)' }}
                        />
                        <nav className="flex flex-col px-2 py-2">
                            {LINKS.map((link, i) => {
                                const active = isActive(link);
                                return (
                                    <button
                                        key={link.label}
                                        ref={el => (itemsRef.current[i] = el)}
                                        onClick={() => handleNav(link, true)}
                                        className="group relative flex items-center gap-3 text-left px-3 py-3 rounded-xl cursor-pointer transition-colors duration-200"
                                        style={{ background: active ? 'rgba(26,71,232,0.07)' : 'transparent' }}
                                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(26,71,232,0.04)'; }}
                                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        <span
                                            className="shrink-0 w-0.5 h-5 rounded-full transition-all duration-200"
                                            style={{ background: 'var(--color-brand)', opacity: active ? 1 : 0 }}
                                        />
                                        <span
                                            className="text-[0.92rem] font-medium tracking-[-0.01em] transition-colors duration-200"
                                            style={{ color: active ? 'var(--color-brand)' : 'var(--color-ink)' }}
                                        >
                                            {link.label}
                                        </span>
                                        {active && (
                                            <span
                                                className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full"
                                                style={{ background: 'var(--color-brand)' }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                        <div className="h-1" />
                    </div>
                </div>
            </div>

        </header>
    );
}
