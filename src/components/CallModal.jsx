import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, ShieldCheck, Share2, Volume2, Sparkles, User, RefreshCw } from 'lucide-react';
import { callApi } from '../services/api';

export function CallModal({ isOpen, partnerName, callType = "video", onClose }) {
  if (!isOpen) return null;

  const [callStatus, setCallStatus] = useState("connecting"); // 'connecting', 'connected', 'ended'
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === "audio");
  const [seconds, setSeconds] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let timer;
    const start = async () => {
      const sess = await callApi.initiateCall(partnerName || "Relocating Seller", callType);
      setSession(sess);
      setCallStatus("connected");
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    };
    start();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [partnerName, callType]);

  const handleEndCall = async () => {
    setCallStatus("ended");
    if (session) {
      await callApi.endCall(session.callId, seconds);
    }
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const formatDuration = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl h-[85vh] rounded-3xl bg-[#080f0c] border border-emerald-500/40 shadow-2xl overflow-hidden flex flex-col justify-between">
        
        {/* Top Floating Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-white font-bold">{partnerName || "Relocating Seller"}</span>
            <span className="text-stone-400">|</span>
            <span className="text-amber-400 font-mono font-bold">{formatDuration(seconds)}</span>
          </div>

          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-800 text-[11px] text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AES-256 Encrypted WebRTC Tour</span>
          </div>
        </div>

        {/* Video Stage Area */}
        <div className="relative flex-1 bg-stone-950 flex items-center justify-center overflow-hidden">
          
          {callStatus === "connecting" && (
            <div className="text-center space-y-3 z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <div className="text-base font-bold text-white">Connecting Secure Call to {partnerName}...</div>
              <p className="text-xs text-stone-400">Establishing direct peer-to-peer connection via Lagos/London edge server.</p>
            </div>
          )}

          {callStatus === "connected" && (
            <>
              {/* Main Remote Video Stream: 4K Inspection Walkthrough */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                  alt="Live Property Video Stream"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                {/* On-Screen Watermark */}
                <div className="absolute bottom-24 left-6 text-left space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>LIVE ON-SITE INSPECTION</span>
                  </div>
                  <h3 className="text-lg font-bold text-white drop-shadow">
                    Lekki Phase 1 Duplex — Interior Walkthrough
                  </h3>
                  <p className="text-xs text-stone-300 drop-shadow">
                    Certified SellJapa Surveyor live with Seller: {partnerName}
                  </p>
                </div>
              </div>

              {/* PiP (Picture-in-Picture) Local User / Seller Camera */}
              <div className="absolute top-16 right-4 sm:top-20 sm:right-6 w-32 h-44 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl z-10 bg-stone-900">
                {isVideoOff ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-500">
                    <User className="w-8 h-8 mb-1" />
                    <span className="text-[10px]">Camera Off</span>
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Seller Webcam"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                  {partnerName}
                </div>
              </div>
            </>
          )}

          {callStatus === "ended" && (
            <div className="text-center space-y-2 z-10">
              <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                <PhoneOff className="w-7 h-7" />
              </div>
              <div className="text-base font-bold text-white">Call Session Completed</div>
              <p className="text-xs text-stone-400">Total duration: {formatDuration(seconds)}</p>
            </div>
          )}

        </div>

        {/* Bottom Control Bar */}
        <div className="bg-[#0b1410] px-6 py-4 border-t border-stone-800 flex items-center justify-center gap-4 z-20">
          
          {/* Mute Mic */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all ${
              isMuted
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-stone-900 text-stone-200 hover:bg-stone-800 border border-stone-700'
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3.5 rounded-full transition-all ${
              isVideoOff
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-stone-900 text-stone-200 hover:bg-stone-800 border border-stone-700'
            }`}
            title={isVideoOff ? "Turn On Video" : "Turn Off Video"}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all transform hover:scale-105"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Inspection Call</span>
          </button>

        </div>

      </div>
    </div>
  );
}
