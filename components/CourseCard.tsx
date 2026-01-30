
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isLoggedIn: boolean;
  onExplore: (course: Course) => void;
  onJoin: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isLoggedIn, onExplore, onJoin }) => {
  const categoryColors = {
    SSC: 'text-indigo-600 bg-indigo-50',
    HSC: 'text-emerald-600 bg-emerald-50',
    Admission: 'text-rose-600 bg-rose-50',
    Coding: 'text-amber-600 bg-amber-50',
    AI: 'text-violet-600 bg-violet-50',
    Entrepreneurship: 'text-teal-600 bg-teal-50'
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-apple border border-gray-100 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative h-60 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-6 left-6">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${categoryColors[course.category]}`}>
            {course.category} Arc
          </span>
        </div>
      </div>

      <div className="p-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black text-[#1D1D1F] tracking-tight leading-none mb-1">{course.title}</h3>
            <p className="text-xs text-gray-400 font-bold italic">Facilitated by {course.teacherName}</p>
          </div>
          <span className="text-xl font-black text-[#1D1D1F]">৳{course.price}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onExplore(course)}
            className="bg-gray-50 text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all hover:bg-gray-100 border border-gray-100"
          >
            View Details
          </button>
          <button
            onClick={() => onJoin(course.id)}
            className="bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all hover:opacity-80 shadow-lg shadow-black/10"
          >
            Join MGCC
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
