import React, { useState } from 'react';
import { useCTF } from './context/CTFContext';
import { TacticalHeader } from './components/TacticalHeader';
import { ThreatRadarMap } from './components/ThreatRadarMap';
import { IncidentQueue } from './components/IncidentQueue';
import { SiemLogStream } from './components/SiemLogStream';
import { MalwareSandbox } from './components/MalwareSandbox';
import { MitreMatrix } from './components/MitreMatrix';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { OperatorDossier } from './components/OperatorDossier';
import { ExecutiveResumeModal } from './components/ExecutiveResumeModal';
import { CTFModal } from './components/CTFModal';
import { MatrixRain } from './components/MatrixRain';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { soundFx } from './utils/audio';
import { 
  Radar, 
  ShieldAlert, 
  Layers, 
  Bug, 
  Terminal, 
  UserCheck, 
  FileText,
  Lock,
  Radio,
  Trophy,
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const App: React.FC = () => {
  const { 
    crtEnabled, 
    isMatrixRainActive, 
    openModal, 
    score, 
    challenges, 
    clearanceLevel 
  } = useCTF();

  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'mitre' | 'sandbox' | 'terminal' | 'dossier'>('overview');

  const solvedCount = challenges.filter(c => c.solved).length;

  const handleTabChange = (tab: typeof activeTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen bg-[#060911] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-slate-950 ${
      crtEnabled ? 'crt-overlay' : ''
    }`}>
      
      {/* Background Matrix Rain (Triggered via CTF victory or user toggle) */}
      {isMatrixRainActive && <MatrixRain opacity={0.25} />}

      {/* Top Tactical Status Bar */}
      <TacticalHeader />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 space-y-5 z-10">
        
        {/* Navigation Tabs / Tactical Switchboard */}
        <nav className="tactical-border bg-slate-950/90 rounded-lg p-1.5 border border-slate-800 flex items-center gap-1.5 overflow-x-auto shadow-lg">
          
          <button
            onClick={() => handleTabChange('overview')}
            className={`flex items-center gap-2 px-3 py-2 rounded font-mono text-xs transition-all cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Radar className="w-3.5 h-3.5 text-cyan-400" />
            <span>THREAT MONITOR & SIEM</span>
          </button>

          <button
            onClick={() => handleTabChange('incidents')}
            className={`flex items-center gap-2 px-3 py-2 rounded font-mono text-xs transition-all cursor-pointer shrink-0 ${
              activeTab === 'incidents'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>INCIDENT CASEFILES ({PORTFOLIO_DATA.incidents.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('mitre')}
            className={`flex items-center gap-2 px-3 py-2 rounded font-mono text-xs transition-all cursor-pointer shrink-0 ${
              activeTab === 'mitre'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>MITRE ATT&CK® MATRIX</span>
          </button>

          <button
            onClick={() => handleTabChange('sandbox')}
            className={`flex items-center gap-2 px-3 py-2 rounded font-mono text-xs transition-all cursor-pointer shrink-0 ${
              activeTab === 'sandbox'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-purple-400" />
            <span>MALWARE SANDBOX</span>
          </button>

          <button
            onClick={() => handleTabChange('terminal')}
            className={`flex items-center gap-2 px-3 py-2 rounded font-mono text-xs transition-all cursor-pointer shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>REVERSE SHELL CLI</span>
          </button>

          <button
            onClick={() => handleTabChange('dossier')}
            className={`flex items-center gap-2 px-3 py-2 rounded font-mono text-xs transition-all cursor-pointer shrink-0 ${
              activeTab === 'dossier'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPERATOR DOSSIER</span>
          </button>

        </nav>

        {/* Dynamic Content Views */}
        <ErrorBoundary>
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <ThreatRadarMap />
              <SiemLogStream />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      RECENT PRIORITY INCIDENTS
                    </h3>
                    <button 
                      onClick={() => handleTabChange('incidents')} 
                      className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                    >
                      VIEW ALL ({(PORTFOLIO_DATA.incidents || []).length}) →
                    </button>
                  </div>
                  
                  <div className="space-y-2.5">
                    {(PORTFOLIO_DATA.incidents || []).slice(0, 2).map(inc => (
                      <div 
                        key={inc.id}
                        onClick={() => handleTabChange('incidents')}
                        className="tactical-border p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-cyan-500 cursor-pointer space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-cyan-300">{inc.code}: {inc.title}</span>
                          <span className="text-rose-400 font-bold text-[10px]">{inc.severity}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-sans line-clamp-1">{inc.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <InteractiveTerminal />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'incidents' && <IncidentQueue />}

          {activeTab === 'mitre' && <MitreMatrix />}

          {activeTab === 'sandbox' && <MalwareSandbox />}

          {activeTab === 'terminal' && <InteractiveTerminal />}

          {activeTab === 'dossier' && <OperatorDossier />}
        </ErrorBoundary>

      </main>

      {/* Footer */}
      <footer className="tactical-border bg-slate-950/95 border-t border-slate-800 text-[11px] font-mono text-slate-400 py-3 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">AEGIS-SOC v3.4</span>
            <span className="text-slate-600">|</span>
            <span>SYSTEM INTEGRITY: 100% OPERATIONAL</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400">ZERO VULNERABILITIES DETECTED</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button 
              onClick={() => openModal('ctf')} 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>CTF Challenge: {solvedCount}/5 Solved</span>
            </button>
            <button 
              onClick={() => openModal('resume')} 
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3 text-cyan-400" />
              <span>Executive Resume</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ExecutiveResumeModal />
      <CTFModal />

    </div>
  );
};
