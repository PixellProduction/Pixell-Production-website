'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    { label: 'Strategy', icon: '◆' },
    { label: 'Creativity', icon: '◇' },
    { label: 'Technology', icon: '⬡' },
    { label: 'Growth', icon: '▲' },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-reveal', {
                y: 50,
                opacity: 0,
                stagger: 0.12,
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
        <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 section-pad" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container-page">
                {/* Label */}
                <div className="section-label mb-10 lg:mb-16 about-reveal">
                    <span className="section-label__text">About Us</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left — Mission statement */}
                    <div>
                        <h2
                            className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-8 about-reveal"
                            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
                        >
                            We are a full-service creative digital agency focused on making brands{' '}
                            <span className="gradient-text">matter</span> in the digital world.
                        </h2>
                        <p className="text-lg leading-relaxed mb-6 about-reveal" style={{ color: 'var(--subtext)' }}>
                            FrameVista Media combines strategy, creativity, content, digital marketing, and technology
                            to create meaningful and effective digital solutions for modern businesses.
                        </p>
                        <p className="text-base leading-relaxed about-reveal" style={{ color: 'var(--subtext)' }}>
                            We don&apos;t simply manage social media accounts — we work on the complete digital presence
                            and growth of a brand. From brand positioning to web development, every service is designed
                            to move the needle and deliver measurable impact.
                        </p>
                    </div>

                    {/* Right — Capabilities + numbers */}
                    <div className="flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {capabilities.map((cap, i) => (
                                <Card
                                    key={cap.label}
                                    as="motion"
                                    variant="hover"
                                    size="md"
                                    className="about-reveal flex flex-col gap-3 group"
                                >
                                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--accent)' }}>{cap.icon}</span>
                                    <span className="text-sm font-bold transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>
                                        {cap.label}
                                    </span>
                                </Card>
                            ))}
                        </div>

                        {/* Brand promise */}
                        <div
                            className="about-reveal rounded-2xl p-6"
                            style={{ background: 'var(--accent)', color: '#0F1117' }}
                        >
                            <p
                                className="text-sm font-bold tracking-wide uppercase mb-2"
                                style={{ fontFamily: 'Syne, sans-serif' }}
                            >
                                Our Promise
                            </p>
                            <p className="text-base font-medium leading-relaxed">
                                Creative Thinking + Strategic Approach + Digital Expertise + Professional Execution + Brand Growth
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
