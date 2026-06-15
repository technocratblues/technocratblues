import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_FORM, CONTACT_DOMAINS, BRAND } from '../../assets';
import { useFormThrottle } from '../../hooks/useFormThrottle';
gsap.registerPlugin(ScrollTrigger);

// ── Validation ────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form) {
    const errors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
        errors.name = 'Please enter your name (at least 2 characters).';
    if (form.name.trim().length > 100)
        errors.name = 'Name must be under 100 characters.';
    if (!form.email.trim() || !EMAIL_RE.test(form.email.trim()))
        errors.email = 'Please enter a valid email address.';
    if (!form.domain)
        errors.domain = 'Please select an area of interest.';
    if (!form.query.trim() || form.query.trim().length < 10)
        errors.query = 'Please describe your query (at least 10 characters).';
    if (form.query.trim().length > 2000)
        errors.query = 'Query must be under 2 000 characters.';
    return errors;
}

const EMPTY_FORM = { name: '', email: '', domain: '', query: '' };

// ── Network submit (with retry) ───────────────────────────────────────────────
async function submitToSheet(form, retries = 2) {
    const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        domain: form.domain,
        query: form.query.trim(),
        origin: window.location.origin,
    };
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const url = `${CONTACT_FORM.scriptUrl}?${new URLSearchParams(payload)}`;
            const res = await fetch(url, { method: 'GET' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (!json.success) throw new Error(json.errors?.join(' ') || 'Unknown error');
            return { ok: true };
        } catch (err) {
            if (attempt === retries) return { ok: false, message: err.message };
            await new Promise(r => setTimeout(r, 800 * Math.pow(2, attempt)));
        }
    }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactSection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const [form, setForm] = useState(EMPTY_FORM);
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState('idle'); // idle|submitting|success|error
    const [serverMsg, setServerMsg] = useState('');
    const [charCount, setCharCount] = useState(0);

    const { isThrottled, throttleReason, secondsLeft, markSubmitted } = useFormThrottle();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: leftRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo(rightRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: rightRef.current, start: 'top 80%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const allErrors = validateForm(form);
    const visibleErrors = Object.fromEntries(
        Object.entries(allErrors).filter(([k]) => touched[k])
    );
    const isFormValid = Object.keys(allErrors).length === 0;

    const handleChange = useCallback((field, value) => {
        setForm(f => ({ ...f, [field]: value }));
        if (field === 'query') setCharCount(value.length);
        if (status === 'error') setStatus('idle');
    }, [status]);

    const handleBlur = useCallback((field) => {
        setTouched(t => ({ ...t, [field]: true }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, domain: true, query: true });
        if (!isFormValid) return;
        if (isThrottled) { setStatus('error'); setServerMsg(throttleReason); return; }

        setStatus('submitting');
        setServerMsg('');
        const result = await submitToSheet(form);

        if (result.ok) {
            markSubmitted();
            setStatus('success');
            setForm(EMPTY_FORM);
            setTouched({});
            setCharCount(0);
        } else {
            setStatus('error');
            setServerMsg(result.message || 'Something went wrong. Please try again.');
        }
    };

    const submitDisabled = status === 'submitting' || isThrottled;

    return (
        <section id="contact" ref={sectionRef} className="section bg-surface-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

                    {/* ── LEFT ── */}
                    <div ref={leftRef}>
                        <span className="section-eyebrow">
                            <span className="badge-dot" />
                            <span className="badge-label">Get In Touch</span>
                        </span>
                        <h2 className="section-title font-display mb-5">
                            Let&apos;s build something{' '}
                            <em className="font-serif italic text-brand">remarkable</em> together.
                        </h2>
                        <p className="section-subtitle mb-12">
                            Have a project in mind? Drop your query and we'll get back to you shortly.
                        </p>

                        <div className="flex flex-col gap-5 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-(--color-ink-pale) uppercase tracking-wider mb-0.5">Visit us</p>
                                    <p className="text-sm font-semibold text-(--color-ink)">{BRAND.address.line1}</p>
                                    <p className="text-xs text-(--color-ink-ghost) mt-0.5">{BRAND.address.line2}</p>
                                </div>
                            </div>
                        </div>

                        {/* Availability badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl
                            bg-(--color-success-bg) border border-(--color-success-border)">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-sm font-semibold text-(--color-success-text)">
                                Available for new projects
                            </span>
                        </div>
                    </div>

                    {/* ── RIGHT: Form ── */}
                    <div ref={rightRef} className="bg-surface rounded-3xl border border-(--color-border-light) p-7 sm:p-8 lg:p-10">
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-(--color-success-bg) flex-center">
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12l4 4 10-10" stroke="var(--color-success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="font-display text-xl font-black text-(--color-ink)">Query submitted!</h3>
                                <p className="text-(--color-ink-subtle) text-sm max-w-xs">
                                    Thanks for reaching out. We'll review your query and get back to you within 24 hours.
                                </p>
                                <button onClick={() => setStatus('idle')} className="mt-2 text-sm font-semibold text-brand hover:underline">
                                    Submit another query
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                                <div className="mb-1">
                                    <h3 className="font-display text-xl font-black text-(--color-ink)">Send us your query</h3>
                                    <p className="text-xs text-(--color-ink-pale) mt-1">
                                        Responses are captured in our team sheet — we'll reply within 24h.
                                    </p>
                                </div>

                                {/* Throttle warning */}
                                {isThrottled && (
                                    <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                                        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
                                            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>
                                            {throttleReason}
                                            {secondsLeft > 0 && <span className="ml-1 font-semibold tabular-nums">({secondsLeft}s)</span>}
                                        </span>
                                    </div>
                                )}

                                {/* Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="input-label">Full Name <span className="text-red-400">*</span></label>
                                    <input
                                        type="text" required autoComplete="name" placeholder="Jane Smith"
                                        value={form.name}
                                        onChange={e => handleChange('name', e.target.value)}
                                        onBlur={() => handleBlur('name')}
                                        className={`input${visibleErrors.name ? ' border-red-400' : ''}`}
                                    />
                                    {visibleErrors.name && <p className="text-xs text-(--color-error)">{visibleErrors.name}</p>}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="input-label">Email ID <span className="text-red-400">*</span></label>
                                    <input
                                        type="email" required autoComplete="email" placeholder="you@company.com"
                                        value={form.email}
                                        onChange={e => handleChange('email', e.target.value)}
                                        onBlur={() => handleBlur('email')}
                                        className={`input${visibleErrors.email ? ' border-red-400' : ''}`}
                                    />
                                    {visibleErrors.email && <p className="text-xs text-(--color-error)">{visibleErrors.email}</p>}
                                </div>

                                {/* Domain */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="input-label">Domain / Area of Interest <span className="text-red-400">*</span></label>
                                    <select
                                        required value={form.domain}
                                        onChange={e => handleChange('domain', e.target.value)}
                                        onBlur={() => handleBlur('domain')}
                                        className={`input cursor-pointer${visibleErrors.domain ? ' border-red-400' : ''}`}
                                    >
                                        <option value="">Select a domain...</option>
                                        {CONTACT_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    {visibleErrors.domain && <p className="text-xs text-(--color-error)">{visibleErrors.domain}</p>}
                                </div>

                                {/* Query */}
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="input-label">Your Query <span className="text-red-400">*</span></label>
                                        <span className={`text-xs tabular-nums ${charCount > 1800 ? 'text-amber-500' : 'text-(--color-ink-dim)'}`}>
                                            {charCount}/2000
                                        </span>
                                    </div>
                                    <textarea
                                        required rows={4} maxLength={2000}
                                        placeholder="Describe your project, requirement, or question..."
                                        value={form.query}
                                        onChange={e => handleChange('query', e.target.value)}
                                        onBlur={() => handleBlur('query')}
                                        className={`input resize-none${visibleErrors.query ? ' border-red-400' : ''}`}
                                    />
                                    {visibleErrors.query && <p className="text-xs text-(--color-error)">{visibleErrors.query}</p>}
                                </div>

                                {/* Server error */}
                                {status === 'error' && !isThrottled && (
                                    <div className="flex items-start gap-2 text-xs text-(--color-error)
                                  bg-(--color-error-bg) border border-(--color-error-border)
                                  rounded-lg px-3 py-2.5">
                                        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                                            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                        </svg>
                                        <span>{serverMsg}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitDisabled}
                                    className="btn btn-primary btn-full mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            Submitting…
                                        </span>
                                    ) : isThrottled
                                        ? `Wait ${secondsLeft > 0 ? secondsLeft + 's' : '…'}`
                                        : 'Submit Query →'
                                    }
                                </button>

                                <p className="text-center text-xs text-(--color-ink-dim)">
                                    Your details are stored securely in our team's Google Sheet.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}