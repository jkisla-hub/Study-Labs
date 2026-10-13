import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  TestScore,
  AttendanceRecord,
  WeeklyReport,
  Booking,
  Course,
  Teacher
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_TEACHERS,
  INITIAL_TEST_SCORES,
  INITIAL_ATTENDANCE,
  INITIAL_REPORTS,
  INITIAL_BOOKINGS
} from '../data/mockData';

interface AcademyContextType {
  students: Student[];
  courses: Course[];
  teachers: Teacher[];
  testScores: TestScore[];
  attendanceRecords: AttendanceRecord[];
  weeklyReports: WeeklyReport[];
  bookings: Booking[];
  activeView: string;
  setActiveView: (view: string) => void;
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  // Student operations
  addStudent: (student: Omit<Student, 'id' | 'joinDate' | 'currentScoreAverage'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
  // Test scores
  addTestScore: (score: Omit<TestScore, 'id'>) => void;
  // Attendance
  toggleAttendance: (studentId: string, date: string, status: AttendanceRecord['status']) => void;
  // Weekly report
  addWeeklyReport: (report: Omit<WeeklyReport, 'id' | 'createdAt' | 'sentToParent'>) => void;
  sendReportNotification: (reportId: string) => void;
  // Booking operations
  addBooking: (booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  cancelBookingByCode: (bookingCode: string) => boolean;
  getBookingByCodeOrPhone: (query: string) => Booking[];
  // Reset data
  resetAllData: () => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENTS: 'studylabs_students_v1',
  SCORES: 'studylabs_scores_v1',
  ATTENDANCE: 'studylabs_attendance_v1',
  REPORTS: 'studylabs_reports_v1',
  BOOKINGS: 'studylabs_bookings_v1',
};

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [testScores, setTestScores] = useState<TestScore[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCORES);
      return saved ? JSON.parse(saved) : INITIAL_TEST_SCORES;
    } catch {
      return INITIAL_TEST_SCORES;
    }
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
    } catch {
      return INITIAL_ATTENDANCE;
    }
  });

  const [weeklyReports, setWeeklyReports] = useState<WeeklyReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const courses = INITIAL_COURSES;
  const teachers = INITIAL_TEACHERS;

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(testScores));
  }, [testScores]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(weeklyReports));
  }, [weeklyReports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  // Operations
  const addStudent = (studentData: Omit<Student, 'id' | 'joinDate' | 'currentScoreAverage'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
      joinDate: today,
      currentScoreAverage: 88.0
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    setTestScores(prev => prev.filter(sc => sc.studentId !== studentId));
    setAttendanceRecords(prev => prev.filter(att => att.studentId !== studentId));
    setWeeklyReports(prev => prev.filter(rep => rep.studentId !== studentId));
    if (selectedStudentId === studentId) setSelectedStudentId(null);
  };

  const addTestScore = (scoreData: Omit<TestScore, 'id'>) => {
    const newScore: TestScore = {
      ...scoreData,
      id: `sc-${Date.now()}`
    };
    setTestScores(prev => [newScore, ...prev]);

    // Recalculate student score average
    const studentScores = [newScore, ...testScores.filter(s => s.studentId === scoreData.studentId)];
    const avg = Math.round((studentScores.reduce((acc, curr) => acc + curr.score, 0) / studentScores.length) * 10) / 10;
    setStudents(prev => prev.map(st => st.id === scoreData.studentId ? { ...st, currentScoreAverage: avg } : st));
  };

  const toggleAttendance = (studentId: string, date: string, status: AttendanceRecord['status']) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setAttendanceRecords(prev => {
      const existing = prev.find(a => a.studentId === studentId && a.date === date);
      if (existing) {
        return prev.map(a => a.id === existing.id ? { ...a, status, time: status === '결석' ? '-' : timeStr } : a);
      } else {
        const newRecord: AttendanceRecord = {
          id: `att-${Date.now()}`,
          studentId,
          date,
          time: timeStr,
          status
        };
        return [newRecord, ...prev];
      }
    });
  };

  const addWeeklyReport = (reportData: Omit<WeeklyReport, 'id' | 'createdAt' | 'sentToParent'>) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const newReport: WeeklyReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: dateStr,
      sentToParent: false
    };
    setWeeklyReports(prev => [newReport, ...prev]);
  };

  const sendReportNotification = (reportId: string) => {
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setWeeklyReports(prev => prev.map(r => r.id === reportId ? { ...r, sentToParent: true, sentAt: timeStr } : r));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status'>): Booking => {
    const randomCode = `STL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingCode: randomCode,
      status: '접수대기',
      createdAt: timeStr
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const cancelBookingByCode = (bookingCode: string): boolean => {
    const target = bookings.find(b => b.bookingCode.trim() === bookingCode.trim());
    if (target) {
      setBookings(prev => prev.map(b => b.id === target.id ? { ...b, status: '예약취소' } : b));
      return true;
    }
    return false;
  };

  const getBookingByCodeOrPhone = (query: string): Booking[] => {
    const clean = query.trim().replace(/[-\s]/g, '');
    if (!clean) return [];
    return bookings.filter(b => {
      const codeMatch = b.bookingCode.replace(/[-\s]/g, '').toLowerCase().includes(clean.toLowerCase());
      const phoneMatch = b.parentPhone.replace(/[-\s]/g, '').includes(clean);
      const nameMatch = b.studentName.includes(query.trim());
      return codeMatch || phoneMatch || nameMatch;
    });
  };

  const resetAllData = () => {
    setStudents(INITIAL_STUDENTS);
    setTestScores(INITIAL_TEST_SCORES);
    setAttendanceRecords(INITIAL_ATTENDANCE);
    setWeeklyReports(INITIAL_REPORTS);
    setBookings(INITIAL_BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.SCORES);
    localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  };

  return (
    <AcademyContext.Provider
      value={{
        students,
        courses,
        teachers,
        testScores,
        attendanceRecords,
        weeklyReports,
        bookings,
        activeView,
        setActiveView,
        selectedStudentId,
        setSelectedStudentId,
        addStudent,
        updateStudent,
        deleteStudent,
        addTestScore,
        toggleAttendance,
        addWeeklyReport,
        sendReportNotification,
        addBooking,
        updateBookingStatus,
        cancelBookingByCode,
        getBookingByCodeOrPhone,
        resetAllData
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
