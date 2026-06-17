import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_HEADLINE, LOGO, STAT_CONFIG } from '../../assets';

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───────────────────────────────────────────────────────────────

const CYCLING_WORDS = ['Forward', 'Faster', 'Smarter', 'At Scale', 'With Clarity', 'That Lasts'];

const STAT_ICONS = {
  'trending-up': () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  shield: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  users: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

// ─── StatsStrip
function StatsStrip() {
  const stripRef = useRef(null);
  const cardsRef = useRef([]);
  const barsRef = useRef([]);
  const glowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: stripRef.current, start: 'top 95%' };

      gsap.fromTo(stripRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: trigger }
      );

      gsap.fromTo(cardsRef.current,
        { rotateX: -40, y: 30, opacity: 0, transformPerspective: 800 },
        { rotateX: 0, y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.13, scrollTrigger: trigger }
      );

      barsRef.current.forEach((bar, i) => {
        gsap.fromTo(bar,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: STAT_CONFIG[i].bar, duration: 1.1, ease: 'power2.out', delay: 0.6 + i * 0.13, scrollTrigger: trigger }
        );
      });

      glowsRef.current.forEach((glow, i) => {
        gsap.to(glow, {
          opacity: 0.55, scale: 1.15, duration: 1.8,
          ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.55,
        });
      });

      cardsRef.current.forEach((card, i) => {
        const glow = glowsRef.current[i];
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -6, scale: 1.03, duration: 0.3, ease: 'power2.out' });
          gsap.to(glow, { opacity: 0.9, scale: 1.4, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.6)' });
          gsap.to(glow, { opacity: 0.3, scale: 1, duration: 0.4, ease: 'power2.out' });
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stripRef}
      style={{ opacity: 0 }} // GSAP initial state 
      className="w-full border-t border-[#e8eaf0]/60 bg-white/40 backdrop-blur-sm"
    >
      <div className="container-custom py-5 grid grid-cols-3 gap-2 sm:gap-4">
        {STAT_CONFIG.map(({ key, value, label, icon, color, glow }, i) => (
          <div
            key={key}
            ref={el => { cardsRef.current[i] = el; }}
            className="relative rounded-2xl px-2.5 sm:px-4 py-3 sm:py-4 overflow-hidden cursor-default
                       bg-gradient-to-br from-white/90 to-[#f8f9ff]/95
                       border border-white/60 will-change-transform"
            style={{
              borderColor: `${color}22`,
              boxShadow: `0 2px 12px ${color}0f`,
            }}
          >
            {/* Ambient glow — color is dynamic from config, opacity driven by GSAP */}
            <div
              ref={el => { glowsRef.current[i] = el; }}
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl pointer-events-none"
              style={{ background: glow, opacity: 0.3 }}
            />

            {/* Icon box */}
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl
                         flex items-center justify-center mb-2 sm:mb-2.5"
              style={{ background: `${color}15`, color }}
            >
              {STAT_ICONS[icon]?.()}
            </div>

            
            <p className="font-display text-lg sm:text-base font-black leading-snug break-words text-[color:var(--color-ink)]">
              {value}
            </p>

            
            <p className="text-[10px] sm:text-sm mt-0.5 leading-tight text-[color:var(--color-ink-ghost)]">
              {label}
            </p>

            {/* Progress bar */}
            <div
              className="mt-2 sm:mt-3 h-0.5 rounded-full overflow-hidden"
              style={{ background: `${color}18` }}
            >
              <div
                ref={el => { barsRef.current[i] = el; }}
                className="h-full rounded-full"
                style={{
                  width: '100%',
                  background: `linear-gradient(90deg, ${color}88, ${color})`,
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const wordRef = useRef(null);
  const paraRef = useRef(null);
  const rightRef = useRef(null);
  const tagRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });
      tl.fromTo(tagRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
      tl.fromTo(line1Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.2');
      tl.fromTo(line2Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
      tl.fromTo(line3Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
      tl.fromTo(paraRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
      tl.fromTo(rightRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.5);

      gsap.to('.hero-float', { y: -10, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });

      const cycleWord = () => {
        const el = wordRef.current;
        if (!el) return;
        gsap.timeline()
          .to(el, { y: -36, opacity: 0, duration: 0.38, ease: 'power2.in' })
          .call(() => {
            indexRef.current = (indexRef.current + 1) % CYCLING_WORDS.length;
            el.textContent = CYCLING_WORDS[indexRef.current];
            gsap.set(el, { y: 36, opacity: 0 });
          })
          .to(el, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' });
      };

      const timer = setTimeout(() => {
        cycleWord();
        wordRef._intervalId = setInterval(cycleWord, 2400);
      }, 2200);

      return () => { clearTimeout(timer); clearInterval(wordRef._intervalId); };
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col bg-surface overflow-hidden pt-20">

      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-1/2 h-2/3
                        bg-gradient-to-bl from-blue-50/40 to-transparent
                        sm:from-blue-50/80" />
        <div className="absolute bottom-0 left-0 w-2/5 h-1/2 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(112,120,208,0.08) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl" />
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center container-custom py-12 sm:py-16 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left column */}
          <div className="flex flex-col">

            {/* Eyebrow tag */}
            <div
              ref={tagRef}
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2.5 w-fit
                         px-4 py-2 rounded-full mb-8
                         bg-[color:var(--color-blue-50)]
                         border border-[color:var(--color-blue-100)]"
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold text-brand tracking-wide">
                Digital Product Engineering
              </span>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <div className="overflow-hidden">
                <h1 ref={line1Ref} style={{ opacity: 0 }}
                  className="font-display font-semibold leading-[1.115]
                             text-[2.4rem] sm:text-[3rem] md:text-[3.6rem]
                             lg:text-[3.2rem] xl:text-[4rem] 2xl:text-[4.8rem]">
                  {HERO_HEADLINE.line1}
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 ref={line2Ref} style={{ opacity: 0 }}
                  className="font-display font-semibold leading-[1.15]
                             text-[2.4rem] sm:text-[3rem] md:text-[3.6rem]
                             lg:text-[3.2rem] xl:text-[4rem] 2xl:text-[4.8rem]">
                  {HERO_HEADLINE.line2}
                </h1>
              </div>
              <div className="overflow-hidden leading-[1.25]">
                <h1 ref={line3Ref} style={{ opacity: 0 }}
                  className="font-display font-semibold text-brand leading-[1.15]
                             text-[2.4rem] sm:text-[3rem] md:text-[3.6rem]
                             lg:text-[3.2rem] xl:text-[4rem] 2xl:text-[4.8rem]">
                  <span className="block overflow-hidden leading-[inherit]">
                    <span ref={wordRef} className="inline-block">
                      {CYCLING_WORDS[0]}
                    </span>
                  </span>
                </h1>
              </div>
            </div>

            {/* Description */}
            <div ref={paraRef} style={{ opacity: 0 }} className="mb-8">
              <p className="font-body text-[color:var(--color-ink-muted)]
                            text-base sm:text-lg leading-relaxed max-w-[30rem]">
                {HERO_HEADLINE.description}
              </p>
            </div>
          </div>

          {/* Right column — logo card */}
          <div ref={rightRef} style={{ opacity: 0 }}
            className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="hero-float bg-surface-white rounded-3xl shadow-2xl
                              border border-[color:var(--color-border-light)]
                              p-6 sm:p-8 flex items-center justify-center aspect-square">
                <img src={LOGO.src} alt={LOGO.alt} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <StatsStrip />
    </section>
  );
}