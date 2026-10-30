'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  variant = 'accent',
  size = 'md',
  disabled = false
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    posRef.current = { x: x * 0.35, y: y * 0.35 };
    btn.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
      if (btn) btn.style.transition = '';
    }, 500);
  }, [disabled]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={disabled ? undefined : onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={disabled ? {} : { scale: 0.96 }}
      type={type}
      disabled={disabled}
      className={clsx(
        'btn-base',
        `btn-${size}`,
        `btn-${variant}`,
        {
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'accent' && !disabled && (
        <span className="absolute inset-0 bg-[var(--accent-2)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
      )}
    </motion.button>
  );
}
