import { CAPABILITY_DETAILS } from '../../assets';

export default function CapabilityCard({ emoji, title, desc }) {
  const detail = CAPABILITY_DETAILS[title];

  return (
    <div
      className="group relative rounded-3xl p-8 overflow-hidden cursor-pointer
                 border border-(--color-border-blue) shadow-xl -translate-y-1
                 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300
                 bg-linear-to-br from-[rgba(240,243,255,0.85)] to-[rgba(255,255,255,0.95)]"
    >
      {/* Accent wash */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ backgroundColor: detail?.accentBg }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-lg flex items-center
                        justify-center text-2xl mb-6 border border-white/60
                        transition-all duration-300">
          {emoji}
        </div>

        {/* Title */}
        <h4 className="font-display text-xl font-black text-(--color-brand) mb-3">
          {title}
        </h4>

        {/* Description */}
        <p className="text-sm text-(--color-ink-subtle) leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}