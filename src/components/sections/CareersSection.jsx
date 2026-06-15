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
            gsap.fromTo(
                cardsRef.current?.children || [],
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 82%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="careers" ref={sectionRef} className="section">
            <div className="container-custom">
                {/* Section Header */}
                <div className="max-w-3xl mb-14">
                    <div className="section-eyebrow">
                        <span className="badge-dot" />
                        <span className="badge-label">
                            Careers
                        </span>
                    </div>

                    <h2 className="section-title mb-4">
                        Join Our Team
                    </h2>

                    <p className="section-subtitle">
                        We're looking for passionate engineers who love
                        building scalable products, solving real-world
                        problems, and growing alongside a talented team.
                    </p>
                </div>

                <div ref={cardsRef} className="space-y-8">
                    {/* Open Position */}
                    <div className="card-hover">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <p className="text-brand text-sm font-semibold uppercase tracking-wide mb-2">
                                    Open Position
                                </p>

                                <h3 className="font-display text-3xl font-bold mb-2">
                                    {CAREERS.role}
                                </h3>

                                <p>
                                    Experience: {CAREERS.experience}
                                </p>
                            </div>

                            <a
                                href={`mailto:${CAREERS.apply.email}`}
                                className="btn btn-primary"
                            >
                                Apply Now
                            </a>
                        </div>

                        <p className="mt-6">
                            {CAREERS.description}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card-hover">
                            <h3 className="text-xl font-semibold text-brand mb-6">
                                Frontend
                            </h3>

                            <div className="space-y-5">
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

                        <div className="card-hover">
                            <h3 className="text-xl font-semibold text-brand mb-6">
                                Backend
                            </h3>

                            <div className="space-y-5">
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

                    {/* Why Join Us */}
                    <div className="card-hover">
                        <h3 className="text-2xl font-display font-semibold mb-6">
                            Why Join Us?
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
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