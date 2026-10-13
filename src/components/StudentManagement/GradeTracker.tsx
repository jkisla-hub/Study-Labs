import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';

interface GradeTrackerProps {
  onOpenNewScore: () => void;
}

export const GradeTracker: React.FC<GradeTrackerProps> = ({ onOpenNewScore }) => {
  const { testScores, students } = useAcademy();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('all');

  const filteredScores = testScores.filter((sc) => {
    if (selectedType !== 'all' && sc.testType !== selectedType) return false;
    if (selectedStudentFilter !== 'all' && sc.studentId !== selectedStudentFilter) return false;
    return true;
  });

  // Calculate statistics
  const totalTests = testScores.length;
  const avgScore = totalTests > 0
    ? Math.round((testScores.reduce((acc, curr) => acc + curr.score, 0) / totalTests) * 10) / 10
    : 0;
  const maxScore = totalTests > 0
    ? Math.max(...testScores.map((s) => s.score))
    : 0;
  const over90Ratio = totalTests > 0
    ? Math.round((testScores.filter((s) => s.score >= 90).length / totalTests) * 100)
    : 0;

  // Aggregate weak topics across all students
  const topicFrequency: Record<string, number> = {};
  students.forEach((st) => {
    st.weakTopics.forEach((t) => {
      topicFrequency[t] = (topicFrequency[t] || 0) + 1;
    });
  });
  const topWeakTopics = Object.entries(topicFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500">평균 단원평가 점수</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono-numbers">
            {avgScore}점
          </div>
          <span className="text-[11px] text-emerald-600">안정적 상위권 유지</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500">최근 최고 득점</span>
          <div className="text-2xl font-extrabold text-indigo-600 font-mono-numbers">
            {maxScore}점
          </div>
          <span className="text-[11px] text-slate-500">만점자 2명 배출</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500">90점 이상 달성률</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono-numbers">
            {over90Ratio}%
          </div>
          <span className="text-[11px] text-indigo-600">1등급 안정 비율</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-500">누적 평가 기록</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono-numbers">
            {totalTests}회
          </div>
          <span className="text-[11px] text-slate-400">전 문항 오답 관리</span>
        </div>
      </div>

      {/* Weak Topics Analysis Alert Box */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono">
              [Lab Focus]
            </span>
            <h4 className="text-sm font-bold text-white">
              현재 재원생 최빈 오답 취약 단원 TOP 5
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">1:1 클리닉 우선 배정 기준</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
          {topWeakTopics.map(([topic, count], idx) => (
            <div
              key={topic}
              className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>0{idx + 1}위</span>
                <span className="text-amber-400 font-bold font-mono-numbers">{count}명 처방</span>
              </div>
              <div className="font-semibold text-slate-100 truncate" title={topic}>
                {topic}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">모든 시험 유형</option>
            <option value="주간 단원평가">주간 단원평가</option>
            <option value="월간 종합모의고사">월간 종합모의고사</option>
            <option value="수능 킬러 진단">수능 킬러 진단</option>
          </select>

          <select
            value={selectedStudentFilter}
            onChange={(e) => setSelectedStudentFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">전체 학생</option>
            {students.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} ({st.school})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenNewScore}
          className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
        >
          + 새 테스트 성적 입력
        </button>
      </div>

      {/* Scores Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">응시 일자</th>
                <th className="py-3 px-4">학생명 / 학교</th>
                <th className="py-3 px-4">시험 유형</th>
                <th className="py-3 px-4">시험명</th>
                <th className="py-3 px-4 text-right">점수</th>
                <th className="py-3 px-4 text-right">반 평균</th>
                <th className="py-3 px-4">오답 단원</th>
                <th className="py-3 px-4">강사 코멘트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredScores.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
                    기록된 점수 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredScores.map((score) => {
                  const student = students.find((s) => s.id === score.studentId);
                  const isTopScore = score.score >= 95;

                  return (
                    <tr key={score.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono-numbers text-slate-500">
                        {score.date}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{student?.name || '원생'}</div>
                        <div className="text-[11px] text-slate-400">{student?.school} {student?.grade}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {score.testType}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-800">
                        {score.testName}
                      </td>

                      <td className="py-3 px-4 text-right font-mono-numbers font-bold">
                        <span className={isTopScore ? 'text-indigo-600' : 'text-slate-900'}>
                          {score.score}
                        </span>
                        <span className="text-slate-400 font-normal"> / {score.maxScore}</span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono-numbers text-slate-500">
                        {score.averageScore}점
                      </td>

                      <td className="py-3 px-4">
                        {score.weakTopics.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {score.weakTopics.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-medium">전 문항 정답</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={score.feedback}>
                        {score.feedback || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
