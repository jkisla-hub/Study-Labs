import React from 'react';
import { useAcademy } from '../context/AcademyContext';

export const CampusSection: React.FC = () => {
  const { setActiveView } = useAcademy();

  const facilities = [
    {
      name: 'Lab 1. 개념 구조화 분석실',
      desc: '대형 전자칠판과 개별 태블릿 미러링 시스템을 통해 공식 유도와 증명 과정을 단계별로 시각화하는 메인 강의실',
      spec: '12인 정원제 · 음향 흡음 시공'
    },
    {
      name: 'Lab 2. 1:1 오답 정밀 클리닉실',
      desc: '학생 1명당 전임 강사가 1:1로 마주 앉아 틀린 문제의 사고 오류를 교정하고 쌍둥이 변형 문제를 즉석 풀이하는 첨삭실',
      spec: '개별 칸막이 첨삭 부스 8석'
    },
    {
      name: 'Lab 3. 킬러 문항 집중 독서실',
      desc: '수능·내신 실전 타임어택 훈련을 위한 최신 프리미엄 시디즈 의자와 백색소음기, 모바일 보관함을 갖춘 재원생 전용 자습관',
      spec: '재원생 365일 무료 개방'
    },
    {
      name: 'Lab 4. 입시·학습 데이터 분석실',
      desc: '학생별 누적 오답 빅데이터와 최근 10개년 기출 데이터를 기반으로 최적의 성적 향상 로드맵을 설계하는 원장 상담실',
      spec: '학부모 1:1 프라이빗 상담'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Study Labs Campus & Facilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            수학 몰입을 위해 설계된 연구소형 학습 공간
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            단순 학원 강의실을 넘어 스스로 수식을 파고들고 1:1 질문을 언제든 해결할 수 있는 최적의 학업 인프라를 제공합니다.
          </p>
        </div>

        {/* 4-Grid Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-600 font-mono">
                  ROOM 0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500">
                {fac.spec}
              </div>
            </div>
          ))}
        </div>

        {/* Campus Location & Hours Information Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-indigo-600">본원 오시는 길 & 상담 안내</span>
              <h3 className="text-xl font-bold text-slate-900">
                Study Labs 대치 본원 캠퍼스
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 w-20 shrink-0">주소</strong>
                <span>서울특별시 강남구 도곡로 408 (대치동) 디마크빌딩 4층·5층 Study Labs</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 w-20 shrink-0">대중교통</strong>
                <span>수도권 수인분당선 한티역 2번 출구 도보 3분 / 대치역 8번 출구 도보 8분</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 w-20 shrink-0">상담실 직통</strong>
                <span className="font-mono-numbers font-bold text-indigo-600">02-555-8291 / 010-8291-7720</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 w-20 shrink-0">운영 시간</strong>
                <span>화요일 ~ 일요일 13:00 ~ 22:30 (월요일은 교재 연구 정기 휴무)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveView('booking')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                방문 상담 & 레벨테스트 예약 →
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-100">
              Study Labs 4단계 상담 프로세스
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold font-mono">1.</span>
                <span>온라인 사전 예약 (희망 일시 및 진도 입력)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold font-mono">2.</span>
                <span>단원별 진단평가 실시 (개념/유형/킬러 25문항)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold font-mono">3.</span>
                <span>대표원장 1:1 심층 성향 및 취약점 분석 브리핑</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold font-mono">4.</span>
                <span>수준별 최적 클래스 배정 및 1:1 클리닉 플랜 수립</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
