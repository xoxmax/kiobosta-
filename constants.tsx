
import { Course, Role, User, StudentResult } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'ssc-path',
    title: 'SSC Campus Road',
    teacherName: 'Dr. Azad Islam',
    teacherBio: 'Ph.D. in Theoretical Physics with 15 years of academic mentorship.',
    description: 'A symbolic journey through the foundations of academic excellence. Designed for dream college seekers.',
    price: 4500,
    duration: '6 Months',
    classLevel: 'Class 9-10',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=800&fit=crop',
    isLocked: true,
    subject: 'Core Science',
    symbolicTheme: 'The Campus Road',
    category: 'SSC',
    syllabus: [
      { id: '1', title: 'Newtonian Foundations', isDemo: true },
      { id: '2', title: 'Chemical Equilibrium', isDemo: true },
      { id: '3', title: 'Algebraic Structures', isDemo: true },
      { id: '4', title: 'Cellular Biology Basics', isDemo: false },
      { id: '5', title: 'Light & Optics', isDemo: false }
    ]
  },
  {
    id: 'hsc-bridge',
    title: 'HSC Excellence Bridge',
    teacherName: 'Prof. S. Rahman',
    teacherBio: 'Senior Faculty at MGCC, expert in Higher Mathematics and Neural Logic.',
    description: 'Connecting secondary school success to specialized higher education distinction.',
    price: 5500,
    duration: '8 Months',
    classLevel: 'HSC 1st/2nd Year',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&fit=crop',
    isLocked: true,
    subject: 'Higher Math/Physics',
    symbolicTheme: 'The Bridge',
    category: 'HSC',
    syllabus: [
      { id: '1', title: 'Advanced Vector Calculus', isDemo: true },
      { id: '2', title: 'Organic Reaction Mechanisms', isDemo: true },
      { id: '3', title: 'Electromagnetism Mastery', isDemo: false },
      { id: '4', title: 'Statistics for Science', isDemo: false }
    ]
  },
  {
    id: 'adm-warrior',
    title: 'Admission Warrior Journey',
    teacherName: 'Engr. Tanvir Ahmed',
    teacherBio: 'BUET Alumnus, specializing in Engineering Admission strategy.',
    description: 'Strategic preparation for BUET, DU, and Medical entrance wars. Adopt the warrior mindset.',
    price: 8500,
    duration: '4 Months',
    classLevel: 'Admission Seekers',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&fit=crop',
    isLocked: true,
    subject: 'Competitive Entrance',
    symbolicTheme: 'The Warrior Path',
    category: 'Admission',
    syllabus: [
      { id: '1', title: 'Engineering Math Hacks', isDemo: true },
      { id: '2', title: 'Physics Speed Problem Solving', isDemo: true },
      { id: '3', title: 'Admission Chemistry Crucials', isDemo: false }
    ]
  }
];

export const MOCK_STUDENT: User = {
  id: 'std-123',
  name: 'Sadiya Afrin',
  role: Role.STUDENT,
  emailOrPhone: '01711223344',
  parentPhone: '01888990011',
  address: 'Bashundhara R/A, Dhaka',
  registrationDetails: {
    class: 'HSC 2nd Year',
    gpa: '5.00',
    phone: '01711223344',
    email: 'sadiya@mgcc.edu',
    address: 'Bashundhara R/A, Dhaka'
  },
  achievements: ['Early Bird', 'Quiz Master', 'Top 10%'],
  enrolledCourses: ['ssc-path'],
  attendance: 94,
  performanceScore: 88
};

export const MOCK_RESULTS: StudentResult[] = [
  { courseId: 'Physics', score: 85, total: 100 },
  { courseId: 'Chemistry', score: 72, total: 100 },
  { courseId: 'Mathematics', score: 94, total: 100 },
];
