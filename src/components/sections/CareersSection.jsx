import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREERS_LISTINGS, CAREERS_META } from "../../assets";

gsap.registerPlugin(ScrollTrigger);

export default function CareersSection() {
    const sectionRef = useRef(null);
    const headerRef  = useRef(null);
    const listRef    = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current.querySelectorAll(".h-anim"),
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.13, ease: "power3.out",
                    scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
                }
            );

            const rows = listRef.current?.querySelectorAll(".job-row");
            if (rows?.length) {
                gsap.fromTo(
                    rows,
                    { y: 28, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: "power3.out",
                        scrollTrigger: { trigger: listRef.current, start: "top 84%" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="careers" ref={sectionRef} className="section bg-surface">
            <div className="container-custom">

                <div ref={headerRef} className="max-w-3xl mb-12">
                    <div className="h-anim section-eyebrow">
                        <span className="badge-dot" />
                        <span className="badge-label">Careers</span>
                    </div>
                    <h2 className="h-anim section-title mb-4">Join Our Team</h2>
                    <p className="h-anim section-subtitle">
                        We&apos;re looking for passionate engineers who love building scalable
                        products, solving real-world problems, and growing alongside a talented team.
                    </p>
                </div>

                <div ref={listRef} className="space-y-4 mb-10">
                    {CAREERS_LISTINGS.filter(job => job.active !== false).map((job, i) => (
                        <Link
                            key={job.slug}
                            to={`/careers#${job.slug}`}
                            className="job-row group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 card-hover no-underline hover:border-brand/40 transition-colors"
                            aria-label={`View ${job.role} listing`}
                        >
                            <div className="flex items-center gap-5">
                                <span className="font-display font-black text-3xl text-brand/20 group-hover:text-brand/40 transition-colors select-none w-8 shrink-0">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <p className="font-display font-bold text-xl group-hover:text-brand transition-colors">
                                        {job.role}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1.5">
                                        {[job.type, job.experience, job.location].map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/15"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200 shrink-0">
                                View Details
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/careers" className="btn btn-primary">
                        View All Openings
                    </Link>
                    <span className="text-sm text-[var(--color-ink-muted)]">
                        {CAREERS_META.subheadline}
                    </span>
                </div>

            </div>
        </section>
    );
}