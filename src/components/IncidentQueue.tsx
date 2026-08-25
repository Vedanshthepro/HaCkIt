import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  FolderGit2, 
  AlertOctagon, 
  CheckCircle2, 
  Lock, 
  Search, 
  Filter, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { PORTFOLIO_DATA, IncidentCase } from '../data/portfolioData';
import { useCTF } from '../context/CTFContext';
import { soundFx } from '../utils/audio';

export const IncidentQueue: React.FC = () => {
  const { solvedFlags, activeIncidentId, setActiveIncidentId, unlockAllCheat, openModal } = useCTF();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const validIncidents = useMemo(() => {
    return (PORTFOLIO_DATA.incidents || []).filter((inc): inc is IncidentCase => Boolean(inc && inc.id && inc.title));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    validIncidents.forEach(inc => {
      if (inc.category) set.add(inc.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [validIncidents]);

  const severities = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  const filteredIncidents = useMemo(() => {
    return validIncidents.filter(inc => {
      const matchesCat = selectedCategory === 'ALL' || inc.category === selectedCategory;
      const matchesSev = selectedSeverity === 'ALL' || inc.severity === selectedSeverity;
      
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat && matchesSev;

      const title = (inc.title || '').toLowerCase();
      const summary = (inc.summary || '').toLowerCase();
      const code = (inc.code || '').toLowerCase();
      const tools = (inc.toolsUsed || []).some(t => (t || '').toLowerCase().includes(q));
      const vector = (inc.attackVector || '').toLowerCase();

      const matchesSearch = title.includes(q) || summary.includes(q) || code.includes(q) || tools || vector.includes(q);
      return matchesCat && matchesSev && matchesSearch;
    });
  }, [validIncidents, selectedCategory, selectedSeverity, searchQuery]);

  const activeIncident = validIncidents.find(i => i.id === activeIncidentId);

  const isClassifiedUnlocked = (solvedFlags || []).length >= 2;

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h2 className="text-base sm:text-lg font-mono font-black tracking-wide text-slate-100">
            INCIDENT RESPONSE & PROJECT DOSSIERS
          </h2>
          <span className="bg-rose-950/70 text-rose-300 border border-rose-800 text-[10px] px-2 py-0.5 rounded font-mono">
            {validIncidents.length} CASEFILES
          </span>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Real-world security operations, threat mitigations, and systems projects.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="tactical-border p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              soundFx.playKeypress();
            }}
            placeholder="Filter by tool (Wireshark, Sockets, AES, C++...)"
            className="w-full bg-slate-900 border border-slate-700 rounded pl-9 pr-3 py-1.5 text-xs font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:inline" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                soundFx.playClick();
              }}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIncidents.length === 0 ? (
          <div className="col-span-2 text-center p-8 bg-slate-950/60 rounded border border-slate-800 text-slate-400 font-mono text-xs">
            NO INCIDENT CASEFILES MATCHING CURRENT FILTER.
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isLocked = Boolean(incident.classified && !isClassifiedUnlocked);

            return (
              <div
                key={incident.id}
                onClick={() => {
                  if (!isLocked) {
                    soundFx.playClick();
                    setActiveIncidentId(incident.id);
                  } else {
                    soundFx.playAlert();
                  }
                }}
                className={`tactical-border p-4 rounded-lg bg-slate-900/90 border transition-all relative overflow-hidden group cursor-pointer ${
                  isLocked 
                    ? 'border-rose-900/40 bg-slate-950/80' 
                    : 'border-slate-800 hover:border-cyan-500/80 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                }`}
              >
                {/* Classified Overlay if locked */}
                {isLocked && (
                  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-[2px] z-10 p-5 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-rose-950/80 border border-rose-500 flex items-center justify-center text-rose-400">
                      <Lock className="w-5 h-5 animate-pulse" />
                    </div>
                    <h4 className="text-xs font-mono font-bold text-rose-400 glow-red">
                      [CLASSIFIED // CLEARANCE LEVEL 2 REQUIRED]
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 max-w-xs">
                      Capture at least 2 CTF flags to decrypt this confidential casefile.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('ctf');
                        }}
                        className="px-2.5 py-1 bg-amber-950/80 border border-amber-500 text-amber-300 text-[10px] font-mono rounded hover:bg-amber-900 cursor-pointer"
                      >
                        SOLVE CTF
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          unlockAllCheat();
                        }}
                        className="px-2.5 py-1 bg-slate-800 border border-slate-600 text-slate-300 text-[10px] font-mono rounded hover:bg-slate-700 cursor-pointer"
                      >
                        BYPASS (RECRUITER)
                      </button>
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold tracking-wider">{incident.code || 'CASE'}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400">{incident.category || 'General'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                      incident.severity === 'CRITICAL' 
                        ? 'bg-rose-950/80 text-rose-300 border-rose-700' 
                        : incident.severity === 'HIGH'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                          : 'bg-cyan-950/80 text-cyan-300 border-cyan-700'
                    }`}>
                      {incident.severity || 'MEDIUM'}
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-700 px-1.5 py-0.2 rounded text-[10px]">
                      {incident.status || 'COMPLETED'}
                    </span>
                  </div>
                </div>

                {/* Title & Summary */}
                <div className="my-3 space-y-1.5">
                  <h3 className="text-sm font-mono font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {incident.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {incident.summary}
                  </p>
                </div>

                {/* Attack Vector Highlight */}
                {incident.attackVector && (
                  <div className="bg-slate-950/80 p-2 rounded border border-slate-800 text-[11px] font-mono text-slate-300 mb-3 space-y-1">
                    <span className="text-rose-400 font-semibold block text-[10px]">ATTACK VECTOR / SCOPE:</span>
                    <p className="text-slate-400 line-clamp-1">{incident.attackVector}</p>
                  </div>
                )}

                {/* Tools Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {(incident.toolsUsed || []).map(t => (
                    <span key={t} className="bg-slate-950 text-cyan-300/80 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                  <span className="text-[11px] text-emerald-400 font-medium truncate max-w-[65%]">
                    {incident.metrics || 'Incident Analyzed & Remediated'}
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] shrink-0">
                    VIEW DOSSIER <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Incident Deep-Dive Modal Drawer */}
      {activeIncident && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="tactical-border bg-slate-950 border border-cyan-500/80 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="font-bold">{activeIncident.code}</span>
                  <span>•</span>
                  <span>TIMELINE: {activeIncident.date || 'ACTIVE'}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{activeIncident.status || 'COMPLETED'}</span>
                </div>
                <h2 className="text-base sm:text-lg font-mono font-black text-slate-100 mt-1">
                  {activeIncident.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveIncidentId(null);
                }}
                className="text-slate-400 hover:text-slate-100 font-mono text-sm px-2 py-1 bg-slate-900 border border-slate-700 rounded hover:border-rose-500 cursor-pointer"
              >
                [ESC / CLOSE]
              </button>
            </div>

            {/* MITRE & Severity Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">SEVERITY LEVEL</span>
                <span className={`font-bold ${
                  activeIncident.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {activeIncident.severity || 'HIGH'} IMPACT
                </span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">CATEGORY</span>
                <span className="text-cyan-300 font-bold">{activeIncident.category}</span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">OUTCOME / METRIC</span>
                <span className="text-emerald-400 font-bold">{activeIncident.metrics}</span>
              </div>
            </div>

            {/* Detailed Investigation Sections */}
            <div className="space-y-3 text-xs font-mono">
              
              {/* Executive Summary */}
              {activeIncident.summary && (
                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <h4 className="text-cyan-400 font-bold flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    INCIDENT SUMMARY & SCOPE
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {activeIncident.summary}
                  </p>
                </div>
              )}

              {/* Attack Vector & Threat Execution */}
              {activeIncident.attackVector && (
                <div className="bg-rose-950/20 p-3 rounded border border-rose-900/40">
                  <h4 className="text-rose-400 font-bold flex items-center gap-1.5 mb-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                    ATTACK VECTOR & ADVERSARY TECHNIQUE
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {activeIncident.attackVector}
                  </p>
                </div>
              )}

              {/* Detection Engineering */}
              {activeIncident.detectionEngineering && (
                <div className="bg-slate-900/90 p-3 rounded border border-cyan-800/60">
                  <h4 className="text-cyan-300 font-bold flex items-center gap-1.5 mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    DETECTION ENGINEERING & CORRELATION LOGIC
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {activeIncident.detectionEngineering}
                  </p>
                </div>
              )}

              {/* Hardening & Remediation */}
              {activeIncident.remediation && (
                <div className="bg-emerald-950/20 p-3 rounded border border-emerald-900/40">
                  <h4 className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                    REMEDIATION, HARDENING & ROOT-CAUSE MITIGATION
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {activeIncident.remediation}
                  </p>
                </div>
              )}

              {/* MITRE ATT&CK Mapping */}
              {(activeIncident.mitreRef || []).length > 0 && (
                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block mb-1 font-bold">MAPPED MITRE ATT&CK TECHNIQUES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeIncident.mitreRef.map(m => (
                      <span key={m} className="bg-slate-950 text-amber-300 border border-amber-700/50 px-2 py-0.5 rounded text-[11px]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Used */}
              {(activeIncident.toolsUsed || []).length > 0 && (
                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] block mb-1 font-bold">TOOLING & TECHNOLOGIES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeIncident.toolsUsed.map(tool => (
                      <span key={tool} className="bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded text-[11px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Links and Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-3">
                {activeIncident.githubUrl && (
                  <a
                    href={activeIncident.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 underline"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>View Repository & Source Code</span>
                  </a>
                )}
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveIncidentId(null);
                }}
                className="bg-cyan-500 text-slate-950 font-bold px-4 py-1.5 rounded hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                RETURN TO QUEUE
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
