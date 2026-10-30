'use client';

import { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { testimonials, team } from '@/lib/data';
import { ChevronLeft, ChevronRight, Share2, LinkIcon, Globe } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { TestimonialCard } from '@/components/ui/Card';

// Avatar placeholder component
function Avatar({ initials, size = 48, bg }: { initials: string; size?: number; bg?: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: bg || 'var(--accent)',
        color: '#0E0E10',
        fontSize: size * 0.33,
        fontFamily: 'Syne, sans-serif',
      }}
    >
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const prev = () => setActiveIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIdx((i) => (i + 1) % testimonials.length);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  const current = testimonials[activeIdx];

  return (
    <section id="team" className="py-24 lg:py-32 section-pad">
      <div className="container-page">

        {/* ──── Testimonials ──── */}
        <div className="mb-24">
          <div className="section-label mb-10 lg:mb-12">
            <span className="section-label__text">Client Voices</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left nav */}
            <div className="hidden lg:flex flex-col gap-4">
              <MagneticButton onClick={prev} variant="outline" size="sm" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </MagneticButton>
              <MagneticButton onClick={next} variant="outline" size="sm" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </MagneticButton>
            </div>

            {/* Testimonial card */}
            <TestimonialCard
              key={activeIdx}
              quote={current.quote}
              author={current.author}
              company={current.company}
              avatar={current.avatar}
              logo={current.logo}
              rating={current.rating}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-1"
            />

            {/* Progress dots + mobile nav */}
            <div className="flex lg:flex-col items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className="relative rounded-full transition-all duration-300 p-4"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIdx ? '24px' : '8px',
                      height: '8px',
                      background: i === activeIdx ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ──── Team Grid ──── */}
        <div>
          <div className="section-label mb-12">
            <span className="section-label__text">The Team</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.id}
                className="relative rounded-2xl overflow-hidden group"
                onHoverStart={() => setHoveredMember(idx)}
                onHoverEnd={() => setHoveredMember(null)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                {/* Avatar */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${['#D4FF00', '#00F0FF', '#FF6B6B', '#B8B5FF'][idx % 4]}33, transparent)`,
                  }}
                >
                  <Avatar initials={member.name.split(' ').map(n => n[0]).join('')} size={80} bg={['#D4FF00', '#00F0FF', '#FF6B6B', '#B8B5FF'][idx % 4]} />

                  {/* Social overlay */}
                  <motion.div
                    animate={{ opacity: hoveredMember === idx ? 1 : 0 }}
                    className="absolute inset-0 flex items-center justify-center gap-3"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                  >
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--accent)]" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                        <Share2 size={14} />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--accent)]" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                        <LinkIcon size={14} />
                      </a>
                    )}
                    {member.socials.dribbble && (
                      <a href={member.socials.dribbble} className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--accent)]" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                        <Globe size={14} />
                      </a>
                    )}
                  </motion.div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>
                    {member.name}
                  </h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--subtext)' }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
