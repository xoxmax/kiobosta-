
import React from 'react';
import { User, Course } from '../types';

interface StudentDashboardProps {
  user: User;
  allCourses: Course[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, allCourses }) => {
  const enrolled = allCourses.filter(c => user.enrolledCourses.includes(c.id));

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" /> Live Metrics
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Stay focused, {user.name.split(' ')[0]}.</h1>
          <p className="text-gray-400 font-medium text-lg mt-2 tracking-tight">Your adaptive learning path is ready for today’s session.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-5 rounded-[2rem] shadow-apple border border-gray-100 flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Attendance</p>
              <p className="text-2xl font-black text-blue-600">{user.attendance}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white p-10 rounded-[2.5rem] shadow-apple border border-gray-100 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full -mr-40 -mt-40 transition-transform group-hover:scale-110 duration-700" />
            <h3 className="text-xl font-black tracking-tight mb-10 relative z-10">Adaptive Milestones</h3>
            <div className="space-y-8 relative z-10">
              {[
                { title: 'Vector Calculus Basics', progress: 75, deadline: 'Today, 8 PM' },
                { title: 'English Mock Test', progress: 30, deadline: 'Tomorrow' }
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-bold text-gray-800">{m.title}</span>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{m.deadline}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${m.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Unlocked Academics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {enrolled.map(c => (
                <div key={c.id} className="bg-white p-8 rounded-[2rem] shadow-apple border border-gray-100 hover:scale-[1.02] transition-all cursor-pointer group">
                  <div className="h-32 rounded-2xl overflow-hidden mb-6 relative">
                    <img src={c.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">{c.category}</p>
                  <h4 className="text-lg font-black text-[#1D1D1F] mb-4">{c.title}</h4>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold">18 Modules Left</span>
                    <button className="text-blue-600 font-black flex items-center gap-1">Resume →</button>
                  </div>
                </div>
              ))}
              {enrolled.length === 0 && (
                <div className="col-span-full py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100 text-center">
                  <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No active enrollments</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <section className="bg-white p-10 rounded-[2.5rem] shadow-apple border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              {user.achievements.map((a, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-5 bg-gray-50 rounded-2xl group cursor-help hover:bg-black hover:text-white transition-all">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🏅</div>
                  <span className="text-[10px] font-black uppercase text-center leading-tight tracking-tighter">{a}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl overflow-hidden relative group cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 relative z-10">MGCC AI Oracle</h3>
            <p className="text-2xl font-medium tracking-tight leading-tight relative z-10">
              "Excellence is not an event, but a series of calculated habits."
            </p>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-6 relative z-10">— Pulse Guidance</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
