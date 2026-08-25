import React, { useEffect, useRef, useState } from 'react';
import { Shield, Radio, Activity, AlertTriangle, Crosshair } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AttackPoint {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  type: string;
  sourceCity: string;
  destCity: string;
  color: string;
}

export const ThreatRadarMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeAttacksCount, setActiveAttacksCount] = useState<number>(14);
  const [lastBlockedThreat, setLastBlockedThreat] = useState<string>("CobaltStrike Beacon (194.26.29.112)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 240;
    };
    resize();
    window.addEventListener('resize', resize);

    // Simulated attack nodes (cyber attack arcs)
    const cities = [
      { name: "Frankfurt", x: 0.48, y: 0.35 },
      { name: "Tokyo", x: 0.85, y: 0.45 },
      { name: "São Paulo", x: 0.32, y: 0.78 },
      { name: "Singapore", x: 0.76, y: 0.58 },
      { name: "Ashburn (US-East)", x: 0.25, y: 0.38 },
      { name: "London", x: 0.45, y: 0.32 },
      { name: "Sydney", x: 0.88, y: 0.82 }
    ];

    const attackTypes = [
      { name: "SYN Flood / DDoS", color: "#ff0055" },
      { name: "Kerberoast SPN TGS", color: "#ffb703" },
      { name: "SQLi Probing", color: "#00f0ff" },
      { name: "Cobalt Strike C2", color: "#ff0055" },
      { name: "Brute Force RDP", color: "#9d4edd" }
    ];

    const activeArcs: AttackPoint[] = [];

    const spawnAttack = () => {
      if (activeArcs.length > 8) return;
      const srcIdx = Math.floor(Math.random() * cities.length);
      let dstIdx = Math.floor(Math.random() * cities.length);
      while (dstIdx === srcIdx) {
        dstIdx = Math.floor(Math.random() * cities.length);
      }

      const atkType = attackTypes[Math.floor(Math.random() * attackTypes.length)];

      activeArcs.push({
        id: Math.random(),
        startX: cities[srcIdx].x,
        startY: cities[srcIdx].y,
        targetX: cities[dstIdx].x,
        targetY: cities[dstIdx].y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        type: atkType.name,
        sourceCity: cities[srcIdx].name,
        destCity: cities[dstIdx].name,
        color: atkType.color
      });

      if (Math.random() > 0.6) {
        setLastBlockedThreat(`${atkType.name} -> ${cities[dstIdx].name}`);
        setActiveAttacksCount(prev => Math.max(8, Math.min(28, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    };

    const interval = setInterval(spawnAttack, 1200);

    let radarAngle = 0;

    const render = () => {
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw World City Nodes
      cities.forEach(city => {
        const cx = city.x * w;
        const cy = city.y * h;

        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        // Node Glow Ring
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '9px monospace';
        ctx.fillText(city.name, cx + 6, cy + 3);
      });

      // Draw Animated Attack Arcs
      for (let i = activeArcs.length - 1; i >= 0; i--) {
        const arc = activeArcs[i];
        arc.progress += arc.speed;

        const sx = arc.startX * w;
        const sy = arc.startY * h;
        const tx = arc.targetX * w;
        const ty = arc.targetY * h;

        // Quadratic Bézier curve midpoint
        const mx = (sx + tx) / 2;
        const my = (sy + ty) / 2 - 35;

        // Draw Arc Path
        ctx.strokeStyle = `${arc.color}33`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(mx, my, tx, ty);
        ctx.stroke();

        // Calculate projectile position on quadratic curve
        const t = arc.progress;
        const px = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * mx + t * t * tx;
        const py = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * my + t * t * ty;

        // Draw moving packet
        ctx.fillStyle = arc.color;
        ctx.shadowColor = arc.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        if (arc.progress >= 1) {
          // Pulse at target
          ctx.strokeStyle = arc.color;
          ctx.beginPath();
          ctx.arc(tx, ty, 10, 0, Math.PI * 2);
          ctx.stroke();
          activeArcs.splice(i, 1);
        }
      }

      // Draw Radar Sweep in corner
      const rx = w - 45;
      const ry = 45;
      const radius = 35;
      radarAngle += 0.03;

      ctx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rx, ry, radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      // Radar sweep line
      ctx.strokeStyle = '#00ff66';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + Math.cos(radarAngle) * radius, ry + Math.sin(radarAngle) * radius);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="tactical-border rounded-lg overflow-hidden p-3 bg-slate-950/90 border border-slate-800 relative">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold tracking-wider">
          <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>GLOBAL THREAT TELEMETRY MAP</span>
          <span className="bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-700 text-[10px]">LIVE GRID</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>INTERCEPTOR: ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>WAF / EDR: 100% HEALTH</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[240px] rounded bg-slate-950">
        <canvas ref={canvasRef} className="w-full h-full block rounded" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 border-t border-slate-800 text-xs font-mono">
        <div className="bg-slate-900/80 p-2 rounded border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">ACTIVE THREATS</span>
          <span className="text-rose-400 font-bold glow-red">{activeAttacksCount} ATTEMPTS</span>
        </div>
        <div className="bg-slate-900/80 p-2 rounded border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">SOC LATENCY</span>
          <span className="text-cyan-400 font-bold">14ms (EDGE)</span>
        </div>
        <div className="bg-slate-900/80 p-2 rounded border border-slate-800 col-span-2 flex items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-slate-400">LAST MITIGATED:</span>
          <span className="text-amber-300 font-semibold truncate ml-2">{lastBlockedThreat}</span>
        </div>
      </div>
    </div>
  );
};
