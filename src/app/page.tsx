/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { 
  Compass, 
  Sparkles, 
  Rocket, 
  Users2, 
  Target, 
  HeartHandshake,
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Flame,
  Radio,
  Smartphone,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Briefcase
} from "lucide-react";

// Safe Web Audio API Train Sound Engine
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

  public blowHorn() {
    if (this.isMuted || typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [311.13, 369.99, 466.16, 622.25];
      chords.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq + (idx % 2 === 0 ? 1.5 : -1.5), now);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
        gain.gain.setValueAtTime(0.08, now + 0.9);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.9);
      });
    } catch {
      // Safe skip
    }
  }

  public releaseSteam() {
    if (this.isMuted || typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.7);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(900, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch {
      // Safe skip
    }
  }
}

interface SlideData {
  id: string;
  isEngine?: boolean;
  carLabel: string;
  stationTag: string;
  title: string;
  subtitle: string;
  quote?: string;
  bullets?: string[];
  cards?: { title: string; subtitle?: string; content: string[] }[];
  bottomBanner?: { highlight: string; text: string };
  image: string;
  accent: string;
  accentHex: string;
  icon: React.ElementType;
}

const PRESENTATION_SLIDES: SlideData[] = [
  {
    id: "slide-1",
    isEngine: true,
    carLabel: "LOCOMOTIVE • LEAD ENGINE",
    stationTag: "Station 00: Depots of Departure",
    title: "PASSENGER",
    subtitle: "Storytelling & Specific • By The Thinklings",
    quote: "“An interview is not a memory test. It reveals how you think, communicate, and stay calm under pressure.”",
    bullets: [
      "Passionate & Specific: The twin engines to engage any interview panel",
      "Moving beyond generic answers to memorable evidence-backed stories",
      "Authenticity First: Zero fabricated claims"
    ],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-400 to-red-600",
    accentHex: "#f59e0b",
    icon: Flame,
    bottomBanner: {
      highlight: "The Passenger Philosophy:",
      text: "Never say 'I am a team player' — Tell a story that proves it beyond a shadow of a doubt."
    }
  },
  {
    id: "slide-2",
    carLabel: "CAR 01 • THE FOUNDATION",
    stationTag: "Station 01: Core Architecture",
    title: "The 3 Interview Questions (QBQs)",
    subtitle: "Identify the Question Behind the Question",
    cards: [
      {
        title: "01 | Skill",
        subtitle: "What skills do you have?",
        content: ["Proved through past personal actions", "Backed by measurable results, not adjectives"]
      },
      {
        title: "02 | Passion",
        subtitle: "How passionate are you?",
        content: ["Shown by independent research", "Proven through relevant visits & extra projects"]
      },
      {
        title: "03 | Fit & Adaptability",
        subtitle: "Will you thrive in our culture?",
        content: ["Emotional agility under stress", "Demonstrated team flexibility"]
      }
    ],
    bottomBanner: {
      highlight: "To Stand Out Against Better Degrees & Experience:",
      text: "Before speaking, ask: Which QBQ am I addressing? Choose the story that proves that exact quality."
    },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    accent: "from-emerald-500 to-teal-600",
    accentHex: "#10b981",
    icon: Compass
  },
  {
    id: "slide-3",
    carLabel: "CAR 02 • THE STORYTELLING ENGINES",
    stationTag: "Station 02: Structuring Your Thoughts",
    title: "Be Specific: Steps 1 & 2 (Sada & Amal)",
    subtitle: "CARL, SOS & The 1-Minute Rule",
    cards: [
      {
        title: "Step 1: Sada — Keep It Simple",
        subtitle: "1-Minute Rule (S.O.S)",
        content: [
          "Situation: Give brief context in 15 seconds",
          "Obstacle: Define the specific roadblock faced",
          "Solution: Explain your direct intervention",
          "The shorter and more precise, the better"
        ]
      },
      {
        title: "Step 2: Amal — Focus on Action",
        subtitle: "CARL: Context ➔ Action ➔ Result ➔ Learning",
        content: [
          "What YOU personally executed (not just the team)",
          "How you navigated the conflict or obstacle",
          "Past actions allow interviewers to predict future performance"
        ]
      }
    ],
    bottomBanner: {
      highlight: "The Weakness Rule:",
      text: "Spend only 10% of your time admitting the weakness, and 90% demonstrating the active steps you take to improve it."
    },
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    accent: "from-blue-500 to-indigo-600",
    accentHex: "#3b82f6",
    icon: Rocket
  },
  {
    id: "slide-4",
    carLabel: "CAR 03 • EVIDENCE & PURPOSE",
    stationTag: "Station 03: The Deeper Why",
    title: "Be Specific: Steps 3 & 4 (Results & Why)",
    subtitle: "Kya Hasil Hua? & Kyun Kyun Kyun",
    cards: [
      {
        title: "Step 3: Kya Hasil Hua?",
        subtitle: "Show Honest, Measurable Evidence",
        content: [
          "Percentage increase in output or cost reduction",
          "Waste eliminated & hours saved",
          "Team size guided and milestones met",
          "Concrete metrics make claims impossible to dismiss"
        ]
      },
      {
        title: "Step 4: Kyun? (The Deeper Why)",
        subtitle: "Connect the Experience to Your Character",
        content: [
          "What does this achievement reveal about your drive?",
          "Which underlying core competency does it validate?",
          "Does it definitively prove Skill, Passion, or Fit?"
        ]
      }
    ],
    bottomBanner: {
      highlight: "The Amal Standard:",
      text: "Evidence speaks louder than ambition. Replace vague enthusiasm with quantified results."
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    accent: "from-violet-500 to-purple-600",
    accentHex: "#8b5cf6",
    icon: Target
  },
  {
    id: "slide-5",
    carLabel: "CAR 04 • THE CONTRAST",
    stationTag: "Station 04: The Precision Test",
    title: "Vague vs. Specific",
    subtitle: "Transforming Fluff into Hard Impact",
    cards: [
      {
        title: "❌ The Vague Response",
        subtitle: "“The project went well, and everyone was happy.”",
        content: [
          "What improved?",
          "By what measure?",
          "What was your personal contribution?",
          "Leaves the interviewer unimpressed and guessing"
        ]
      },
      {
        title: "✅ The Specific Response",
        subtitle: "“I reduced overhead costs by 15% by removing redundant software.”",
        content: [
          "Clear, proactive personal ownership (Amal)",
          "Concrete, measurable metric (Kya Hasil Hua)",
          "Demonstrates immediate business value"
        ]
      }
    ],
    bottomBanner: {
      highlight: "The Formula:",
      text: "Story = [Sada Context (~1 min)] + [Amal Action (You)] + [Kya Hasil Hua (%/Numbers)] + [Kyun (Skill proved)]"
    },
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    accent: "from-rose-500 to-pink-600",
    accentHex: "#f43f5e",
    icon: Sparkles
  },
  {
    id: "slide-6",
    carLabel: "CAR 05 • TAXONOMY OF QUESTIONS",
    stationTag: "Station 05: The 5 Interview Formats",
    title: "5 Types of Interview Questions",
    subtitle: "From Behavioral to Estimations",
    cards: [
      {
        title: "01 | Traditional",
        content: ["'Tell me about yourself' — Anchor around current focus and career why."]
      },
      {
        title: "02 | Behavioral",
        content: ["Past experience tested via SOS (Situation, Obstacle, Solution)."]
      },
      {
        title: "03 | Situational",
        content: ["Hypothetical dilemmas testing your real-time moral judgment."]
      },
      {
        title: "04 | Estimation",
        content: ["Proxies, averages of two extremes, and logical breakdown."]
      },
      {
        title: "05 | Case Study",
        content: ["Isolate the root problem, analyze trade-offs, and recommend action."]
      }
    ],
    bottomBanner: {
      highlight: "Estimation Masterclass (From Notebook):",
      text: "Use a known proxy (e.g. population × average households) or take the average of two reasonable extremes."
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-500 to-orange-600",
    accentHex: "#f59e0b",
    icon: Briefcase
  },
  {
    id: "slide-7",
    carLabel: "CAR 06 • THE CRUCIBLE",
    stationTag: "Station 06: Handling the Unknown",
    title: "When You Don't Know the Answer",
    subtitle: "Calm Is Your Greatest Strength",
    cards: [
      {
        title: "1. The Power Pause",
        content: [
          "“That is a great question. To be honest, I am not entirely sure.”",
          "“So if I understand correctly, you are asking about X. May I take a minute to structure my thoughts?”",
          "Earns instant bonus points for composure and precision."
        ]
      },
      {
        title: "2. The 6-Step Problem-Solving Method",
        content: [
          "1. Be honest: No random guessing",
          "2. Summarize your thinking: Exposes your structured logic",
          "3. State trade-offs: Highlight pros & cons of available options",
          "4. Identify missing info: Name what data you would gather",
          "5. Directional recommendation: Offer a reasoned lean",
          "6. End confident: Never be overly apologetic"
        ]
      }
    ],
    bottomBanner: {
      highlight: "Crucial Mindset:",
      text: "Interviewers care more about HOW your mind processes complexity than whether you memorized an immediate answer."
    },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    accent: "from-cyan-400 to-blue-600",
    accentHex: "#06b6d4",
    icon: HelpCircle
  },
  {
    id: "slide-8",
    carLabel: "CAR 07 • PROFESSIONAL MASTERY",
    stationTag: "Station 07: Negotiation & Graceful Exits",
    title: "Salary Negotiation & Leaving Professionally",
    subtitle: "Safeguarding Relationships & Value",
    cards: [
      {
        title: "Salary Negotiation",
        content: [
          "Back confidence with verified market compensation data",
          "Weigh the full horizon: benefits, growth trajectory, and responsibilities—not just base salary",
          "Clearly link your requested compensation to the measurable value you deliver",
          "Seek a win-win while keeping dialogue collaborative and respectful"
        ]
      },
      {
        title: "Leaving Professionally",
        content: [
          "Resign respectfully with appropriate written notice",
          "Fulfill pending responsibilities and document clear handovers",
          "Express genuine gratitude for opportunities received",
          "Protect your professional reputation: Keep all future doors open"
        ]
      }
    ],
    bottomBanner: {
      highlight: "Final Thought:",
      text: "Your career is a long railway line. Professionalism, gratitude, and clean exits protect your long-term reputation."
    },
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    accent: "from-emerald-400 to-teal-500",
    accentHex: "#10b981",
    icon: HeartHandshake
  },
  {
    id: "slide-9",
    carLabel: "CAR 08 • THE HORIZON",
    stationTag: "Final Station: The Complete Playbook",
    title: "Executive Summary",
    subtitle: "The Thinklings Passenger Handbook",
    cards: [
      {
        title: "The 3 QBQs",
        content: ["Always know if you are proving Skill, Passion, or Adaptability/Fit before speaking."]
      },
      {
        title: "The 4-Step Architecture",
        content: ["Sada (SOS in 1 min) ➔ Amal (Your personal contribution) ➔ Kya Hasil Hua (Metrics) ➔ Kyun (Why)."]
      },
      {
        title: "The 90/10 Rule for Weakness",
        content: ["Spend 10% naming it, and 90% detailing the active steps you take to master it."]
      },
      {
        title: "Under Pressure",
        content: ["Pause, structure trade-offs, identify missing information, and let calm be your differentiator."]
      }
    ],
    bottomBanner: {
      highlight: "Destination Reached:",
      text: "You are no longer just an interview passenger—you are in full command of the journey."
    },
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-400 to-orange-500",
    accentHex: "#f59e0b",
    icon: CheckCircle2
  }
];

const trainSpring: Transition = {
  type: "spring",
  stiffness: 85,
  damping: 18,
  mass: 1.25,
};

export default function PassengerSeriesDeck() {
  const [boarded, setBoarded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [roomCode, setRoomCode] = useState("AMAL");
  const [isSyncing, setIsSyncing] = useState(false);
  const audioRef = useRef<TrainAudioEngine | null>(null);

  // Initialize Audio
  const getAudio = useCallback(() => {
    if (!audioRef.current) audioRef.current = new TrainAudioEngine();
    audioRef.current.isMuted = isMuted;
    return audioRef.current;
  }, [isMuted]);

  const soundHorn = useCallback(() => {
    getAudio().blowHorn();
  }, [getAudio]);

  // Realtime Multi-Device Sync over Server-Sent Events (ntfy pub/sub)
  const syncChannel = `amal-passenger-${roomCode.trim().toLowerCase()}`;

  const broadcastSlideChange = useCallback((newIndex: number) => {
    try {
      fetch(`https://ntfy.sh/${syncChannel}`, {
        method: "POST",
        body: JSON.stringify({ slide: newIndex }),
        headers: { "Content-Type": "application/json" }
      }).catch(() => {});
    } catch {
      // Fallback
    }
  }, [syncChannel]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`https://ntfy.sh/${syncChannel}/sse`);
      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && typeof payload.slide === "number") {
            setCurrent(payload.slide);
            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 800);
          }
        } catch {
          // ignore parsing error
        }
      };
    } catch {
      // SSE fallback
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [syncChannel]);

  const nextCar = useCallback(() => {
    setCurrent((prev) => {
      const nextIdx = prev < PRESENTATION_SLIDES.length - 1 ? prev + 1 : prev;
      getAudio().releaseSteam();
      broadcastSlideChange(nextIdx);
      return nextIdx;
    });
  }, [getAudio, broadcastSlideChange]);

  const prevCar = useCallback(() => {
    setCurrent((prev) => {
      if (prev > 0) {
        const prevIdx = prev - 1;
        getAudio().releaseSteam();
        broadcastSlideChange(prevIdx);
        return prevIdx;
      }
      return prev;
    });
  }, [getAudio, broadcastSlideChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!boarded) {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          setBoarded(true);
          getAudio().blowHorn();
        }
        return;
      }

      if (["ArrowRight", "Space", "Enter"].includes(e.code)) {
        e.preventDefault();
        nextCar();
      } else if (["ArrowLeft", "Backspace"].includes(e.code)) {
        e.preventDefault();
        prevCar();
      } else if (e.key.toLowerCase() === "h") {
        soundHorn();
      } else if (e.key.toLowerCase() === "m") {
        setIsMuted((prev) => !prev);
      } else if (e.key.toLowerCase() === "f") {
        if (typeof document !== "undefined") {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      } else if (e.key.toLowerCase() === "t") {
        setIsLightMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [boarded, nextCar, prevCar, soundHorn, getAudio]);

  const activeCar = PRESENTATION_SLIDES[current];

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between transition-colors duration-700 select-none ${
        isLightMode ? "bg-[#f8fafc] text-neutral-900" : "bg-[#09090b] text-neutral-100"
      }`}
    >
      {/* 1. INTRO / BOARDING GATE */}
      <AnimatePresence>
        {!boarded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 md:p-8 bg-neutral-950 text-white backdrop-blur-2xl"
          >
            <div className="absolute w-[600px] h-[600px] rounded-full blur-[160px] bg-amber-500/20 pointer-events-none" />

            <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-6">
              <div className="p-3 md:p-4 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex items-center gap-3">
                <Flame className="w-6 h-6 md:w-8 md:h-8 text-amber-500 animate-pulse" />
                <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-300 uppercase">
                  PASSENGER SERIES • THE THINKLINGS
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                  PASSENGER
                </h1>
                <p className="text-lg md:text-2xl text-amber-400 font-medium">
                  Storytelling & Specific
                </p>
                <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto">
                  Mastering the 3 QBQs, CARL & SOS Models, 6-Step Problem Solving, and Salary Negotiation.
                </p>
              </div>

              {/* Room Code for Mobile Remote Controller */}
              <div className="flex flex-col items-center gap-2 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>SYNC CODE (PHONE & PC):</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="bg-neutral-800 border border-neutral-700 text-center text-xl font-mono font-bold tracking-widest text-amber-400 rounded-lg py-1 px-4 w-36 uppercase outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-neutral-500">
                  Open this URL on your phone with code <b>{roomCode}</b> to use it as a remote!
                </span>
              </div>

              <button
                onClick={() => {
                  setBoarded(true);
                  getAudio().blowHorn();
                }}
                className="group relative px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>BOARD THE TRAIN (START)</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Ambient Background Glow */}
      <motion.div
        animate={{ backgroundColor: activeCar.accentHex }}
        transition={{ duration: 0.9 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full blur-[180px] opacity-25 pointer-events-none"
      />

      {/* TOP HEADER: Railroad Dispatch Line */}
      <header className="relative z-30 w-full px-4 md:px-16 pt-4 md:pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={soundHorn}
            title="Blow Horn (H)"
            className="p-2 md:p-2.5 rounded-2xl bg-neutral-900/60 border border-neutral-700/60 hover:bg-neutral-800 backdrop-blur-md flex items-center gap-2 text-amber-400 text-xs font-mono transition-transform active:scale-90"
          >
            <Radio className="w-4 h-4 animate-ping" />
            <span className="hidden sm:inline font-bold">HORN [H]</span>
          </button>
          
          <div className="border-l border-neutral-700/50 pl-3">
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-50 flex items-center gap-2">
              <span>DISPATCH • {roomCode}</span>
              {isSyncing && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </div>
            <div className="text-xs md:text-sm font-bold tracking-tight">
              {activeCar.stationTag}
            </div>
          </div>
        </div>

        {/* Station Dots / Navigation */}
        <div className="flex items-center gap-1 bg-neutral-900/60 p-1 md:p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-xl max-w-[50vw] overflow-x-auto">
          {PRESENTATION_SLIDES.map((car, idx) => {
            const isCurrent = idx === current;
            return (
              <button
                key={car.id}
                onClick={() => {
                  setCurrent(idx);
                  getAudio().releaseSteam();
                  broadcastSlideChange(idx);
                }}
                className={`relative px-2.5 md:px-3.5 py-1 text-xs font-mono transition-all duration-300 ${
                  isCurrent ? "text-white font-bold" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="active-train-station-glow"
                    transition={trainSpring}
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${car.accent} shadow-lg`}
                  />
                )}
                <span className="relative z-10">
                  {car.isEngine ? "ENG" : `0${idx}`}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* CENTER STAGE: FULL SCREEN MOVING TRAIN */}
      <div className="relative w-full overflow-hidden z-20 my-auto py-2">
        <motion.div
          animate={{
            x: `calc(5vw - ${current} * (90vw + 40px))`,
          }}
          transition={trainSpring}
          className="flex items-center"
        >
          {PRESENTATION_SLIDES.map((car, idx) => {
            const isActive = idx === current;
            const Icon = car.icon;

            return (
              <React.Fragment key={car.id}>
                {/* 90vw FULL SCREEN CARRIAGE */}
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.35,
                    y: isActive ? 0 : 16,
                  }}
                  transition={trainSpring}
                  style={{ width: "90vw" }}
                  className={`relative shrink-0 rounded-[32px] md:rounded-[40px] border p-6 md:p-10 backdrop-blur-2xl transition-shadow duration-500 max-h-[76vh] overflow-y-auto ${
                    isLightMode
                      ? "bg-white/95 border-neutral-200 shadow-2xl shadow-neutral-300/60"
                      : "bg-[#111116]/95 border-neutral-800 shadow-2xl shadow-black/90"
                  }`}
                >
                  {/* ENGINE HEADLIGHT & STEAM */}
                  {car.isEngine && (
                    <>
                      <div className="absolute top-1/2 -left-48 -translate-y-1/2 w-64 h-48 pointer-events-none hidden md:block overflow-visible">
                        <div className="w-full h-full bg-gradient-to-l from-amber-400/50 via-amber-200/20 to-transparent blur-2xl" />
                      </div>

                      <div className="absolute -top-12 left-16 md:left-24 flex-col items-center pointer-events-none hidden sm:flex">
                        <div className="w-8 h-10 bg-neutral-800 rounded-t-lg border border-neutral-600 border-b-0 shadow-lg" />
                        {[...Array(3)].map((_, pIdx) => (
                          <motion.div
                            key={pIdx}
                            animate={{
                              y: [-8, -65],
                              x: [0, -30 - pIdx * 10],
                              scale: [0.6, 2.2],
                              opacity: [0.7, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: pIdx * 0.5,
                              ease: "easeOut",
                            }}
                            className="absolute -top-3 w-5 h-5 rounded-full bg-neutral-400/40 blur-sm"
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* CARRIAGE TOP BAR */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-700/30 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${car.accent} text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-mono font-bold tracking-wider text-neutral-400">
                          {car.carLabel}
                        </div>
                        <div className="text-[11px] text-neutral-500 font-mono hidden sm:block">
                          PASSENGER SERIES • THE THINKLINGS
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-neutral-800/50 text-neutral-300">
                      CAR 0{idx + 1}
                    </span>
                  </div>

                  {/* HEADINGS */}
                  <div className="mb-6">
                    <h1 className={`text-2xl md:text-5xl font-black tracking-tight ${
                      isLightMode ? "text-neutral-900" : "text-white"
                    }`}>
                      {car.title}
                    </h1>
                    <p className="text-sm md:text-xl font-medium text-neutral-400 mt-1">
                      {car.subtitle}
                    </p>
                  </div>

                  {/* QUOTE BLOCK IF PRESENT */}
                  {car.quote && (
                    <div className={`p-4 md:p-5 rounded-2xl border text-sm md:text-base italic mb-6 ${
                      isLightMode
                        ? "bg-neutral-50 border-neutral-200 text-neutral-700"
                        : "bg-neutral-900/60 border-neutral-800 text-neutral-300"
                    }`}>
                      {car.quote}
                    </div>
                  )}

                  {/* BULLET POINTS (IF PRESENT) */}
                  {car.bullets && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {car.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm text-neutral-300">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CARDS GRID */}
                  {car.cards && (
                    <div className={`grid gap-4 mb-6 ${
                      car.cards.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                      car.cards.length === 3 ? "grid-cols-1 md:grid-cols-3" :
                      car.cards.length === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
                      "grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
                    }`}>
                      {car.cards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-4 md:p-5 rounded-2xl border transition-all ${
                            isLightMode
                              ? "bg-white border-neutral-200 shadow-sm"
                              : "bg-neutral-900/80 border-neutral-800/90"
                          }`}
                        >
                          <div className={`text-base md:text-lg font-bold bg-gradient-to-r ${car.accent} bg-clip-text text-transparent`}>
                            {card.title}
                          </div>
                          {card.subtitle && (
                            <div className="text-xs font-medium text-neutral-400 mt-0.5 mb-2">
                              {card.subtitle}
                            </div>
                          )}
                          <ul className="space-y-1.5 mt-2">
                            {card.content.map((pt, pIdx) => (
                              <li key={pIdx} className="text-xs md:text-sm text-neutral-300 leading-snug flex items-start gap-2">
                                <span className="text-amber-400 shrink-0 mt-1">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* BOTTOM KEY TAKEAWAY BANNER */}
                  {car.bottomBanner && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center gap-2 text-xs md:text-sm text-neutral-200">
                      <span className="font-bold text-amber-400 uppercase tracking-wider shrink-0">
                        {car.bottomBanner.highlight}
                      </span>
                      <span>{car.bottomBanner.text}</span>
                    </div>
                  )}

                  {/* WHEELS */}
                  <div className="absolute -bottom-5 left-16 right-16 flex justify-between pointer-events-none hidden sm:flex">
                    <div className="flex items-center gap-3 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-700 shadow-lg">
                      <motion.div animate={{ rotate: current * 360 }} transition={trainSpring} className="w-5 h-5 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" />
                      <motion.div animate={{ rotate: current * 360 }} transition={trainSpring} className="w-5 h-5 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" />
                    </div>
                    <div className="flex items-center gap-3 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-700 shadow-lg">
                      <motion.div animate={{ rotate: current * 360 }} transition={trainSpring} className="w-5 h-5 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" />
                      <motion.div animate={{ rotate: current * 360 }} transition={trainSpring} className="w-5 h-5 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" />
                    </div>
                  </div>
                </motion.div>

                {/* GANGWAY BELLOWS */}
                {idx < PRESENTATION_SLIDES.length - 1 && (
                  <div style={{ width: "40px" }} className="shrink-0 flex flex-col justify-center items-center px-1">
                    <div className="w-full h-40 rounded bg-neutral-900 border-y border-neutral-700 flex justify-between p-1">
                      {[...Array(4)].map((_, bIdx) => (
                        <div key={bIdx} className="h-full w-0.5 bg-neutral-800" />
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>

      {/* RAILROAD TRACK */}
      <div className="relative w-full h-8 pointer-events-none overflow-hidden flex flex-col justify-end">
        <div className="w-full h-1 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-600 shadow-sm" />
        <motion.div
          animate={{ x: -((current * 80) % 40) }}
          transition={trainSpring}
          className="w-[200vw] -ml-[50vw] flex justify-between pt-0.5 opacity-60"
        >
          {[...Array(80)].map((_, tIdx) => (
            <div key={tIdx} className="w-2 h-4 bg-neutral-800 rounded-sm border-t border-neutral-500" />
          ))}
        </motion.div>
      </div>

      {/* BOTTOM CONTROLLER BAR (RESPONSIVE FOR MOBILE & PC) */}
      <footer className="relative z-30 w-full px-4 md:px-16 pb-4 md:pb-6 flex items-center justify-between">
        <div className="text-xs font-mono text-neutral-500 hidden md:block">
          Remote Room: <b className="text-amber-400">{roomCode}</b> • Space / Arrows to drive
        </div>

        {/* Central Controller Capsule */}
        <div className={`flex items-center gap-3 md:gap-5 px-5 md:px-7 py-2 md:py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all mx-auto md:mx-0 ${
          isLightMode
            ? "bg-white/95 border-neutral-300 text-neutral-800"
            : "bg-neutral-900/95 border-neutral-800 text-neutral-200"
        }`}>
          <button
            onClick={prevCar}
            disabled={current === 0}
            title="Previous (Left Arrow)"
            className="p-2 rounded-full hover:bg-neutral-500/10 disabled:opacity-20 active:scale-90 transition"
          >
            <ChevronLeft className="w-6 h-6 md:w-5 md:h-5" />
          </button>

          <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-neutral-400">
            {activeCar.isEngine ? "LOCOMOTIVE" : `CAR 0${current} / 0${PRESENTATION_SLIDES.length - 1}`}
          </span>

          <button
            onClick={nextCar}
            disabled={current === PRESENTATION_SLIDES.length - 1}
            title="Next (Right Arrow / Space)"
            className="p-2 rounded-full hover:bg-neutral-500/10 disabled:opacity-20 active:scale-90 transition"
          >
            <ChevronRight className="w-6 h-6 md:w-5 md:h-5" />
          </button>

          <div className="h-4 w-[1px] bg-neutral-700 mx-0.5" />

          {/* Mute Audio */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            title="Mute Audio (M)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Theme */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            title="Theme (T)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-neutral-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => {
              if (typeof document !== "undefined") {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }
            }}
            title="Fullscreen (F)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            <Maximize2 className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        <div className="text-xs font-mono text-neutral-500 hidden md:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">F</kbd> for Fullscreen
        </div>
      </footer>
    </main>
  );
}