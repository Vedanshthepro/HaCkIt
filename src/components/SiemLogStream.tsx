import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Search, 
  Play, 
  Pause, 
  Flame, 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { PORTFOLIO_DATA, TelemetryLog } from '../data/portfolioData';
import { useCTF } from '../context/CTFContext';
import { soundFx } from '../utils/audio';

export const SiemLogStream: React.FC = () => {
  const { submitFlag, solvedFlags } = useCTF();
  const [logs, setLogs] = useState<TelemetryLog[]>(PORTFOLIO_DATA.initialLogs);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sqliTriggered, setSqliTriggered] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dynamic log generator to simulate real-time live ingestion
  useEffect(() => {
    if (!isStreaming) return;

    const sources = ["EDR-CROWDSTRIKE", "ZEEK_BRO", "SURICATA_CORE", "AWS_GUARDDUTY", "WIN_EVENT_4688", "FORTINET_FW", "CLOUDFLARE_WAF"];
    const events = ["BEACON_DETECT", "PROCESS_INJECTION", "OUTBOUND_SSH_BURST", "DNS_TUNNEL_SUSPECT", "PRIV_ESC_SE_IMPERSONATE", "PORT_SCAN_XMAS"];
    const levels: ('CRITICAL' | 'ALERT' | 'WARN' | 'INFO')[] = ['CRITICAL', 'ALERT', 'WARN', 'INFO'];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const src = sources[Math.floor(Math.random() * sources.length)];
      const ev = events[Math.floor(Math.random() * events.length)];
      const lvl = levels[Math.floor(Math.random() * levels.length)];
      const randIp = `10.${Math.floor(Math.random() * 8)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;

      const newLog: TelemetryLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: timeStr,
        source: src,
        event: ev,
        level: lvl,
        destIp: randIp,
        payload: `Telemetry packet size=${Math.floor(Math.random() * 1500)}B signature_id=SID-${Math.floor(Math.random() * 90000 + 10000)}`
      };

      setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Check for CTF Flag 2: SQL Injection / Filter bypass in Search bar
  useEffect(() => {
    const raw = searchFilter.toLowerCase().trim();
    const sqliPatterns = ["' or '1'='1", "or 1=1", "union select", "' or 1=1--", "' union select", "admin'--", "' or 'a'='a"];

    const isMatch = sqliPatterns.some(p => raw.includes(p));

    if (isMatch && !sqliTriggered) {
      setSqliTriggered(true);
      soundFx.playAlert();
    } else if (!isMatch && sqliTriggered) {
      setSqliTriggered(false);
    }
  }, [searchFilter, sqliTriggered]);

  const flag2 = PORTFOLIO_DATA.ctfChallenges.find(c => c.id === 2)?.flag || "";
  const isFlag2Solved = solvedFlags.includes(flag2);

  const filteredLogs = logs.filter(log => {
    if (sqliTriggered) return true; // SQLi bypass reveals all + secret log
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return log.source.toLowerCase().includes(q) ||
           log.event.toLowerCase().includes(q) ||
           log.payload.toLowerCase().includes(q) ||
           log.destIp.includes(q) ||
           log.level.toLowerCase().includes(q);
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundFx.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="tactical-border rounded-lg bg-slate-950/90 border border-slate-800 p-4 space-y-3">
      
      {/* Header & Stream Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-mono text-sm font-bold text-slate-100 tracking-wide">
            LIVE SIEM TELEMETRY INGESTION STREAM
          </h3>
          <span className="bg-emerald-950/70 text-emerald-300 border border-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-mono flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            INGESTING
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsStreaming(!isStreaming);
              soundFx.playClick();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500 cursor-pointer"
          >
            {isStreaming ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span>PAUSE STREAM</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>RESUME STREAM</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Query Bar with CTF Easter Egg Hint */}
      <div className="relative">
        <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono focus-within:border-cyan-400">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              soundFx.playKeypress();
            }}
            placeholder="Query telemetry: source:SURICATA, level:CRITICAL, or test SQLi bypass..."
            className="bg-transparent text-cyan-300 placeholder-slate-500 w-full focus:outline-none"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="text-slate-400 hover:text-slate-200 text-xs px-1"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* SQLi Bypass Alert / CTF Challenge 2 Flag Reveal Banner */}
      {sqliTriggered && (
        <div className="tactical-border bg-rose-950/70 border-2 border-rose-500 rounded p-3 text-xs font-mono space-y-2 box-glow-red animate-pulse">
          <div className="flex items-center justify-between text-rose-300">
            <div className="flex items-center gap-2 font-bold">
              <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>[!] SQL QUERY FILTER INJECTION EXPLOIT TRIGGERED: AUTH BYPASS DETECTED</span>
            </div>
            <span className="bg-rose-900 text-rose-200 px-2 py-0.5 rounded text-[10px] border border-rose-400 font-black">
              CTF CHALLENGE 2 SOLVED
            </span>
          </div>
          <p className="text-slate-300">
            Red-Team Telemetry Buffer Dumped: You bypassed the SIEM search sanitization filter!
          </p>
          <div className="bg-slate-950 p-2 rounded border border-rose-600 flex items-center justify-between">
            <code className="text-emerald-400 font-bold tracking-wider">{flag2}</code>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(flag2, 'sqli-flag')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedId === 'sqli-flag' ? 'COPIED!' : 'COPY FLAG'}</span>
              </button>
              {!isFlag2Solved && (
                <button
                  onClick={() => submitFlag(flag2)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded text-[10px] cursor-pointer"
                >
                  SUBMIT +200 PTS
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Log Feed Terminal Window */}
      <div 
        ref={containerRef}
        className="h-64 overflow-y-auto bg-slate-950 rounded border border-slate-800 p-2 font-mono text-[11px] space-y-1.5 select-text"
      >
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 text-xs">
            NO TELEMETRY LOGS MATCHING QUERY FILTER.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div 
              key={log.id} 
              className="flex items-start gap-2 hover:bg-slate-900/80 p-1 rounded transition-colors border-l-2 border-transparent hover:border-cyan-500 group"
            >
              <span className="text-slate-500 shrink-0 select-none">{log.timestamp}</span>
              
              <span className={`px-1 rounded text-[9px] font-bold shrink-0 ${
                log.level === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                log.level === 'ALERT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                log.level === 'WARN' ? 'bg-yellow-950 text-yellow-300 border border-yellow-800' :
                'bg-slate-800 text-cyan-300'
              }`}>
                {log.level}
              </span>

              <span className="text-cyan-400 font-semibold shrink-0">[{log.source}]</span>
              
              <span className="text-purple-400 shrink-0">{log.event}</span>

              <span className="text-slate-400 truncate flex-1 font-sans text-xs">
                {log.payload}
              </span>

              <span className="text-slate-500 shrink-0 text-[10px] hidden md:inline">
                {log.destIp}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
        <span>BUFFER: {logs.length} EVENTS IN MEMORY</span>
        <span className="flex items-center gap-1 text-slate-400">
          <Info className="w-3 h-3 text-cyan-500" />
          Hint: Try SQL injection filters in search to trigger red-team events.
        </span>
      </div>

    </section>
  );
};
