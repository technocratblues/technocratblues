import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREERS } from "../../assets";

gsap.registerPlugin(ScrollTrigger);

export default function CareersSection() {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const cards = cardsRef.current?.children;

            //1. Header: eyebrow → title → subtitle cascade
            gsap.fromTo(
                section.querySelector(".section-eyebrow"),
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(
                section.querySelectorAll(".section-title, .section-subtitle"),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 78%",
                    },
                }
            );

            //  2. Card 1 (Open Position): slide up
            if (cards?.[0]) {
                gsap.fromTo(
                    cards[0],
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cards[0],
                            start: "top 85%",
                        },
                    }
                );
            }

            // 3. Card 2 (Skills grid): Frontend ← left, Backend → right 
            if (cards?.[1]) {
                const cols = cards[1].querySelectorAll(".card-hover");

                if (cols[0]) {
                    gsap.fromTo(
                        cols[0],
                        { x: -40, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.65,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: cards[1],
                                start: "top 85%",
                            },
                        }
                    );
                }

                if (cols[1]) {
                    gsap.fromTo(
                        cols[1],
                        { x: 40, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.65,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: cards[1],
                                start: "top 85%",
                            },
                        }
                    );
                }

                //4. Skill items inside Frontend/Backend: micro-stagger 
                const frontendItems = cards[1].querySelectorAll(
                    ".frontend-skills > div"
                );
                const backendItems = cards[1].querySelectorAll(
                    ".backend-skills > div"
                );

                if (frontendItems.length) {
                    gsap.fromTo(
                        frontendItems,
                        { x: -15, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.4,
                            stagger: 0.08,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: cols[0],
                                start: "top 85%",
                            },
                        }
                    );
                }

                if (backendItems.length) {
                    gsap.fromTo(
                        backendItems,
                        { x: -15, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.4,
                            stagger: 0.08,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: cols[1],
                                start: "top 85%",
                            },
                        }
                    );
                }
            }

            // Card 3 (Why Join Us): scale + fade in
            if (cards?.[2]) {
                gsap.fromTo(
                    cards[2],
                    { scale: 0.97, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cards[2],
                            start: "top 88%",
                        },
                    }
                );

                //  staggered reveal
                const benefitItems = cards[2].querySelectorAll(
                    ".benefits-grid > div"
                );

                if (benefitItems.length) {
                    gsap.fromTo(
                        benefitItems,
                        { y: 10, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.35,
                            stagger: 0.07,
                            ease: "power1.out",
                            scrollTrigger: {
                                trigger: cards[2],
                                start: "top 88%",
                            },
                        }
                    );
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="careers" ref={sectionRef} className="section">
            <div className="container-custom">

                {/* Section Header  */}
                <div className="max-w-3xl mb-14">
                    <div className="section-eyebrow">
                        <span className="badge-dot" />
                        <span className="badge-label">Careers</span>
                    </div>

                    <h2 className="section-title mb-4">Join Our Team</h2>

                    <p className="section-subtitle">
                        We're looking for passionate engineers who love
                        building scalable products, solving real-world
                        problems, and growing alongside a talented team.
                    </p>
                </div>

                <div ref={cardsRef} className="space-y-8">

                    {/* Card 1: Open Position  */}
                    <div className="card-hover">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <p className="text-brand text-sm font-semibold uppercase tracking-wide mb-2">
                                    Open Position
                                </p>

                                <h3 className="font-display text-3xl font-bold mb-2">
                                    {CAREERS.role}
                                </h3>

                                <p>Experience: {CAREERS.experience}</p>
                            </div>

                            <a
                                href={`mailto:${CAREERS.apply.email}`}
                                className="btn btn-primary"
                            >
                                Apply Now
                            </a>
                        </div>

                        <p className="mt-6">{CAREERS.description}</p>
                    </div>

                    {/*Card 2: Skills Grid */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Frontend */}
                        <div className="card-hover">
                            <h3 className="text-xl font-semibold text-brand mb-6">
                                Frontend
                            </h3>

                            {/* className used as GSAP selector target */}
                            <div className="frontend-skills space-y-5">
                                {CAREERS.frontend.map((skill) => (
                                    <div key={skill.title}>
                                        <h4 className="font-display text-lg font-semibold">
                                            {skill.title}
                                        </h4>
                                        <p className="text-sm mt-1">
                                            {skill.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Backend */}
                        <div className="card-hover">
                            <h3 className="text-xl font-semibold text-brand mb-6">
                                Backend
                            </h3>

                            {/* className used as GSAP selector target */}
                            <div className="backend-skills space-y-5">
                                {CAREERS.backend.map((skill) => (
                                    <div key={skill.title}>
                                        <h4 className="font-display text-lg font-semibold">
                                            {skill.title}
                                        </h4>
                                        <p className="text-sm mt-1">
                                            {skill.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/*  Card 3: Why Join Us */}
                    <div className="card-hover">
                        <h3 className="text-2xl font-display font-semibold mb-6">
                            Why Join Us?
                        </h3>

                        {/* className used as GSAP selector target */}
                        <div className="benefits-grid grid md:grid-cols-2 gap-4">
                            {CAREERS.benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-3"
                                >
                                    <span className="badge-dot" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}