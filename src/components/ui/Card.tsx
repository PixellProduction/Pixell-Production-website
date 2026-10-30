'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>, MotionProps {
  children?: React.ReactNode;
  variant?: 'default' | 'hover' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'motion';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', size = 'md', as = 'div', ...props }, ref) => {
    const cardClasses = clsx(
      'card',
      {
        'card-content-sm': size === 'sm',
        'card-content': size === 'md',
        'card-content-lg': size === 'lg',
      },
      className
    );

    if (as === 'motion') {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          whileHover={variant === 'hover' ? { y: -4 } : undefined}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          {...(props as MotionProps)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cardClasses} {...(props as HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Specialized card components
interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        as="motion"
        variant="hover"
        className={clsx('group', className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-2xl transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--subtext)' }}>
          {description}
        </p>
      </Card>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

interface TestimonialCardProps extends CardProps {
  quote: string;
  author: string;
  company: string;
  logo?: string;
  avatar?: string;
  rating?: number;
}

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ quote, author, company, logo, avatar, rating = 5, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        as="motion"
        size="lg"
        className={clsx('cursor-grab active:cursor-grabbing select-none', className)}
        {...props}
      >
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-[var(--accent)]">★</span>
          ))}
        </div>

        <blockquote className="text-lg lg:text-2xl font-medium leading-relaxed mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {avatar && (
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ color: '#0E0E10', fontFamily: 'var(--font-display)' }}>
                {avatar}
              </div>
            )}
            <div>
              <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{author}</div>
              <div className="text-xs" style={{ color: 'var(--subtext)' }}>{company}</div>
            </div>
          </div>
          {logo && (
            <div className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: 'var(--bg)', color: 'var(--subtext)', border: '1px solid var(--border)' }}>
              {logo}
            </div>
          )}
        </div>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';