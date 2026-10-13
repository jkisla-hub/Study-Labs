import React from 'react';
import { useAcademy } from '../context/AcademyContext';

export const HeroSection: React.FC = () => {
  const { setActiveView } = useAcademy();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-14 pb-20 border-b border-slate-800">
      {/* Background Architectural Vector Grid & Mathematical Coordinate Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mathGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mathGrid)" />
        </svg>
      </div>

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <span>대치·목동 프리미엄 수학 전문 아카데미</span>
              <span aria-hidden="true">·</span>
              <span>개념 구조화 3단계 연구소</span>
              <span aria-hidden="true">·</span>
              <span>1:1 오답 클리닉 특화</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              수학의 난제를 관통하는 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-200 to-indigo-100">
                수식의 구조와 직관
              </span>
              , Study Labs
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              단순 암기식 풀이는 고난도 킬러 문항 앞에서 무너집니다. Study Labs는 
              수학적 정의에서 출발하는 원리 추론, 고난도 기출 분해, 
              학생별 1:1 약점 정밀 처방으로 안정적인 1등급을 완성합니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('booking')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                무료 입학 진단평가 & 수업 예약하기
              </button>
              <button
                onClick={() => setActiveView('curriculum')}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-lg active:scale-[0.98] transition-all cursor-pointer"
              >
                학년별 정규 커리큘럼 보기
              </button>
              <button
                onClick={() => setActiveView('admin')}
                className="px-5 py-3.5 text-sm font-medium text-indigo-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>학생 관리 시스템 바로가기</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">정원제 운영</span>
                <span>클래스당 최대 12명 제한</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">당일 피드백</span>
                <span>매 회차 테스트 성적표 발송</span>
              </div>
            </div>
          </div>

          {/* Right Column: Educational System Visual (Interactive Lab Blueprint) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
                    Study Labs 3-Step Engine
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">체계적 학습 프로세스</span>
              </div>

              {/* Lab Step 1 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">STEP 01</span>
                  <span className="text-[11px] text-slate-400">정의 및 원리 증명</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Lab 1. 개념 구조화 연구</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  공식 단순 대입을 배제하고 단원 간 수학적 연결고리와 증명 과정을 직접 서술하도록 지도
                </p>
              </div>

              {/* Lab Step 2 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">STEP 02</span>
                  <span className="text-[11px] text-slate-400">고난도 기출 분해</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Lab 2. 킬러 유형 분석 및 변형</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  평가원·자사고 15개년 기출 킬러 문항을 5단계 알고리즘으로 분해하여 조건 도출 능력 완성
                </p>
              </div>

              {/* Lab Step 3 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">STEP 03</span>
                  <span className="text-[11px] text-slate-400">1:1 무제한 첨삭</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Lab 3. 개인별 약점 클리닉</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  학생별 오답 문항 100% 1:1 재점검 + 쌍둥이 변형 문제 3회 통과 시까지 철저한 사후 관리
                </p>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setActiveView('booking')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/80 rounded-lg transition-colors cursor-pointer"
                >
                  현재 잔여석 실시간 확인 및 예약 →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Metric Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers">
              86.4%
            </div>
            <div className="text-xs font-medium text-slate-400">
              재원생 1·2등급 달성률 (2025학년도 기준)
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers">
              3,200+
            </div>
            <div className="text-xs font-medium text-slate-400">
              수능 수학 1등급 및 의치한약수 누적 배출
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers">
              1:1
            </div>
            <div className="text-xs font-medium text-slate-400">
              모든 학생 매주 개인별 오답 클리닉 전담 배정
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers">
              100%
            </div>
            <div className="text-xs font-medium text-slate-400">
              학부모 모바일 학습 리포트 및 성적표 전송
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
