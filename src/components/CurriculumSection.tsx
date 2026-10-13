import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types';

export const CurriculumSection: React.FC = () => {
  const { courses, setActiveView } = useAcademy();
  const [filter, setFilter] = useState<string>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('course-1');

  const filteredCourses = courses.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'high') return c.gradeCategory === '고등부';
    if (filter === 'middle') return c.gradeCategory === '중등부';
    if (filter === 'killer') return c.track.includes('킬러') || c.title.includes('수능');
    return true;
  });

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Study Labs Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              단계별 맞춤 정규 커리큘럼
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              중등 심화부터 고등 1등급 내신, 수능 킬러 정복까지 빈틈없는 수리과학 로드맵
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-lg shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 강좌
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'high'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              고등 정규반
            </button>
            <button
              onClick={() => setFilter('middle')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'middle'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              중등 심화·선행
            </button>
            <button
              onClick={() => setFilter('killer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'killer'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              수능·수리논술
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {filteredCourses.map((course: Course) => {
            const isExpanded = expandedCourseId === course.id;
            const remainingSeats = course.capacity - course.enrolled;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top line with metadata without pill sandwiches */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-indigo-700">{course.gradeCategory}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.track}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.instructor}</span>
                    </div>
                    <span className="text-xs font-medium text-amber-700 font-mono-numbers">
                      {remainingSeats > 0 ? `잔여 ${remainingSeats}석` : '마감'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Schedule & Info */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500">수업 일정</span>
                      <span className="font-medium">{course.schedule}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500">수강 대상</span>
                      <span className="font-medium">{course.targetGrades}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500">수강료</span>
                      <span className="font-bold text-slate-900 font-mono-numbers">{course.price}</span>
                    </div>
                  </div>

                  {/* Feature highlights */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-600">핵심 관리 포인트</div>
                    {course.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <span className="text-indigo-600 mt-0.5 font-bold">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Syllabus */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                      <div className="text-xs font-bold text-slate-800">
                        주차별 세부 진도 계획 (6주 완성)
                      </div>
                      <div className="space-y-2">
                        {course.syllabus.map((syl) => (
                          <div
                            key={syl.week}
                            className="p-2.5 bg-indigo-50/50 border border-indigo-100/60 rounded-md text-xs"
                          >
                            <div className="flex items-center gap-2 font-semibold text-indigo-900">
                              <span className="font-mono text-indigo-600">{syl.week}주차</span>
                              <span>{syl.title}</span>
                            </div>
                            <div className="text-slate-600 text-[11px] mt-1 pl-7">
                              {syl.detail}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 underline transition-colors cursor-pointer"
                  >
                    {isExpanded ? '커리큘럼 접기' : '주차별 세부계획서 보기'}
                  </button>

                  <button
                    onClick={() => setActiveView('booking')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    수업 예약 & 신청 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
