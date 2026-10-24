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
  Radio
} from "lucide-react";

// Safe Web Audio API Train Sound Synthesizer (Zero external audio files, 100% SSR safe)
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
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch {
      // Audio fallback for unsupported browsers
    }
  }

  // Multi-chime American/Locomotive Brass Horn (Nathan K5LA Chord)
  public blowHorn() {
    if (this.isMuted || typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chordFrequencies = [311.13, 369.99, 466.16, 622.25];

      chordFrequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq + (idx % 2 === 0 ? 1.5 : -1.5), now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(3, now);

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

  // Steam pressure release hiss
  public releaseSteam() {
    if (this.isMuted || typeof window === "undefined") return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.7);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(1.2, now);

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

interface TrainCarriage {
  id: string;
  isEngine?: boolean;
  carLabel: string;
  stationTag: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  image: string;
  accent: string;
  accentHex: string;
  icon: React.ElementType;
  specs: { label: string; value: string }[];
  badges: string[];
}

const TRAIN_FLEET: TrainCarriage[] = [
  {
    id: "lead-locomotive",
    isEngine: true,
    carLabel: "LOCOMOTIVE 00 • THE LEAD ENGINE",
    stationTag: "Station 00: Depots of Departure",
    title: "The Amal Express",
    subtitle: "Powering the Passenger Series",
    quote: "“The train has left the station. The only passengers who fail to grow are the ones who refuse to move.”",
    description: "Welcome to the frontline locomotive. Equipped with purposeful conviction, boundless energy, and Stanford-backed pedagogy, this engine pulls 6 carriages of self-discovery, resilience, and lifelong impact.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-400 to-red-600",
    accentHex: "#f59e0b",
    icon: Flame,
    specs: [
      { label: "Locomotive Engine", value: "Amal V12" },
      { label: "Fuel Source", value: "Radical Purpose" },
      { label: "Destination", value: "Lifelong Mastery" }
    ],
    badges: ["Full Throttle", "Headlights On", "Clear Tracks"]
  },
  {
    id: "car-boarding",
    carLabel: "CAR 01 • PASSENGER SALON",
    stationTag: "Station 01: The Boarding Gate",
    title: "Boarding the Fellowship",
    subtitle: "From Strangers to Traveling Companions",
    quote: "“A journey of transformation begins the moment you step outside the waiting hall.”",
    description: "Ambitious minds board as curious passengers. Leaving comfort zones behind, they step into an environment defined by deep empathy, authentic storytelling, and professional rigor.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-500 to-orange-600",
    accentHex: "#f59e0b",
    icon: Compass,
    specs: [
      { label: "Voyage Duration", value: "3 Months" },
      { label: "Curriculum", value: "Stanford / Acumen" }
    ],
    badges: ["Vulnerability", "Mindset Shift", "Fellowship"]
  },
  {
    id: "car-khudi",
    carLabel: "CAR 02 • OBSERVATION COMPARTMENT",
    stationTag: "Station 02: The Mirror Within",
    title: "Khudi (Self-Discovery)",
    subtitle: "Knowing your 'Why' before defining the 'How'",
    quote: "“Khudi ko kar buland itna ke har taqdeer se pehle, Khuda bande se khud pooche bata teri raza kya hai.”",
    description: "Passengers turn inward to chart their core values. By dismantling imposter syndrome, owning past scars, and articulating life purposes, they become captains of their own fate.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    accent: "from-emerald-500 to-teal-600",
    accentHex: "#10b981",
    icon: Sparkles,
    specs: [
      { label: "Core Values", value: "100% Clarified" },
      { label: "Self-Reflection", value: "Weekly Logs" }
    ],
    badges: ["Authenticity", "Radical Honesty", "Purpose"]
  },
  {
    id: "car-amal",
    carLabel: "CAR 03 • TURBINE & GEARS",
    stationTag: "Station 03: The Engine of Action",
    title: "Amal & Kam Kam Kam",
    subtitle: "Replacing Overthinking with #JustStart",
    quote: "“Action cures fear. While spectators ponder, passengers already stoke the fire.”",
    description: "Procrastination and analysis paralysis are thrown out the window. Through time-blocking, early morning execution, and smart initiative, passengers embody the spirit of continuous work.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    accent: "from-blue-500 to-indigo-600",
    accentHex: "#3b82f6",
    icon: Rocket,
    specs: [
      { label: "Action Bias", value: "#JustStart" },
      { label: "Execution Principle", value: "Kam Kam Kam" }
    ],
    badges: ["Discipline", "Immediate Action", "Grit"]
  },
  {
    id: "car-synergy",
    carLabel: "CAR 04 • CREW CARRIAGE",
    stationTag: "Station 04: The Power of Circles",
    title: "Ek Aur Ek Gyarah",
    subtitle: "Radical Synergy in Mega Projects",
    quote: "“Individually we are droplets; connected in one train, we are an avalanche of impact.”",
    description: "Passengers assemble in circles to execute real community solutions. Collaborating on high-stakes fundraising and social ventures proves that 1 + 1 equals 11.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    accent: "from-violet-500 to-purple-600",
    accentHex: "#8b5cf6",
    icon: Users2,
    specs: [
      { label: "Synergy Formula", value: "1 + 1 = 11" },
      { label: "Mega Projects", value: "Live Impact" }
    ],
    badges: ["Radical Empathy", "Team Trust", "Fundraising"]
  },
  {
    id: "car-crucible",
    carLabel: "CAR 05 • CRUCIBLE CARRIAGE",
    stationTag: "Station 05: Mountain Climbs & Turbulence",
    title: "Resilience & Candor",
    subtitle: "Embracing Setbacks as Data Points",
    quote: "“The rails are rarely flat. The strongest engines are proven on the steepest inclines.”",
    description: "Feedback is the breakfast of champions. Passengers welcome 360-degree radical candor, learning to pivot swiftly and reframe failure as fuel for the climb.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    accent: "from-rose-500 to-pink-600",
    accentHex: "#f43f5e",
    icon: Target,
    specs: [
      { label: "Growth Mindset", value: "100% Adopted" },
      { label: "Peer Feedback", value: "Continuous 360°" }
    ],
    badges: ["Grit", "Emotional Agility", "Candor"]
  },
  {
    id: "car-terminal",
    carLabel: "CAR 06 • HORIZON PLATFORM",
    stationTag: "Final Stop: The Infinite Horizon",
    title: "Beyond the Terminal",
    subtitle: "Once a Passenger, Forever a Driver",
    quote: "“The rails do not end at the station; they branch out into the infinite roads you will now build.”",
    description: "The official fellowship reaches its station, but the passengers never stop moving. Bound by an eternal 10,000+ alumni network, they step off to drive positive change in the world.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    accent: "from-cyan-400 to-blue-600",
    accentHex: "#06b6d4",
    icon: HeartHandshake,
    specs: [
      { label: "Alumni Network", value: "10,000+ Strong" },
      { label: "Lifelong Pledge", value: "Pay It Forward" }
    ],
    badges: ["Leadership", "Endless Journey", "Changemaker"]
  }
];

// Explicitly typed Transition for strict TypeScript checks
const trainSpring: Transition = {
  type: "spring",
  stiffness: 85,
  damping: 18,
  mass: 1.25,
};

export default function TrainDeckFullScreen() {
  const [boarded, setBoarded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<TrainAudioEngine | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new TrainAudioEngine();
    }
    audioRef.current.isMuted = isMuted;
    return audioRef.current;
  }, [isMuted]);

  const soundHorn = useCallback(() => {
    getAudio().blowHorn();
  }, [getAudio]);

  const triggerConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const startJourney = () => {
    setBoarded(true);
    const audio = getAudio();
    audio.blowHorn();
    setTimeout(() => {
      audio.releaseSteam();
    }, 1000);
  };

  const nextCar = useCallback(() => {
    setCurrent((prev) => {
      const nextIdx = prev < TRAIN_FLEET.length - 1 ? prev + 1 : prev;
      const audio = getAudio();
      audio.releaseSteam();
      if (nextIdx === TRAIN_FLEET.length - 1) {
        audio.blowHorn();
        triggerConfetti();
      }
      return nextIdx;
    });
  }, [getAudio, triggerConfetti]);

  const prevCar = useCallback(() => {
    setCurrent((prev) => {
      if (prev > 0) {
        getAudio().releaseSteam();
        return prev - 1;
      }
      return prev;
    });
  }, [getAudio]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!boarded) {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          startJourney();
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
  }, [boarded, nextCar, prevCar, soundHorn]);

  const activeCar = TRAIN_FLEET[current];

  return (
    <main
      onClick={() => {
        if (boarded) nextCar();
      }}
      className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between transition-colors duration-700 select-none cursor-pointer ${
        isLightMode ? "bg-[#f1f5f9] text-neutral-900" : "bg-[#09090b] text-neutral-100"
      }`}
    >
      {/* 1. INTRO PLATFORM GATE */}
      <AnimatePresence>
        {!boarded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-neutral-950 text-white backdrop-blur-2xl"
          >
            <div className="absolute w-[600px] h-[600px] rounded-full blur-[160px] bg-amber-500/20 pointer-events-none" />

            <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-6">
              <div className="p-4 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex items-center gap-3">
                <Flame className="w-8 h-8 text-amber-500 animate-pulse" />
                <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase">
                  AMAL ACADEMY • PLATFORM 01
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                  The Passenger Series
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 font-medium">
                  A high-velocity full-screen presentation pulling 6 carriages of transformation.
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startJourney();
                }}
                className="group relative px-10 py-5 rounded-full font-bold text-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>BOARD THE TRAIN (START)</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="text-xs font-mono text-neutral-500 pt-4 flex items-center gap-4">
                <span>🔊 Multi-Chime Locomotive Horn Active</span>
                <span>•</span>
                <span>Press Space or Click to Enter</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Ambient Glow */}
      <motion.div
        animate={{ backgroundColor: activeCar.accentHex }}
        transition={{ duration: 0.9 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full blur-[180px] opacity-25 pointer-events-none"
      />

      {/* TOP HEADER: Railroad Dispatch Bar */}
      <header 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-30 w-full px-8 md:px-16 pt-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={soundHorn}
            title="Blow Train Horn (H)"
            className="p-2.5 rounded-2xl bg-neutral-900/60 border border-neutral-700/60 hover:bg-neutral-800 backdrop-blur-md flex items-center gap-2 text-amber-400 text-xs font-mono transition-transform active:scale-90"
          >
            <Radio className="w-4 h-4 animate-ping" />
            <span className="hidden sm:inline font-bold tracking-wider">BLOW HORN [H]</span>
          </button>
          
          <div className="border-l border-neutral-700/50 pl-4">
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-50">
              DISPATCH LINE • GREEN ROUTE
            </div>
            <div className="text-sm md:text-base font-bold tracking-tight">
              {activeCar.stationTag}
            </div>
          </div>
        </div>

        {/* Stations Route Progress */}
        <div className="flex items-center gap-1.5 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-xl">
          {TRAIN_FLEET.map((car, idx) => {
            const isCurrent = idx === current;
            return (
              <button
                key={car.id}
                onClick={() => {
                  setCurrent(idx);
                  getAudio().releaseSteam();
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
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

      {/* CENTER: FULL-SCREEN MOVING TRAIN SYSTEM */}
      <div className="relative w-full overflow-visible z-20 my-auto py-2">
        <motion.div
          animate={{
            x: `calc(6vw - ${current} * (88vw + 64px))`,
          }}
          transition={trainSpring}
          className="flex items-center"
        >
          {TRAIN_FLEET.map((car, idx) => {
            const isActive = idx === current;
            const Icon = car.icon;

            return (
              <React.Fragment key={car.id}>
                {/* FULL-SCREEN CARRIAGE (88vw Edge-to-Edge) */}
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : 0.35,
                    y: isActive ? 0 : 16,
                  }}
                  transition={trainSpring}
                  style={{ width: "88vw" }}
                  className={`relative shrink-0 rounded-[40px] border p-8 md:p-12 backdrop-blur-2xl transition-shadow duration-500 ${
                    isLightMode
                      ? "bg-white/95 border-neutral-200 shadow-2xl shadow-neutral-300/60"
                      : "bg-[#111116]/95 border-neutral-800 shadow-2xl shadow-black/90"
                  }`}
                >
                  {/* ENGINE SPECIFIC: High-Power Glowing Headlight Beam & Steam */}
                  {car.isEngine && (
                    <>
                      <div className="absolute top-1/2 -left-48 -translate-y-1/2 w-64 h-48 pointer-events-none overflow-visible">
                        <div className="w-full h-full bg-gradient-to-l from-amber-400/50 via-amber-200/20 to-transparent blur-2xl" />
                      </div>

                      <div className="absolute -top-14 left-24 flex flex-col items-center pointer-events-none">
                        <div className="w-8 h-12 bg-neutral-800 rounded-t-lg border border-neutral-600 border-b-0 shadow-lg" />
                        {[...Array(4)].map((_, pIdx) => (
                          <motion.div
                            key={pIdx}
                            animate={{
                              y: [-8, -75],
                              x: [0, -35 - pIdx * 12],
                              scale: [0.6, 2.5],
                              opacity: [0.7, 0],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              delay: pIdx * 0.55,
                              ease: "easeOut",
                            }}
                            className="absolute -top-3 w-6 h-6 rounded-full bg-neutral-400/40 blur-sm"
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Carriage Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-700/30 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${car.accent} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-mono font-bold tracking-wider text-neutral-400">
                          {car.carLabel}
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                          STATUS: {isActive ? "FULL-SCREEN ACTIVE FOCUS" : "LINKED CARRIAGE"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {car.badges.map((bdg, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-xs uppercase font-mono tracking-wider px-3 py-1 rounded-md bg-neutral-800/40 border border-neutral-700/40 text-neutral-300 hidden md:inline-block"
                        >
                          {bdg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Carriage Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col gap-5">
                      <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-[1.08] ${
                        isLightMode ? "text-neutral-900" : "text-white"
                      }`}>
                        {car.title}
                      </h1>

                      <p className="text-lg md:text-xl font-medium text-neutral-400">
                        {car.subtitle}
                      </p>

                      <div className={`p-5 rounded-2xl border text-sm md:text-base italic ${
                        isLightMode
                          ? "bg-neutral-50 border-neutral-200 text-neutral-700"
                          : "bg-neutral-900/60 border-neutral-800 text-neutral-300"
                      }`}>
                        {car.quote}
                      </div>

                      <p className={`text-base leading-relaxed ${
                        isLightMode ? "text-neutral-600" : "text-neutral-400"
                      }`}>
                        {car.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        {car.specs.map((sp, sIdx) => (
                          <div
                            key={sIdx}
                            className={`p-4 rounded-2xl border ${
                              isLightMode
                                ? "bg-white border-neutral-200 shadow-sm"
                                : "bg-neutral-900/80 border-neutral-800"
                            }`}
                          >
                            <div className={`text-xl md:text-2xl font-black bg-gradient-to-r ${car.accent} bg-clip-text text-transparent`}>
                              {sp.value}
                            </div>
                            <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-1">
                              {sp.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className={`relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-[28px] overflow-hidden border-4 ${
                        isLightMode ? "border-neutral-200 bg-neutral-100" : "border-neutral-800 bg-neutral-900"
                      } shadow-2xl`}>
                        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                        
                        <img
                          src={car.image}
                          alt={car.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        <div className="absolute bottom-4 left-4 z-10 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-white tracking-widest uppercase border border-white/10">
                          {car.isEngine ? "Locomotive Front Cab" : `Carriage Window 0${idx}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEEL WHEELS */}
                  <div className="absolute -bottom-6 left-16 right-16 flex justify-between pointer-events-none">
                    <div className="flex items-center gap-4 bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-700 shadow-lg">
                      <motion.div 
                        animate={{ rotate: current * 360 }}
                        transition={trainSpring}
                        className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" 
                      />
                      <motion.div 
                        animate={{ rotate: current * 360 }}
                        transition={trainSpring}
                        className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" 
                      />
                    </div>

                    <div className="flex items-center gap-4 bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-700 shadow-lg">
                      <motion.div 
                        animate={{ rotate: current * 360 }}
                        transition={trainSpring}
                        className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" 
                      />
                      <motion.div 
                        animate={{ rotate: current * 360 }}
                        transition={trainSpring}
                        className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 bg-neutral-800" 
                      />
                    </div>
                  </div>
                </motion.div>

                {/* GANGWAY BELLOWS */}
                {idx < TRAIN_FLEET.length - 1 && (
                  <div 
                    style={{ width: "64px" }} 
                    className="shrink-0 flex flex-col justify-center items-center px-1"
                  >
                    <div className="w-full h-52 rounded-md bg-neutral-900 border-y-2 border-neutral-700 flex justify-between p-1 shadow-inner">
                      {[...Array(6)].map((_, bIdx) => (
                        <div
                          key={bIdx}
                          className="h-full w-1 bg-neutral-800 border-x border-neutral-950 rounded"
                        />
                      ))}
                    </div>
                    <div className="w-14 h-4 bg-neutral-700 rounded-sm mt-1 border border-neutral-500 shadow-md flex items-center justify-center">
                      <div className="w-4 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>

      {/* HORIZONTAL RAILROAD TRACK */}
      <div className="relative w-full h-12 pointer-events-none overflow-hidden flex flex-col justify-end">
        <div className="w-full h-1.5 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-600 shadow-sm" />
        
        <motion.div
          animate={{ x: -((current * 80) % 40) }}
          transition={trainSpring}
          className="w-[200vw] -ml-[50vw] flex justify-between pt-1 opacity-70"
        >
          {[...Array(75)].map((_, tIdx) => (
            <div key={tIdx} className="w-2.5 h-6 bg-neutral-800 dark:bg-neutral-700 rounded-sm border-t border-neutral-500 shadow-sm" />
          ))}
        </motion.div>
      </div>

      {/* BOTTOM CONTROLLER DOCK */}
      <footer 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-30 w-full px-8 md:px-16 pb-6 flex items-center justify-between"
      >
        <div className="text-xs font-mono text-neutral-500 hidden sm:block">
          Press <kbd className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">H</kbd> for Horn • <kbd className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">→</kbd> to move train
        </div>

        <div className={`flex items-center gap-4 px-6 py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all mx-auto sm:mx-0 ${
          isLightMode
            ? "bg-white/90 border-neutral-300 text-neutral-800"
            : "bg-neutral-900/90 border-neutral-800 text-neutral-200"
        }`}>
          <button
            onClick={prevCar}
            disabled={current === 0}
            title="Reverse (Left Arrow)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 disabled:opacity-20 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono font-bold tracking-widest text-neutral-400">
            {activeCar.isEngine ? "LOCOMOTIVE LEAD" : `CABIN 0${current} / 0${TRAIN_FLEET.length - 1}`}
          </span>

          <button
            onClick={nextCar}
            disabled={current === TRAIN_FLEET.length - 1}
            title="Advance (Right Arrow / Space)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 disabled:opacity-20 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 mx-1" />

          <button
            onClick={() => setIsMuted(!isMuted)}
            title="Mute Audio (M)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-neutral-400" />}
          </button>

          <button
            onClick={() => setIsLightMode(!isLightMode)}
            title="Toggle Clean Light / Dark (T)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-neutral-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

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
            title="Fullscreen Mode (F)"
            className="p-1.5 rounded-full hover:bg-neutral-500/10 transition"
          >
            <Maximize2 className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        <div className="text-xs font-mono text-neutral-500 hidden sm:block">
          Press <kbd className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">F</kbd> for Fullscreen
        </div>
      </footer>
    </main>
  );
}