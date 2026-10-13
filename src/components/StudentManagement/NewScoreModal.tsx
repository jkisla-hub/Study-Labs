import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { TestType } from '../../types';

interface NewScoreModalProps {
  isOpen: boolean;
  preselectedStudentId?: string | null;
  onClose: () => void;
}

export const NewScoreModal: React.FC<NewScoreModalProps> = ({
  isOpen,
  preselectedStudentId,
  onClose
}) => {
  const { students, addTestScore } = useAcademy();

  const [studentId, setStudentId] = useState<string>(
    preselectedStudentId || students[0]?.id || ''
  );
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState<TestType>('주간 단원평가');
  const [score, setScore] = useState<number>(90);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [averageScore, setAverageScore] = useState<number>(78);
  const [weakTopicsStr, setWeakTopicsStr] = useState('');
  const [feedback, setFeedback] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !testName.trim()) {
      alert('학생과 시험명을 입력해주세요.');
      return;
    }

    const weakTopics = weakTopicsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addTestScore({
      studentId,
      testName: testName.trim(),
      testType,
      date,
      score: Number(score),
      maxScore: Number(maxScore),
      averageScore: Number(averageScore),
      weakTopics,
      feedback: feedback.trim()
    });

    onClose();
  };

  const testTypes: TestType[] = [
    '주간 단원평가',
    '월간 종합모의고사',
    '학교 내신대비',
    '수능 킬러 진단'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            테스트 성적 입력 (단원평가 / 모의고사)
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">대상 학생</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.school} {s.grade})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">시험 구분</label>
            <div className="grid grid-cols-2 gap-2">
              {testTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTestType(t)}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                    testType === t
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">시험명</label>
            <input
              type="text"
              placeholder="예: 공통수학1 원의 방정식 킬러 단원평가"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">획득 점수</label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                min={0}
                max={100}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">만점 기준</label>
              <input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">반 평균</label>
              <input
                type="number"
                value={averageScore}
                onChange={(e) => setAverageScore(Number(e.target.value))}
                min={0}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">응시 일자</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">오답 단원 (쉼표 구분)</label>
              <input
                type="text"
                placeholder="예: 자취의 방정식, 접선"
                value={weakTopicsStr}
                onChange={(e) => setWeakTopicsStr(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">강사 피드백 코멘트</label>
            <textarea
              rows={2}
              placeholder="예: 킬러 3문항 중 2문항 정확하게 해결함. 30번 유사 변형 문제 과제 부여 예정."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold cursor-pointer"
            >
              점수 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
