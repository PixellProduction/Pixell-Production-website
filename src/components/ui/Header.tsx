'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { navLinks } from '@/lib/data';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Header({ theme, onThemeToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-[100] section-pad"
      >
        <div
          className="mx-auto flex items-center justify-between h-16 lg:h-20 transition-all duration-500"
          style={{
            background: scrolled ? (theme === 'dark' ? 'rgba(14,14,16,0.85)' : 'rgba(250,249,246,0.85)') : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? `1px solid var(--border)` : '1px solid transparent',
            borderRadius: scrolled ? '0 0 16px 16px' : '0',
            padding: '0',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group px-2 rounded-lg transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
            <img
              src="/logo.webp"
              alt="Pixell Production Logo"
              className="transition-transform duration-300 group-hover:scale-105 h-14 w-14"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--subtext)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--subtext)',
              }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={15} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={15} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <MagneticButton onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Get in Touch ↗
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center"
              style={{ color: 'var(--text)' }}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150]"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 h-full w-80 z-[151] p-8 flex flex-col"
              style={{ background: 'var(--card)', borderLeft: '1px solid var(--border)' }}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Menu</span>
                <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--subtext)' }}>
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-2xl font-bold hover:text-[var(--accent)] transition-colors duration-200"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <MagneticButton className="w-full justify-center" onClick={() => setMobileOpen(false)}>
                  Get in Touch ↗
                </MagneticButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
