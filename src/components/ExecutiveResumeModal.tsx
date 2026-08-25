import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Briefcase, 
  Award, 
  Mail, 
  Phone, 
  Globe 
} from 'lucide-react';
import { PORTFOLIO_DATA, IncidentCase, Certification } from '../data/portfolioData';
import { useCTF } from '../context/CTFContext';
import { soundFx } from '../utils/audio';

export const ExecutiveResumeModal: React.FC = () => {
  const { activeModal, closeModal } = useCTF();
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  if (activeModal !== 'resume') return null;

  const profile = PORTFOLIO_DATA.profile || {};
  const stats = (PORTFOLIO_DATA.stats || []).filter(Boolean);
  const incidents = (PORTFOLIO_DATA.incidents || []).filter((i): i is IncidentCase => Boolean(i && i.title));
  const certs = (PORTFOLIO_DATA.certifications || []).filter((c): c is Certification => Boolean(c && c.name));

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const copyAsMarkdown = () => {
    const md = `# ${profile.name || 'Candidate'} - ${profile.title || 'Security Engineer'}
**Email:** ${profile.email || ''} | **Location:** ${profile.location || ''}
**GitHub:** ${profile.github || ''} | **LinkedIn:** ${profile.linkedin || ''}

## Professional Summary
${profile.summary || ''}

## Key Metrics
${stats.map(s => `- **${s.label}:** ${s.value} (${s.change})`).join('\n')}

## Security Projects & Incident Case Studies
${incidents.map(i => `### [${i.code || 'CASE'}] ${i.title} (${i.category || ''} - ${i.severity || ''})
- **Summary:** ${i.summary || ''}
- **Detection Engineering:** ${i.detectionEngineering || ''}
- **Remediation:** ${i.remediation || ''}
- **Tools:** ${(i.toolsUsed || []).join(', ')}
- **Impact:** ${i.metrics || ''}
`).join('\n')}

## Certifications
${certs.map(c => `- **${c.name}** - ${c.issuer || ''} (${c.issueDate || ''}) [ID: ${c.credentialId || 'VERIFIED'}]`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    soundFx.playClick();
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/80 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.3)] my-auto">
        
        {/* Modal Action Header (Excluded from Print) */}
        <div className="no-print flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950 rounded-t-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">EXECUTIVE CANDIDATE PROFILE // RECRUITER DOSSIER</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={copyAsMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono transition-colors cursor-pointer"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'COPIED MD!' : 'COPY AS MARKDOWN'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs font-mono transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.4)]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE AS PDF</span>
            </button>

            <button
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-slate-100 rounded hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 text-slate-200 font-sans">
          
          {/* Header */}
          <div className="border-b border-slate-700 pb-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-100 font-mono tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-cyan-400 font-mono text-sm font-semibold mt-0.5">
                  {profile.title}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  {profile.specialization}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-300 space-y-1 bg-slate-950/60 p-3 rounded border border-slate-800">
                {profile.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          {profile.summary && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 border-b border-slate-800 pb-1">
                <Briefcase className="w-3.5 h-3.5" />
                Professional Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {profile.summary}
              </p>
            </div>
          )}

          {/* Core Competencies & Metrics */}
          {stats.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 border-b border-slate-800 pb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Key Operational Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {stats.slice(0, 4).map(s => (
                  <div key={s.label} className="bg-slate-950/70 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">{s.label}</span>
                    <span className="text-cyan-300 font-bold text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incident Response & Security Case Studies */}
          {incidents.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 border-b border-slate-800 pb-1">
                <Briefcase className="w-3.5 h-3.5" />
                Selected Security Incidents & Engineering Projects
              </h3>
              
              <div className="space-y-3">
                {incidents.slice(0, 4).map(inc => (
                  <div key={inc.id} className="bg-slate-950/50 p-3 rounded border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-100">{inc.title}</span>
                      <span className="text-emerald-400 font-semibold">{inc.category} | {inc.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      {inc.summary}
                    </p>
                    {inc.detectionEngineering && (
                      <div className="text-[11px] font-mono text-slate-400 pt-1">
                        <span className="text-cyan-400">Detection & Remediation: </span>
                        {inc.detectionEngineering}
                      </div>
                    )}
                    {(inc.toolsUsed || []).length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {inc.toolsUsed.map(t => (
                          <span key={t} className="bg-slate-900 text-slate-300 px-1.5 py-0.2 rounded text-[10px] font-mono border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Badges */}
          {certs.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 border-b border-slate-800 pb-1">
                <Award className="w-3.5 h-3.5" />
                Verified Industry Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {certs.map(c => (
                  <div key={c.credentialId || c.name} className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-100 block">{c.name}</span>
                      <span className="text-slate-400 text-[10px]">{c.issuer} • Issued {c.issueDate}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 border border-emerald-800 bg-emerald-950 px-1.5 py-0.5 rounded">
                      {c.status || 'ACTIVE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
