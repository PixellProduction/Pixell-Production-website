'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin, Mail, Phone } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { FormInput, FormTextarea, FormSelect } from '@/components/ui/FormInput';

interface ContactDrawerProps {
  open: boolean;
  onClose: () => void;
}

function ContactDrawer({ open, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200]"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="fixed top-0 right-0 h-full z-[201] overflow-y-auto"
            style={{
              width: 'min(560px, 100vw)',
              background: 'var(--card)',
              borderLeft: '1px solid var(--border)',
            }}
          >
            <div className="p-8 lg:p-10 min-h-full flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--accent)' }}>Let&apos;s Talk</p>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>
                    Start a Project
                  </h2>
                </div>
                <button
                  aria-label="Close"
                  onClick={onClose}
                  className="btn-base btn-outline w-11 h-11 !p-0 shrink-0 hover:rotate-90"
                >
                  <X size={16} />
                </button>
              </div>

              {sent ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="text-6xl mb-2">🎉</div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--subtext)' }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                  <FormInput
                    label="Your Name"
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Jane Smith"
                    required
                  />

                  <FormInput
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="jane@company.com"
                    required
                  />

                  <FormSelect
                    label="Project Budget"
                    value={formData.budget}
                    onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                    options={[
                      { value: "", label: "Select a range" },
                      { value: "5-10k", label: "$5,000 – $10,000" },
                      { value: "10-25k", label: "$10,000 – $25,000" },
                      { value: "25-50k", label: "$25,000 – $50,000" },
                      { value: "50k+", label: "$50,000+" },
                    ]}
                  />

                  <FormTextarea
                    label="Project Details"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your project, goals, and timeline..."
                    required
                    className="flex-1"
                  />

                  <MagneticButton
                    type="submit"
                    size="lg"
                    className="w-full justify-center"
                  >
                    <Send size={15} />
                    Send Message
                  </MagneticButton>
                </form>
              )}

              {/* Contact info */}
              <div className="mt-8 pt-6 flex flex-wrap gap-6" style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { icon: Mail, text: 'hello@pixell.com' },
                  { icon: Phone, text: '+1 (555) 000-1234' },
                  { icon: MapPin, text: 'New York, NY' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--subtext)' }}>
                    <Icon size={12} style={{ color: 'var(--accent)' }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function CTAFooterSection() {
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const now = new Date();

  return (
    <>
      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* CTA Section */}
      <section id="contact" className="relative py-24 lg:py-32 section-pad overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-10" style={{ background: 'var(--accent)' }} />

        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <div className="section-label section-label--center mb-6 lg:mb-8">
            <span className="section-label__text" style={{ color: 'var(--accent)' }}>Ready to Begin?</span>
          </div>

          <div className="max-w-5xl mx-auto" style={{ containerType: 'inline-size' }}>
            <h2
              className="text-[clamp(1.5rem,9cqw,7rem)] font-black leading-[1.08] tracking-[-0.04em] mb-8 lg:mb-10"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}
            >
              LET&apos;S BUILD SOMETHING{' '}
              <span className="gradient-text">THAT MATTERS</span>{' '}
              TOGETHER.
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton onClick={() => setContactOpen(true)} className="text-base px-10 py-4">
              Start a Project ↗
            </MagneticButton>
            <MagneticButton variant="outline" className="text-base px-10 py-4">
              View Case Studies
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-pad pt-12 lg:pt-16 pb-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 36 36">
                  <rect x="4" y="4" width="28" height="28" rx="6" fill="none" stroke="var(--accent)" strokeWidth="2" />
                  <circle cx="18" cy="18" r="4" fill="var(--accent)" />
                </svg>
                <span className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>PIXELL</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--subtext)' }}>
                Full-service digital agency making brands matter through strategic growth and creative excellence since 2016.
              </p>
              {/* Live clock */}
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--subtext)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                Mumbai — {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Services links */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Services</h4>
              <ul className="flex flex-col gap-3">
                {['Social Media Management', 'Brand Growth & Positioning', 'Content Strategy', 'Digital Marketing', 'Web Design & Development'].map(s => (
                  <li key={s}>
                    <a href="#services" className="text-sm transition-colors duration-200 hover:text-[var(--accent)]" style={{ color: 'var(--subtext)' }}>{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Company</h4>
              <ul className="flex flex-col gap-3">
                {['About PIXELL', 'Our Work', 'Our Process', 'The Team', 'Contact Us'].map(s => (
                  <li key={s}>
                    <a href="#" className="text-sm transition-colors duration-200 hover:text-[var(--accent)]" style={{ color: 'var(--subtext)' }}>{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Stay Updated</h4>
              <p className="text-sm mb-4" style={{ color: 'var(--subtext)' }}>Get the latest insights on design & digital trends.</p>
              {subscribed ? (
                <div className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>✓ You&apos;re subscribed!</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex gap-2">
                  <FormInput
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 !py-2.5 !text-xs !min-h-[40px]"
                    required
                  />
                  <MagneticButton
                    type="submit"
                    size="sm"
                    className="!w-10 !h-10 !p-0 !min-h-[40px] flex-shrink-0"
                  >
                    →
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-wrap gap-4 items-center justify-between pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-xs" style={{ color: 'var(--subtext)' }}>
              © {now.getFullYear()} PIXELL. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(link => (
                <a key={link} href="#" className="text-xs transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--subtext)' }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
