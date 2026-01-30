
import React, { useEffect, useRef, useState } from 'react';
import { LiveSession } from '../types';

interface LiveSessionOverlayProps {
  session: LiveSession;
  onClose: () => void;
}

const LiveSessionOverlay: React.FC<LiveSessionOverlayProps> = ({ session, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermissions(true);
        }
      } catch (err) {
        alert("Camera and Microphone access are required to participate in live sessions at MGCC.");
        onClose();
      }
    }
    startMedia();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 text-white flex flex-col">
      <div className="p-4 bg-gray-800 flex justify-between items-center border-b border-gray-700">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 bg-red-500 animate-pulse`}></span>
            {session.type === 'CLASS' ? 'Live Class' : 'Proctored Exam'}
          </h2>
          <p className="text-sm text-gray-400">{session.title} - {session.teacherName}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
        >
          Leave Session
        </button>
      </div>

      <div className="flex-1 relative flex flex-col md:flex-row p-4 gap-4">
        {/* Main Content (Simulated) */}
        <div className="flex-1 bg-black rounded-2xl flex items-center justify-center overflow-hidden border border-gray-700">
          <div className="text-center">
            {session.type === 'CLASS' ? (
              <img src="https://picsum.photos/seed/slide/800/450" alt="Lecture Slide" className="max-w-full rounded shadow-xl" />
            ) : (
              <div className="max-w-md bg-white text-gray-900 p-8 rounded-xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Exam in Progress</h3>
                <p className="mb-6">Please do not switch tabs or use external resources. Your camera and microphone are being monitored.</p>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50 font-medium">1. What is the SI unit of Force?</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 border rounded hover:bg-blue-50">Joule</button>
                    <button className="p-2 border rounded hover:bg-blue-50 font-bold border-blue-600 bg-blue-50">Newton</button>
                    <button className="p-2 border rounded hover:bg-blue-50">Watt</button>
                    <button className="p-2 border rounded hover:bg-blue-50">Pascal</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Camera Preview */}
        <div className="w-full md:w-80 h-60 md:h-auto flex flex-col gap-4">
          <div className="relative flex-1 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            {isVideoOff ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">ME</div>
              </div>
            ) : (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover mirror transform scale-x-[-1]" />
            )}
            <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-xs font-bold">You (Participant)</div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
             <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionOverlay;
