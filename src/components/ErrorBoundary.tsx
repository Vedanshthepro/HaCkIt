import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SOC Anomaly Intercepted:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="tactical-border p-6 rounded-lg bg-slate-950 border border-rose-600/80 text-rose-300 font-mono text-xs space-y-3 shadow-[0_0_20px_rgba(255,0,85,0.2)]">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <span>[!] SOC WORKSTATION ANOMALY INTERCEPTED</span>
          </div>
          <p className="text-slate-300">
            A telemetry parsing error occurred in this module. The fault isolation boundary has contained the incident.
          </p>
          <div className="bg-slate-900 p-2.5 rounded border border-rose-900/60 text-[11px] text-rose-200 break-all">
            {this.state.error?.message || "Unknown rendering exception"}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="flex items-center gap-2 px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 border border-rose-500 text-rose-100 rounded text-xs cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTART ISOLATED MODULE</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
