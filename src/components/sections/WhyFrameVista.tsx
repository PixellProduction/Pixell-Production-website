'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
    {
        number: '01',
        title: 'Creative Approach',
        description: 'We think beyond templates. Every brand gets a unique creative vision tailored to its personality and audience.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Strategic Thinking',
        description: 'Every decision is data-backed. We don\'t guess — we research, analyze, and strategize for maximum impact.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Quality Execution',
        description: 'From pixel-perfect designs to flawless campaigns — we obsess over the details that separate good from great.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Client-Focused',
        description: 'Your success is our success. We work as an extension of your team, not just a vendor — always invested in your growth.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
    {
        number: '05',
        title: 'Digital Expertise',
        description: 'Deep knowledge across platforms, algorithms, tools, and trends. We know what works in today\'s digital landscape.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        number: '06',
        title: 'Transparent Communication',
        description: 'No black boxes. You see exactly what we\'re doing, why, and how it\'s performing — always.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        number: '07',
        title: 'Brand Growth Focus',
        description: 'We measure our success by your growth. Every strategy, campaign, and piece of content is built to move your brand forward.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
    },
];

export default function WhyFrameVista() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.why-reveal', {
                y: 50,
                opacity: 0,
                stagger: 0.08,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 section-pad" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container-page">
                {/* Label */}
                <div className="section-label section-label--alt mb-10 lg:mb-16 why-reveal">
                    <span className="section-label__text">Why Us</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 lg:mb-20">
                    {/* Left — Heading */}
                    <div className="lg:w-1/2 why-reveal">
                        <h2
                            className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-6"
                            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
                        >
                            Why{' '}
                            <span className="gradient-text">PIXELL</span>
                        </h2>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--subtext)' }}>
                            We&apos;re not just another agency. We&apos;re partners in your brand&apos;s growth — bringing together
                            strategy, creativity, and technology to deliver results that matter.
                        </p>
                    </div>

                    {/* Right — Quote card */}
                    <div className="lg:w-1/2 flex items-center why-reveal">
                        <div
                            className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
                            style={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20 pointer-events-none"
                                style={{ background: 'var(--accent-2)' }}
                            />
                            <span
                                className="text-6xl font-black leading-none block mb-4 select-none"
                                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent-2)', opacity: 0.3 }}
                            >
                                &ldquo;
                            </span>
                            <p
                                className="text-xl lg:text-2xl font-bold leading-snug mb-6 relative z-10"
                                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
                            >
                                PIXELL didn&apos;t just manage our social media — they transformed our entire digital presence.
                            </p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ background: 'var(--accent-2)', color: '#0F1117', fontFamily: 'Syne, sans-serif' }}
                                >
                                    PK
                                </div>
                                <div>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Priya Kapoor</p>
                                    <p className="text-xs" style={{ color: 'var(--subtext)' }}>Founder, Zenith Lifestyle</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reasons grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {reasons.map((reason) => (
                        <Card
                            key={reason.number}
                            as="motion"
                            size="md"
                            className="why-reveal group"
                            whileHover={{ borderColor: 'var(--accent)', y: -4 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-[#0F1117]"
                                    style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}
                                >
                                    {reason.icon}
                                </span>
                                <span
                                    className="text-xs font-bold"
                                    style={{ color: 'var(--subtext)', fontFamily: 'Syne, sans-serif' }}
                                >
                                    {reason.number}
                                </span>
                            </div>
                            <h3
                                className="text-lg font-bold mb-2"
                                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
                            >
                                {reason.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--subtext)' }}>
                                {reason.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
