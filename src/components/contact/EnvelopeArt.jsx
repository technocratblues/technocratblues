import { useId, useRef } from 'react';
import { useEnvelopeFloat } from '../../hooks/useEnvelopeFloat';

// Overhangs the card on purpose; the parent's top padding reserves the space for it.
export default function EnvelopeArt() {
    const uid = useId().replace(/:/g, '');
    const floatRef = useRef(null);

    useEnvelopeFloat(floatRef);

    return (
        <div
            aria-hidden="true"
            className="absolute -top-28 left-0 w-[17rem] sm:w-80 pointer-events-none"
        >
            <div className="absolute inset-x-10 inset-y-6 rounded-full blur-3xl bg-(--color-brand-glow)" />
            <svg ref={floatRef} viewBox="0 0 300 200" className="relative w-full h-auto overflow-visible">
                <defs>
                    <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="0.55" stopColor="#ece9fb" />
                        <stop offset="1" stopColor="#e6c8f2" />
                    </linearGradient>
                    <linearGradient id={`${uid}-flap`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#e4dcf9" />
                    </linearGradient>
                    <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
                        <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#7078D0" floodOpacity="0.28" />
                    </filter>
                </defs>

                <g transform="rotate(8 150 100)" filter={`url(#${uid}-shadow)`}>
                    <rect x="92" y="60" width="116" height="84" rx="12" fill={`url(#${uid}-body)`} stroke="#ffffff" strokeWidth="1.5" />
                    <path d="M98 68 L150 110 L202 68 Z" fill={`url(#${uid}-flap)`} stroke="#d4c9f3" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M96 138 L132 104 M204 138 L168 104" stroke="#d9c9f2" strokeWidth="1.5" strokeLinecap="round" />
                </g>
            </svg>
        </div>
    );
}