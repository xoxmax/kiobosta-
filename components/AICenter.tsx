
import React, { useState, useRef, useEffect } from 'react';
import * as ai from '../lib/gemini';
import { AIChatMessage } from '../types';

const AICenter: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    { role: 'model', text: 'MGCC Intelligence online. How can I facilitate your learning journey today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'SUPPORT' | 'ACADEMIC' | 'STRATEGY'>('SUPPORT');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: Date.now() }]);

    try {
      const systemContext = `
        ${ai.PLATFORM_GUIDANCE}
        Current Mode: ${mode}
        User Query: ${userText}
      `;
      const res = await ai.chatLite(systemContext);
      setMessages(prev => [...prev, { role: 'model', text: res, timestamp: Date.now() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Signal lost. Attempting reconnection...", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[750px] bg-white rounded-[3rem] shadow-apple border border-white/40 overflow-hidden animate-in fade-in slide-in-from-right-10 duration-700">
      <div className="px-10 py-8 bg-gray-50/80 backdrop-blur-xl border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-black text-xl tracking-tighter text-[#1D1D1F]">Intelligence Hub</h3>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Unified Oracle v2.5</p>
        </div>
        <div className="flex bg-white/50 p-1 rounded-full border border-gray-100 shadow-inner">
          {(['SUPPORT', 'ACADEMIC', 'STRATEGY'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all ${mode === m ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-black'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed ${m.role === 'user' ? 'bg-black text-white rounded-tr-none shadow-2xl shadow-black/10' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-6 py-4 rounded-[1.5rem] flex gap-2 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-10 bg-white border-t border-gray-100 flex items-center gap-5">
        <input
          type="text"
          placeholder={`Input ${mode.toLowerCase()} query...`}
          className="flex-1 py-5 px-8 bg-gray-50 rounded-[2rem] border border-gray-100 focus:outline-none focus:ring-4 focus:ring-black/5 text-sm font-medium transition-all"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="p-5 bg-black text-white rounded-[2rem] hover:opacity-80 transition-opacity disabled:opacity-30 shadow-2xl shadow-black/30"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>
  );
};

export default AICenter;
