
import React, { useState } from 'react';
import { User } from '../types';

interface ProfessorPortalProps {
  user: User;
}

const ProfessorPortal: React.FC<ProfessorPortalProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'lab' | 'mentorship' | 'publications'>('lab');

  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-12 shadow-apple border border-white/20 min-h-[700px]">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight">Professor Collective</h2>
          <p className="text-sm text-gray-500 font-medium">Faculty Member: <span className="text-indigo-600 font-bold">{user.name}</span> • Specialized in {user.subject}</p>
        </div>
        <div className="flex bg-indigo-50/50 p-1.5 rounded-2xl border border-indigo-100">
          {(['lab', 'mentorship', 'publications'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'text-indigo-400 hover:text-indigo-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.503 1.508a2 2 0 01-1.12 1.253m-6.314-11.414L5.25 12.375m0 0l-2.25 4.5m2.25-4.5l4.5 4.5" /></svg>
              </div>
              <h3 className="text-xl font-black mb-2">Research Simulation Lab</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Execute and manage virtual lab environments for advanced students. Integrated with Python simulation engines.</p>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">Enter Research Deck</button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-black mb-2">Curriculum Forge</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Develop high-level course materials and study paths for Admission and Higher Academic tiers.</p>
            </div>
            <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-100">Open Matrix Forge</button>
          </div>
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="space-y-6">
           <h3 className="text-lg font-black mb-6">Mentorship Dashboard</h3>
           <div className="bg-indigo-50/30 p-10 rounded-[2.5rem] border border-indigo-100/50 flex flex-col items-center justify-center text-center">
             <p className="text-indigo-900 font-bold mb-4">No active 1-on-1 sessions today.</p>
             <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm">Schedule Office Hours</button>
           </div>
        </div>
      )}

      {activeTab === 'publications' && (
        <div className="space-y-4">
          <h3 className="text-lg font-black mb-6">Faculty Publications</h3>
          {[
            { title: 'Advanced Newtonian Dynamics', date: 'Oct 2023', downloads: 1240 },
            { title: 'The Admission Strategy Guide', date: 'Jan 2024', downloads: 5800 }
          ].map((pub, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex justify-between items-center shadow-sm">
              <div>
                <h4 className="font-bold text-gray-900">{pub.title}</h4>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Published {pub.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-indigo-600">{pub.downloads} Reads</p>
                <button className="text-[10px] font-black uppercase text-gray-300 hover:text-indigo-600 mt-2">Analytics</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessorPortal;
