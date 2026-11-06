const base = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export function MailIcon({ className = 'w-5 h-5' }) {
    return (
        <svg {...base} className={className}>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M3.5 7l8.5 6 8.5-6" />
        </svg>
    );
}

export function ArrowRightIcon({ className = 'w-4 h-4' }) {
    return (
        <svg {...base} strokeWidth={2} className={className}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export function ArrowUpRightIcon({ className = 'w-4 h-4' }) {
    return (
        <svg {...base} strokeWidth={2} className={className}>
            <path d="M7 17L17 7M8 7h9v9" />
        </svg>
    );
}

export function BoltIcon({ className = 'w-5 h-5' }) {
    return (
        <svg {...base} className={className}>
            <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />
        </svg>
    );
}

export function UsersIcon({ className = 'w-5 h-5' }) {
    return (
        <svg {...base} className={className}>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
            <path d="M16 5.2a3 3 0 010 5.6M18 14c2 .6 3.5 2.3 3.5 5" />
        </svg>
    );
}

export function StarIcon({ className = 'w-5 h-5' }) {
    return (
        <svg {...base} className={className}>
            <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8L12 3.5z" />
        </svg>
    );
}