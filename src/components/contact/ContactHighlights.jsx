import { CONTACT_HIGHLIGHTS } from '../../assets';
import { BoltIcon, UsersIcon, StarIcon } from './icons';

// Icon keys in CONTACT_HIGHLIGHTS (assets.js) map to components here.
const ICONS = { bolt: BoltIcon, users: UsersIcon, star: StarIcon };


export default function ContactHighlights({ items = CONTACT_HIGHLIGHTS }) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 mt-10 sm:mt-14">
            {items.map(({ icon, title, desc }) => {
                const Icon = ICONS[icon];
                return (
                    <li
                        key={title}
                        className="flex items-start gap-4 sm:px-6 sm:border-l sm:border-(--color-blue-50) sm:nth-[3n+1]:border-l-0 sm:nth-[3n+1]:pl-0 sm:nth-[3n]:pr-0"
                    >
                        <div className="w-12 h-12 shrink-0 rounded-2xl flex-center bg-(--color-blue-50) text-brand">
                            {Icon && <Icon className="w-5 h-5" />}
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-(--color-ink) leading-tight mb-1.5">{title}</h4>
                            <p className="text-xs leading-snug text-(--color-ink-faint)">{desc}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}