import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { BookingType, GradeLevel, Booking } from '../types';
import { AVAILABLE_TIME_SLOTS } from '../data/mockData';

export const BookingSystem: React.FC = () => {
  const { addBooking, getBookingByCodeOrPhone, cancelBookingByCode, bookings } = useAcademy();

  // Booking Form State
  const [bookingType, setBookingType] = useState<BookingType>('입학 진단평가');
  const [studentGrade, setStudentGrade] = useState<GradeLevel>('고1');
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    // Tomorrow as default
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState<string>('15:00');
  const [studentName, setStudentName] = useState<string>('');
  const [parentPhone, setParentPhone] = useState<string>('');
  const [currentMathProgress, setCurrentMathProgress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  
  // Confirmed feedback
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Lookup state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Booking[] | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'lookup'>('create');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) {
      alert('학생 이름과 학부모 연락처를 입력해 주세요.');
      return;
    }

    const created = addBooking({
      type: bookingType,
      studentName: studentName.trim(),
      parentPhone: parentPhone.trim(),
      studentGrade,
      preferredDate,
      preferredTime,
      currentMathProgress: currentMathProgress.trim() || '상담 시 정밀 진단 희망',
      notes: notes.trim(),
    });

    setConfirmedBooking(created);
    // Reset inputs
    setStudentName('');
    setParentPhone('');
    setCurrentMathProgress('');
    setNotes('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult([]);
      return;
    }
    const results = getBookingByCodeOrPhone(searchQuery);
    setSearchResult(results);
  };

  const handleCancelBooking = (code: string) => {
    if (confirm(`예약번호 [${code}]를 정말로 취소하시겠습니까?`)) {
      const success = cancelBookingByCode(code);
      if (success) {
        setNoticeMessage(`예약번호 ${code}가 정상적으로 취소되었습니다.`);
        if (searchQuery) {
          setSearchResult(getBookingByCodeOrPhone(searchQuery));
        }
        setTimeout(() => setNoticeMessage(null), 4000);
      }
    }
  };

  const bookingTypes: { type: BookingType; title: string; desc: string; duration: string }[] = [
    {
      type: '입학 진단평가',
      title: '입학 진단평가 (무료)',
      desc: '학생의 현재 개념 성취도 및 고난도 문제해결력을 25문항으로 정밀 분석',
      duration: '60분 평가 + 30분 분석 리포트 상담'
    },
    {
      type: '1:1 맞춤 수학클리닉',
      title: '1:1 맞춤 클리닉 체험',
      desc: '학생이 어려워하는 취약 단원 오답 10문항을 전임 강사와 1:1로 밀착 첨삭',
      duration: '90분 1:1 대면 지도'
    },
    {
      type: '대표원장 심층 학습상담',
      title: '대표원장 입시·수학 로드맵 상담',
      desc: '수능 1등급 및 의치한약수·최상위권 대학 진학을 위한 중·장기 커리큘럼 설계',
      duration: '40분 1:1 심층 면담'
    },
    {
      type: '주말 파이널 특강 체험',
      title: '주말 킬러 문항 정규수업 청강',
      desc: 'Study Labs의 실제 정규 수업 1회 청강 및 자체 교재 킬러 300제 샘플 수령',
      duration: '정규 수업 1회 (180분)'
    }
  ];

  const gradeOptions: GradeLevel[] = [
    '초등 5-6학년',
    '중1',
    '중2',
    '중3',
    '고1',
    '고2',
    '고3',
    'N수/재수'
  ];

  return (
    <section className="py-16 bg-white min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Study Labs Reservation Desk
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            수업 및 학습 진단 실시간 예약 시스템
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            전문 입학 진단평가와 1:1 맞춤 클리닉을 원하는 날짜에 즉시 예약하고 예약 내역을 조회할 수 있습니다.
          </p>

          {/* Mode switch */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg mt-6">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              새 수업 / 진단평가 예약 신청
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'lookup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              내 예약 조회 및 취소
            </button>
          </div>
        </div>

        {noticeMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center justify-between">
            <span>{noticeMessage}</span>
            <button
              onClick={() => setNoticeMessage(null)}
              className="text-emerald-700 font-bold hover:text-emerald-900 text-xs"
            >
              닫기
            </button>
          </div>
        )}

        {/* Tab 1: Create Booking */}
        {activeTab === 'create' && (
          <div>
            {confirmedBooking ? (
              /* Booking Confirmation Card */
              <div className="max-w-2xl mx-auto bg-slate-900 text-white rounded-2xl p-8 shadow-xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-emerald-400">
                      ✓ 예약 접수가 정상 완료되었습니다
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Study Labs 예약 확인증
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400">예약 번호</span>
                    <div className="text-base font-extrabold text-indigo-300 font-mono-numbers">
                      {confirmedBooking.bookingCode}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-slate-400">예약 프로그램</span>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5">
                      {confirmedBooking.type}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-slate-400">학생 정보</span>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5">
                      {confirmedBooking.studentName} ({confirmedBooking.studentGrade})
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-slate-400">예약 일시</span>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5 font-mono-numbers">
                      {confirmedBooking.preferredDate} {confirmedBooking.preferredTime}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-lg">
                    <span className="text-slate-400">학부모 연락처</span>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5 font-mono-numbers">
                      {confirmedBooking.parentPhone}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/60 border border-indigo-800/60 rounded-xl text-xs text-indigo-200 leading-relaxed">
                  <p className="font-semibold text-indigo-100 mb-1">안내 사항</p>
                  Study Labs 상담실(02-555-8291)에서 예약 일시 24시간 전 학부모님께 확정 안내 문자를 전송해 드립니다. 
                  진단평가 당일에는 학생이 평소 작성하던 수학 오답노트나 최근 시험지를 지참하시면 더욱 심층적인 분석이 가능합니다.
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    추가 예약하기
                  </button>
                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setActiveTab('lookup');
                      setSearchQuery(confirmedBooking.bookingCode);
                      setSearchResult([confirmedBooking]);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    예약 내역 관리로 이동 →
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Booking Type Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-900">
                    1. 예약 프로그램 선택
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bookingTypes.map((item) => {
                      const isSelected = bookingType === item.type;
                      return (
                        <div
                          key={item.type}
                          onClick={() => setBookingType(item.type)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-indigo-700 font-medium">
                              {item.duration}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Target Grade */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-900">
                    2. 학생 학년 선택
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {gradeOptions.map((grade) => {
                      const isSelected = studentGrade === grade;
                      return (
                        <button
                          key={grade}
                          type="button"
                          onClick={() => setStudentGrade(grade)}
                          className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {grade}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Date & Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      3. 희망 날짜 선택
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <p className="text-[11px] text-slate-500">
                      * 월요일은 연구소 정기 휴무이며, 화~일요일 상담 및 테스트 가능합니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      희망 시간대 선택
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {AVAILABLE_TIME_SLOTS.map((time) => {
                        const isSelected = preferredTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setPreferredTime(time)}
                            className={`py-2 px-3 text-xs font-medium rounded-lg border text-center font-mono-numbers transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Student & Parent Information */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900">
                    4. 학생 및 학부모 정보 입력
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-700">
                        학생 이름 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="예: 김민준"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-700">
                        학부모 연락처 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="예: 010-1234-5678"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      현재 수학 진도 및 최근 성적
                    </label>
                    <input
                      type="text"
                      placeholder="예: 공통수학1 1회독 완료 / 중3 내신 95점 / 고1 1등급 목표"
                      value={currentMathProgress}
                      onChange={(e) => setCurrentMathProgress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      특이사항 및 집중 상담 요청 내용 (선택)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="예: 기하 파트에서 보조선 작도를 어려워합니다. 자사고 진학을 염두에 두고 있어 심화 진도 상담을 희망합니다."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    수업 및 진단평가 예약 확정하기
                  </button>
                  <p className="text-center text-[11px] text-slate-500 mt-2">
                    예약 즉시 예약 확인 번호가 발급되며, Study Labs 대치 본원에서 개별 유선 확인을 드립니다.
                  </p>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Lookup My Booking */}
        {activeTab === 'lookup' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                예약 내역 조회 (예약번호 또는 휴대폰 번호)
              </h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="예약번호 (예: STL-2026-081) 또는 전화번호 입력"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  조회하기
                </button>
              </form>

              {/* Sample Hint */}
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                <span>테스트용 예약번호:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('STL-2026-081');
                    setSearchResult(getBookingByCodeOrPhone('STL-2026-081'));
                  }}
                  className="underline text-indigo-600 font-mono-numbers cursor-pointer"
                >
                  STL-2026-081
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('STL-2026-082');
                    setSearchResult(getBookingByCodeOrPhone('STL-2026-082'));
                  }}
                  className="underline text-indigo-600 font-mono-numbers cursor-pointer"
                >
                  STL-2026-082
                </button>
              </div>
            </div>

            {/* Results */}
            {searchResult !== null && (
              <div className="space-y-4">
                {searchResult.length === 0 ? (
                  <div className="text-center py-10 bg-white border border-slate-200 rounded-xl">
                    <p className="text-sm text-slate-500">
                      일치하는 예약 내역을 찾을 수 없습니다. 예약번호 또는 연락처를 다시 확인해주세요.
                    </p>
                  </div>
                ) : (
                  searchResult.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[11px] text-slate-500 font-mono-numbers">
                            {b.bookingCode}
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {b.type}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              b.status === '예약확정'
                                ? 'bg-emerald-50 text-emerald-700'
                                : b.status === '접수대기'
                                ? 'bg-amber-50 text-amber-700'
                                : b.status === '상담완료'
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                        <div>
                          <span className="text-slate-400">학생 / 학년:</span>{' '}
                          <span className="font-semibold text-slate-900">{b.studentName} ({b.studentGrade})</span>
                        </div>
                        <div>
                          <span className="text-slate-400">예약 일시:</span>{' '}
                          <span className="font-semibold text-slate-900 font-mono-numbers">{b.preferredDate} {b.preferredTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">학부모 연락처:</span>{' '}
                          <span className="font-semibold text-slate-900 font-mono-numbers">{b.parentPhone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">신청 일시:</span>{' '}
                          <span className="font-semibold text-slate-900 font-mono-numbers">{b.createdAt}</span>
                        </div>
                      </div>

                      {b.currentMathProgress && (
                        <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600">
                          <span className="text-slate-500 font-medium">진도/성적: </span>
                          {b.currentMathProgress}
                        </div>
                      )}

                      {b.status !== '예약취소' && b.status !== '상담완료' && (
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(b.bookingCode)}
                            className="px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-md transition-colors cursor-pointer"
                          >
                            예약 취소 신청
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
