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
  Laptop,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Wifi
} from "lucide-react";

// Safe Web Audio API Train Sound Synthesizer
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
  subtitle?: string;
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
    stationTag: "Station 00: Platform of Departure",
    title: "PASSENGER",
    subtitle: "Storytelling & Specific",
    quote: "By The Thinklings",
    bullets: [
      "Passionate & Specific: Engage your audience and interview panels with authentic conviction",
      "No Lie: True confidence comes from real stories, not fabricated claims",
      "Say Stories: Never just say 'I like teamwork' — prove it with an unforgettable narrative"
    ],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-400 to-red-600",
    accentHex: "#f59e0b",
    icon: Flame,
    bottomBanner: {
      highlight: "The Passenger Philosophy:",
      text: "An interview shows how you think, communicate, and behave under pressure, not just what you know."
    }
  },
  {
    id: "slide-2",
    carLabel: "CAR 01 • THE 3 QBQs",
    stationTag: "Station 01: Core Architecture",
    title: "The 3 interview questions (QBQs)",
    subtitle: "Identify the Question Behind the Question (Have to be Specific & No Lie)",
    cards: [
      {
        title: "01 | Skill",
        subtitle: "What Skills do you have?",
        content: [
          "Proved through your direct actions (Step 2)",
          "Supported by concrete, measurable results (Step 3)",
          "CARL Model: Context ➔ Action ➔ Result ➔ Learning"
        ]
      },
      {
        title: "02 | Passion",
        subtitle: "How passionate you are about job and organization?",
        content: [
          "Demonstrated through thorough research done in advance",
          "Highlighted by relevant site visits, projects, and initiatives",
          "Genuine curiosity for the industry's future"
        ]
      },
      {
        title: "03 | Situational",
        subtitle: "Are you fit for the organization?",
        content: [
          "How would you thrive in this specific company culture?",
          "Demonstrating your flexibility and team adaptability",
          "Staying calm when navigating interpersonal conflict"
        ]
      }
    ],
    bottomBanner: {
      highlight: "To stand out against better skills, experience & education:",
      text: "How do you make your interview more impactful and memorable? Before answering, identify the QBQ—then choose the story that proves your point."
    },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    accent: "from-emerald-500 to-teal-600",
    accentHex: "#10b981",
    icon: Compass
  },
  {
    id: "slide-3",
    carLabel: "CAR 02 • SADA & AMAL",
    stationTag: "Station 02: Structuring Your Thoughts",
    title: "Be Specific: Interview Steps 1 & 2",
    subtitle: "Sada (Keep It Simple) & Amal (Focus on Action)",
    cards: [
      {
        title: "Step 1: Sada — Keep It Simple",
        subtitle: "Use S.O.S. to tell your story in about one minute",
        content: [
          "S — Situation: Give brief context in 15 seconds",
          "O — Obstacle: Name the specific challenge or bottleneck",
          "S — Solution: Explain your straightforward solution",
          "The shorter and more precise the story, the better"
        ]
      },
      {
        title: "Step 2: Amal — Focus on Action",
        subtitle: "Make your contribution clear",
        content: [
          "What you personally executed (not just what the team did)",
          "How you handled the obstacle with composure",
          "The distinct value you contributed to the outcome",
          "Your past actions help interviewers predict future performance"
        ]
      }
    ],
    bottomBanner: {
      highlight: "The Weakness Rule (From Notebook):",
      text: "Mention weakness briefly (10% of time). Spend 90% of your time explaining what you have actively done to improve it."
    },
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    accent: "from-blue-500 to-indigo-600",
    accentHex: "#3b82f6",
    icon: Rocket
  },
  {
    id: "slide-4",
    carLabel: "CAR 03 • RESULTS & WHY",
    stationTag: "Station 03: The Deeper Why",
    title: "Be Specific: Interview Steps 3 & 4",
    subtitle: "Kya Hasil Hua? (Show Results) & Kyun? (Explain Why)",
    cards: [
      {
        title: "Step 3: Kya Hasil Hua? — Show Results",
        subtitle: "Support your story with honest evidence",
        content: [
          "Percentage increase or reduction achieved",
          "Costs saved or waste eliminated",
          "Team size guided and project hours invested",
          "Specific numbers make your contribution easier to assess"
        ]
      },
      {
        title: "Step 4: Kyun? — Explain Why",
        subtitle: "The Deeper Why (Kyun, Kyun, Kyun)",
        content: [
          "Explain what the experience demonstrates about you",
          "What does it reveal about your character and work ethic?",
          "Which concrete skill does it validate?",
          "Does it definitively prove Skill, Passion, or Fit?"
        ]
      }
    ],
    bottomBanner: {
      highlight: "Evidence Anchor:",
      text: "Replace vague enthusiasm with quantified results. Specific numbers turn opinions into unshakeable evidence."
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
    title: "Be Specific: Vague vs. Specific",
    subtitle: "Transforming Fluff into Measurable Impact",
    cards: [
      {
        title: "Vague (❌ Avoid)",
        subtitle: "“The project went well, and everyone was happy.”",
        content: [
          "What improved?",
          "By how much?",
          "What was your personal role in the outcome?",
          "The impact is completely unclear and easily forgotten."
        ]
      },
      {
        title: "Specific (✅ Target)",
        subtitle: "“I reduced costs by 15% by eliminating unnecessary expenses.”",
        content: [
          "Clear personal ownership and action (Amal)",
          "Concrete, measurable metric (15% reduction)",
          "Illustrative example: Action + Measurable Result."
        ]
      }
    ],
    bottomBanner: {
      highlight: "Key Formulation:",
      text: "Specific Action + Quantifiable Evidence = An answer that outshines candidates with better degrees."
    },
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    accent: "from-rose-500 to-pink-600",
    accentHex: "#f43f5e",
    icon: Sparkles
  },
  {
    id: "slide-6",
    carLabel: "CAR 05 • STRATEGIC ALIGNMENT",
    stationTag: "Station 05: Target Mapping",
    title: "Connect Your Story to the QBQs",
    subtitle: "Skill, Passion, and Fit Mapped to Real Stories",
    cards: [
      {
        title: "Skill",
        subtitle: "What skill does your story demonstrate?",
        content: [
          "Show your action clearly (Step 2)",
          "Support it with honest results (Step 3)",
          "Prove capability through concrete evidence"
        ]
      },
      {
        title: "Passion",
        subtitle: "What draws you to this organization?",
        content: [
          "Research you have conducted independently",
          "Relevant site visits, initiatives, or self-directed projects",
          "Your authentic interest in this specific industry"
        ]
      },
      {
        title: "Fit",
        subtitle: "How would you work in this culture?",
        content: [
          "Demonstrate your flexibility during unexpected shifts",
          "Share how you adapted to a diverse team environment",
          "Prove mutual values and shared vision"
        ]
      }
    ],
    bottomBanner: {
      highlight: "Golden Rule:",
      text: "Before answering, identify the QBQ—then choose the story that proves your point."
    },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    accent: "from-cyan-400 to-blue-600",
    accentHex: "#06b6d4",
    icon: Users2
  },
  {
    id: "slide-7",
    carLabel: "CAR 06 • TAXONOMY OF QUESTIONS",
    stationTag: "Station 06: Question Archetypes",
    title: "5 Types of Interview Questions",
    subtitle: "Traditional, Behavioral, Situational, Estimation & Case Study",
    cards: [
      {
        title: "01 | Traditional",
        content: ["Who you are and why you want the role. “Tell me about yourself.”"]
      },
      {
        title: "02 | Behavioral",
        content: ["Past experience. Answer with SOS: Situation, Obstacle, Solution."]
      },
      {
        title: "03 | Situational",
        content: ["Your judgment in hypothetical workplace situations."]
      },
      {
        title: "04 | Estimation",
        content: [
          "Logical, number-based thinking on unfamiliar problems.",
          "Estimate via proxy (e.g. population × households).",
          "Average of two extremes."
        ]
      },
      {
        title: "05 | Case Study",
        content: ["Identify the problem, analyze causes, recommend solutions."]
      }
    ],
    bottomBanner: {
      highlight: "Don’t know the answer?",
      text: "Don’t panic. Summarize your thinking, explain trade-offs, name the missing information, and offer a logical recommendation. Calm is your greatest strength."
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-500 to-orange-600",
    accentHex: "#f59e0b",
    icon: Briefcase
  },
  {
    id: "slide-8",
    carLabel: "CAR 07 • PROFESSIONAL MASTERY",
    stationTag: "Station 07: Long-Term Reputations",
    title: "Salary Negotiation and Leaving Professionally",
    subtitle: "Navigating High-Stakes Conversations with Grace",
    cards: [
      {
        title: "Salary Negotiation",
        content: [
          "Back confidence with market research",
          "Weigh benefits and responsibilities, not just base pay",
          "Communicate the value you bring with past metrics",
          "Aim for a fair agreement while keeping the relationship professional"
        ]
      },
      {
        title: "Leaving Professionally",
        content: [
          "Resign respectfully with appropriate written notice",
          "Fulfill your responsibilities and document handovers",
          "Express gratitude for the opportunities provided",
          "Protect your reputation and keep future doors open"
        ]
      }
    ],
    bottomBanner: {
      highlight: "Core Takeaway:",
      text: "An interview shows how you think, communicate, and behave under pressure, not just what you know."
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
    title: "Summary",
    subtitle: "The Complete Passenger Playbook (The Thinklings)",
    cards: [
      {
        title: "1. The 3 QBQs",
        content: ["Identify if the question seeks Skill, Passion, or Culture Fit before selecting your story."]
      },
      {
        title: "2. The 4 Steps",
        content: ["Sada (SOS under 1 min) ➔ Amal (Personal action) ➔ Kya Hasil Hua (Metrics) ➔ Kyun (Deeper purpose)."]
      },
      {
        title: "3. Precision & Weakness",
        content: ["Eliminate vague fluff with numbers. Spend only 10% on your weakness and 90% on your improvement plan."]
      },
      {
        title: "4. Poise Under Pressure",
        content: ["When stumped: pause, clarify, outline trade-offs, and remember that calm is your superpower."]
      }
    ],
    bottomBanner: {
      highlight: "Destination Reached:",
      text: "Equipped with structure, empathy, and evidence, you board every interview not as a passenger, but as a driver."
    },
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-400 to-orange-500",
    accentHex: "#f59e0b",
    icon: CheckCircle2
  }
];

const trainSpring: Transition = {
  type: "spring" as const,
  stiffness: 85,
  damping: 18,
  mass: 1.25,
};

export default function PassengerDeck() {
  const [isMounted, setIsMounted] = useState(false);
  const [boarded, setBoarded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [roomCode, setRoomCode] = useState("THINK");
  const [isMobile, setIsMobile] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>("Connecting...");
  const [lastSyncEvent, setLastSyncEvent] = useState<string | null>(null);

  const audioRef = useRef<TrainAudioEngine | null>(null);
  const bcRef = useRef<BroadcastChannel | null>(null);
  const isLocalChange = useRef(false);

  // Mount detection (Fixes Hydration mismatch)
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) audioRef.current = new TrainAudioEngine();
    audioRef.current.isMuted = isMuted;
    return audioRef.current;
  }, [isMuted]);

  const soundHorn = useCallback(() => {
    getAudio().blowHorn();
  }, [getAudio]);

  // ==========================================
  // REAL-TIME SYNC ENGINE WITH ON-SCREEN PING
  // ==========================================
  const syncChannelName = `amal_sync_${roomCode.trim().toLowerCase()}`;

  const broadcastSlide = useCallback((newIndex: number) => {
    isLocalChange.current = true;
    
    // 1. BroadcastChannel (Same device/browser tabs)
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bcRef.current?.postMessage({ slide: newIndex, sender: isMobile ? "Phone" : "PC" });
    }

    // 2. Internet Relay (Mobile <-> PC via ntfy pub/sub)
    try {
      fetch(`https://ntfy.sh/${syncChannelName}`, {
        method: "POST",
        body: JSON.stringify({ slide: newIndex, sender: isMobile ? "Phone" : "PC" }),
        headers: { "Content-Type": "text/plain" }
      }).catch(() => {});
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      isLocalChange.current = false;
    }, 400);
  }, [syncChannelName, isMobile]);

  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;

    // A. BroadcastChannel
    if ("BroadcastChannel" in window) {
      bcRef.current = new BroadcastChannel(`bc_${syncChannelName}`);
      bcRef.current.onmessage = (event) => {
        if (event.data && typeof event.data.slide === "number" && !isLocalChange.current) {
          setCurrent(event.data.slide);
          setLastSyncEvent(`⚡ Remote Action: Switched to Car 0${event.data.slide + 1}`);
          setTimeout(() => setLastSyncEvent(null), 3000);
        }
      };
    }

    // B. Live SSE (Internet Relay)
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`https://ntfy.sh/${syncChannelName}/sse`);
      eventSource.onopen = () => {
        setSyncStatus("Active & Paired");
      };
      eventSource.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          let targetSlide: number | null = null;
          let sender = "Remote";

          try {
            const inner = JSON.parse(payload.message);
            targetSlide = inner.slide;
            sender = inner.sender || "Remote";
          } catch {
            targetSlide = parseInt(payload.message, 10);
          }

          if (targetSlide !== null && !isNaN(targetSlide) && targetSlide >= 0 && targetSlide < PRESENTATION_SLIDES.length && !isLocalChange.current) {
            setCurrent(targetSlide);
            setLastSyncEvent(`⚡ From ${sender}: Switched to Car 0${targetSlide + 1}`);
            setTimeout(() => setLastSyncEvent(null), 3000);
          }
        } catch {
          // ignore
        }
      };
      eventSource.onerror = () => {
        setSyncStatus("Sync Reconnecting...");
      };
    } catch {
      // fallback
    }

    // C. Poll Fallback
    const pollInterval = setInterval(async () => {
      if (isLocalChange.current) return;
      try {
        const res = await fetch(`https://ntfy.sh/${syncChannelName}/json?poll=1`);
        const text = await res.text();
        const lines = text.trim().split("\n");
        if (lines.length > 0) {
          const lastLine = lines[lines.length - 1];
          const data = JSON.parse(lastLine);
          let val: number | null = null;
          let sender = "Remote";
          try {
            const inner = JSON.parse(data.message);
            val = inner.slide;
            sender = inner.sender || "Remote";
          } catch {
            val = parseInt(data.message, 10);
          }
          if (val !== null && !isNaN(val) && val >= 0 && val < PRESENTATION_SLIDES.length && val !== current) {
            setCurrent(val);
            setLastSyncEvent(`⚡ From ${sender}: Switched to Car 0${val + 1}`);
            setTimeout(() => setLastSyncEvent(null), 3000);
          }
        }
      } catch {
        // safe skip
      }
    }, 1500);

    return () => {
      if (bcRef.current) bcRef.current.close();
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
    };
  }, [syncChannelName, current, isMounted]);

  const nextCar = useCallback(() => {
    setCurrent((prev) => {
      const nextIdx = prev < PRESENTATION_SLIDES.length - 1 ? prev + 1 : prev;
      getAudio().releaseSteam();
      broadcastSlide(nextIdx);
      return nextIdx;
    });
  }, [getAudio, broadcastSlide]);

  const prevCar = useCallback(() => {
    setCurrent((prev) => {
      if (prev > 0) {
        const prevIdx = prev - 1;
        getAudio().releaseSteam();
        broadcastSlide(prevIdx);
        return prevIdx;
      }
      return prev;
    });
  }, [getAudio, broadcastSlide]);

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

  // Prevent server-side render mismatch before hydration completes
  if (!isMounted) {
    return (
      <main className="w-screen h-screen bg-[#09090b] flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
          <span>Starting Amal Express...</span>
        </div>
      </main>
    );
  }

  return (
    <main
      suppressHydrationWarning
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

            <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-5">
              <div className="p-3 md:p-4 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex items-center gap-3">
                <Flame className="w-6 h-6 md:w-8 md:h-8 text-amber-500 animate-pulse" />
                <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-300 uppercase">
                  PASSENGER • THE THINKLINGS
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                  PASSENGER
                </h1>
                <p className="text-lg md:text-2xl text-amber-400 font-medium">
                  Storytelling & Specific
                </p>
                <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto">
                  By The Thinklings • Synchronized Presentation Deck
                </p>
              </div>

              {/* Room Code Selector */}
              <div className="flex flex-col items-center gap-2 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>SYNC CODE (SAME ON PHONE & PC):</span>
                </div>
                <input
                  suppressHydrationWarning
                  type="text"
                  maxLength={6}
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="bg-neutral-800 border border-neutral-700 text-center text-xl font-mono font-bold tracking-widest text-amber-400 rounded-lg py-1 px-4 w-36 uppercase outline-none focus:border-amber-400"
                />
                <span className="text-[11px] text-neutral-400">
                  Your device is: <b>{isMobile ? "📱 Mobile Phone" : "🖥️ Laptop / PC"}</b>
                </span>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => {
                  setBoarded(true);
                  getAudio().blowHorn();
                }}
                className="group relative px-8 md:px-10 py-4 rounded-full font-bold text-lg md:text-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
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

      {/* TOP HEADER: Railroad Dispatch Line + LIVE DEVICE STATUS HUD */}
      <header className="relative z-30 w-full px-4 md:px-12 pt-3 md:pt-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            suppressHydrationWarning
            onClick={soundHorn}
            title="Blow Horn (H)"
            className="p-2 md:p-2.5 rounded-2xl bg-neutral-900/60 border border-neutral-700/60 hover:bg-neutral-800 backdrop-blur-md flex items-center gap-2 text-amber-400 text-xs font-mono transition-transform active:scale-90"
          >
            <Radio className="w-4 h-4 animate-ping" />
            <span className="hidden sm:inline font-bold">HORN [H]</span>
          </button>
          
          {/* ON-SCREEN LIVE DEVICE INDICATOR */}
          <div className="border-l border-neutral-700/50 pl-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-neutral-800">
              {isMobile ? <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> : <Laptop className="w-3.5 h-3.5 text-amber-400" />}
              <span className="text-[11px] font-mono font-bold text-neutral-300">
                {isMobile ? "Mobile Remote" : "PC Screen"}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-neutral-800 text-[11px] font-mono">
              <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">{roomCode}</span>
              <span className="text-neutral-500">• {syncStatus}</span>
            </div>
          </div>
        </div>

        {/* Stations Route Progress */}
        <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-full border border-neutral-800/80 backdrop-blur-xl max-w-[55vw] overflow-x-auto">
          {PRESENTATION_SLIDES.map((car, idx) => {
            const isCurrent = idx === current;
            return (
              <button
                suppressHydrationWarning
                key={car.id}
                onClick={() => {
                  setCurrent(idx);
                  getAudio().releaseSteam();
                  broadcastSlide(idx);
                }}
                className={`relative px-2.5 md:px-3 py-1 text-xs font-mono transition-all duration-300 ${
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

      {/* LIVE SYNC PING BANNER */}
      <AnimatePresence>
        {lastSyncEvent && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-emerald-500 text-black px-4 py-1.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 border border-emerald-300"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>{lastSyncEvent}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER STAGE: FULL SCREEN MOVING TRAIN */}
      <div className="relative w-full overflow-hidden z-20 my-auto py-1">
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
                  className={`relative shrink-0 rounded-[28px] md:rounded-[36px] border p-5 md:p-8 backdrop-blur-2xl transition-shadow duration-500 max-h-[78vh] overflow-y-auto ${
                    isLightMode
                      ? "bg-white/95 border-neutral-200 shadow-2xl shadow-neutral-300/60"
                      : "bg-[#111116]/95 border-neutral-800 shadow-2xl shadow-black/90"
                  }`}
                >
                  {/* ENGINE STEAM & HEADLIGHT */}
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
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-700/30 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${car.accent} text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-mono font-bold tracking-wider text-neutral-400">
                          {car.carLabel}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono hidden sm:block">
                          PASSENGER • THE THINKLINGS
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-0.5 rounded-md bg-neutral-800/50 text-neutral-300">
                      SLIDE 0{idx + 1}
                    </span>
                  </div>

                  {/* EXACT HEADINGS FROM PDF */}
                  <div className="mb-4">
                    <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                      isLightMode ? "text-neutral-900" : "text-white"
                    }`}>
                      {car.title}
                    </h1>
                    {car.subtitle && (
                      <p className="text-xs md:text-base font-medium text-neutral-400 mt-1">
                        {car.subtitle}
                      </p>
                    )}
                  </div>

                  {/* QUOTE BLOCK */}
                  {car.quote && (
                    <div className={`p-3 md:p-4 rounded-xl border text-xs md:text-sm italic mb-4 ${
                      isLightMode
                        ? "bg-neutral-50 border-neutral-200 text-neutral-700"
                        : "bg-neutral-900/60 border-neutral-800 text-neutral-300"
                    }`}>
                      {car.quote}
                    </div>
                  )}

                  {/* BULLET POINTS */}
                  {car.bullets && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {car.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm text-neutral-300 leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CARDS GRID */}
                  {car.cards && (
                    <div className={`grid gap-3 mb-4 ${
                      car.cards.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                      car.cards.length === 3 ? "grid-cols-1 md:grid-cols-3" :
                      car.cards.length === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
                      "grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
                    }`}>
                      {car.cards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-3.5 md:p-4 rounded-xl border transition-all ${
                            isLightMode
                              ? "bg-white border-neutral-200 shadow-sm"
                              : "bg-neutral-900/80 border-neutral-800/90"
                          }`}
                        >
                          <div className={`text-sm md:text-base font-bold bg-gradient-to-r ${car.accent} bg-clip-text text-transparent`}>
                            {card.title}
                          </div>
                          {card.subtitle && (
                            <div className="text-[11px] font-medium text-neutral-400 mt-0.5 mb-2">
                              {card.subtitle}
                            </div>
                          )}
                          <ul className="space-y-1 mt-1.5">
                            {card.content.map((pt, pIdx) => (
                              <li key={pIdx} className="text-xs md:text-sm text-neutral-300 leading-snug flex items-start gap-1.5">
                                <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* BOTTOM TAKEAWAY BANNER */}
                  {car.bottomBanner && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center gap-1.5 text-xs md:text-sm text-neutral-200">
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
                    <div className="w-full h-36 rounded bg-neutral-900 border-y border-neutral-700 flex justify-between p-1">
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
      <div className="relative w-full h-7 pointer-events-none overflow-hidden flex flex-col justify-end shrink-0">
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

      {/* BOTTOM CONTROLLER BAR */}
      <footer className="relative z-30 w-full px-4 md:px-12 pb-3 md:pb-4 flex items-center justify-between shrink-0">
        <div className="text-xs font-mono text-neutral-500 hidden md:block">
          Remote Room: <b className="text-amber-400">{roomCode}</b> • Space / Arrows to drive
        </div>

        {/* Central Controller Capsule */}
        <div className={`flex items-center gap-3 md:gap-5 px-4 md:px-6 py-2 rounded-full border shadow-2xl backdrop-blur-2xl transition-all mx-auto md:mx-0 ${
          isLightMode
            ? "bg-white/95 border-neutral-300 text-neutral-800"
            : "bg-neutral-900/95 border-neutral-800 text-neutral-200"
        }`}>
          <button
            suppressHydrationWarning
            onClick={prevCar}
            disabled={current === 0}
            title="Previous"
            className="p-2 md:p-1.5 rounded-full hover:bg-neutral-500/10 disabled:opacity-20 active:scale-90 transition"
          >
            <ChevronLeft className="w-6 h-6 md:w-5 md:h-5" />
          </button>

          <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-neutral-400">
            {activeCar.isEngine ? "LOCOMOTIVE" : `CAR 0${current} / 0${PRESENTATION_SLIDES.length - 1}`}
          </span>

          <button
            suppressHydrationWarning
            onClick={nextCar}
            disabled={current === PRESENTATION_SLIDES.length - 1}
            title="Next"
            className="p-2 md:p-1.5 rounded-full hover:bg-neutral-500/10 disabled:opacity-20 active:scale-90 transition"
          >
            <ChevronRight className="w-6 h-6 md:w-5 md:h-5" />
          </button>

          <div className="h-4 w-[1px] bg-neutral-700 mx-0.5" />

          {/* Mute Audio */}
          <button
            suppressHydrationWarning
            onClick={() => setIsMuted(!isMuted)}
            title="Mute Audio (M)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Theme Switcher */}
          <button
            suppressHydrationWarning
            onClick={() => setIsLightMode(!isLightMode)}
            title="Theme (T)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-neutral-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Fullscreen */}
          <button
            suppressHydrationWarning
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