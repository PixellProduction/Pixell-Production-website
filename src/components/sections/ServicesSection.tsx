'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/lib/data';
import type { ServiceItem } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [cursorFollower, setCursorFollower] = useState({ x: 0, y: 0, visible: false });
  const [activeServiceData, setActiveServiceData] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal heading
      gsap.from(stickyRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorFollower({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursorFollower(prev => ({ ...prev, visible: false }));
    setActiveService(null);
    setActiveServiceData(null);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 section-pad"
    >
      <div className="container-page">
        {/* Section label */}
        <div className="section-label mb-10 lg:mb-16">
          <span className="section-label__text">What We Do</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sticky Left */}
          <div ref={stickyRef} className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start">
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-6"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
            >
              Our<br />
              <span className="gradient-text">Services</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--subtext)' }}>
              We deliver complete digital solutions—from social media management to brand growth, turning your vision into measurable results.
            </p>
            <div className="flex items-center gap-3">
              <div
                className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                5 Core Services
              </div>
            </div>
          </div>

          {/* Right: Accordion list */}
          <div
            className="lg:w-2/3 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.number}
                onHoverStart={() => {
                  setActiveService(idx);
                  setActiveServiceData(service);
                }}
                onHoverEnd={() => {
                  setActiveService(null);
                  setActiveServiceData(null);
                }}
                className="relative"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <motion.div
                  className="py-8 cursor-pointer"
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-6 flex-1">
                      <span className="text-xs font-bold mt-1" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>
                        {service.number}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="text-xl lg:text-2xl font-bold mb-1 transition-colors duration-300"
                          style={{
                            fontFamily: 'Syne, sans-serif',
                            color: activeService === idx ? 'var(--accent)' : 'var(--text)',
                          }}
                        >
                          {service.title}
                        </h3>

                        {/* Accordion content */}
                        <AnimatePresence>
                          {activeService === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm leading-relaxed mt-3 mb-4" style={{ color: 'var(--subtext)' }}>
                                {service.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {service.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="text-xs px-3 py-1 rounded-full font-medium"
                                    style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--subtext)' }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <span
                      className="text-2xl mt-0.5 transition-transform duration-300 flex-shrink-0"
                      style={{
                        color: activeService === idx ? 'var(--accent)' : 'var(--subtext)',
                        transform: activeService === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Bottom border */}
            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* Cursor follower preview box */}
            <AnimatePresence>
              {cursorFollower.visible && activeServiceData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: cursorFollower.x + 20,
                    y: cursorFollower.y - 70,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 40 }}
                  className="absolute z-20 w-40 h-28 rounded-2xl p-4 flex flex-col justify-center items-center pointer-events-none"
                  style={{
                    background: 'var(--accent)',
                    top: 0,
                    left: 0,
                  }}
                >
                  <span className="text-3xl mb-1">{activeServiceData.icon}</span>
                  <span className="text-xs font-bold text-center" style={{ color: '#0E0E10', fontFamily: 'Syne, sans-serif' }}>
                    {activeServiceData.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
