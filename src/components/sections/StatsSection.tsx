'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;
          gsap.fromTo(
            { val: 0 },
            { val: value },
            {
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].val).toString();
              },
            }
          );
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <div className="text-center group">
      <div
        className="text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-none mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]"
        style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
      >
        <span ref={countRef}>0</span>
        <span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </div>
      <p className="text-sm font-medium tracking-wide uppercase" style={{ color: 'var(--subtext)' }}>
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
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
    <section ref={sectionRef} className="py-20 lg:py-28 section-pad relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 70%)',
        }}
      />

      <div className="container-page">
        {/* Label */}
        <div className="section-label mb-10 lg:mb-16">
          <span className="section-label__text">By The Numbers</span>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-0 lg:gap-x-12"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item pt-10 pb-10 lg:pb-12 ${i % 2 === 0 ? 'border-r border-[var(--border)] lg:border-r-0' : ''} ${i < 2 ? 'border-b border-[var(--border)] lg:border-b-0' : ''} ${i > 0 ? 'lg:border-l border-[var(--border)]' : ''}`}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>

        {/* Decorative separator */}
        <div className="mt-12 lg:mt-16 flex items-center gap-6">
          <div className="flex-1 h-[1px]" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--subtext)' }}>Since 2016</span>
          <div className="flex-1 h-[1px]" style={{ background: 'var(--border)' }} />
        </div>
      </div>
    </section>
  );
}
