import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Coffee, Heart, Sparkles, Code2, Users, ExternalLink } from 'lucide-react';
import { BMC_PAGE_URL, showBmcWidget, hideBmcWidget } from '../lib/bmcWidget';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // Floating BMC widget is only visible on this page so it never overlaps
  // the map's floating action buttons or the mobile bottom nav.
  useEffect(() => {
    showBmcWidget();
    return hideBmcWidget;
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = 'About the Developer';
    return () => {
      document.title = previous;
    };
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    []
  );

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/');
  };

  return (
    <div className="relative w-full h-full bg-[#050510] font-sans">
      {/* Cosmic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-violet-600/15 blur-[120px] rounded-full" />
        {stars.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ top: s.top, left: s.left }}
          />
        ))}
      </div>

      {/* Scroll container (the app shell itself never scrolls) */}
      <div className="relative z-10 h-full overflow-y-auto overscroll-contain touch-pan-y custom-scrollbar">
        <main className="mx-auto w-full max-w-2xl px-5 sm:px-6 pt-6 pb-32">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {/* Hero */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mt-10 mb-12"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
            >
              <Sparkles className="w-10 h-10 text-purple-400" />
            </motion.div>
            <p className="text-xs text-purple-300/60 font-bold tracking-[0.3em] uppercase mb-4">
              About the Developer
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter leading-tight">
              Your Space. Your People.
              <span className="block text-purple-300">
                Built with Love.
              </span>
            </h1>
          </motion.header>

          <div className="space-y-5">
            {/* Introduction */}
            <motion.section {...fadeUp} className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-4">Hey there! I'm Cha, creator of QueerSpace PH.</h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  QueerSpace PH is a passion project built to give Filipino sapphics and WLW an accessible,
                  supportive, and safe digital haven:{' '}
                  <span className="text-purple-300">Your space. Your people.</span>
                </p>
                <p>
                  I manage and develop this platform independently. Every feature, improvement, and update is
                  part of my effort to create a digital space where our community can connect, express
                  themselves, and feel at home.
                </p>
              </div>
            </motion.section>

            {/* Story & independence */}
            <div className="grid gap-5 md:grid-cols-2">
              <motion.section {...fadeUp} className="glass rounded-3xl p-6">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-400/20 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="text-white font-semibold mb-2">The story &amp; mission</h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  QueerSpace PH started from a simple wish: a corner of the internet made for Filipino sapphics
                  and WLW, where you don't have to explain yourself to belong. The mission is to keep that space
                  accessible, supportive, and safe for everyone who finds their way here.
                </p>
              </motion.section>

              <motion.section {...fadeUp} className="glass rounded-3xl p-6">
                <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-violet-300" />
                </div>
                <h2 className="text-white font-semibold mb-2">Independently maintained</h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  There's no company or team behind this. It's a passion project that I design, build, and
                  maintain on my own. Updates may come at a human pace, but each one is made with care for this
                  community.
                </p>
              </motion.section>
            </div>

            {/* Thank you */}
            <motion.section {...fadeUp} className="rounded-3xl p-6 sm:p-8 text-center bg-white/[0.02] border border-white/5">
              <Heart className="w-6 h-6 text-pink-300 mx-auto mb-3" />
              <h2 className="text-white font-semibold mb-2">Thank you for being here</h2>
              <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                To everyone who has joined, shared, and made this space feel alive: maraming salamat. You are
                the reason QueerSpace PH exists, and the reason it keeps growing.
              </p>
            </motion.section>

            {/* Support card */}
            <motion.section
              {...fadeUp}
              aria-labelledby="support-heading"
              className="relative overflow-hidden rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-600/20 via-[#0b0920]/80 to-violet-700/15 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(189,95,255,0.45)]"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#BD5FFF]/25 blur-[70px] rounded-full pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/60 to-transparent" />

              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
                    <Coffee size={12} className="text-[#BD5FFF]" />
                    Buy Me a Coffee
                  </div>
                  <h2 id="support-heading" className="text-2xl font-semibold text-white tracking-tight mb-3">
                    Help Keep QueerSpace Alive&nbsp;💜
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base text-white/65 leading-relaxed">
                    <p>
                      If you'd like to support ongoing development, help cover server and hosting costs, or just
                      say thanks with a cup of coffee, it would mean the world!
                    </p>
                    <p>Every contribution helps keep this independent WLW platform growing.</p>
                  </div>
                </div>

                <div className="flex flex-col items-stretch md:items-center gap-3 md:w-56 shrink-0">
                  <a
                    href={BMC_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#BD5FFF] hover:bg-[#c978ff] text-white font-semibold shadow-[0_0_30px_rgba(189,95,255,0.5)] transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Coffee className="w-5 h-5" />
                    Buy me a coffee
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <p className="text-xs text-white/40 text-center leading-relaxed">
                    No pressure, ever. Just being here is support enough. Salamat! 💜
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
            Made with love by Cha
          </p>
        </main>
      </div>
    </div>
  );
};
