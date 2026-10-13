import React from 'react';
import { useAcademy } from '../context/AcademyContext';

export const FacultySection: React.FC = () => {
  const { teachers, setActiveView } = useAcademy();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Study Labs Faculty & Research
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            서울대·KAIST 수리과학부 출신 전문 연구진
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            단순 강의를 넘어 기출 문항 분석, 자체 교재 집필, 1:1 오답 클리닉을 직접 지도하는 수리과학 전문가 그룹입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="space-y-4">
                {/* Avatar Icon Container with Mathematical Aesthetics */}
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-indigo-300 font-extrabold text-xl flex items-center justify-center border border-slate-800 shadow-sm">
                  {t.name.slice(0, 1)}
                </div>

                <div>
                  <div className="text-xs font-semibold text-indigo-600">{t.role}</div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{t.name}</h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{t.degree}</div>
                </div>

                <div className="flex flex-wrap gap-1 text-[11px]">
                  {t.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.bio}
                </p>

                <div className="pt-2 border-t border-slate-200/60 space-y-1 text-[11px] text-slate-500">
                  {t.career.map((c, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <span className="text-indigo-500">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200/60">
                <button
                  onClick={() => setActiveView('booking')}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                >
                  강사 배정 상담 예약 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
