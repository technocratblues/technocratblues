import { MailIcon, ArrowRightIcon } from './icons';

// A missing mailto renders the CTA as a disabled span
export default function EmailCard({ title, description, ctaLabel, mailto }) {
    return (
        <div
            className="relative glass rounded-3xl border border-white/70 p-7 sm:p-8"
            style={{ boxShadow: '0 20px 60px rgba(112,120,208,0.18)' }}
        >
            <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex-center bg-(--color-blue-50) text-brand">
                    <MailIcon className="w-6 h-6" />
                </div>
            </div>

            <h3 className="font-display text-2xl font-black text-(--color-ink) mb-2">{title}</h3>
            <p className="text-sm leading-relaxed text-(--color-ink-soft) mb-7">{description}</p>

            {mailto ? (
                <a
                    href={mailto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group btn btn-primary btn-full relative rounded-full py-4"
                    style={{ backgroundImage: 'linear-gradient(135deg, var(--color-brand-dark), var(--color-brand))' }}
                >
                    <MailIcon className="w-4 h-4" />
                    {ctaLabel}
                    <ArrowRightIcon className="w-4 h-4 absolute right-6 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
            ) : (
                <span
                    role="link"
                    aria-disabled="true"
                    className="btn btn-full rounded-full py-4 bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                    <MailIcon className="w-4 h-4" />
                    {ctaLabel}
                </span>
            )}
        </div>
    );
}