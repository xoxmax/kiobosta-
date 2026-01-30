
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import CoursePreview from './components/CoursePreview';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';
import ParentDashboard from './components/ParentDashboard';
import ProfessorPortal from './components/ProfessorPortal';
import ResearchView from './components/ResearchView';
import LoginModal from './components/LoginModal';
import AICenter from './components/AICenter';
import { Role, User, Course, PaymentRequest, DemoPaymentNumber } from './types';
import { INITIAL_COURSES, MOCK_STUDENT } from './constants';

type AppView = 'HOME' | 'DASHBOARD' | 'PROGRAMS' | 'RESEARCH' | 'COURSE_PREVIEW' | 'REGISTRATION';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  
  const [pendingPayments, setPendingPayments] = useState<PaymentRequest[]>([]);
  const [demoNumbers] = useState<DemoPaymentNumber[]>([
    { id: 'dn-1', number: '01712345678', label: 'Internal bKash', isUsed: false }
  ]);

  const handleLogin = (role: Role, identifier: string, subject?: string) => {
    let mockUser: User;
    if (role === Role.STUDENT) {
      mockUser = { ...MOCK_STUDENT, emailOrPhone: identifier };
    } else if (role === Role.PARENT) {
      mockUser = { ...MOCK_STUDENT, role: Role.PARENT, studentPhone: identifier, name: 'Parent of Sadiya' };
    } else {
      mockUser = {
        id: 'usr-' + Math.random().toString(36).substr(2, 5),
        name: identifier,
        role: role,
        subject: subject,
        achievements: [],
        enrolledCourses: [],
        attendance: 0,
        performanceScore: 0
      };
    }
    setUser(mockUser);
    setShowLogin(false);
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('HOME');
  };

  const handleRegistrationSubmit = (courseId?: string) => {
    // Logic for actual enrollment after registration
    const mockRegUser: User = {
      ...MOCK_STUDENT,
      enrolledCourses: courseId ? [courseId] : []
    };
    setUser(mockRegUser);
    setCurrentView('DASHBOARD');
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <div className="space-y-32">
            <section className="text-center mt-20 max-w-6xl px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border border-gray-100 rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-12 shadow-apple">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" /> 
                Unified Learning Infrastructure
              </div>
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] text-[#1D1D1F]">
                Academic<br /><span className="text-blue-600">Mastery.</span>
              </h1>
              <p className="text-3xl md:text-4xl text-gray-400 font-medium mb-20 max-w-4xl mx-auto leading-tight">
                Where elite curiosity meets verified intelligence. MGCC provides the foundation for the leaders of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button onClick={() => setShowLogin(true)} className="px-14 py-6 bg-black text-white rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Access Portal
                </button>
                <button onClick={() => setCurrentView('PROGRAMS')} className="px-14 py-6 bg-white text-black border border-gray-200 rounded-[2rem] font-black text-xl shadow-apple hover:bg-gray-50 transition-all">
                  Browse Arcs
                </button>
              </div>
            </section>

            <section className="space-y-12">
               <div className="flex justify-between items-end px-4">
                  <div>
                    <h2 className="text-5xl font-black tracking-tight">Curriculum Preview.</h2>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-3">Interactive Exploration Deck</p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredCourses.slice(0, 3).map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isLoggedIn={!!user}
                    onExplore={(c) => { setSelectedCourse(c); setCurrentView('COURSE_PREVIEW'); }}
                    onJoin={() => setShowLogin(true)}
                  />
                ))}
              </div>
            </section>
          </div>
        );
      case 'PROGRAMS':
        return (
          <div className="space-y-16 animate-in fade-in duration-700">
            <div>
              <h1 className="text-6xl font-black tracking-tight mb-4">The Catalog.</h1>
              <p className="text-xl text-gray-400 font-medium">Full access granted to registered MGCC members.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isLoggedIn={!!user}
                  onExplore={(c) => { setSelectedCourse(c); setCurrentView('COURSE_PREVIEW'); }}
                  onJoin={() => setShowLogin(true)}
                />
              ))}
            </div>
          </div>
        );
      case 'COURSE_PREVIEW':
        return selectedCourse ? (
          <CoursePreview 
            course={selectedCourse} 
            onClose={() => setCurrentView('PROGRAMS')} 
            onJoin={() => setShowLogin(true)}
          />
        ) : null;
      case 'DASHBOARD':
        return user ? (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {user.role === Role.STUDENT && <StudentDashboard user={user} allCourses={courses} />}
            {user.role === Role.TEACHER && <TeacherDashboard user={user} />}
            {user.role === Role.ADMIN && (
              <AdminDashboard 
                payments={pendingPayments} 
                demoNumbers={demoNumbers}
                onApprove={() => {}} 
                onReject={() => {}} 
                onAddDemoNumber={() => {}} 
                onRemoveDemoNumber={() => {}} 
              />
            )}
            {user.role === Role.PARENT && <ParentDashboard user={user} />}
            {user.role === Role.PROFESSOR && <ProfessorPortal user={user} />}
          </div>
        ) : null;
      case 'RESEARCH':
        return <ResearchView 
          user={user || { id: 'guest', name: 'Guest', role: Role.STUDENT, achievements: [], enrolledCourses: [], attendance: 0, performanceScore: 0 }} 
          searchQuery={searchQuery}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-black selection:text-white pb-40">
      <Navbar
        user={user}
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewChange={(v) => { setCurrentView(v); if (v === 'HOME') setSearchQuery(''); }}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <main className="max-w-[1700px] mx-auto px-12 py-20 relative">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
          <div className={user && currentView === 'DASHBOARD' ? 'xl:col-span-8' : 'xl:col-span-12'}>
            {renderCurrentView()}
          </div>
          
          {user && currentView === 'DASHBOARD' && (
            <div className="xl:col-span-4">
              <div className="sticky top-32">
                <AICenter />
              </div>
            </div>
          )}
        </div>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
    </div>
  );
};

export default App;
