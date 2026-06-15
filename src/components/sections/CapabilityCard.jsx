import { CAPABILITY_DETAILS } from '../../assets';

// ─── Card component ───────────────────────────────────────────────────────────
export default function CapabilityCard({ emoji, title, desc }) {
  const detail = CAPABILITY_DETAILS[title];

  return (
    <div
      className="group relative rounded-3xl p-8 overflow-hidden
                 border border-[color:var(--color-border-medium)]
                 hover:border-brand/30 hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(240,243,255,0.85) 0%, rgba(255,255,255,0.95) 100%)',
      }}
    >
      {/* Hover gradient wash */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: detail?.accentBg ?? 'var(--color-brand-light)' }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-md flex items-center justify-center text-2xl mb-6 border border-white/60
                        group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
          {emoji}
        </div>

        <h4 className="font-display text-xl font-black text-[color:var(--color-ink)] mb-3
                        group-hover:text-brand transition-colors duration-200">
          {title}
        </h4>
        <p className="text-sm text-[color:var(--color-ink-subtle)] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}