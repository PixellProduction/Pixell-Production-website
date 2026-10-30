'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Understanding the Brand',
        description: 'We begin by deeply understanding your brand — its vision, values, audience, and market position. Every strategy starts with listening.',
        icon: '🔍',
    },
    {
        number: '02',
        title: 'Research & Strategy',
        description: 'Data-driven insights shape our approach. We analyze competitors, audiences, and market trends to build a roadmap for growth.',
        icon: '📊',
    },
    {
        number: '03',
        title: 'Creative Planning',
        description: 'Strategy meets creativity. We design campaigns, content calendars, and brand experiences that resonate with your target audience.',
        icon: '💡',
    },
    {
        number: '04',
        title: 'Execution',
        description: 'Precision in action. Every piece of content, every campaign, every touchpoint is executed with quality and consistency.',
        icon: '⚡',
    },
    {
        number: '05',
        title: 'Optimization',
        description: 'We monitor performance in real-time, analyzing what works and what doesn\'t, continuously refining for better results.',
        icon: '📈',
    },
    {
        number: '06',
        title: 'Growth',
        description: 'Sustainable, measurable growth. We scale what works, build on wins, and ensure your brand continues to thrive.',
        icon: '🚀',
    },
];

export default function ApproachSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.approach-reveal', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
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
        <section ref={sectionRef} id="process" className="relative py-24 lg:py-32 section-pad" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container-page">
                {/* Label */}
                <div className="section-label mb-10 lg:mb-16 approach-reveal">
                    <span className="section-label__text">Our Approach</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left — Heading */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start approach-reveal">
                        <h2
                            className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-6"
                            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
                        >
                            How We<br />
                            <span className="gradient-text">Work</span>
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--subtext)' }}>
                            Our proven process transforms brands through every stage — from understanding to growth.
                        </p>

                        {/* Progress visual */}
                        <div className="hidden lg:flex flex-col gap-3">
                            {steps.map((step, i) => (
                                <div key={step.number} className="flex items-center gap-3">
                                    <div
                                        className="w-full h-1 rounded-full transition-all duration-500"
                                        style={{
                                            background: activeStep !== null && i <= activeStep ? 'var(--accent)' : 'var(--border)',
                                        }}
                                    />
                                    <span
                                        className="text-xs font-bold w-8 flex-shrink-0 transition-colors duration-300"
                                        style={{
                                            fontFamily: 'Syne, sans-serif',
                                            color: activeStep === i ? 'var(--accent)' : 'var(--subtext)',
                                        }}
                                    >
                                        {step.number}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Steps */}
                    <div className="lg:w-2/3">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.number}
                                onHoverStart={() => setActiveStep(idx)}
                                onHoverEnd={() => setActiveStep(null)}
                                className="approach-reveal relative"
                                style={{ borderTop: '1px solid var(--border)' }}
                            >
                                <motion.div
                                    className="py-8 cursor-pointer"
                                    whileHover={{ x: 8 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                >
                                    <div className="flex items-start gap-6">
                                        <span
                                            className="text-xl mt-1 transition-transform duration-300"
                                            style={{
                                                transform: activeStep === idx ? 'scale(1.2)' : 'scale(1)',
                                            }}
                                        >
                                            {step.icon}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span
                                                    className="text-xs font-bold"
                                                    style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}
                                                >
                                                    {step.number}
                                                </span>
                                                <h3
                                                    className="text-xl lg:text-2xl font-bold transition-colors duration-300"
                                                    style={{
                                                        fontFamily: 'Syne, sans-serif',
                                                        color: activeStep === idx ? 'var(--accent)' : 'var(--text)',
                                                    }}
                                                >
                                                    {step.title}
                                                </h3>
                                            </div>

                                            <AnimatePresence>
                                                {activeStep === idx && (
                                                    <motion.p
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="text-sm leading-relaxed overflow-hidden"
                                                        style={{ color: 'var(--subtext)' }}
                                                    >
                                                        {step.description}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                        <div style={{ borderTop: '1px solid var(--border)' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
