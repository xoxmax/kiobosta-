
import React from 'react';
import { Course } from '../types';

interface CoursePreviewProps {
  course: Course;
  onClose: () => void;
  onJoin: (id: string) => void;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ course, onClose, onJoin }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-5xl mx-auto">
      <button onClick={onClose} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-black transition-colors font-black text-[10px] uppercase tracking-widest">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-12 rounded-[3rem] shadow-apple border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="w-24 h-24 bg-gray-100 rounded-3xl overflow-hidden shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-4xl">
                  {course.teacherName.charAt(0)}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">{course.title}</h1>
                <p className="text-xl text-gray-500 font-medium">Under the guidance of {course.teacherName}</p>
                <div className="flex gap-4 mt-6">
                  <span className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100">
                    {course.duration} Duration
                  </span>
                  <span className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100">
                    {course.classLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em]">Faculty Profile</h3>
              <p className="text-gray-600 leading-relaxed font-medium text-lg">
                {course.teacherBio}
              </p>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] shadow-apple border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Syllabus Matrix</h3>
            <div className="space-y-4">
              {course.syllabus.map((topic, i) => (
                <div key={topic.id} className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-6">
                    <span className="text-gray-300 font-black text-xl italic">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-bold text-gray-800">{topic.title}</span>
                  </div>
                  {topic.isDemo ? (
                    <span className="text-[8px] font-black uppercase px-2 py-1 bg-green-100 text-green-600 rounded-md">Sample Video</span>
                  ) : (
                    <svg className="w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl sticky top-32">
            <div className="mb-10">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Access Status</p>
              <h4 className="text-3xl font-black">Locked.</h4>
            </div>
            <p className="text-gray-400 font-medium mb-12">Registration is required to access full materials, recorded lectures, and live examinations.</p>
            <button
              onClick={() => onJoin(course.id)}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black text-xl transition-all shadow-xl shadow-blue-500/20"
            >
              Enroll Now
            </button>
            <p className="text-center text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-8">One-time payment: ৳{course.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
