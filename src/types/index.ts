export type GradeLevel = '초등 5-6학년' | '중1' | '중2' | '중3' | '고1' | '고2' | '고3' | 'N수/재수';

export type MathTrack = '내신 1등급 집중반' | '수능·수리논술 킬러반' | '영재·과고 선행반' | '기초·개념 완성반';

export interface Student {
  id: string;
  name: string;
  school: string;
  grade: GradeLevel;
  track: MathTrack;
  classRoom: string;
  assignedTeacher: string;
  parentPhone: string;
  studentPhone: string;
  joinDate: string;
  targetUniversity: string;
  currentScoreAverage: number;
  weakTopics: string[];
  notes: string;
}

export type TestType = '주간 단원평가' | '월간 종합모의고사' | '학교 내신대비' | '수능 킬러 진단';

export interface TestScore {
  id: string;
  studentId: string;
  testName: string;
  testType: TestType;
  date: string;
  score: number;
  maxScore: number;
  averageScore: number;
  weakTopics: string[];
  feedback: string;
}

export type AttendanceStatus = '출석' | '지각' | '결석' | '보강완료' | '보강예정';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  time: string;
  status: AttendanceStatus;
  note?: string;
}

export interface WeeklyReport {
  id: string;
  studentId: string;
  weekRange: string;
  conceptScore: number; // 1-5
  problemSolvingScore: number; // 1-5
  homeworkRate: number; // 0 - 100%
  teacherComment: string;
  nextWeekGoal: string;
  createdAt: string;
  sentToParent: boolean;
  sentAt?: string;
}

export type BookingType = '입학 진단평가' | '1:1 맞춤 수학클리닉' | '대표원장 심층 학습상담' | '주말 파이널 특강 체험';
export type BookingStatus = '접수대기' | '예약확정' | '상담완료' | '예약취소';

export interface Booking {
  id: string;
  bookingCode: string;
  type: BookingType;
  studentName: string;
  parentPhone: string;
  studentGrade: GradeLevel;
  preferredDate: string;
  preferredTime: string;
  currentMathProgress: string;
  notes: string;
  status: BookingStatus;
  assignedTeacher?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  gradeCategory: string;
  track: string;
  targetGrades: string;
  badge: string;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  price: string;
  description: string;
  features: string[];
  syllabus: { week: number; title: string; detail: string }[];
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  degree: string;
  subjects: string[];
  bio: string;
  career: string[];
}
