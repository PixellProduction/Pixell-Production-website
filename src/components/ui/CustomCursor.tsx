'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      setIsVisible(true);
    };

    const lerp = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(lerp);
    };

    const raf = requestAnimationFrame(lerp);

    const handleHover = (e: Event) => {
      const el = e.target as HTMLElement;
      const cursorLabel = el.dataset.cursor || '';
      setLabel(cursorLabel);
      setIsHovering(true);
    };

    const handleLeave = () => {
      setLabel('');
      setIsHovering(false);
    };

    const interactiveEls = document.querySelectorAll('[data-cursor], a, button, [role="button"]');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    window.addEventListener('mousemove', move);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="cursor fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? '8px' : '8px',
            height: isHovering ? '8px' : '8px',
            background: 'var(--accent)',
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="cursor fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            borderColor: isHovering ? 'var(--accent)' : 'rgba(243,244,246,0.4)',
            mixBlendMode: isHovering ? 'difference' : 'normal',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="rounded-full border flex items-center justify-center"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {label && (
            <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>
              {label}
            </span>
          )}
        </motion.div>
      </div>
    </>
  );
}
