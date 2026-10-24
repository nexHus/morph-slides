/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Smartphone,
  Laptop,
  Check,
  ArrowRight,
  Compass,
  Rocket,
  Target,
  Sparkles,
  Users2,
  Briefcase,
  HelpCircle,
  HeartHandshake,
  CheckCircle2,
  Flame,
} from "lucide-react";

// Safe Web Audio API: Soft Pneumatic Brake Air Release
class TrainAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch {
      // Audio fallback
    }
  }

  public releaseBrakes() {
    if (this.isMuted || typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.6);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(650, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.55);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch {
      // Safe skip
    }
  }
}

interface Slide {
  id: string;
  tag: string;
  carNumber: string;
  compartmentName: string;
  title: string;
  subtitle?: string;
  quote?: string;
  image: string;
  icon: React.ElementType;
  cards?: { title: string; subtitle?: string; points: string[]; icon?: React.ElementType }[];
  comparison?: {
    vague: { title: string; text: string; note: string };
    specific: { title: string; text: string; note: string };
  };
  callout?: { label: string; text: string };
}

const SLIDES: Slide[] = [
  {
    id: "s1",
    tag: "The Thinklings • Presentation",
    carNumber: "CAR 01 • LOCOMOTIVE",
    compartmentName: "FRONT SALON",
    title: "PASSENGER",
    subtitle: "Storytelling & Specific",
    quote: "“An interview is not a test of memory. It reveals how you think, communicate, and stay calm under pressure.”",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    icon: Flame,
    cards: [
      {
        title: "Passionate & Specific",
        icon: Sparkles,
        points: [
          "Engage your audience with concrete evidence, not clichés.",
          "Generic statements like 'I am a team player' are instantly forgotten.",
          "Tell real stories where your personal actions drove the outcome.",
        ],
      },
      {
        title: "No Lies. Absolute Authenticity",
        icon: CheckCircle2,
        points: [
          "True confidence comes from owning your real experiences.",
          "Never fabricate claims; interviewers probe deep into specifics.",
          "Vulnerability and honesty leave a lasting impression.",
        ],
      },
    ],
    callout: {
      label: "Core Philosophy",
      text: "Move from claiming qualities to proving them through structured narratives.",
    },
  },
  {
    id: "s2",
    tag: "Foundation • Question Behind Questions",
    carNumber: "CAR 02 • THE 3 QBQs",
    compartmentName: "CABIN A",
    title: "The 3 interview questions (QBQs)",
    subtitle: "Every interview question secretly tests one of these three pillars",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    icon: Compass,
    cards: [
      {
        title: "01 | Skill",
        subtitle: "What skills do you actually have?",
        icon: Target,
        points: [
          "Proved through your past actions and concrete contributions.",
          "Supported by numbers, percentages, and completed milestones.",
          "Use the CARL Model: Context ➔ Action ➔ Result ➔ Learning.",
        ],
      },
      {
        title: "02 | Passion",
        subtitle: "How passionate are you about the role & company?",
        icon: Rocket,
        points: [
          "Demonstrated through prior research and knowledge of their work.",
          "Backed by relevant personal projects, site visits, or reading.",
          "Proves you want this specific job, not just any job.",
        ],
      },
      {
        title: "03 | Situational (Fit)",
        subtitle: "Are you the right fit for this culture?",
        icon: Users2,
        points: [
          "Shows how you navigate team disagreements and unexpected stress.",
          "Demonstrates flexibility, emotional poise, and mutual respect.",
          "Proves you will elevate team morale rather than disrupt it.",
        ],
      },
    ],
    callout: {
      label: "To stand out against candidates with better degrees",
      text: "Identify which QBQ is being asked before speaking, then choose the story that proves that exact quality.",
    },
  },
  {
    id: "s3",
    tag: "Framework • Story Structuring",
    carNumber: "CAR 03 • SADA & AMAL",
    compartmentName: "CABIN B",
    title: "Be Specific: Interview Steps 1 & 2",
    subtitle: "Sada (Keep It Simple) & Amal (Focus on Action)",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    icon: Rocket,
    cards: [
      {
        title: "Step 1: Sada — Keep It Simple",
        subtitle: "The 1-Minute Rule using S.O.S.",
        icon: Compass,
        points: [
          "S — Situation: Give brief context in 15 seconds.",
          "O — Obstacle: Name the core challenge or bottleneck.",
          "S — Solution: State your practical solution clearly.",
          "Keep it concise: the shorter and more focused, the better.",
        ],
      },
      {
        title: "Step 2: Amal — Focus on Action",
        subtitle: "Highlight your personal contribution",
        icon: Flame,
        points: [
          "State what YOU personally executed (not just 'we did this').",
          "Explain how you tackled the obstacle with composure.",
          "Your past actions show interviewers how you will perform tomorrow.",
        ],
      },
    ],
    callout: {
      label: "The 90/10 Weakness Rule",
      text: "When asked about a weakness, spend only 10% acknowledging it, and 90% explaining the concrete actions you take to improve it.",
    },
  },
  {
    id: "s4",
    tag: "Evidence • Measurable Outcomes",
    carNumber: "CAR 04 • RESULTS & WHY",
    compartmentName: "CABIN C",
    title: "Be Specific: Interview Steps 3 & 4",
    subtitle: "Kya Hasil Hua? (Show Results) & Kyun? (Explain Why)",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    icon: Target,
    cards: [
      {
        title: "Step 3: Kya Hasil Hua? — Show Results",
        subtitle: "Support your story with honest evidence",
        icon: Target,
        points: [
          "Percentage increase in output, revenue, or efficiency.",
          "Costs saved, errors reduced, or hours eliminated.",
          "Team size guided or deliverables completed on time.",
          "Specific metrics make your contribution impossible to dismiss.",
        ],
      },
      {
        title: "Step 4: Kyun? — Explain Why",
        subtitle: "The deeper why (Kyun, Kyun, Kyun)",
        icon: HelpCircle,
        points: [
          "Explain what the accomplishment demonstrates about your character.",
          "Which core competency or value does it validate?",
          "Directly link the experience back to proving Skill, Passion, or Fit.",
        ],
      },
    ],
    callout: {
      label: "Rule of Evidence",
      text: "Unquantified claims sound like opinions. Specific numbers convert claims into undeniable facts.",
    },
  },
  {
    id: "s5",
    tag: "Contrast • Communication Precision",
    carNumber: "CAR 05 • THE CONTRAST",
    compartmentName: "CABIN D",
    title: "Be Specific: Vague vs. Specific",
    subtitle: "The difference between an average answer and an unforgettable one",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    icon: Sparkles,
    comparison: {
      vague: {
        title: "Vague Answer (❌ Avoid)",
        text: "“The project went well, and everyone was happy.”",
        note: "What improved? By how much? What did you personally do? Zero measurable impact.",
      },
      specific: {
        title: "Specific Answer (✅ Target)",
        text: "“I reduced expenses by 15% by identifying and eliminating unnecessary software subscriptions.”",
        note: "Clear personal action (Amal) combined with a quantifiable result (15% reduction).",
      },
    },
    callout: {
      label: "Formula for Success",
      text: "Specific Action + Quantifiable Evidence = An answer that outperforms applicants with more experience.",
    },
  },
  {
    id: "s6",
    tag: "Execution • Story Alignment",
    carNumber: "CAR 06 • ALIGNMENT",
    compartmentName: "CABIN E",
    title: "Connect Your Story to the QBQs",
    subtitle: "Map every story to one specific evaluation category",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    icon: Users2,
    cards: [
      {
        title: "Proving Skill",
        subtitle: "What skill does your story demonstrate?",
        icon: Target,
        points: [
          "Highlight your personal action (Step 2: Amal).",
          "Back it up with verifiable numbers (Step 3: Kya Hasil Hua).",
          "Demonstrate technical or operational capability.",
        ],
      },
      {
        title: "Proving Passion",
        subtitle: "What draws you to this organization?",
        icon: Rocket,
        points: [
          "Reference independent research you did before the interview.",
          "Mention relevant site visits, personal projects, or articles.",
          "Demonstrate a sincere stake in their mission.",
        ],
      },
      {
        title: "Proving Fit",
        subtitle: "How would you work in this culture?",
        icon: HeartHandshake,
        points: [
          "Share how you adapted to unexpected team changes.",
          "Show mutual respect and how you handle conflicting opinions.",
          "Prove you are dependable under high expectations.",
        ],
      },
    ],
    callout: {
      label: "Strategic Rule",
      text: "Before answering, identify the QBQ—then choose the story that proves that exact point.",
    },
  },
  {
    id: "s7",
    tag: "Playbook • Question Archetypes",
    carNumber: "CAR 07 • TAXONOMY",
    compartmentName: "CABIN F",
    title: "5 Types of Interview Questions",
    subtitle: "Recognize the format and apply the right framework",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    icon: Briefcase,
    cards: [
      {
        title: "01 | Traditional",
        points: ["Who you are and why you want the role. 'Tell me about yourself.' Keep it focused on your journey."],
      },
      {
        title: "02 | Behavioral",
        points: ["Tests past performance. Answer with S.O.S. (Situation, Obstacle, Solution) or CARL."],
      },
      {
        title: "03 | Situational",
        points: ["Hypothetical dilemmas testing your real-time ethics and judgment."],
      },
      {
        title: "04 | Estimation",
        points: ["Logical number-based questions. Use proxies, averages of two extremes, and structured breakdown."],
      },
      {
        title: "05 | Case Study",
        points: ["Identify the root cause, weigh trade-offs, and offer a logical recommendation."],
      },
    ],
    callout: {
      label: "Estimation Strategy (From Notes)",
      text: "Estimate via proxy (e.g. households × average cars) or average two reasonable extremes. Show your logical steps.",
    },
  },
  {
    id: "s8",
    tag: "Poise • Handling the Unknown",
    carNumber: "CAR 08 • THE CRUCIBLE",
    compartmentName: "CABIN G",
    title: "Problem Solving Under Pressure",
    subtitle: "What to do when you don't know the answer",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    icon: HelpCircle,
    cards: [
      {
        title: "The Power Pause",
        icon: Compass,
        points: [
          "“That's a great question. To be honest, I'm not entirely sure.”",
          "“If I understand correctly, you are asking about X. May I take a minute to structure my thoughts?”",
          "Gives you time to think and demonstrates composure under pressure.",
        ],
      },
      {
        title: "The 6-Step Defense",
        icon: Target,
        points: [
          "1. Be honest: Never invent facts or guess blindly.",
          "2. Summarize your thinking: Exposes your structured logic.",
          "3. State trade-offs: Highlight the pros and cons of available options.",
          "4. Name missing info: Identify the data needed to reach certainty.",
          "5. Directional recommendation: Offer a reasoned perspective.",
          "6. End confident: Stay calm—calm is your strength.",
        ],
      },
    ],
    callout: {
      label: "Interviewer Perspective",
      text: "Panels care more about HOW your mind analyzes an unfamiliar problem than whether you memorized a quick answer.",
    },
  },
  {
    id: "s9",
    tag: "Professionalism • Long-Term Impact",
    carNumber: "CAR 09 • NEGOTIATION",
    compartmentName: "CABIN H",
    title: "Salary Negotiation and Leaving Professionally",
    subtitle: "Navigating critical career conversations with clarity and tact",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    icon: HeartHandshake,
    cards: [
      {
        title: "Salary Negotiation",
        icon: Briefcase,
        points: [
          "Ground your request in verified market research.",
          "Evaluate the entire package: growth trajectory, mentorship, and benefits, not just base pay.",
          "Connect requested numbers to the measurable value you deliver.",
          "Aim for a constructive win-win while maintaining professionalism.",
        ],
      },
      {
        title: "Leaving Professionally",
        icon: CheckCircle2,
        points: [
          "Resign respectfully with appropriate written notice.",
          "Document handovers cleanly and finish open commitments.",
          "Express genuine gratitude for opportunities and relationships.",
          "Protect your professional reputation: leave every door open.",
        ],
      },
    ],
    callout: {
      label: "Core Takeaway",
      text: "An interview shows how you think, communicate, and behave under pressure, not just what you know.",
    },
  },
  {
    id: "s10",
    tag: "Review • The Complete Toolkit",
    carNumber: "CAR 10 • THE HORIZON",
    compartmentName: "TERMINAL OBSERVATION",
    title: "Summary",
    subtitle: "The Thinklings Passenger Presentation Playbook",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    icon: CheckCircle2,
    cards: [
      {
        title: "The 3 QBQs",
        points: ["Always determine whether the panel is testing Skill, Passion, or Culture Fit before answering."],
      },
      {
        title: "The 4-Step Narrative",
        points: ["Sada (SOS under 1 min) ➔ Amal (Personal contribution) ➔ Kya Hasil Hua (Metrics) ➔ Kyun (Purpose)."],
      },
      {
        title: "Precision & The 90/10 Rule",
        points: ["Replace vague claims with numbers. Spend 10% acknowledging weakness and 90% on your improvement plan."],
      },
      {
        title: "Poise Under Pressure",
        points: ["When uncertain: pause, structure the trade-offs, identify missing info, and let calm be your advantage."],
      },
    ],
    callout: {
      label: "Final Standard",
      text: "Walk into every interview prepared to drive the conversation through structure, humility, and evidence.",
    },
  },
];

// Physical momentum spring: Start and end velocities move in lockstep
const trainTransitSpring: Transition = {
  type: "spring" as const,
  stiffness: 65,
  damping: 18,
  mass: 1.2,
};

export default function CoupledTrainDeck() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isUpdatingRef = useRef(false);
  const audioRef = useRef<TrainAudioEngine | null>(null);

  // Mobile Touch Swipe references
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) audioRef.current = new TrainAudioEngine();
    return audioRef.current;
  }, []);

  const sendSync = useCallback(
    async (newIndex: number) => {
      isUpdatingRef.current = true;
      getAudio().releaseBrakes();
      try {
        await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slide: newIndex }),
        });
      } catch {
        // safe fallback
      } finally {
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 350);
      }
    },
    [getAudio]
  );

  // Poll for sync updates from phone or PC every 400ms
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(async () => {
      if (isUpdatingRef.current) return;
      try {
        const res = await fetch("/api/sync");
        if (res.ok) {
          const data = await res.json();
          if (
            typeof data.slide === "number" &&
            data.slide !== current &&
            data.slide >= 0 &&
            data.slide < SLIDES.length
          ) {
            getAudio().releaseBrakes();
            setCurrent(data.slide);
          }
        }
      } catch {
        // safe skip
      }
    }, 400);

    return () => clearInterval(interval);
  }, [current, isMounted, getAudio]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => {
      const next = prev < SLIDES.length - 1 ? prev + 1 : prev;
      sendSync(next);
      return next;
    });
  }, [sendSync]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => {
      const prevIdx = prev > 0 ? prev - 1 : prev;
      sendSync(prevIdx);
      return prevIdx;
    });
  }, [sendSync]);

  // Keyboard navigation on PC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "Space"].includes(e.code)) {
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
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  // Native Mobile Touch Swipe Listeners
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      // Swiped Left -> Advance
      nextSlide();
    } else if (distance < -50) {
      // Swiped Right -> Previous
      prevSlide();
    }
  };

  const activeSlide = SLIDES[current];

  if (!isMounted) {
    return (
      <div className="w-screen h-[100dvh] bg-[#060608] flex items-center justify-center text-neutral-400 font-mono text-xs">
        Coupling Train Cars...
      </div>
    );
  }

  return (
    <main
      suppressHydrationWarning
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-[100dvh] bg-[#070709] text-[#f4f4f5] flex flex-col justify-between overflow-hidden font-sans select-none pb-20 md:pb-0"
    >
      {/* GLOBAL SCROLLBAR HIDER */}
      <style jsx global>{`
        * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>

      {/* TOP HEADER: TRANSIT ROUTE & TRAIN POSITION */}
      <header className="relative z-30 w-full px-4 md:px-12 pt-3 md:pt-6 flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[10px] md:text-[11px] font-mono text-neutral-400">
              {isMobile ? (
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Laptop className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isMobile ? "Mobile Remote" : "PC Screen"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <span className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase text-neutral-500 hidden sm:inline">
              AMAL EXPRESS • {activeSlide.carNumber}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="font-bold text-white text-sm">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(SLIDES.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Top Progress Rail with Floating Train Marker */}
        <div className="relative w-full h-1 bg-neutral-900 rounded-full overflow-visible border border-neutral-800/80 mt-0.5">
          <motion.div
            className="absolute -top-1.5 h-4 px-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-amber-500/20 flex items-center justify-center text-[9px] font-black font-mono text-black -translate-x-1/2"
            animate={{ left: `${((current + 1) / SLIDES.length) * 100}%` }}
            transition={trainTransitSpring}
          >
            🚂
          </motion.div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CENTER STAGE: THE PHYSICAL INTERCONNECTED TRAIN                           */}
      {/* Shifts from Right to Left simultaneously with 100% sync                   */}
      {/* ========================================================================= */}
      <div className="relative w-full z-20 my-auto overflow-visible py-1">
        <motion.div
          animate={{
            x: isMobile
              ? `calc(4vw - ${current} * (92vw + 24px))`
              : `calc(5vw - ${current} * (90vw + 48px))`,
          }}
          transition={trainTransitSpring}
          className="flex items-center"
        >
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === current;
            const IconComponent = slide.icon;

            return (
              <React.Fragment key={slide.id}>
                {/* 1. TRAIN CARRIAGE / CABIN BOX */}
                <motion.div
                  animate={{
                    scale: isCurrent ? 1 : 0.94,
                    opacity: isCurrent ? 1 : 0.35,
                  }}
                  transition={trainTransitSpring}
                  style={{
                    width: isMobile ? "92vw" : "90vw",
                  }}
                  className="relative shrink-0 rounded-[24px] md:rounded-[36px] bg-[#0d0d11] border-2 border-neutral-800 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] overflow-hidden"
                >
                  {/* CABIN STEEL RIVETS */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/80 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/80 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/80 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/80 pointer-events-none" />

                  {/* CARRIAGE METALLIC ROOF CURVE & STATUS PLATE */}
                  <div className="w-full h-7 md:h-8 bg-[#121217] border-b border-neutral-800/70 px-4 md:px-6 flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-amber-400 animate-pulse" : "bg-neutral-600"}`} />
                      <span className="text-neutral-400">{slide.carNumber}</span>
                      <span>•</span>
                      <span className="hidden sm:inline">{slide.compartmentName}</span>
                    </div>
                    <div className="text-[9px] md:text-[10px] text-neutral-600">
                      {isCurrent ? "DOCKED • ACTIVE" : "COUPLED"}
                    </div>
                  </div>

                  {/* 2. MOTORIZED TINTED GLASS WINDOW (ROLLS UP SLOWLY) */}
                  <motion.div
                    animate={{
                      y: isCurrent ? "-102%" : "0%",
                    }}
                    transition={{
                      delay: isCurrent ? 0.45 : 0,
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 z-30 bg-neutral-900/90 backdrop-blur-2xl border-b-2 border-neutral-600/70 flex flex-col justify-end pointer-events-none shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                    <div className="w-full pb-3 flex justify-center items-center">
                      <div className="w-24 md:w-28 h-1.5 rounded-full bg-neutral-700/80 border border-neutral-500/50 shadow-sm" />
                    </div>
                  </motion.div>

                  {/* 3. CABIN INTERIOR CONTENT */}
                  <div className="p-4 md:p-8 max-h-[56dvh] md:max-h-[72vh] overflow-y-auto">
                    <motion.div
                      animate={{
                        opacity: isCurrent ? 1 : 0.6,
                        y: isCurrent ? 0 : 8,
                      }}
                      transition={{ delay: 0.65, duration: 0.85, ease: "easeOut" }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-center"
                    >
                      {/* LEFT: TEXT & CARDS */}
                      <div className="lg:col-span-7 flex flex-col gap-3 md:gap-3.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 md:p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-amber-400 shadow-sm">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] md:text-xs font-mono tracking-widest uppercase text-neutral-400">
                            {slide.tag}
                          </span>
                        </div>

                        <div className="space-y-0.5 md:space-y-1">
                          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                            {slide.title}
                          </h1>
                          {slide.subtitle && (
                            <p className="text-[11px] md:text-sm text-neutral-400 font-normal leading-relaxed">
                              {slide.subtitle}
                            </p>
                          )}
                        </div>

                        {slide.quote && (
                          <div className="p-2.5 md:p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-[11px] md:text-xs text-neutral-300 italic">
                            {slide.quote}
                          </div>
                        )}

                        {slide.cards && (
                          <div
                            className={`grid gap-2 md:gap-2.5 ${
                              slide.cards.length === 2
                                ? "grid-cols-1 sm:grid-cols-2"
                                : slide.cards.length === 3
                                ? "grid-cols-1 sm:grid-cols-3"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            }`}
                          >
                            {slide.cards.map((card, cIdx) => {
                              const CardIcon = card.icon || Check;
                              return (
                                <div
                                  key={cIdx}
                                  className="p-3 md:p-3.5 rounded-xl bg-[#121217] border border-neutral-800/70 flex flex-col gap-1 md:gap-1.5"
                                >
                                  <div className="flex items-center gap-1.5 md:gap-2">
                                    <CardIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    <div className="text-xs md:text-sm font-bold text-white tracking-tight">
                                      {card.title}
                                    </div>
                                  </div>

                                  {card.subtitle && (
                                    <div className="text-[10px] md:text-[11px] text-neutral-400 font-medium">
                                      {card.subtitle}
                                    </div>
                                  )}

                                  <ul className="space-y-0.5 md:space-y-1 mt-0.5">
                                    {card.points.map((pt, pIdx) => (
                                      <li
                                        key={pIdx}
                                        className="text-[10px] md:text-xs text-neutral-300 flex items-start gap-1.5 leading-relaxed"
                                      >
                                        <span className="text-neutral-500 shrink-0 mt-0.5">•</span>
                                        <span>{pt}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {slide.comparison && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                            <div className="p-3 md:p-3.5 rounded-xl bg-neutral-900/40 border border-red-950/40 space-y-1 md:space-y-1.5">
                              <div className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold">
                                {slide.comparison.vague.title}
                              </div>
                              <div className="text-xs md:text-sm font-medium text-neutral-200">
                                {slide.comparison.vague.text}
                              </div>
                              <div className="text-[10px] md:text-[11px] text-neutral-400 leading-relaxed pt-1 border-t border-neutral-800/50">
                                {slide.comparison.vague.note}
                              </div>
                            </div>

                            <div className="p-3 md:p-3.5 rounded-xl bg-neutral-900/50 border border-emerald-950/50 space-y-1 md:space-y-1.5">
                              <div className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                                {slide.comparison.specific.title}
                              </div>
                              <div className="text-xs md:text-sm font-medium text-white">
                                {slide.comparison.specific.text}
                              </div>
                              <div className="text-[10px] md:text-[11px] text-neutral-400 leading-relaxed pt-1 border-t border-neutral-800/50">
                                {slide.comparison.specific.note}
                              </div>
                            </div>
                          </div>
                        )}

                        {slide.callout && (
                          <div className="p-2.5 md:p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 flex flex-col sm:flex-row sm:items-center gap-1 text-[11px] md:text-xs text-neutral-300">
                            <span className="font-bold text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                              {slide.callout.label}:
                            </span>
                            <span className="text-neutral-400">{slide.callout.text}</span>
                          </div>
                        )}
                      </div>

                      {/* RIGHT: TRAIN CARRIAGE WINDOW */}
                      <div className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950 group">
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent z-10 pointer-events-none" />

                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] md:text-xs font-mono text-white/80">
                            <span className="tracking-widest uppercase">AMAL EXPRESS</span>
                            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px]">
                              Window View {idx + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* UNDERCARRIAGE STEEL WHEELS */}
                  <div className="w-full h-2.5 md:h-3 bg-[#0a0a0d] border-t border-neutral-800/70 flex justify-between px-8 md:px-16 pointer-events-none">
                    <div className="flex gap-1.5 md:gap-2 -mt-1 md:-mt-1.5">
                      <motion.div
                        animate={{ rotate: current * 360 }}
                        transition={trainTransitSpring}
                        className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-dashed border-amber-400/80 bg-neutral-900"
                      />
                      <motion.div
                        animate={{ rotate: current * 360 }}
                        transition={trainTransitSpring}
                        className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-dashed border-amber-400/80 bg-neutral-900"
                      />
                    </div>
                    <div className="flex gap-1.5 md:gap-2 -mt-1 md:-mt-1.5">
                      <motion.div
                        animate={{ rotate: current * 360 }}
                        transition={trainTransitSpring}
                        className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-dashed border-amber-400/80 bg-neutral-900"
                      />
                      <motion.div
                        animate={{ rotate: current * 360 }}
                        transition={trainTransitSpring}
                        className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-dashed border-amber-400/80 bg-neutral-900"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* 4. ACCORDION GANGWAY BELLOWS (COUPLER) */}
                {idx < SLIDES.length - 1 && (
                  <div
                    style={{ width: isMobile ? "24px" : "48px" }}
                    className="shrink-0 flex flex-col justify-center items-center px-0.5"
                  >
                    <div className="w-full h-32 md:h-40 rounded bg-neutral-900 border-y border-neutral-700/80 flex justify-between p-0.5 shadow-inner">
                      {[...Array(3)].map((_, bIdx) => (
                        <div key={bIdx} className="h-full w-0.5 bg-neutral-800" />
                      ))}
                    </div>
                    <div className="w-6 md:w-8 h-2 md:h-2.5 bg-neutral-700 rounded-sm mt-1 border border-neutral-500 shadow-md flex items-center justify-center">
                      <div className="w-1.5 md:w-2 h-0.5 bg-amber-400 rounded-full" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>

      {/* BOTTOM: STEEL RAILROAD TRACK */}
      <div className="relative w-full h-5 md:h-6 pointer-events-none overflow-hidden flex flex-col justify-end shrink-0">
        <div className="w-full h-1 bg-gradient-to-r from-neutral-700 via-neutral-300 to-neutral-700 shadow-sm" />
        <motion.div
          animate={{ x: -((current * 80) % 40) }}
          transition={trainTransitSpring}
          className="w-[200vw] -ml-[50vw] flex justify-between pt-0.5 opacity-50"
        >
          {[...Array(75)].map((_, tIdx) => (
            <div key={tIdx} className="w-2 h-3 md:h-3.5 bg-neutral-800 rounded-sm border-t border-neutral-600" />
          ))}
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SPECIFIC: PERMANENTLY FIXED REMOTE DOCK IN THUMB ZONE              */}
      {/* Locked directly above mobile address bars so it's always accessible       */}
      {/* ========================================================================= */}
      <div className="fixed bottom-3 inset-x-3 z-50 md:hidden flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-950/95 border border-neutral-700/90 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
        <button
          suppressHydrationWarning
          onClick={prevSlide}
          disabled={current === 0}
          className="flex-1 h-12 rounded-xl bg-neutral-900 border border-neutral-700 active:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1 disabled:opacity-20 active:scale-95 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        <div className="px-2 font-mono text-center">
          <span className="text-white font-bold text-xs">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-neutral-500 text-[10px]">/{String(SLIDES.length).padStart(2, "0")}</span>
        </div>

        <button
          suppressHydrationWarning
          onClick={nextSlide}
          disabled={current === SLIDES.length - 1}
          className="flex-[1.3] h-12 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 active:from-amber-500 active:to-orange-600 text-black font-black text-xs flex items-center justify-center gap-1 shadow-lg shadow-amber-500/25 disabled:opacity-20 active:scale-95 transition"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP FOOTER CONTROLS                                                   */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full px-12 pb-5 hidden md:flex items-center justify-between shrink-0">
        <div className="text-xs font-mono text-neutral-500">
          Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">→</kbd> to advance train
        </div>

        <div className="flex items-center gap-3">
          <button
            suppressHydrationWarning
            onClick={prevSlide}
            disabled={current === 0}
            className="h-10 px-5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-200 disabled:opacity-20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Cabin</span>
          </button>

          <span className="text-xs font-mono text-neutral-400 px-2">
            {current + 1} / {SLIDES.length}
          </span>

          <button
            suppressHydrationWarning
            onClick={nextSlide}
            disabled={current === SLIDES.length - 1}
            className="h-10 px-6 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold disabled:opacity-20 transition active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Next Cabin</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            suppressHydrationWarning
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
            title="Fullscreen"
            className="p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 transition"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs font-mono text-neutral-500">
          Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">F</kbd> for Fullscreen
        </div>
      </footer>
    </main>
  );
}