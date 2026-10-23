"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Layers, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

// Placeholder schema for slides
export interface SlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "sparkles" | "layers" | "zap" | "check";
  accentColor: string;
  stats?: { label: string; value: string }[];
}

// Initial demonstration slides (will replace with your content)
const INITIAL_SLIDES: SlideItem[] = [
  {
    id: "intro",
    tag: "Welcome",
    title: "Dynamic Morphing Engine",
    subtitle: "Built with Next.js & Framer Motion",
    description: "Click anywhere or press Arrow Keys / Space to step through smoothly morphed transitions.",
    iconName: "sparkles",
    accentColor: "from-blue-600 to-indigo-600",
    stats: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Engine", value: "Spring Motion" },
    ],
  },
  {
    id: "features",
    tag: "Architecture",
    title: "Smooth Layout Morphing",
    subtitle: "Seamless Shared Element Transitions",
    description: "Watch how this card, badge, and icon adapt dynamically without abrupt page cuts.",
    iconName: "zap",
    accentColor: "from-amber-500 to-orange-600",
    stats: [
      { label: "Physics", value: "Stiffness 260" },
      { label: "Damping", value: "Smooth 25" },
    ],
  },
];

const iconMap = {
  sparkles: Sparkles,
  layers: Layers,
  zap: Zap,
  check: CheckCircle2,
};

export default function PresentationDeck() {
  const [current, setCurrent] = useState(0);
  const slides = INITIAL_SLIDES;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "Space", "Enter"].includes(e.code)) {
        e.preventDefault();
        nextSlide();
      } else if (["ArrowLeft", "Backspace"].includes(e.code)) {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[current];
  const IconComponent = iconMap[slide.iconName] || Sparkles;

  // Spring transition configuration
  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 26,
    mass: 0.9,
  };

  return (
    <main 
      onClick={nextSlide}
      className="relative w-screen h-screen flex flex-col items-center justify-center p-8 bg-neutral-950 overflow-hidden cursor-pointer"
    >
      {/* Background ambient glow that morphs colors */}
      <motion.div
        layout
        transition={springTransition}
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${slide.accentColor} pointer-events-none`}
      />

      {/* Main Slide Card Container */}
      <motion.div
        layoutId="main-slide-container"
        transition={springTransition}
        className="relative z-10 w-full max-w-4xl p-12 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl shadow-2xl flex flex-col gap-6"
      >
        {/* Top Tag & Icon Row */}
        <div className="flex items-center justify-between">
          <motion.div
            layoutId="slide-tag"
            transition={springTransition}
            className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700/50"
          >
            {slide.tag}
          </motion.div>

          <motion.div
            layoutId="slide-icon-box"
            transition={springTransition}
            className={`p-3 rounded-2xl bg-gradient-to-br ${slide.accentColor} text-white shadow-lg`}
          >
            <IconComponent className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Morphing Headings */}
        <div className="space-y-2">
          <motion.h1
            layoutId="slide-title"
            transition={springTransition}
            className="text-4xl md:text-5xl font-black tracking-tight text-white"
          >
            {slide.title}
          </motion.h1>

          <motion.h2
            layoutId="slide-subtitle"
            transition={springTransition}
            className="text-xl md:text-2xl font-medium text-neutral-400"
          >
            {slide.subtitle}
          </motion.h2>
        </div>

        {/* Morphing Description */}
        <motion.p
          layoutId="slide-description"
          transition={springTransition}
          className="text-neutral-300 text-lg leading-relaxed max-w-2xl"
        >
          {slide.description}
        </motion.p>

        {/* Dynamic Stats / Sub-elements */}
        {slide.stats && (
          <motion.div 
            layoutId="slide-stats-grid"
            transition={springTransition}
            className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800/60"
          >
            {slide.stats.map((s, idx) => (
              <div key={idx} className="bg-neutral-800/40 p-4 rounded-xl border border-neutral-800">
                <div className="text-sm text-neutral-400">{s.label}</div>
                <div className="text-xl font-bold text-white mt-0.5">{s.value}</div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Slide Navigation & Progress Controls (Clicks won't trigger canvas click) */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-neutral-900/90 border border-neutral-800 px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md z-20"
      >
        <button
          onClick={prevSlide}
          disabled={current === 0}
          className="p-1.5 rounded-full hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition text-neutral-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono text-neutral-400 tracking-wider">
          {current + 1} / {slides.length}
        </span>

        <button
          onClick={nextSlide}
          disabled={current === slides.length - 1}
          className="p-1.5 rounded-full hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition text-neutral-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}