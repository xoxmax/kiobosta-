
import React from 'react';
import { User, StudentResult } from '../types';
import { MOCK_RESULTS } from '../constants';

interface ParentDashboardProps {
  user: User;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ user }) => {
  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-apple border border-white/20 min-h-[600px]">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Parent Portal</h2>
          <p className="text-sm text-gray-500 font-medium">Monitoring growth of <span className="text-blue-600 font-black">Sadiya Afrin</span></p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-2xl flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Real-time Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Learning Effort</h3>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-[10px] border-blue-600 flex items-center justify-center font-black text-xl">
              82%
            </div>
            <div>
              <p className="font-bold text-gray-900">High Engagement</p>
              <p className="text-sm text-gray-500">Student is currently in the top 15% of the Admission Warrior batch.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Recent Exams</h3>
          <div className="space-y-3">
            {MOCK_RESULTS.map((res, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-600">{res.courseId}</span>
                <span className={`font-black ${res.score / res.total > 0.8 ? 'text-green-600' : 'text-blue-600'}`}>
                  {res.score}/{res.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Professor Notes</h3>
        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 italic text-gray-600 text-sm">
          "Sadiya is showing exceptional promise in Physics. Her analytical thinking during the last Newtonian Mechanics mock test was beyond expectations. Recommend focus on Chemistry Organic sections next week."
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
