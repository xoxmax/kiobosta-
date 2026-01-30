
export enum Role {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  PARENT = 'PARENT',
  PROFESSOR = 'PROFESSOR'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  emailOrPhone?: string;
  parentPhone?: string; // For Student
  studentPhone?: string; // For Parent
  address?: string;
  teacherId?: string;
  subject?: string;
  registrationDetails?: {
    class: string;
    gpa: string;
    phone: string;
    email: string;
    address: string;
  };
  achievements: string[];
  enrolledCourses: string[];
  attendance: number; 
  performanceScore: number;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  isDemo: boolean;
}

export interface Course {
  id: string;
  title: string;
  teacherName: string;
  teacherBio: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  classLevel: string;
  syllabus: SyllabusTopic[];
  isLocked: boolean; // Managed by Auth
  subject: string;
  symbolicTheme: string;
  category: 'SSC' | 'HSC' | 'Admission' | 'Coding' | 'AI' | 'Entrepreneurship';
}

export interface PaymentRequest {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  transactionId: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  amount: number;
  timestamp: number;
}

export interface DemoPaymentNumber {
  id: string;
  number: string;
  label: string;
  isUsed: boolean;
  assignedTo?: string;
}

export interface AIChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  sources?: any[];
}

export interface StudentResult {
  courseId: string;
  score: number;
  total: number;
}

export interface LiveSession {
  id: string;
  title: string;
  teacherName: string;
  type: 'CLASS' | 'EXAM';
  startTime: number;
}
