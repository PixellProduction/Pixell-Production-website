'use client';

import { useState, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/ui/CustomCursor';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ApproachSection from '@/components/sections/ApproachSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import StatsSection from '@/components/sections/StatsSection';
import WhyFrameVista from '@/components/sections/WhyFrameVista';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTAFooterSection from '@/components/sections/CTAFooterSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  useLenis();

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="noise-overlay" data-theme={theme}>
      {/* Custom cursor - desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Page transition wrapper */}
      <AnimatePresence>
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header theme={theme} onThemeToggle={toggleTheme} />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ApproachSection />
          <PortfolioSection />
          <StatsSection />
          <WhyFrameVista />
          <TestimonialsSection />
          <CTAFooterSection />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
