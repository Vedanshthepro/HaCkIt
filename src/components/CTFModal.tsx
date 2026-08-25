import React, { useState } from 'react';
import { 
  Trophy, 
  Flag, 
  HelpCircle, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  X, 
  Zap, 
  Sparkles, 
  AlertTriangle, 
  RotateCcw,
  KeyRound
} from 'lucide-react';
import { useCTF } from '../context/CTFContext';
import { soundFx } from '../utils/audio';

export const CTFModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    challenges, 
    score, 
    totalScore, 
    clearanceLevel, 
    submitFlag, 
    unlockAllCheat, 
    resetCTF 
  } = useCTF();

  const [flagInput, setFlagInput] = useState<string>('');
  const [submissionFeedback, setSubmissionFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  if (activeModal !== 'ctf') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput.trim()) return;
    const res = submitFlag(flagInput);
    setSubmissionFeedback(res);
    if (res.success) {
      setFlagInput('');
    }
  };

  const toggleHint = (id: number) => {
    soundFx.playClick();
    setRevealedHints(prev => 
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
  };

  const solvedCount = challenges.filter(c => c.solved).length;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="tactical-border bg-slate-950 border border-amber-500/80 rounded-xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-[0_0_40px_rgba(245,158,11,0.3)] my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 rounded-t-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-mono text-sm sm:text-base font-black text-slate-100 tracking-wide flex items-center gap-2">
                DEFCON ADVERSARY CHALLENGE & CTF SCOREBOARD
              </h2>
              <span className="text-xs font-mono text-amber-400">
                Uncover security flags hidden across the SOC to elevate clearance
              </span>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-slate-100 rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CTF Status Banner */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">TOTAL SCORE</span>
              <span className="text-amber-400 font-bold text-lg">{score} / {totalScore} PTS</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">FLAGS CAPTURED</span>
              <span className="text-emerald-400 font-bold text-lg">{solvedCount} / {challenges.length} FLAGS</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">CURRENT CLEARANCE</span>
              <span className="text-cyan-300 font-bold text-xs truncate block mt-1">{clearanceLevel}</span>
            </div>
          </div>

          {/* Flag Submission Form */}
          <form onSubmit={handleSubmit} className="tactical-border bg-slate-900/80 p-4 rounded-lg border border-cyan-800 space-y-3 font-mono text-xs">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              SUBMIT CAPTURED FLAG TOKEN:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="FLAG{...}"
                className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-cyan-300 w-full focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded cursor-pointer transition-colors shrink-0"
              >
                SUBMIT
              </button>
            </div>

            {submissionFeedback && (
              <div className={`p-2.5 rounded text-xs font-mono flex items-center gap-2 ${
                submissionFeedback.success 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                  : 'bg-rose-950 text-rose-300 border border-rose-700'
              }`}>
                {submissionFeedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                <span>{submissionFeedback.message}</span>
              </div>
            )}
          </form>

          {/* Challenges List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-300 tracking-wider">
              ACTIVE CTF CHALLENGES & INTELLIGENCE MISSIONS:
            </h3>

            <div className="space-y-2.5">
              {challenges.map((ch) => {
                const isHintShown = revealedHints.includes(ch.id);

                return (
                  <div
                    key={ch.id}
                    className={`tactical-border p-3.5 rounded-lg border transition-all font-mono text-xs ${
                      ch.solved
                        ? 'bg-emerald-950/20 border-emerald-600/80 shadow-[0_0_10px_rgba(0,255,102,0.1)]'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-100">
                            #{ch.id}. {ch.title}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            ch.difficulty === 'EASY' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                            ch.difficulty === 'MEDIUM' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}>
                            {ch.difficulty}
                          </span>
                          <span className="text-amber-400 font-bold text-[11px]">+{ch.points} PTS</span>
                        </div>
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          {ch.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {ch.solved ? (
                          <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-700 px-2 py-1 rounded text-[10px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            SOLVED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-slate-500 bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px]">
                            <Lock className="w-3.5 h-3.5" />
                            LOCKED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hint Section */}
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => toggleHint(ch.id)}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>{isHintShown ? "Hide Tactical Hint" : "Request Tactical Hint"}</span>
                      </button>

                      {ch.solved && (
                        <span className="text-emerald-400 text-[10px] font-bold">
                          UNLOCKED: {ch.clearanceGranted}
                        </span>
                      )}
                    </div>

                    {isHintShown && (
                      <div className="mt-2 p-2 rounded bg-cyan-950/40 border border-cyan-800/60 text-cyan-300 text-[11px] font-sans">
                        💡 <strong className="font-mono">Intel Tip:</strong> {ch.hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions / Reset / Cheat for Recruiters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 font-mono text-xs">
            <button
              onClick={unlockAllCheat}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-500 text-amber-300 rounded text-[11px] transition-colors cursor-pointer"
              title="Instantly unlocks all flags for testing or presentation"
            >
              <Zap className="w-3 h-3" />
              <span>RECRUITER AUTO-SOLVE (UNLOCK ALL)</span>
            </button>

            <button
              onClick={resetCTF}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 rounded text-[11px] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET CTF PROGRESSION</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
