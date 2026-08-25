import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Tv, 
  FileText, 
  Trophy, 
  Sparkles, 
  Clock, 
  Lock, 
  Unlock,
  Radio
} from 'lucide-react';
import { useCTF } from '../context/CTFContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const TacticalHeader: React.FC = () => {
  const { 
    challenges, 
    score, 
    totalScore, 
    clearanceLevel, 
    crtEnabled, 
    toggleCrt, 
    sfxMuted, 
    toggleSfx, 
    openModal,
    isMatrixRainActive,
    toggleMatrixRain
  } = useCTF();

  const [timeUtc, setTimeUtc] = useState<string>('');
  const [timeLocal, setTimeLocal] = useState<string>('');
  const [defconLevel, setDefconLevel] = useState<number>(2);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toUTCString().split(' ')[4] + ' UTC');
      setTimeLocal(now.toLocaleTimeString([], { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const solvedCount = challenges.filter(c => c.solved).length;

  return (
    <header className="tactical-border bg-slate-950/95 border-b border-cyan-900/60 sticky top-0 z-40 backdrop-blur-md px-3 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand / SOC Station ID */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-9 h-9 rounded bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold box-glow-cyan">
                <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-mono text-sm sm:text-base font-black tracking-wider text-cyan-400 glow-cyan">
                  AEGIS-SOC // OPS CONSOLE
                </h1>
                <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                  v3.4-LIVE
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                OPERATOR: <span className="text-emerald-400 font-semibold">{PORTFOLIO_DATA.profile.name}</span> ({PORTFOLIO_DATA.profile.callsign})
              </p>
            </div>
          </div>

          {/* DEFCON Badge (Mobile) */}
          <div className="md:hidden flex items-center gap-1.5 bg-rose-950/60 border border-rose-600/60 px-2 py-0.5 rounded text-[11px] font-mono text-rose-300">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>DEFCON {defconLevel}</span>
          </div>
        </div>

        {/* Center: Live Military Clocks & Telemetry Status */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono bg-slate-900/90 px-3 py-1.5 rounded border border-slate-800">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>UTC: {timeUtc}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-slate-300">
            LOCAL: <span className="text-emerald-400">{timeLocal}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-rose-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>DEFCON {defconLevel}: ELEVATED</span>
          </div>
        </div>

        {/* Right: Controls, CTF Flag Progress & Executive Resume Action */}
        <div className="flex items-center gap-2 flex-wrap justify-end w-full md:w-auto">
          
          {/* CTF Score & Progress Button */}
          <button
            onClick={() => openModal('ctf')}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded font-mono text-xs border transition-all cursor-pointer ${
              solvedCount > 0 
                ? 'bg-amber-950/50 border-amber-500/80 text-amber-300 hover:bg-amber-900/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500 hover:text-amber-400'
            }`}
            title="Open CTF Challenges & Flags Scoreboard"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">CTF FLAGS:</span>
            <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40 text-[11px]">
              {solvedCount}/{challenges.length} ({score} PTS)
            </span>
          </button>

          {/* Quick HUD Toggles: CRT, Matrix, SFX */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded p-0.5">
            <button
              onClick={toggleSfx}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                sfxMuted ? 'text-slate-500 hover:text-slate-300' : 'text-cyan-400 hover:bg-cyan-950'
              }`}
              title={sfxMuted ? "Unmute Tactical SFX" : "Mute SFX"}
            >
              {sfxMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleCrt}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                crtEnabled ? 'text-emerald-400 hover:bg-emerald-950' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Toggle CRT Monitor Scanlines"
            >
              <Tv className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleMatrixRain}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                isMatrixRainActive ? 'text-green-400 bg-green-950' : 'text-slate-500 hover:text-green-400'
              }`}
              title="Toggle Matrix Digital Rain"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 📄 Executive Summary / 1-Click Resume Button (Top Priority for Recruiters) */}
          <button
            onClick={() => openModal('resume')}
            className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] cursor-pointer active:scale-95"
            title="Open printable 1-Click Executive Resume for Recruiters & Hiring Managers"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>EXECUTIVE RESUME</span>
            <span className="bg-slate-950/20 text-slate-900 px-1 text-[10px] rounded">PDF</span>
          </button>
        </div>

      </div>

      {/* Clearance Sub-bar */}
      <div className="max-w-7xl mx-auto mt-2 pt-1.5 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="text-slate-500 hidden sm:inline">CURRENT CLEARANCE:</span>
          <span className={`px-2 py-0.2 rounded font-bold border ${
            solvedCount === 5 
              ? 'bg-rose-950/80 border-rose-500 text-rose-300 glow-red' 
              : solvedCount > 0 
                ? 'bg-cyan-950/60 border-cyan-600 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            {clearanceLevel}
          </span>
          {solvedCount === 5 && (
            <span className="text-emerald-400 font-semibold hidden md:inline">
              [ALL CLASSIFIED DOSSIERS UNLOCKED]
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden sm:inline">SECURITY POSTURE:</span>
          <span className="text-emerald-400 font-semibold">ZERO-TRUST ENFORCED</span>
        </div>
      </div>
    </header>
  );
};
