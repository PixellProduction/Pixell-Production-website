'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const tagline = 'We combine strategy, creativity, and technology to build meaningful digital solutions that make your brand matter.';
const marqueeItems = ['SOCIAL MEDIA', 'BRAND GROWTH', 'CONTENT STRATEGY', 'DIGITAL MARKETING', 'WEB DEVELOPMENT', 'BRAND POSITIONING'];

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline chars reveal
      const chars = headlineRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.from(chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: 'power4.out',
          delay: 0.3,
        });
      }

      // Tagline reveal
      gsap.from(taglineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.9,
      });

      // CTA reveal
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.1,
      });

      // Floating shape animation
      if (shapeRef.current) {
        gsap.to(shapeRef.current, {
          y: -30,
          rotation: 10,
          duration: 3.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        // Scale up on scroll
        gsap.to(shapeRef.current, {
          scale: 2.5,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Marquee implementation using CSS animation for reliability
  const fullMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-32 lg:pt-40 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: 'var(--accent-2)' }}
      />

      {/* Main content */}
      <div className="relative z-10 section-pad container-page">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Headline */}
          <div className="flex-1" style={{ containerType: 'inline-size' }}>
            <div className="overflow-hidden mb-3">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>
                Full-Service Digital Agency — Est. 2016
              </span>
            </div>

            <div ref={headlineRef} className="overflow-hidden">
              <h1
                className="text-[clamp(1.5rem,7.8cqw,9rem)] font-extrabold leading-[1.1] tracking-[-0.04em]"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
              >
                <span className="block overflow-hidden"><SplitText text="We Don't Just" /></span>
                <span className="block overflow-hidden"><SplitText text="Manage Brands" /></span>
                <span className="block overflow-hidden">
                  <SplitText text="We Make Them" />{' '}
                  <span className="gradient-text"><SplitText text="Matter." /></span>
                </span>
              </h1>
            </div>
          </div>

          {/* Right info */}
          <div className="lg:max-w-xs lg:pb-3">
            <p
              ref={taglineRef}
              className="text-base lg:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--subtext)' }}
            >
              {tagline}
            </p>
            <div ref={ctaRef} className="flex flex-wrap gap-3">
              <MagneticButton
                size="md"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work ↘
              </MagneticButton>
              <MagneticButton
                size="md"
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Services
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Floating 3D shape */}
        <div
          ref={shapeRef}
          className="absolute top-1/3 right-12 hidden lg:block pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="shapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" fill="url(#shapeGrad)" stroke="var(--accent)" strokeWidth="1" />
            <polygon points="100,35 165,70 165,130 100,165 35,130 35,70" fill="none" stroke="var(--accent-2)" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="20" fill="var(--accent)" opacity="0.6" />
          </svg>
        </div>

        {/* Stats mini bar */}
        <div className="flex flex-wrap gap-6 lg:gap-8 mt-14 lg:mt-20 pt-6 lg:pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          {[['150+', 'Brands Grown'], ['95%', 'Client Retention'], ['350%', 'Avg Growth']].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent)' }}>{val}</div>
              <div className="text-xs" style={{ color: 'var(--subtext)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="mt-14 lg:mt-20 overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {/* Row 1 - left */}
        <div className="py-4 flex" style={{ borderBottom: '1px solid var(--border)' }}>
          <div
            className="flex gap-12 whitespace-nowrap"
            style={{ animation: 'marqueeLeft 20s linear infinite' }}
          >
            {fullMarquee.map((item, i) => (
              <span key={i} className="text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-8" style={{ color: 'var(--subtext)', fontFamily: 'Syne, sans-serif' }}>
                {item}
                <span style={{ color: 'var(--accent)' }}>•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 - right */}
        <div className="py-4 flex">
          <div
            className="flex gap-12 whitespace-nowrap"
            style={{ animation: 'marqueeRight 22s linear infinite' }}
          >
            {[...fullMarquee].reverse().map((item, i) => (
              <span key={i} className="text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-8" style={{ color: 'var(--subtext)', fontFamily: 'Syne, sans-serif' }}>
                {item}
                <span style={{ color: 'var(--accent-2)' }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
