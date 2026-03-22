"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gamepad2, Zap, Code2,
  Play, Lock, ChevronRight, Shield, Network, Beaker,
  Clock, Crown, Sparkles, ArrowRight, BookOpen, Rocket, Globe
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
//  XP & LEVEL SYSTEM
// ─────────────────────────────────────────────────────────────────
const ACHIEVEMENT_LIST = [
  { id: "first_game",   icon: "🎮", title: "Primeiro Jogo",   desc: "Jogou pela primeira vez",   xp: 50  },
  { id: "score_100",    icon: "💯", title: "Centurião",       desc: "Marcou 100 pontos",          xp: 75  },
  { id: "score_500",    icon: "⭐", title: "Astro Gamer",     desc: "500 pontos acumulados",      xp: 150 },
  { id: "play_3",       icon: "🔥", title: "Em Chamas",       desc: "Jogou 3 jogos diferentes",   xp: 100 },
  { id: "memory_win",   icon: "🧠", title: "Memória Élite",   desc: "Completou o Jogo da Memória",xp: 120 },
  { id: "snake_50",     icon: "🐍", title: "Serpente Mestra", desc: "50 pontos no Snake",         xp: 100 },
  { id: "reflex_ace",   icon: "⚡", title: "Reflexo Ace",     desc: "Reflexo < 200ms",            xp: 130 },
];

function useGamesState() {
  const [xp, setXp] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [newAch, setNewAch] = useState<typeof ACHIEVEMENT_LIST[0] | null>(null);

  const level = Math.floor(xp / 200) + 1;
  const xpInLevel = xp % 200;
  const xpToNext = 200;

  const unlock = useCallback((id: string) => {
    if (achievements.has(id)) return;
    const ach = ACHIEVEMENT_LIST.find(a => a.id === id);
    if (!ach) return;
    setAchievements(prev => new Set([...prev, id]));
    setXp(prev => prev + ach.xp);
    setNewAch(ach);
    setTimeout(() => setNewAch(null), 3500);
  }, [achievements]);

  const addScore = useCallback((pts: number, gameId: string) => {
    setTotalScore(prev => {
      const next = prev + pts;
      if (next >= 100) unlock("score_100");
      if (next >= 500) unlock("score_500");
      return next;
    });
    setGamesPlayed(prev => {
      const next = new Set([...prev, gameId]);
      if (next.size === 1) unlock("first_game");
      if (next.size >= 3) unlock("play_3");
      return next;
    });
  }, [unlock]);

  return { xp, level, xpInLevel, xpToNext, gamesPlayed, totalScore, achievements, newAch, unlock, addScore };
}

// ─────────────────────────────────────────────────────────────────
//  GAME: SNAKE
// ─────────────────────────────────────────────────────────────────
const CELL = 20;
const COLS = 16;
const ROWS = 16;
type Dir = { x: number; y: number };

function SnakeGame({ onScore, onUnlock }: { onScore: (n: number, id: string) => void; onUnlock: (id: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 8, y: 8 }],
    dir: { x: 1, y: 0 } as Dir,
    next: { x: 1, y: 0 } as Dir,
    food: { x: 4, y: 4 },
    score: 0,
    running: false,
    dead: false,
  });
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const reported50 = useRef(false);

  const randFood = (snake: { x: number; y: number }[]) => {
    let f: { x: number; y: number };
    do { f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
    while (snake.some(s => s.x === f.x && s.y === f.y));
    return f;
  };

  const start = () => {
    const s = stateRef.current;
    s.snake = [{ x: 8, y: 8 }];
    s.dir = { x: 1, y: 0 }; s.next = { x: 1, y: 0 };
    s.food = randFood(s.snake); s.score = 0; s.running = true; s.dead = false;
    reported50.current = false;
    setScore(0); setRunning(true); setDead(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = stateRef.current.dir;
      if (e.key === "ArrowUp"    && d.y !== 1)  stateRef.current.next = { x: 0, y: -1 };
      if (e.key === "ArrowDown"  && d.y !== -1) stateRef.current.next = { x: 0, y: 1 };
      if (e.key === "ArrowLeft"  && d.x !== 1)  stateRef.current.next = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && d.x !== -1) stateRef.current.next = { x: 1, y: 0 };
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const tick = () => {
      const s = stateRef.current;
      if (!s.running) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      s.dir = s.next;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || s.snake.some(b => b.x === head.x && b.y === head.y)) {
        s.running = false; s.dead = true;
        onScore(s.score, "snake");
        if (!reported50.current && s.score >= 50) { onUnlock("snake_50"); reported50.current = true; }
        setRunning(false); setDead(true); return;
      }

      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score += 10; s.food = randFood(s.snake);
        setScore(s.score);
        if (s.score >= 50 && !reported50.current) { onUnlock("snake_50"); reported50.current = true; }
      } else { s.snake.pop(); }

      ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = "#ef4444"; ctx.fillRect(s.food.x * CELL + 3, s.food.y * CELL + 3, CELL - 6, CELL - 6);
      s.snake.forEach((b, i) => {
        ctx.fillStyle = i === 0 ? "#22d3ee" : `rgba(34,211,238,${Math.max(0.3, 1 - i * 0.06)})`;
        ctx.beginPath();
        ctx.roundRect(b.x * CELL + 1, b.y * CELL + 1, CELL - 2, CELL - 2, 4);
        ctx.fill();
      });
    };
    const id = setInterval(tick, 130);
    return () => clearInterval(id);
  }, [onScore, onUnlock]);

  const touchDir = (dir: Dir) => { stateRef.current.next = dir; };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[320px]">
        <span className="text-cyan-400 font-black text-sm uppercase tracking-widest">Score: {score}</span>
        <span className="text-foreground/40 text-xs font-bold">Setas para mover</span>
      </div>
      <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL}
        className="rounded-2xl border border-cyan-500/20 bg-[#050510] shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
      {!running && (
        <button onClick={start} className="px-8 py-3 bg-cyan-500 text-black font-black rounded-full text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">
          {dead ? "🔄 Jogar Novamente" : "▶ Iniciar Snake"}
        </button>
      )}
      {running && (
        <div className="grid grid-cols-3 gap-2 w-36">
          <div /><button onPointerDown={() => touchDir({ x: 0, y: -1 })} className="bg-foreground/10 rounded-xl py-2 text-foreground font-black text-lg hover:bg-foreground/20">↑</button><div />
          <button onPointerDown={() => touchDir({ x: -1, y: 0 })} className="bg-foreground/10 rounded-xl py-2 text-foreground font-black text-lg hover:bg-foreground/20">←</button>
          <button onPointerDown={() => touchDir({ x: 0, y: 1 })}  className="bg-foreground/10 rounded-xl py-2 text-foreground font-black text-lg hover:bg-foreground/20">↓</button>
          <button onPointerDown={() => touchDir({ x: 1, y: 0 })}  className="bg-foreground/10 rounded-xl py-2 text-foreground font-black text-lg hover:bg-foreground/20">→</button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  GAME: MEMORY
// ─────────────────────────────────────────────────────────────────
const EMOJIS = ["🔥","⚡","🎮","🚀","🧠","💎","🌟","🎯","🦾","🕹️","💻","🔮"];

function MemoryGame({ onScore, onUnlock }: { onScore: (n: number, id: string) => void; onUnlock: (id: string) => void }) {
  const makeBoard = () => {
    const pairs = [...EMOJIS.slice(0, 8), ...EMOJIS.slice(0, 8)];
    return pairs.sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, emoji: e, revealed: false, matched: false }));
  };
  const [cards, setCards] = useState(makeBoard);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [won, setWon] = useState(false);
  const checking = useRef(false);

  const flip = (id: number) => {
    if (checking.current) return;
    const card = cards[id];
    if (card.revealed || card.matched || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setCards(prev => prev.map((c, i) => i === id ? { ...c, revealed: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      checking.current = true;
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      setTimeout(() => {
        if (cards[a].emoji === cards[b].emoji) {
          setCards(prev => prev.map((c, i) => newFlipped.includes(i) ? { ...c, matched: true, revealed: true } : c));
          const newMatches = matches + 1;
          setMatches(newMatches);
          if (newMatches === 8) {
            const pts = Math.max(0, 300 - moves * 10);
            onScore(pts, "memory");
            onUnlock("memory_win");
            setWon(true);
          }
        } else {
          setCards(prev => prev.map((c, i) => newFlipped.includes(i) ? { ...c, revealed: false } : c));
        }
        setFlipped([]);
        checking.current = false;
      }, 800);
    }
  };

  const reset = () => { setCards(makeBoard()); setFlipped([]); setMoves(0); setMatches(0); setWon(false); checking.current = false; };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <span className="text-purple-400 font-black text-sm uppercase tracking-widest">Pares: {matches}/8</span>
        <span className="text-foreground/40 text-xs font-bold">Movimentos: {moves}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, i) => (
          <motion.button key={card.id} onClick={() => flip(i)} whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center border transition-all font-black
              ${card.matched ? "bg-purple-500/20 border-purple-500/40 cursor-default" :
                card.revealed ? "bg-foreground/[0.08] border-foreground/20" :
                "bg-foreground/[0.04] border-foreground/10 hover:border-purple-500/30 cursor-pointer"}`}>
            {(card.revealed || card.matched) ? card.emoji : "?"}
          </motion.button>
        ))}
      </div>
      {won ? (
        <div className="text-center space-y-3">
          <p className="text-2xl">🏆</p>
          <p className="text-purple-400 font-black uppercase tracking-widest text-sm">Parabéns! +{Math.max(0, 300 - moves * 10)} XP</p>
          <button onClick={reset} className="px-8 py-3 bg-purple-500 text-white font-black rounded-full text-xs uppercase tracking-widest hover:bg-purple-400 transition-all">Jogar Novamente</button>
        </div>
      ) : (
        <button onClick={reset} className="text-foreground/40 text-xs font-bold uppercase tracking-widest hover:text-foreground/70 transition-colors">Reiniciar</button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  GAME: REFLEX TEST
// ─────────────────────────────────────────────────────────────────
function ReflexGame({ onScore, onUnlock }: { onScore: (n: number, id: string) => void; onUnlock: (id: string) => void }) {
  const [phase, setPhase] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [ms, setMs] = useState(0);
  const [best, setBest] = useState(999);
  const [history, setHistory] = useState<number[]>([]);
  const startTime = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const begin = () => {
    setPhase("waiting");
    const delay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => { setPhase("ready"); startTime.current = Date.now(); }, delay);
  };

  const click = () => {
    if (phase === "waiting") { clearTimeout(timeoutRef.current); setPhase("idle"); return; }
    if (phase === "ready") {
      const elapsed = Date.now() - startTime.current;
      setMs(elapsed); setPhase("result");
      const newBest = Math.min(best, elapsed);
      setBest(newBest);
      setHistory(prev => [...prev.slice(-4), elapsed]);
      onScore(Math.max(0, 500 - elapsed), "reflex");
      if (elapsed < 200) onUnlock("reflex_ace");
    }
  };

  const rating = ms < 150 ? { label: "🥇 Lendário", color: "text-yellow-400" }
    : ms < 250 ? { label: "⚡ Muito Rápido", color: "text-cyan-400" }
    : ms < 400 ? { label: "✅ Bom", color: "text-emerald-400" }
    : { label: "🐢 Pode melhorar", color: "text-orange-400" };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-between w-full">
        <span className="text-yellow-400 font-black text-sm uppercase tracking-widest">Recorde: {best === 999 ? "--" : `${best}ms`}</span>
        <span className="text-foreground/40 text-xs font-bold">Tentativas: {history.length}</span>
      </div>

      <motion.button onClick={phase === "idle" || phase === "result" ? begin : click}
        animate={{ scale: phase === "ready" ? [1, 1.05, 1] : 1 }}
        transition={{ repeat: phase === "ready" ? Infinity : 0, duration: 0.3 }}
        className={`w-52 h-52 rounded-[3rem] flex flex-col items-center justify-center text-center font-black transition-all border-4 shadow-2xl cursor-pointer select-none
          ${phase === "idle" || phase === "result" ? "bg-foreground/[0.04] border-foreground/10 hover:border-yellow-500/40 hover:bg-yellow-500/5" :
            phase === "waiting" ? "bg-red-500/10 border-red-500/30" :
            "bg-yellow-400 border-yellow-300 shadow-[0_0_60px_rgba(250,204,21,0.4)]"}`}>
        {phase === "idle"    && <><Zap className="w-10 h-10 text-yellow-400 mb-3" /><span className="text-foreground font-black uppercase text-sm tracking-widest">Toque para Iniciar</span></>}
        {phase === "waiting" && <><Clock className="w-10 h-10 text-red-400 mb-3 animate-pulse" /><span className="text-foreground/60 font-black uppercase text-sm tracking-widest">Aguarde...</span><span className="text-foreground/30 text-xs mt-1">(não toque)</span></>}
        {phase === "ready"   && <><span className="text-6xl mb-2">⚡</span><span className="text-black font-black uppercase text-xl tracking-tight">AGORA!</span></>}
        {phase === "result"  && <><span className="text-4xl font-black text-foreground">{ms}ms</span><span className={`text-sm font-black uppercase tracking-widest mt-2 ${rating.color}`}>{rating.label}</span><span className="text-foreground/40 text-xs mt-3">Toque para tentar novamente</span></>}
      </motion.button>

      {history.length > 0 && (
        <div className="flex items-end gap-1.5 h-12 w-full max-w-[220px]">
          {history.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-yellow-500/50" style={{ height: `${Math.min(100, (500 - h) / 5)}%` }} title={`${h}ms`} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────────
const GAMES_LIST = [
  { id: "snake",   title: "🐍 GEDS Snake",         desc: "Clássico reinventado com visual neon",        category: "Arcade",     locked: false,  color: "cyan"   },
  { id: "memory",  title: "🧠 Memory Tech",         desc: "Teste sua memória com emojis de tech",        category: "Puzzle",     locked: false,  color: "purple" },
  { id: "reflex",  title: "⚡ Reflex Challenge",    desc: "Quanto tempo seu reflexo leva?",              category: "Skill",      locked: false,  color: "yellow" },
  { id: "code",    title: "💻 Code Runner",         desc: "Aventura de programação em plataforma 2D",    category: "Em breve",   locked: true,   color: "blue"   },
  { id: "builder", title: "🏗️ City Builder",       desc: "Construa a cidade do futuro com tech GEDS",   category: "Em breve",   locked: true,   color: "emerald"},
  { id: "hack",    title: "🔐 HackSim",             desc: "Simulador de hacking ético e segurança",      category: "Em breve",   locked: true,   color: "red"    },
];

const colorMap: Record<string, string> = {
  cyan:    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  purple:  "bg-purple-500/10 border-purple-500/20 text-purple-400",
  yellow:  "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  blue:    "bg-blue-500/10 border-blue-500/20 text-blue-400",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  red:     "bg-red-500/10 border-red-500/20 text-red-400",
};

const devTools = [
  { icon: <Globe className="w-6 h-6" />, name: "HTML5 / Canvas", desc: "Jogos web nativos sem dependências pesadas", color: "cyan" },
  { icon: <Gamepad2 className="w-6 h-6" />, name: "Phaser.js", desc: "Framework 2D para jogos complexos e robustos", color: "purple" },
  { icon: <Code2 className="w-6 h-6" />, name: "Three.js", desc: "Ambientes 3D imersivos para jogos em perspectiva", color: "blue" },
  { icon: <Rocket className="w-6 h-6" />, name: "React + Framer", desc: "Interfaces gamer com animações fluidas", color: "yellow" },
  { icon: <Shield className="w-6 h-6" />, name: "Supabase", desc: "Backend para rankings e saves na nuvem", color: "emerald" },
  { icon: <BookOpen className="w-6 h-6" />, name: "WebAssembly", desc: "Performance máxima com Rust/C++ no navegador", color: "red" },
];

export default function GedsGames() {
  const gs = useGamesState();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [, setSection] = useState<"play" | "dev" | "community">("play");

  const GameComponent = activeGame === "snake"  ? <SnakeGame  onScore={gs.addScore} onUnlock={gs.unlock} />
                      : activeGame === "memory" ? <MemoryGame onScore={gs.addScore} onUnlock={gs.unlock} />
                      : activeGame === "reflex" ? <ReflexGame onScore={gs.addScore} onUnlock={gs.unlock} />
                      : null;

  return (
    <main className="bg-background min-h-screen text-foreground overflow-hidden">

      {/* ── Achievement Toast ──────────────────────────────────── */}
      <AnimatePresence>
        {gs.newAch && (
          <motion.div initial={{ opacity: 0, y: -80, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -80, x: "-50%" }}
            className="fixed top-24 left-1/2 z-[100] bg-yellow-400 text-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-black">
            <span className="text-3xl">{gs.newAch.icon}</span>
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70">Conquista Desbloqueada!</p>
              <p className="text-lg uppercase italic tracking-tight">{gs.newAch.title}</p>
            </div>
            <span className="ml-2 text-yellow-800 font-black">+{gs.newAch.xp} XP</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 overflow-hidden border-b border-foreground/5">
        {/* Particle Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `radial-gradient(circle, rgba(168,85,247,0.8) 1px, transparent 1px)`, backgroundSize: "35px 35px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/8 blur-[100px] rounded-full" />
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/50"
              style={{ left: `${10 + i * 8}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div className="lg:w-1/2 text-left" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-[2rem] mb-8 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                <Gamepad2 className="w-10 h-10 text-purple-400" />
              </motion.div>

              <span className="inline-block mb-6 text-purple-400 font-black bg-purple-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-purple-500/20">
                Play · Create · Innovate
              </span>

              <h1 className="text-4xl md:text-8xl font-black mb-8 leading-[1.05] uppercase italic tracking-tighter text-foreground">
                GEDS <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-cyan-400 to-yellow-400">Games</span>
              </h1>

              <p className="text-lg text-foreground/60 max-w-xl mb-12 font-bold uppercase tracking-tight">
                Uma plataforma onde tecnologia e criatividade se encontram. Jogue, aprenda e inove.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <button onClick={() => { setSection("play"); document.getElementById("play-section")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-400 text-white font-black px-8 py-4 rounded-full transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] uppercase text-[10px] tracking-[0.3em]">
                  <Play className="w-4 h-4 fill-current" /> Jogar Agora
                </button>
                <button onClick={() => { setSection("dev"); document.getElementById("dev-section")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-3 border border-foreground/10 hover:border-purple-500/40 text-foreground font-black px-8 py-4 rounded-full transition-all uppercase text-[10px] tracking-[0.3em]">
                  <Code2 className="w-4 h-4" /> Criar meu Jogo
                </button>
              </div>

              {/* Player HUD */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-foreground/[0.03] border border-foreground/10 rounded-[2rem] px-8 py-5 w-full sm:w-auto">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center shrink-0">
                    <Crown className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Nível</p>
                    <p className="text-2xl font-black text-foreground italic uppercase">{gs.level}</p>
                  </div>
                </div>
                <div className="text-left w-full sm:w-auto">
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40">XP</span>
                    <span className="text-[9px] font-black text-purple-400">{gs.xpInLevel}/{gs.xpToNext}</span>
                  </div>
                  <div className="w-full sm:w-40 h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-linear-to-r from-purple-500 to-cyan-500 rounded-full"
                      animate={{ width: `${(gs.xpInLevel / gs.xpToNext) * 100}%` }} transition={{ duration: 0.5 }} />
                  </div>
                </div>
                <div className="flex gap-6 sm:gap-3 items-center w-full sm:w-auto justify-between sm:justify-start">
                  <div className="text-center">
                    <p className="text-lg font-black text-cyan-400">{gs.totalScore}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Pontos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-yellow-400">{gs.achievements.size}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Conquistas</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div className="lg:w-1/2 relative" initial={{ opacity: 0, scale: 0.95, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }}>
              <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square overflow-hidden rounded-[3rem] border border-foreground/10 shadow-2xl group">
                <Image src="/GEDS Games.png" alt="GEDS Games Experience" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-left">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <Gamepad2 className="text-purple-400 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-black text-lg leading-none uppercase italic">Gaming Hub</p>
                      <p className="text-purple-400 text-[9px] uppercase font-black tracking-widest mt-1">Play to Innovate</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px] -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-[100px] -z-10 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GAME LOBBY ─────────────────────────────────────────────── */}
      <section id="play-section" className="py-24 px-6 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-purple-400 font-black bg-purple-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-purple-500/20">Lobby</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Escolha seu <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">Jogo</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {GAMES_LIST.map((game, i) => (
              <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }} whileHover={!game.locked ? { y: -6 } : {}}
                className={`relative p-8 rounded-[2.5rem] border transition-all duration-300
                  ${game.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-purple-500/30"}
                  ${activeGame === game.id ? "border-purple-500/50 bg-purple-500/5" : "bg-foreground/[0.02] border-foreground/8"}`}
                onClick={() => !game.locked && setActiveGame(activeGame === game.id ? null : game.id)}>

                {game.locked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-4 h-4 text-foreground/30" />
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border ${colorMap[game.color]}`}>
                  {game.title.split(" ")[0]}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-black text-foreground uppercase italic tracking-tight">{game.title.slice(2)}</h3>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${colorMap[game.color]}`}>{game.category}</span>
                </div>
                <p className="text-foreground/50 text-sm font-bold mb-6">{game.desc}</p>

                {!game.locked && (
                  <button className={`w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                    ${activeGame === game.id ? "bg-purple-500 text-white" : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"}`}>
                    {activeGame === game.id ? "▼ Fechar Jogo" : "▶ Jogar Agora"}
                  </button>
                )}
                {game.locked && (
                  <div className="w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center text-foreground/30 border border-foreground/5">
                    Em Breve
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Embedded Game ── */}
          <AnimatePresence>
            {activeGame && GameComponent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden">
                <div className="bg-foreground/[0.02] border border-purple-500/20 rounded-[3rem] p-8 md:p-12 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full max-w-2xl mb-8">
                    <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
                      {GAMES_LIST.find(g => g.id === activeGame)?.title}
                    </h3>
                    <button onClick={() => setActiveGame(null)}
                      className="text-foreground/40 hover:text-foreground transition-colors text-xs font-black uppercase tracking-widest border border-foreground/10 px-4 py-2 rounded-full hover:border-foreground/30">
                      Fechar ✕
                    </button>
                  </div>
                  <div className="w-full max-w-md">
                    {GameComponent}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ───────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5 bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-yellow-400 font-black bg-yellow-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-yellow-500/20">Trofeus</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Suas <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-400">Conquistas</span>
            </h2>
            <p className="text-foreground/40 text-xs font-black uppercase tracking-widest mt-3">{gs.achievements.size}/{ACHIEVEMENT_LIST.length} desbloqueadas</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {ACHIEVEMENT_LIST.map((ach, i) => {
              const unlocked = gs.achievements.has(ach.id);
              return (
                <motion.div key={ach.id} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`p-5 rounded-[2rem] border text-center transition-all flex flex-col items-center gap-2
                    ${unlocked ? "bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)]" : "bg-foreground/[0.02] border-foreground/8 opacity-50"}`}>
                  <span className={`text-3xl ${unlocked ? "" : "grayscale"}`}>{ach.icon}</span>
                  <p className={`text-[9px] font-black uppercase tracking-tight ${unlocked ? "text-yellow-400" : "text-foreground/40"}`}>{ach.title}</p>
                  {unlocked && <span className="text-[8px] text-yellow-600 font-black">+{ach.xp} XP</span>}
                  {!unlocked && <p className="text-[8px] text-foreground/30 font-bold">{ach.desc}</p>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEV SECTION ────────────────────────────────────────────── */}
      <section id="dev-section" className="py-24 px-6 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-cyan-400 font-black bg-cyan-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-cyan-500/20">Desenvolva</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Crie seu <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Jogo</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto mt-4 font-bold uppercase text-xs tracking-widest">
              Ferramentas e guias para transformar sua ideia em um jogo real
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {devTools.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
                className="p-7 rounded-[2rem] bg-foreground/[0.02] border border-foreground/8 hover:border-cyan-500/20 transition-all group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${colorMap[t.color]} group-hover:scale-110 transition-transform`}>
                  {t.icon}
                </div>
                <h3 className="text-foreground font-black text-lg uppercase italic tracking-tight mb-2">{t.name}</h3>
                <p className="text-foreground/50 text-sm font-bold leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/geds-lab" className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black px-10 py-4 rounded-full transition-all uppercase text-[10px] tracking-[0.3em]">
              <Beaker className="w-4 h-4" /> Ir para GEDS Lab
            </Link>
            <Link href="/contatos" className="inline-flex items-center gap-3 border border-foreground/10 hover:border-cyan-500/30 text-foreground font-black px-10 py-4 rounded-full transition-all uppercase text-[10px] tracking-[0.3em]">
              <Sparkles className="w-4 h-4" /> Propor um Jogo
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5 bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-emerald-400 font-black bg-emerald-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20">Comunidade</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Leaderboard <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">Global</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {[
              { rank: 1, name: "TechGamer_BR",  xp: 4850, badge: "👑" },
              { rank: 2, name: "CodeNinja",     xp: 3210, badge: "🥈" },
              { rank: 3, name: "PixelMaster",   xp: 2740, badge: "🥉" },
              { rank: 4, name: "ByteStorm",     xp: 1980, badge: "🎮" },
              { rank: 5, name: "Você",          xp: gs.xp,badge: "⚡", highlight: true },
            ].sort((a, b) => b.xp - a.xp).map((player, i) => (
              <motion.div key={player.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-5 p-5 rounded-2xl mb-3 border transition-all
                  ${player.highlight ? "bg-purple-500/10 border-purple-500/20" : "bg-foreground/[0.02] border-foreground/8"}`}>
                <span className="text-2xl w-8 text-center">{player.badge}</span>
                <div className="flex-1">
                  <p className={`font-black text-sm uppercase tracking-tight ${player.highlight ? "text-purple-400" : "text-foreground"}`}>{player.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${player.highlight ? "bg-purple-500" : "bg-foreground/30"}`}
                        style={{ width: `${Math.min(100, (player.xp / 5000) * 100)}%` }} />
                    </div>
                    <span className="text-[9px] font-black text-foreground/40 uppercase">{player.xp} XP</span>
                  </div>
                </div>
                <span className="text-foreground/30 text-[9px] font-black uppercase">#{i + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-purple-400 font-black bg-purple-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-purple-500/20">Integração</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Parte do <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">Ecossistema</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "GEDS Lab", icon: <Beaker className="w-6 h-6" />, desc: "Protótipos e testes de jogos", color: "cyan", href: "/geds-lab" },
              { name: "GEDS Inovação", icon: <Zap className="w-6 h-6" />, desc: "Dev de jogos com IA", color: "yellow", href: "/" },
              { name: "GEDS Network", icon: <Network className="w-6 h-6" />, desc: "Infraestrutura online", color: "blue", href: "/geds-network" },
              { name: "GEDS Security", icon: <Shield className="w-6 h-6" />, desc: "Proteção de dados", color: "emerald", href: "/geds-security" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={item.href} className={`flex flex-col items-center p-7 rounded-[2rem] border ${colorMap[item.color]} text-center group hover:scale-105 transition-all`}>
                  <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <p className="font-black text-foreground text-sm uppercase italic tracking-tight mb-2">{item.name}</p>
                  <p className="text-foreground/40 text-[9px] font-bold uppercase tracking-tight">{item.desc}</p>
                  <ChevronRight className="w-3 h-3 text-foreground/30 mt-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[3.5rem] overflow-hidden border border-purple-500/20 bg-linear-to-br from-purple-950/40 via-background to-cyan-950/20 p-12 md:p-20 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-linear-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 blur-[80px]" />
            <span className="text-6xl block mb-6 relative z-10">🎮</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase italic tracking-tighter relative z-10">
              Pronto para <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">jogar?</span>
            </h2>
            <p className="text-foreground/50 mb-10 max-w-xl mx-auto font-bold uppercase text-xs tracking-widest relative z-10">
              Jogue, crie, colecione conquistas e suba no ranking da GEDS Games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={() => document.getElementById("play-section")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-400 text-white font-black px-10 py-4 rounded-full transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] uppercase text-[10px] tracking-[0.3em]">
                <Play className="w-4 h-4 fill-current" /> Jogar Agora
              </button>
              <Link href="/contatos"
                className="inline-flex items-center gap-3 border border-foreground/10 hover:border-purple-500/30 text-foreground font-black px-10 py-4 rounded-full transition-all uppercase text-[10px] tracking-[0.3em]">
                <Rocket className="w-4 h-4" /> Propor um Jogo
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
