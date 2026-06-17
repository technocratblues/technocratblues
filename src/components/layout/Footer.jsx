import { BRAND, SOCIAL_LINKS } from '../../assets';
import { FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-surface-darker text-white">
      <div className="container-custom">

        {/* Brand strip — LinkedIn button top right */}
        <div className="py-10 sm:py-12 flex items-start justify-between border-b border-white/10">

          <div className="flex flex-col gap-3">
            <button
              onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <span className="font-bold text-white text-xl tracking-tight font-display">
                {BRAND.nameColored.base}{BRAND.nameColored.accent}
              </span>
            </button>
            <p className="text-xs text-white/40">
              {BRAND.address.short}
            </p>
          </div>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Technocrat Blues on LinkedIn"
            className="flex items-center gap-2 px-4 py-2 rounded-xl
               border border-white/20 text-white/60
               hover:border-white/50 hover:text-white hover:bg-white/10
               transition-all duration-200"
          >
            <FiLinkedin className="w-4 h-4" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

        </div>

        {/* Copyright bar */}
        <div className="py-5 flex items-center justify-center">
          <p className="text-xs text-white/30">
            {BRAND.copyright}
          </p>
        </div>
    </div>
    </footer >
  );
}