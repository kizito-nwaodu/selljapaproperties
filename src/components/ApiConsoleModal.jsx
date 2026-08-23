import React, { useState, useEffect } from 'react';
import { X, Terminal, Play, RefreshCw, CheckCircle2, ShieldCheck, Database, Trash2, ArrowRight } from 'lucide-react';
import { getApiLogs, authApi, mediaApi, chatApi, callApi } from '../services/api';

export function ApiConsoleModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [logs, setLogs] = useState([]);
  const [activeLogId, setActiveLogId] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('auth_login');
  const [requestRunning, setRequestRunning] = useState(false);

  const refreshLogs = () => {
    const list = getApiLogs();
    setLogs(list);
    if (list.length > 0 && !activeLogId) {
      setActiveLogId(list[0].id);
    }
  };

  useEffect(() => {
    refreshLogs();
    const handleApiLogged = () => {
      refreshLogs();
    };
    window.addEventListener('selljapa:api_logged', handleApiLogged);
    return () => window.removeEventListener('selljapa:api_logged', handleApiLogged);
  }, []);

  const selectedLog = logs.find(l => l.id === activeLogId) || logs[0];

  const handleRunDemoEndpoint = async () => {
    setRequestRunning(true);
    try {
      if (selectedEndpoint === 'auth_sso') {
        await authApi.loginWithSSO('google');
      } else if (selectedEndpoint === 'auth_reset') {
        await authApi.requestPasswordResetOtp('relocator.doctor@selljapa.ng');
      } else if (selectedEndpoint === 'chat_send') {
        await chatApi.sendMessage('thr-001', 'Live API Console Test Message: Is escrow ready?');
      } else if (selectedEndpoint === 'call_init') {
        await callApi.initiateCall('Dr. Tunde (Lekki Duplex)', 'video');
      }
      refreshLogs();
    } catch (err) {
      console.error(err);
    } finally {
      setRequestRunning(false);
    }
  };

  const handleClearLogs = () => {
    localStorage.removeItem('selljapa_api_logs');
    setLogs([]);
    setActiveLogId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl h-[85vh] glass-panel rounded-3xl bg-[#080d0b] border border-emerald-500/40 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#0b1410] px-4 sm:px-6 py-3 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>SellJapa Demo API Console & Network Inspector</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE SIMULATOR
                </span>
              </h2>
              <p className="text-[11px] text-stone-400">
                Inspect live REST endpoints, Auth SSO, Image Uploads, Chat & WebRTC calls.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearLogs}
              className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-red-400 border border-stone-800 text-xs flex items-center gap-1"
              title="Clear Logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Runner Bar */}
        <div className="bg-[#0e1914] px-4 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-semibold">Trigger Endpoint:</span>
            <select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="bg-stone-900 border border-stone-700 text-stone-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="auth_sso">POST /api/v1/auth/sso/google (SSO Login)</option>
              <option value="auth_reset">POST /api/v1/auth/forgot-password (OTP Code)</option>
              <option value="chat_send">POST /api/v1/chat/messages (Send Deal Msg)</option>
              <option value="call_init">POST /api/v1/calls/initiate (WebRTC Session)</option>
            </select>
          </div>

          <button
            onClick={handleRunDemoEndpoint}
            disabled={requestRunning}
            className="btn-gold py-1 px-3 text-xs flex items-center gap-1.5 font-bold"
          >
            {requestRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
            )}
            <span>Execute Request</span>
          </button>
        </div>

        {/* Split View: Request Log List (Left) & JSON Inspector (Right) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Logs List */}
          <div className="w-full sm:w-80 border-r border-stone-800 flex flex-col bg-[#060a08] overflow-y-auto divide-y divide-stone-800/60">
            <div className="p-2.5 bg-stone-900/60 text-[11px] font-bold text-stone-400 flex items-center justify-between">
              <span>Request History ({logs.length})</span>
              <button onClick={refreshLogs} className="text-emerald-400 hover:underline">Refresh</button>
            </div>

            {logs.length > 0 ? (
              logs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setActiveLogId(log.id)}
                  className={`p-3 cursor-pointer text-xs transition-all ${
                    log.id === selectedLog?.id ? 'bg-emerald-950/70 border-l-4 border-emerald-400' : 'hover:bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-amber-400">{log.method}</span>
                    <span className="text-[10px] text-stone-500">{log.timestamp}</span>
                  </div>
                  <div className="font-mono text-[11px] text-stone-200 truncate mb-1">
                    {log.endpoint}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Status {log.status} OK</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-stone-500 text-xs">
                No API calls logged yet. Perform an action or click "Execute Request" above.
              </div>
            )}
          </div>

          {/* JSON Inspector */}
          {selectedLog ? (
            <div className="flex-1 flex flex-col bg-[#070d0a] overflow-y-auto p-4 space-y-4">
              
              {/* Endpoint Header Info */}
              <div className="bg-stone-900/90 p-3.5 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                      {selectedLog.method}
                    </span>
                    <span className="text-white font-bold">{selectedLog.endpoint}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1">Request ID: {selectedLog.id}</div>
                </div>
                <div className="text-right">
                  <span className="badge-verified px-2 py-0.5 rounded text-xs font-bold">
                    {selectedLog.status} OK
                  </span>
                </div>
              </div>

              {/* Request Payload JSON */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                  Request Payload (JSON)
                </div>
                <pre className="bg-black/80 p-3.5 rounded-xl border border-stone-800 text-[11px] font-mono text-amber-200 overflow-x-auto">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>

              {/* Response Body JSON */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                  Response Body (JSON)
                </div>
                <pre className="bg-black/80 p-3.5 rounded-xl border border-emerald-900/40 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                  {JSON.stringify(selectedLog.response, null, 2)}
                </pre>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-stone-500">
              Select a request from history to view payload and response.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
