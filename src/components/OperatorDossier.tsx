import React, { useState } from 'react';
import { 
  UserCheck, 
  Award, 
  Key, 
  Send, 
  Copy, 
  ExternalLink, 
  Mail, 
  Code2, 
  Share2, 
  ShieldCheck, 
  Lock,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const OperatorDossier: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>('RE: Cybersecurity Role Opportunity / Incident Response Inquiry');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const profile = PORTFOLIO_DATA.profile || {
    name: "Vedansh Patranabish",
    callsign: "V-CYBER",
    title: "Systems Programmer & Security Engineer",
    specialization: "Threat Detection & Zero-Trust Security",
    status: "OPEN FOR OPPORTUNITIES",
    location: "Global / Remote",
    email: "vedansh.patranabish@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    tryhackme: "https://tryhackme.com",
    pgpKeyFingerprint: "4A9F 88C1 2D03 E91F BC83  90E2 F510 AA34 CC99 18B2",
    summary: "Cybersecurity professional and systems programmer."
  };

  const nameInitials = (profile.name || "VP")
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('') || "VP";

  const validCertifications = (PORTFOLIO_DATA.certifications || []).filter(
    (c): c is Certification => Boolean(c && c.name)
  );

  const stats = (PORTFOLIO_DATA.stats || []).filter(Boolean);

  const copyPgpKey = () => {
    navigator.clipboard.writeText(profile.pgpKeyFingerprint || '');
    setCopiedKey(true);
    soundFx.playClick();
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setDispatchStatus("ENCRYPTING PAYLOAD & DISPATCHING TO OPERATOR...");
    
    setTimeout(() => {
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(`Sender: ${senderEmail}\n\nMessage:\n${contactMessage}`)}`;
      window.open(mailtoUrl, '_blank');
      setDispatchStatus("TRANSMISSION DISPATCHED VIA OPERATIONAL SECURE CHANNEL (MAILTO).");
    }, 1000);
  };

  return (
    <section className="space-y-4">
      
      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base sm:text-lg font-mono font-black tracking-wide text-slate-100">
            OPERATOR DOSSIER // PERSONNEL RECORD
          </h2>
          <span className="bg-cyan-950/70 text-cyan-300 border border-cyan-800 text-[10px] px-2 py-0.5 rounded font-mono">
            SECURITY CLEARANCE
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:inline">
          STATUS: {profile.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column: Bio & Core Metrics */}
        <div className="tactical-border rounded-lg bg-slate-950/90 border border-slate-800 p-4 space-y-4 font-mono text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded bg-slate-900 border border-cyan-500/80 flex items-center justify-center text-cyan-400 font-black text-xl shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              {nameInitials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">{profile.name}</h3>
              <p className="text-cyan-400 text-[11px] font-semibold">{profile.callsign}</p>
              <p className="text-slate-400 text-[10px] mt-0.5">{profile.location}</p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="text-slate-500 text-[10px] font-bold block">TARGET DESIGNATION:</span>
            <p className="text-slate-200 text-xs font-semibold leading-relaxed">
              {profile.title}
            </p>
            <p className="text-slate-400 text-[11px] font-sans">
              {profile.summary}
            </p>
          </div>

          {/* Core Metrics */}
          {stats.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold block">OPERATIONAL METRICS:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {stats.map(s => (
                  <div key={s.label} className="bg-slate-900/80 p-2 rounded border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[10px]">{s.label}</span>
                    <div className="text-right">
                      <span className="text-cyan-300 font-bold text-xs">{s.value}</span>
                      <span className="text-slate-500 text-[9px] block">{s.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social / Profiles */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
            {profile.github && (
              <a 
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-[11px] transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </a>
            )}
            {profile.linkedin && (
              <a 
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-[11px] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile.tryhackme && (
              <a 
                href={profile.tryhackme}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-[11px] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>TryHackMe</span>
              </a>
            )}
          </div>

        </div>

        {/* Center Column: Verified Certifications */}
        <div className="tactical-border rounded-lg bg-slate-950/90 border border-slate-800 p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-xs">VERIFIED CREDENTIALS & CERTS</h3>
            </div>
            <span className="text-[10px] text-amber-400 font-bold">{validCertifications.length} ACTIVE</span>
          </div>

          <div className="space-y-2.5">
            {validCertifications.length === 0 ? (
              <p className="text-slate-500 text-xs">No active credentials recorded.</p>
            ) : (
              validCertifications.map(cert => (
                <div key={cert.credentialId || cert.name} className="bg-slate-900/80 p-3 rounded border border-slate-800 space-y-1.5 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-100 text-xs">{cert.name}</h4>
                      <span className="text-slate-400 text-[10px]">ISSUER: {cert.issuer || 'Industry Credential'} ({cert.issueDate || 'VERIFIED'})</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0">
                      {cert.status || 'ACTIVE'}
                    </span>
                  </div>

                  {(cert.skills || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.map(sk => (
                        <span key={sk} className="bg-slate-950 text-slate-300 px-1.5 py-0.5 rounded text-[9px] border border-slate-800">
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}

                  {cert.credentialId && (
                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-800/60">
                      <span>ID: {cert.credentialId}</span>
                      <span className="text-cyan-400 flex items-center gap-1 cursor-pointer hover:underline">
                        VERIFIED CREDENTIAL
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Encrypted Contact & PGP Transmission */}
        <div className="tactical-border rounded-lg bg-slate-950/90 border border-slate-800 p-4 space-y-3 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-xs">ENCRYPTED COMMS & INTAKE</h3>
              </div>
              <span className="text-[10px] text-emerald-400">PGP READY</span>
            </div>

            {/* PGP Fingerprint */}
            {profile.pgpKeyFingerprint && (
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px] font-bold flex items-center gap-1">
                    <Key className="w-3 h-3 text-amber-400" />
                    PGP KEY FINGERPRINT:
                  </span>
                  <button
                    onClick={copyPgpKey}
                    className="text-cyan-400 hover:text-cyan-300 text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKey ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <code className="text-amber-300 text-[10px] block break-all">
                  {profile.pgpKeyFingerprint}
                </code>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleDispatch} className="space-y-2.5">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">RECRUITER / SENDER EMAIL:</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">COMMUNICATION SUBJECT:</label>
                <input
                  type="text"
                  required
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">OPPORTUNITY / ROLE DETAILS:</label>
                <textarea
                  rows={3}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Provide role description, team, and scope details..."
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH SECURE INQUIRY</span>
              </button>
            </form>

            {dispatchStatus && (
              <p className="text-[10px] text-cyan-300 font-mono mt-2 bg-cyan-950/80 p-1.5 rounded border border-cyan-800">
                {dispatchStatus}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
            DIRECT CHANNEL: <span className="text-slate-300">{profile.email}</span>
          </div>

        </div>

      </div>

    </section>
  );
};
