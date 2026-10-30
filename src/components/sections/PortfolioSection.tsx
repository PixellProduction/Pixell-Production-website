'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Gradient placeholder colors for project cards
const cardGradients = [
  'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
  'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
  'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)',
  'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    // Calculate horizontal scroll distance
    const totalWidth = wrapper.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: `+=${totalWidth + window.innerHeight}`,
          anticipatePin: 1,
        },
      });

      // Card entrance animations
      gsap.from('.portfolio-card', {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-[var(--bg)]">
      {/* ─── Mobile header (document flow) ─── */}
      <div className="lg:hidden section-pad pt-20 pb-4 px-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-[2px]" style={{ background: 'var(--accent)' }} />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>
            Our Work
          </span>
        </div>
        <h2
          className="text-2xl font-extrabold tracking-[-0.04em] mb-1"
          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
        >
          Recent Projects
        </h2>
        <span className="text-xs" style={{ color: 'var(--subtext)' }}>
          Swipe →
        </span>
      </div>

      {/* ─── Desktop header (absolute, visible before GSAP pin) ─── */}
      <div className="hidden lg:block absolute top-8 left-16 z-10 flex items-center gap-8 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[2px]" style={{ background: 'var(--accent)' }} />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>
            Our Work
          </span>
        </div>
        <h2
          className="text-3xl font-extrabold tracking-[-0.04em]"
          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
        >
          Recent Projects
        </h2>
        <span className="text-xs" style={{ color: 'var(--subtext)' }}>
          Scroll →
        </span>
      </div>

      {/* ─── Mobile: CSS horizontal scroll ─── */}
      {isMobile && (
        <div className="overflow-x-auto pb-8 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-4 px-4 py-4" style={{ width: 'max-content' }}>
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="portfolio-card relative flex-shrink-0 rounded-3xl overflow-hidden group snap-start"
                style={{ width: 'min(480px, 80vw)', height: '65vh' }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out"
                  style={{
                    background: cardGradients[idx % cardGradients.length],
                    transform: hoveredCard === idx ? 'scale(1.08)' : 'scale(1)',
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
                    opacity: hoveredCard === idx ? 1 : 0.5,
                  }}
                />
                <div
                  className="absolute top-6 right-6 text-[8rem] font-black leading-none select-none opacity-10"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#fff' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="absolute top-6 left-6">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', backdropFilter: 'blur(8px)' }}
                  >
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    {project.services.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: project.color, color: '#0E0E10' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#fff' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {project.client} — {project.year}
                    </span>
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm"
                      style={{ background: project.color, color: '#0E0E10' }}
                    >
                      ↗
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View all CTA card */}
            <div
              className="flex-shrink-0 rounded-3xl flex flex-col items-center justify-center gap-6 px-16 snap-start"
              style={{
                width: 'min(320px, 80vw)',
                height: '65vh',
                border: '1px solid var(--border)',
                background: 'var(--card)',
              }}
            >
              <span className="text-5xl font-black" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>
                {String(projects.length)}
              </span>
              <span className="text-sm text-center" style={{ color: 'var(--subtext)' }}>Projects Featured</span>
              <MagneticButton size="md">
                View All Work ↗
              </MagneticButton>
            </div>
          </div>
        </div>
      )}

      {/* ─── Desktop: GSAP pinned horizontal scroll ─── */}
      {!isMobile && (
        <div
          ref={wrapperRef}
          className="flex items-center h-screen gap-6 pl-16 pr-24 pt-20"
          style={{ willChange: 'transform' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="portfolio-card relative flex-shrink-0 h-[70vh] rounded-3xl overflow-hidden group"
              style={{ width: 'min(480px, 80vw)' }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              data-cursor="VIEW"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  background: cardGradients[idx % cardGradients.length],
                  transform: hoveredCard === idx ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
                  opacity: hoveredCard === idx ? 1 : 0.5,
                }}
              />
              <div
                className="absolute top-6 right-6 text-[8rem] font-black leading-none select-none opacity-10"
                style={{ fontFamily: 'Syne, sans-serif', color: '#fff' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${project.color}10`, mixBlendMode: 'overlay' }}
              />
              <div className="absolute top-6 left-6">
                <span
                  className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  {project.category}
                </span>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ y: 0 }}
              >
                <motion.div
                  animate={{ y: hoveredCard === idx ? 0 : 20, opacity: hoveredCard === idx ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="mb-3 flex items-center gap-3"
                >
                  {project.services.map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: project.color, color: '#0E0E10' }}>
                      {s}
                    </span>
                  ))}
                </motion.div>
                <h3
                  className="text-xl lg:text-2xl font-bold mb-1"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#fff' }}
                >
                  {project.title}
                </h3>
                <motion.div
                  animate={{ y: hoveredCard === idx ? 0 : 15, opacity: hoveredCard === idx ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {project.client} — {project.year}
                  </span>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm"
                    style={{ background: project.color, color: '#0E0E10' }}
                  >
                    ↗
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}

          {/* View all CTA card */}
          <div
            className="flex-shrink-0 h-[70vh] rounded-3xl flex flex-col items-center justify-center gap-6 px-16"
            style={{
              width: 'min(320px, 80vw)',
              border: '1px solid var(--border)',
              background: 'var(--card)',
            }}
          >
            <span className="text-5xl font-black" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>
              {String(projects.length)}
            </span>
            <span className="text-sm text-center" style={{ color: 'var(--subtext)' }}>Projects Featured</span>
            <MagneticButton size="md">
              View All Work ↗
            </MagneticButton>
          </div>
        </div>
      )}
    </section>
  );
}
