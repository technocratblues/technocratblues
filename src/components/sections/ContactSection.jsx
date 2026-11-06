import { useMemo, useRef } from 'react';
import { CONTACT_HEADLINE, CONTACT_EMAIL } from '../../assets';
import { useSlideIn } from '../../hooks/useSlideIn';
import ContactBackdrop from '../contact/ContactBackdrop';
import EnvelopeArt from '../contact/EnvelopeArt';
import EmailCard from '../contact/EmailCard';
import ContactHighlights from '../contact/ContactHighlights';

export default function ContactSection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useSlideIn(sectionRef, useMemo(() => [
        { ref: leftRef, x: -50 },
        { ref: rightRef, x: 50 },
    ], []));

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section relative overflow-hidden pb-32 sm:pb-40"
            style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f7f6ff 100%)' }}
        >
            <ContactBackdrop />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 xl:gap-24 items-center">

                    <div ref={leftRef}>
                        <span className="section-eyebrow">
                            <span className="badge-dot" />
                            <span className="badge-label">{CONTACT_HEADLINE.badge}</span>
                        </span>

                        <h2 className="section-title font-display mb-5">
                            {CONTACT_HEADLINE.line1}
                            <br />
                            <em className="font-serif italic text-brand not-italic">
                                {CONTACT_HEADLINE.line2}
                            </em>
                        </h2>

                        <p className="section-subtitle mb-6">
                            {CONTACT_HEADLINE.description}
                        </p>
                        <ContactHighlights />

                    </div>

                    <div ref={rightRef} className="relative pt-24 mt-14 lg:mt-0">
                        <EnvelopeArt />
                        <EmailCard
                            title={CONTACT_HEADLINE.cardTitle}
                            description={CONTACT_HEADLINE.cardDescription}
                            ctaLabel={CONTACT_HEADLINE.cta}
                            mailto={CONTACT_EMAIL.gmail}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}