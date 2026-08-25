import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useCTF } from '../context/CTFContext';
import { soundFx } from '../utils/audio';

interface CommandOutput {
  id: number;
  command: string;
  response: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const { submitFlag, solvedFlags, unlockAllCheat, toggleMatrixRain } = useCTF();
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 1,
      command: 'sysinfo --welcome',
      response: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            [+] AEGIS-SOC TACTICAL COMMAND SHELL v3.4 [x86_64-linux-gnu]
          </p>
          <p>
            Connected to SOC Node: <span className="text-emerald-400">soc-node-01.internal</span>. Type <span className="text-amber-300 font-bold">'help'</span> for operational commands.
          </p>
          <p className="text-slate-500 text-[11px]">
            Tip: Try running <span className="text-cyan-300">yara -s rules.yar ransom.bin</span> or <span className="text-cyan-300">nmap localhost</span>.
          </p>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    soundFx.playKeypress();
    const args = raw.split(' ');
    const cmd = args[0].toLowerCase();
    const sub = args.slice(1).join(' ');

    setCommandHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);
    setInputVal('');

    let resp: React.ReactNode = null;

    switch (cmd) {
      case 'help':
      case '?':
        resp = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-cyan-400 font-bold">AVAILABLE OPERATIONAL COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><span className="text-amber-300 font-bold">whoami</span> - Display operator profile & bio</div>
              <div><span className="text-amber-300 font-bold">nmap localhost</span> - Scan open skill & service ports</div>
              <div><span className="text-amber-300 font-bold">ls [path]</span> - List directory contents & casefiles</div>
              <div><span className="text-amber-300 font-bold">cat &lt;file&gt;</span> - Read file (e.g. resume.md, certs.txt)</div>
              <div><span className="text-amber-300 font-bold">yara -s rules.yar ransom.bin</span> - Execute YARA memory triage</div>
              <div><span className="text-amber-300 font-bold">submit_flag &lt;token&gt;</span> - Submit captured CTF flag</div>
              <div><span className="text-amber-300 font-bold">ciso_override</span> - Root privilege escalation bypass</div>
              <div><span className="text-amber-300 font-bold">matrix</span> - Toggle digital phosphor rain</div>
              <div><span className="text-amber-300 font-bold">clear</span> - Clear terminal scrollback</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        resp = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-emerald-400 font-bold">{PORTFOLIO_DATA.profile.name} ({PORTFOLIO_DATA.profile.callsign})</p>
            <p className="text-cyan-300">{PORTFOLIO_DATA.profile.title}</p>
            <p className="text-slate-400">{PORTFOLIO_DATA.profile.specialization}</p>
            <p className="text-amber-300">Status: {PORTFOLIO_DATA.profile.status}</p>
          </div>
        );
        break;

      case 'nmap':
        resp = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-cyan-400 font-bold">Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-25</p>
            <p>Nmap scan report for localhost (127.0.0.1)</p>
            <p className="text-slate-500">Host is up (0.00014s latency).</p>
            <div className="pt-1 text-slate-200">
              <p className="text-emerald-400 font-bold">PORT      STATE  SERVICE       VERSION</p>
              <p>22/tcp    open   ssh           OpenSSH 9.6p1 (Linux Hardening / Bastion)</p>
              <p>80/tcp    open   http          Nginx 1.26 (Web Security & WAF Integration)</p>
              <p>389/tcp   open   ldap          Active Directory Domain Controller (Kerberos TGS Defense)</p>
              <p>8000/tcp  open   splunk-siem   Splunk Enterprise 9.2 (Detection Engineering)</p>
              <p>9200/tcp  open   elastic-sec   Elasticsearch SIEM & Kibana SOAR Pipeline</p>
            </div>
          </div>
        );
        break;

      case 'ls':
        resp = (
          <div className="space-y-1 text-xs">
            <p className="text-slate-400">Directory: /var/soc/evidence/</p>
            <div className="flex flex-wrap gap-4 text-cyan-300 font-bold">
              <span>drwxr-xr-x  cases/</span>
              <span>drwxr-xr-x  certs/</span>
              <span className="text-amber-400">-rw-r--r--  resume.md</span>
              <span className="text-purple-400">-rw-r--r--  rules.yar</span>
              <span className="text-rose-400">-rwxr-xr-x  ransom.bin</span>
              <span className="text-slate-500">-rw-------  flag.txt (chmod 0600)</span>
            </div>
          </div>
        );
        break;

      case 'cat':
        if (!sub) {
          resp = <span className="text-rose-400">cat: missing operand. Usage: cat &lt;filename&gt;</span>;
        } else if (sub.includes('resume')) {
          resp = (
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-cyan-400 font-bold">=== RESUME OVERVIEW ===</p>
              <p className="text-slate-200">{PORTFOLIO_DATA.profile.summary}</p>
              <p className="text-amber-300 pt-1">Type or click 'EXECUTIVE RESUME' on the top bar for full printable PDF!</p>
            </div>
          );
        } else if (sub.includes('flag.txt')) {
          resp = (
            <div className="text-rose-400 text-xs">
              cat: flag.txt: Permission denied. Memory forensics extraction required. Run: <span className="text-cyan-300">yara -s rules.yar ransom.bin</span>
            </div>
          );
        } else if (sub.includes('rules.yar')) {
          resp = (
            <div className="text-amber-300 text-xs font-mono">
              rule Ransom_Payload_Signature &#123; strings: $flag_sig = "FLAG&#123;y4r4_m3m0ry_f0r3ns1cs_m4st3r_0019&#125;" condition: $flag_sig &#125;
            </div>
          );
        } else {
          resp = <span className="text-rose-400">cat: {sub}: No such file or directory. Try 'ls' to see files.</span>;
        }
        break;

      case 'yara':
        // Flag 5 challenge
        const flag5 = PORTFOLIO_DATA.ctfChallenges.find(c => c.id === 5)?.flag || "";
        soundFx.playSuccess();
        resp = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold">[+] Running YARA Rule Engine v4.5.1 against quarantined memory sample...</p>
            <div className="bg-slate-950 p-2.5 rounded border border-emerald-500 text-emerald-400 space-y-1 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
              <p className="font-bold">[MATCH DETECTED] 0x0018f4a0: $flag_sig: {flag5}</p>
              <p className="text-slate-300 text-[11px]">[INFO] Signature matched: T1055.001 Process Injection Memory Pattern.</p>
              <p className="text-amber-300 text-[11px]">[!] CTF CHALLENGE 5 UNLOCKED! Copy the flag token above or run 'submit_flag {flag5}'.</p>
            </div>
          </div>
        );
        break;

      case 'submit_flag':
        if (!sub) {
          resp = <span className="text-rose-400">Usage: submit_flag FLAG&#123;...&#125;</span>;
        } else {
          const res = submitFlag(sub);
          resp = (
            <span className={res.success ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
              {res.message}
            </span>
          );
        }
        break;

      case 'ciso_override':
      case 'sudo':
        unlockAllCheat();
        resp = (
          <div className="text-emerald-400 font-bold text-xs space-y-1">
            <p>[✓] EMERGENCY CISO / ROOT OVERRIDE GRANTED.</p>
            <p className="text-cyan-300">All CTF Challenges solved and classified files decrypted!</p>
          </div>
        );
        break;

      case 'matrix':
        toggleMatrixRain();
        resp = <span className="text-emerald-400 text-xs">Toggled Matrix digital rain overlay.</span>;
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        resp = (
          <span className="text-rose-400 text-xs">
            command not found: {cmd}. Type <span className="text-cyan-300 font-bold">'help'</span> for available commands.
          </span>
        );
        break;
    }

    setHistory(prev => [...prev, { id: Date.now(), command: raw, response: resp }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <section className={`tactical-border rounded-lg bg-slate-950/95 border border-slate-800 transition-all flex flex-col ${
      isExpanded ? 'fixed inset-4 z-50 p-4 shadow-2xl' : 'p-4'
    }`}>
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 select-none">
        <div className="flex items-center gap-2 text-xs font-mono">
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-100 font-bold">OPERATOR CLI // REVERSE SHELL</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">operator@sentinel-soc:~#</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-cyan-300 p-1 rounded hover:bg-slate-900 cursor-pointer"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className={`overflow-y-auto font-mono text-xs space-y-3 cursor-text ${
          isExpanded ? 'flex-1 max-h-none' : 'h-64'
        }`}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <span className="text-emerald-400 font-mono">operator@redteam:~#</span>
              <span className="text-slate-100">{item.command}</span>
            </div>
            <div className="pl-4">{item.response}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Prompt */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-slate-800 mt-2">
        <span className="text-emerald-400 font-mono text-xs font-bold shrink-0">
          operator@redteam:~#
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command ('help', 'yara', 'whoami', 'nmap')..."
          className="bg-transparent text-cyan-300 text-xs font-mono w-full focus:outline-none placeholder-slate-600"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="p-1 bg-cyan-950 text-cyan-400 hover:bg-cyan-900 border border-cyan-700 rounded text-xs cursor-pointer"
        >
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>

    </section>
  );
};
