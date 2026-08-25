import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA, CTFChallenge } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CTFContextType {
  challenges: CTFChallenge[];
  solvedFlags: string[];
  score: number;
  totalScore: number;
  clearanceLevel: string;
  submitFlag: (flagInput: string) => { success: boolean; message: string; challenge?: CTFChallenge };
  resetCTF: () => void;
  unlockAllCheat: () => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
  sfxMuted: boolean;
  toggleSfx: () => void;
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  isMatrixRainActive: boolean;
  toggleMatrixRain: () => void;
  activeIncidentId: string | null;
  setActiveIncidentId: (id: string | null) => void;
}

const CTFContext = createContext<CTFContextType | undefined>(undefined);

const CLEARANCE_RANKS = [
  "LEVEL-0 // GUEST RECRUITER",
  "LEVEL-1 // TIER-1 TRIAGE ANALYST",
  "LEVEL-2 // THREAT HUNTER",
  "LEVEL-3 // RED TEAM OPERATOR",
  "LEVEL-4 // SECURITY ARCHITECT",
  "LEVEL-5 // ROOT // CISO CLEARANCE"
];

export const CTFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [solvedFlags, setSolvedFlags] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('solved_ctf_flags');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    return localStorage.getItem('crt_effect') !== 'false';
  });

  const [sfxMuted, setSfxMuted] = useState<boolean>(() => soundFx.isMuted());
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMatrixRainActive, setIsMatrixRainActive] = useState<boolean>(false);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);

  // Initialize LocalStorage for Challenge 4 (Privilege Escalation)
  useEffect(() => {
    if (!localStorage.getItem('clearance_level')) {
      localStorage.setItem('clearance_level', 'GUEST');
    }

    // Interval to listen to LocalStorage edits for Challenge 4
    const interval = setInterval(() => {
      const clearance = localStorage.getItem('clearance_level');
      if (clearance && (clearance.toUpperCase() === 'CISO' || clearance.toUpperCase() === 'ROOT' || clearance.toUpperCase() === 'ADMIN')) {
        const flag4 = PORTFOLIO_DATA.ctfChallenges.find(c => c.id === 4)?.flag;
        if (flag4 && !solvedFlags.includes(flag4)) {
          setSolvedFlags(prev => {
            if (!prev.includes(flag4)) {
              const updated = [...prev, flag4];
              localStorage.setItem('solved_ctf_flags', JSON.stringify(updated));
              soundFx.playSuccess();
              return updated;
            }
            return prev;
          });
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [solvedFlags]);

  const challenges: CTFChallenge[] = PORTFOLIO_DATA.ctfChallenges.map(c => ({
    ...c,
    solved: solvedFlags.includes(c.flag)
  }));

  const score = challenges
    .filter(c => c.solved)
    .reduce((acc, curr) => acc + curr.points, 0);

  const totalScore = challenges.reduce((acc, curr) => acc + curr.points, 0);

  const solvedCount = solvedFlags.length;
  const clearanceLevel = CLEARANCE_RANKS[Math.min(solvedCount, CLEARANCE_RANKS.length - 1)];

  const submitFlag = (flagInput: string): { success: boolean; message: string; challenge?: CTFChallenge } => {
    const cleaned = flagInput.trim();
    if (!cleaned) {
      soundFx.playAlert();
      return { success: false, message: "Error: Empty payload provided." };
    }

    const matched = challenges.find(c => c.flag.toLowerCase() === cleaned.toLowerCase());

    if (!matched) {
      soundFx.playAlert();
      return { success: false, message: "ACCESS DENIED: Invalid flag token or incorrect hash signature." };
    }

    if (solvedFlags.includes(matched.flag)) {
      soundFx.playClick();
      return { success: false, message: `Flag already claimed for [${matched.title}].`, challenge: matched };
    }

    const newSolved = [...solvedFlags, matched.flag];
    setSolvedFlags(newSolved);
    localStorage.setItem('solved_ctf_flags', JSON.stringify(newSolved));
    soundFx.playSuccess();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff66', '#00f0ff', '#ffb703']
      });
    } catch {}

    if (newSolved.length === challenges.length) {
      soundFx.playAccessGranted();
      setIsMatrixRainActive(true);
    }

    return {
      success: true,
      message: `FLAG CAPTURED (+${matched.points} PTS)! Privilege escalated to ${matched.clearanceGranted}.`,
      challenge: matched
    };
  };

  const resetCTF = () => {
    setSolvedFlags([]);
    localStorage.removeItem('solved_ctf_flags');
    localStorage.setItem('clearance_level', 'GUEST');
    soundFx.playAlert();
  };

  const unlockAllCheat = () => {
    const allFlags = challenges.map(c => c.flag);
    setSolvedFlags(allFlags);
    localStorage.setItem('solved_ctf_flags', JSON.stringify(allFlags));
    localStorage.setItem('clearance_level', 'CISO');
    soundFx.playAccessGranted();
    try {
      confetti({ particleCount: 150, spread: 100 });
    } catch {}
  };

  const toggleCrt = () => {
    const newVal = !crtEnabled;
    setCrtEnabled(newVal);
    localStorage.setItem('crt_effect', String(newVal));
    soundFx.playClick();
  };

  const toggleSfx = () => {
    const muted = soundFx.toggleMute();
    setSfxMuted(muted);
  };

  const openModal = (modalName: string) => {
    soundFx.playClick();
    setActiveModal(modalName);
  };

  const closeModal = () => {
    soundFx.playClick();
    setActiveModal(null);
  };

  const toggleMatrixRain = () => {
    soundFx.playClick();
    setIsMatrixRainActive(prev => !prev);
  };

  return (
    <CTFContext.Provider
      value={{
        challenges,
        solvedFlags,
        score,
        totalScore,
        clearanceLevel,
        submitFlag,
        resetCTF,
        unlockAllCheat,
        crtEnabled,
        toggleCrt,
        sfxMuted,
        toggleSfx,
        activeModal,
        openModal,
        closeModal,
        isMatrixRainActive,
        toggleMatrixRain,
        activeIncidentId,
        setActiveIncidentId
      }}
    >
      {children}
    </CTFContext.Provider>
  );
};

export const useCTF = () => {
  const context = useContext(CTFContext);
  if (!context) {
    throw new Error('useCTF must be used within a CTFProvider');
  }
  return context;
};
