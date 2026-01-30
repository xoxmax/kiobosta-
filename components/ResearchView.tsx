
import React, { useState } from 'react';
import { User, Role } from '../types';

interface ResearchViewProps {
  user: User;
  searchQuery: string;
}

const ResearchView: React.FC<ResearchViewProps> = ({ user, searchQuery }) => {
  const isFaculty = user.role === Role.TEACHER || user.role === Role.PROFESSOR || user.role === Role.ADMIN;

  const publications = [
    { title: "Foundations of Quantum Logic", author: "Prof. S. Rahman", year: "2024", type: "Thesis", tags: ["Physics", "AI"] },
    { title: "Bangladeshi Startup Ecosystem v2", author: "Mgcc Strategy", year: "2023", type: "Market Research", tags: ["Entrepreneurship"] },
    { title: "Advanced Newtonian Dynamics", author: "Dr. Azad Islam", year: "2024", type: "Lecture Series", tags: ["SSC", "HSC"] },
  ];

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-in fade-in duration-700 space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Research Hub.</h1>
          <p className="text-gray-400 font-medium text-lg mt-2">The collaborative engine for MGCC faculty and high-potential students.</p>
        </div>
        {isFaculty && (
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 hover:scale-105 transition-transform">
            Publish New Material
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-apple border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Recent Publications'}
            </h3>
            <div className="space-y-4">
              {filteredPublications.map((pub, i) => (
                <div key={i} className="group p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-gray-200 hover:bg-white transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex gap-2 mb-2">
                        {pub.tags.map(tag => (
                          <span key={tag} className="text-[8px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{pub.title}</h4>
                      <p className="text-xs text-gray-400 font-bold mt-1">{pub.author} • {pub.year} • {pub.type}</p>
                    </div>
                    <button className="p-4 bg-white rounded-2xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              {filteredPublications.length === 0 && (
                <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                  No matching publications found
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-indigo-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all duration-700" />
            <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-6 relative z-10">Research Lab Access</h3>
            <p className="text-2xl font-medium tracking-tight leading-tight relative z-10 mb-8">Enter the secure environment for neural network simulation and virtual experiments.</p>
            <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest relative z-10 hover:bg-gray-100 transition-colors shadow-xl">
              Launch Lab Instance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchView;
