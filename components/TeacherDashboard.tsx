
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { User, StudentResult } from '../types';
import { MOCK_RESULTS } from '../constants';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'uploads' | 'schedule'>('analytics');
  
  // Group results for the pie chart
  const distribution = [
    { name: 'Excellent (80+)', value: MOCK_RESULTS.filter(r => (r.score / r.total) >= 0.8).length },
    { name: 'Average (60-80)', value: MOCK_RESULTS.filter(r => (r.score / r.total) < 0.8 && (r.score / r.total) >= 0.6).length },
    { name: 'Needs Help (<60)', value: MOCK_RESULTS.filter(r => (r.score / r.total) < 0.6).length },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Control Panel</h1>
          <p className="text-gray-600">Managing Subject: <span className="font-bold text-blue-600">{user.subject || 'All Subjects'}</span></p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          {(['analytics', 'uploads', 'schedule'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Section */}
        {activeTab === 'analytics' && (
          <>
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Student Performance Distribution</h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-semibold">Total Students</p>
                  <p className="text-2xl font-bold">1,245</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-semibold">Average Score</p>
                  <p className="text-2xl font-bold">76.4%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-semibold">Active Exams</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Uploads Section */}
        {activeTab === 'uploads' && (
          <div className="col-span-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Content Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <p className="text-lg font-bold">Upload Lecture PDF</p>
                <p className="text-sm text-gray-500">Max size 50MB</p>
                <input type="file" className="hidden" />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-lg font-bold">Add Video Lecture</p>
                <p className="text-sm text-gray-500">Supports YouTube/Vimeo/Drive</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-bold mb-4">Recent Uploads</h3>
              <div className="space-y-2">
                {['Physics_Lecture_04.pdf', 'Newtonian_Mechanics_Explanations.mp4'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{item}</span>
                    <button className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scheduling Section */}
        {activeTab === 'schedule' && (
          <div className="col-span-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Schedule New Live Session</h2>
            <form className="max-w-2xl space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Session Title</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Thermodynamics Q&A" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>LIVE CLASS</option>
                    <option>LIVE EXAM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Time</label>
                  <input type="datetime-local" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg">Schedule Session</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
