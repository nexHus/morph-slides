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
} from "lucide-react";

interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle?: string;
  quote?: string;
  cards?: { title: string; subtitle?: string; points: string[] }[];
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
    title: "PASSENGER",
    subtitle: "Storytelling & Specific",
    quote: "“An interview is not a test of memory. It reveals how you think, communicate, and stay calm under pressure.”",
    cards: [
      {
        title: "Passionate & Specific",
        points: [
          "Engage your audience with concrete evidence, not clichés.",
          "Generic statements like 'I am a team player' are instantly forgotten.",
          "Tell real stories where your personal actions drove the outcome.",
        ],
      },
      {
        title: "No Lies. Absolute Authenticity",
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
    title: "The 3 interview questions (QBQs)",
    subtitle: "Every interview question secretly tests one of these three pillars",
    cards: [
      {
        title: "01 | Skill",
        subtitle: "What skills do you actually have?",
        points: [
          "Proved through your past actions and concrete contributions.",
          "Supported by numbers, percentages, and completed milestones.",
          "Use the CARL Model: Context ➔ Action ➔ Result ➔ Learning.",
        ],
      },
      {
        title: "02 | Passion",
        subtitle: "How passionate are you about the role & company?",
        points: [
          "Demonstrated through prior research and knowledge of their work.",
          "Backed by relevant personal projects, site visits, or reading.",
          "Proves you want this specific job, not just any job.",
        ],
      },
      {
        title: "03 | Situational (Fit)",
        subtitle: "Are you the right fit for this culture?",
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
    title: "Be Specific: Interview Steps 1 & 2",
    subtitle: "Sada (Keep It Simple) & Amal (Focus on Action)",
    cards: [
      {
        title: "Step 1: Sada — Keep It Simple",
        subtitle: "The 1-Minute Rule using S.O.S.",
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
    title: "Be Specific: Interview Steps 3 & 4",
    subtitle: "Kya Hasil Hua? (Show Results) & Kyun? (Explain Why)",
    cards: [
      {
        title: "Step 3: Kya Hasil Hua? — Show Results",
        subtitle: "Support your story with honest evidence",
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
    title: "Be Specific: Vague vs. Specific",
    subtitle: "The difference between an average answer and an unforgettable one",
    comparison: {
      vague: {
        title: "Vague Answer (Avoid)",
        text: "“The project went well, and everyone was happy.”",
        note: "What improved? By how much? What did you personally do? Zero measurable impact.",
      },
      specific: {
        title: "Specific Answer (Target)",
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
    title: "Connect Your Story to the QBQs",
    subtitle: "Map every story to one specific evaluation category",
    cards: [
      {
        title: "Proving Skill",
        subtitle: "What skill does your story demonstrate?",
        points: [
          "Highlight your personal action (Step 2: Amal).",
          "Back it up with verifiable numbers (Step 3: Kya Hasil Hua).",
          "Demonstrate technical or operational capability.",
        ],
      },
      {
        title: "Proving Passion",
        subtitle: "What draws you to this organization?",
        points: [
          "Reference independent research you did before the interview.",
          "Mention relevant site visits, personal projects, or articles.",
          "Demonstrate a sincere stake in their mission.",
        ],
      },
      {
        title: "Proving Fit",
        subtitle: "How would you work in this culture?",
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
    title: "5 Types of Interview Questions",
    subtitle: "Recognize the format and apply the right framework",
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
    title: "Problem Solving Under Pressure",
    subtitle: "What to do when you don't know the answer",
    cards: [
      {
        title: "The Power Pause",
        points: [
          "“That's a great question. To be honest, I'm not entirely sure.”",
          "“If I understand correctly, you are asking about X. May I take a minute to structure my thoughts?”",
          "Gives you time to think and demonstrates composure under pressure.",
        ],
      },
      {
        title: "The 6-Step Defense",
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
    title: "Salary Negotiation and Leaving Professionally",
    subtitle: "Navigating critical career conversations with clarity and tact",
    cards: [
      {
        title: "Salary Negotiation",
        points: [
          "Ground your request in verified market research.",
          "Evaluate the entire package: growth trajectory, mentorship, and benefits, not just base pay.",
          "Connect requested numbers to the measurable value you deliver.",
          "Aim for a constructive win-win while maintaining professionalism.",
        ],
      },
      {
        title: "Leaving Professionally",
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
    title: "Summary",
    subtitle: "The Thinklings Passenger Presentation Playbook",
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

const smoothSpring: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 28,
  mass: 0.8,
};

export default function MinimalistDeck() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("Active");
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync to server
  const sendSync = useCallback(async (newIndex: number) => {
    isUpdatingRef.current = true;
    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slide: newIndex }),
      });
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch {
      // Network retry
    } finally {
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 350);
    }
  }, []);

  // Poll for sync updates from other devices every 500ms
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(async () => {
      if (isUpdatingRef.current) return;
      try {
        const res = await fetch("/api/sync");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.slide === "number" && data.slide !== current && data.slide >= 0 && data.slide < SLIDES.length) {
            setCurrent(data.slide);
            setLastSyncedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
          }
        }
      } catch {
        // Fallback
      }
    }, 500);

    return () => clearInterval(interval);
  }, [current, isMounted]);

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

  const slide = SLIDES[current];

  if (!isMounted) {
    return (
      <div className="w-screen h-screen bg-[#09090b] flex items-center justify-center text-neutral-400 font-mono text-xs">
        Loading Presentation...
      </div>
    );
  }

  return (
    <main
      suppressHydrationWarning
      className="relative w-screen h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col justify-between overflow-hidden font-sans select-none"
    >
      {/* TOP STATUS BAR */}
      <header className="relative z-20 w-full px-6 md:px-12 pt-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            {isMobile ? <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> : <Laptop className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isMobile ? "Mobile Controller" : "Main Screen"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <span className="hidden md:inline text-[11px] font-mono text-neutral-500">
            Synced: {lastSyncedTime}
          </span>
        </div>

        {/* Slide Counter */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span>
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden hidden sm:block">
            <motion.div
              className="h-full bg-neutral-200"
              animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT STAGE */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={smoothSpring}
            className="flex flex-col gap-6"
          >
            {/* Tag & Title Header */}
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                {slide.tag}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-sm md:text-lg text-neutral-400 font-normal max-w-3xl">
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Optional Quote Header */}
            {slide.quote && (
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-sm md:text-base text-neutral-300 italic">
                {slide.quote}
              </div>
            )}

            {/* Main Cards Grid */}
            {slide.cards && (
              <div
                className={`grid gap-4 ${
                  slide.cards.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : slide.cards.length === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {slide.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/90 flex flex-col gap-2.5 transition-all"
                  >
                    <div className="text-base md:text-lg font-bold text-white tracking-tight">
                      {card.title}
                    </div>
                    {card.subtitle && (
                      <div className="text-xs text-neutral-400 font-medium leading-relaxed">
                        {card.subtitle}
                      </div>
                    )}
                    <ul className="space-y-2 mt-1">
                      {card.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs md:text-sm text-neutral-300 flex items-start gap-2 leading-relaxed">
                          <Check className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Comparison Grid (for Vague vs Specific) */}
            {slide.comparison && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-neutral-900/30 border border-red-950/40 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                    {slide.comparison.vague.title}
                  </div>
                  <div className="text-lg md:text-xl font-medium text-neutral-200">
                    {slide.comparison.vague.text}
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-neutral-800/60">
                    {slide.comparison.vague.note}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/70 border border-emerald-950/50 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    {slide.comparison.specific.title}
                  </div>
                  <div className="text-lg md:text-xl font-medium text-white">
                    {slide.comparison.specific.text}
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-neutral-800/60">
                    {slide.comparison.specific.note}
                  </div>
                </div>
              </div>
            )}

            {/* Callout Banner */}
            {slide.callout && (
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center gap-2 text-xs md:text-sm text-neutral-300">
                <span className="font-bold text-white uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  {slide.callout.label}:
                </span>
                <span className="text-neutral-400">{slide.callout.text}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROLLER BAR */}
      <footer className="relative z-20 w-full px-6 md:px-12 pb-6 flex items-center justify-between shrink-0">
        <div className="text-xs font-mono text-neutral-500 hidden md:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">→</kbd> to advance
        </div>

        {/* Navigation Buttons (Spans full width on mobile for easy thumb reach) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-center">
          <button
            suppressHydrationWarning
            onClick={prevSlide}
            disabled={current === 0}
            className="flex-1 md:flex-initial px-5 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-200 disabled:opacity-20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-mono text-neutral-400 md:hidden">
            {current + 1} / {SLIDES.length}
          </span>

          <button
            suppressHydrationWarning
            onClick={nextSlide}
            disabled={current === SLIDES.length - 1}
            className="flex-1 md:flex-initial px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold disabled:opacity-20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Fullscreen Button on PC */}
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
            className="hidden md:flex p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 transition"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs font-mono text-neutral-500 hidden md:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">F</kbd> for Fullscreen
        </div>
      </footer>
    </main>
  );
}