import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CurriculumSection } from './components/CurriculumSection';
import { FacultySection } from './components/FacultySection';
import { CampusSection } from './components/CampusSection';
import { BookingSystem } from './components/BookingSystem';
import { StudentManagement } from './components/StudentManagement';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView, setActiveView } = useAcademy();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <CurriculumSection />
            <FacultySection />
            <CampusSection />
            
            {/* Quick Consultation CTA banner */}
            <section className="bg-indigo-600 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  지금 바로 1:1 맞춤 진단평가와 무료 상담을 신청하세요
                </h2>
                <p className="text-indigo-100 text-sm max-w-xl mx-auto">
                  Study Labs만의 개념 구조화 진단 테스트를 통해 취약 단원을 정밀 분석하고 개인별 1등급 로드맵을 설계해 드립니다.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveView('booking')}
                    className="px-6 py-3 text-sm font-bold bg-white text-indigo-700 hover:bg-slate-100 rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    수업 및 진단평가 예약하기 →
                  </button>
                  <button
                    onClick={() => setActiveView('admin')}
                    className="px-6 py-3 text-sm font-medium bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    학생 관리 포털 둘러보기
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'curriculum' && (
          <div className="py-6">
            <CurriculumSection />
          </div>
        )}

        {activeView === 'booking' && (
          <BookingSystem />
        )}

        {activeView === 'admin' && (
          <StudentManagement />
        )}

        {activeView === 'faculty' && (
          <div className="py-6">
            <FacultySection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
}
