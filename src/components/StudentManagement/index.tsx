import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Student } from '../../types';
import { StudentList } from './StudentList';
import { GradeTracker } from './GradeTracker';
import { AttendanceTracker } from './AttendanceTracker';
import { WeeklyReportManager } from './WeeklyReportManager';
import { BookingManager } from './BookingManager';
import { NewStudentModal } from './NewStudentModal';
import { StudentDetailModal } from './StudentDetailModal';
import { NewScoreModal } from './NewScoreModal';
import { NewReportModal } from './NewReportModal';

export const StudentManagement: React.FC = () => {
  const { students, attendanceRecords, testScores, bookings, resetAllData } = useAcademy();

  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'attendance' | 'reports' | 'bookings'>('students');

  // Modals
  const [isNewStudentOpen, setIsNewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isNewScoreOpen, setIsNewScoreOpen] = useState(false);
  const [scoreStudentId, setScoreStudentId] = useState<string | null>(null);
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const [reportStudentId, setReportStudentId] = useState<string | null>(null);

  // Quick stats
  const totalStudents = students.length;
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = attendanceRecords.filter((a) => a.date === today);
  const presentCount = todayRecords.filter((a) => a.status === '출석').length;
  const todayAttendanceRate = totalStudents > 0
    ? Math.round((presentCount / totalStudents) * 100)
    : 100;
  
  const avgScore = testScores.length > 0
    ? Math.round((testScores.reduce((acc, curr) => acc + curr.score, 0) / testScores.length) * 10) / 10
    : 90;

  const pendingBookingsCount = bookings.filter((b) => b.status === '접수대기').length;

  return (
    <div className="py-8 bg-slate-100/70 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-indigo-700">Study Labs LMS</span>
              <span aria-hidden="true">/</span>
              <span>학사 통합 관리 포털</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              원생 및 학사 관리 시스템
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('샘플 데이터 상태로 초기화하시겠습니까?')) {
                  resetAllData();
                }
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              데이터 초기화
            </button>
            <button
              onClick={() => setIsNewStudentOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              + 원생 등록
            </button>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-[11px] font-medium text-slate-500">총 재원생 수</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono-numbers">
              {totalStudents}명
            </div>
            <span className="text-[11px] text-slate-400">대치 본원 정원 관리</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-[11px] font-medium text-slate-500">오늘 출석률</span>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono-numbers">
              {todayAttendanceRate}%
            </div>
            <span className="text-[11px] text-emerald-700">등원 체크 정상 진행 중</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-[11px] font-medium text-slate-500">전체 평균 평가 점수</span>
            <div className="text-2xl font-extrabold text-indigo-600 font-mono-numbers">
              {avgScore}점
            </div>
            <span className="text-[11px] text-slate-400">최근 단원평가 기준</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <span className="text-[11px] font-medium text-slate-500">신규 예약 접수 대기</span>
            <div className="text-2xl font-extrabold text-amber-600 font-mono-numbers">
              {pendingBookingsCount}건
            </div>
            <span className="text-[11px] text-amber-700">상담 배정 요망</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'students'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            학생 명부 ({totalStudents})
          </button>

          <button
            onClick={() => setActiveTab('grades')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'grades'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            성적 & 테스트 관리 ({testScores.length})
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'attendance'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            출결 체크보드
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            주간 리포트 & 알림톡
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>수업 예약 접수 관리</span>
            {pendingBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingBookingsCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab View Contents */}
        {activeTab === 'students' && (
          <StudentList
            onSelectStudent={(s) => setSelectedStudent(s)}
            onOpenNewStudent={() => setIsNewStudentOpen(true)}
          />
        )}

        {activeTab === 'grades' && (
          <GradeTracker
            onOpenNewScore={() => {
              setScoreStudentId(null);
              setIsNewScoreOpen(true);
            }}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTracker />
        )}

        {activeTab === 'reports' && (
          <WeeklyReportManager
            onOpenNewReport={() => {
              setReportStudentId(null);
              setIsNewReportOpen(true);
            }}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingManager />
        )}

        {/* Modals */}
        <NewStudentModal
          isOpen={isNewStudentOpen}
          onClose={() => setIsNewStudentOpen(false)}
        />

        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onOpenAddScore={(id) => {
            setScoreStudentId(id);
            setIsNewScoreOpen(true);
          }}
          onOpenAddReport={(id) => {
            setReportStudentId(id);
            setIsNewReportOpen(true);
          }}
        />

        <NewScoreModal
          isOpen={isNewScoreOpen}
          preselectedStudentId={scoreStudentId}
          onClose={() => setIsNewScoreOpen(false)}
        />

        <NewReportModal
          isOpen={isNewReportOpen}
          preselectedStudentId={reportStudentId}
          onClose={() => setIsNewReportOpen(false)}
        />
      </div>
    </div>
  );
};
