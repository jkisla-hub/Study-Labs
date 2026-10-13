import React from 'react';
import { useAcademy } from '../context/AcademyContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useAcademy();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-mono">
                ∑
              </span>
              <span>Study Labs 수학학원</span>
            </div>
            <p className="text-slate-400 text-xs">
              대치·목동 수리과학 전문 아카데미 | 등록번호: 강남 제12904호
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <button
              onClick={() => setActiveView('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              학원 소개
            </button>
            <button
              onClick={() => setActiveView('curriculum')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              정규 커리큘럼
            </button>
            <button
              onClick={() => setActiveView('booking')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              수업 예약 시스템
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              학생 관리 포털
            </button>
            <button
              onClick={() => setActiveView('faculty')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              강사진
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-500">
          <div className="space-y-1">
            <p>상호: Study Labs 수리과학아카데미 | 대표자: 정우성 | 사업자등록번호: 211-88-94012</p>
            <p>본원 주소: 서울특별시 강남구 도곡로 408 디마크빌딩 4·5층 | 전화: 02-555-8291</p>
          </div>
          <div className="md:text-right space-y-1">
            <p>© {new Date().getFullYear()} Study Labs Academy. All rights reserved.</p>
            <p className="text-slate-600">개인정보처리방침 · 학원설립운영등록증 비치</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
