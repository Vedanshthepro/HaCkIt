import React, { useState } from 'react';
import { Layers, ArrowUpRight, Cpu, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA, MitreTechnique, IncidentCase } from '../data/portfolioData';
import { useCTF } from '../context/CTFContext';
import { soundFx } from '../utils/audio';

export const MitreMatrix: React.FC = () => {
  const { setActiveIncidentId } = useCTF();
  const matrixList = (PORTFOLIO_DATA.mitreMatrix || []).filter((m): m is MitreTechnique => Boolean(m && m.id));
  const [selectedTech, setSelectedTech] = useState<MitreTechnique | null>(matrixList[0] || null);

  return (
    <section className="tactical-border rounded-lg bg-slate-950/90 border border-slate-800 p-4 space-y-4">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="font-mono text-sm font-bold text-slate-100 tracking-wide">
            MITRE ATT&CK® ENTERPRISE CAPABILITY MATRIX
          </h3>
          <span className="bg-amber-950/70 text-amber-300 border border-amber-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
            TACTICAL HEATMAP
          </span>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Core offensive & defensive proficiencies mapped to ATT&CK tactics.
        </p>
      </div>

      {/* Interactive Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {matrixList.map((item) => {
          const isSelected = selectedTech?.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTech(item);
                soundFx.playClick();
              }}
              className={`p-2.5 rounded text-left transition-all font-mono cursor-pointer flex flex-col justify-between h-24 border ${
                isSelected
                  ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-600 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold truncate">
                  {item.tactic}
                </span>
                <span className="text-xs font-bold text-slate-100 line-clamp-2 mt-0.5">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className={`text-[9px] px-1 rounded font-bold ${
                  item.proficiency === 'EXPERT' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {item.proficiency}
                </span>
                <span className="text-[10px] text-slate-500">{item.id}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Technique Deep-Dive Card */}
      {selectedTech && (
        <div className="tactical-border bg-slate-900/90 border border-amber-500/60 rounded p-3.5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">{selectedTech.id}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300 font-bold">{selectedTech.tactic}</span>
                <span className="text-slate-500">→</span>
                <span className="text-cyan-300 font-bold">{selectedTech.name}</span>
              </div>
            </div>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
              PROFICIENCY: {selectedTech.proficiency}
            </span>
          </div>

          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            {selectedTech.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Tooling */}
            <div className="bg-slate-950/80 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 text-[10px] block font-bold mb-1.5 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                ASSOCIATED OFFENSIVE & DEFENSIVE TOOLS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedTech.tools || []).map(tool => (
                  <span key={tool} className="bg-slate-900 text-cyan-300 px-2 py-0.5 rounded text-[11px] border border-cyan-800/60">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Linked Incidents */}
            <div className="bg-slate-950/80 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 text-[10px] block font-bold mb-1.5 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                VERIFIED IN CASEFILES:
              </span>
              <div className="flex flex-wrap gap-2">
                {(selectedTech.projectsLinked || []).map(code => (
                  <button
                    key={code}
                    onClick={() => {
                      const inc = (PORTFOLIO_DATA.incidents || []).find((i): i is IncidentCase => Boolean(i && i.code === code));
                      if (inc) {
                        soundFx.playClick();
                        setActiveIncidentId(inc.id);
                      }
                    }}
                    className="flex items-center gap-1 text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700 text-[11px] cursor-pointer"
                  >
                    <span>{code}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
