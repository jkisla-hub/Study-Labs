import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';

interface NewReportModalProps {
  isOpen: boolean;
  preselectedStudentId?: string | null;
  onClose: () => void;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({
  isOpen,
  preselectedStudentId,
  onClose
}) => {
  const { students, addWeeklyReport } = useAcademy();

  const [studentId, setStudentId] = useState<string>(
    preselectedStudentId || students[0]?.id || ''
  );
  const [weekRange, setWeekRange] = useState('2026년 10월 2주차 (10/12 ~ 10/18)');
  const [conceptScore, setConceptScore] = useState<number>(5);
  const [problemSolvingScore, setProblemSolvingScore] = useState<number>(4);
  const [homeworkRate, setHomeworkRate] = useState<number>(100);
  const [teacherComment, setTeacherComment] = useState('');
  const [nextWeekGoal, setNextWeekGoal] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !teacherComment.trim()) {
      alert('학생과 강사 피드백을 입력해주세요.');
      return;
    }

    addWeeklyReport({
      studentId,
      weekRange,
      conceptScore,
      problemSolvingScore,
      homeworkRate,
      teacherComment: teacherComment.trim(),
      nextWeekGoal: nextWeekGoal.trim() || '취약 유형 오답노트 완성 및 주간테스트 만점 목표'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            주간 학습 리포트 작성 (학부모 전송용)
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
            <label className="font-semibold text-slate-700">평가 주차</label>
            <input
              type="text"
              value={weekRange}
              onChange={(e) => setWeekRange(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">개념 이해도 (1-5)</label>
              <select
                value={conceptScore}
                onChange={(e) => setConceptScore(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n}점 (우수)</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">문제 해결력 (1-5)</label>
              <select
                value={problemSolvingScore}
                onChange={(e) => setProblemSolvingScore(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n}점</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">과제 완성도 (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={homeworkRate}
                onChange={(e) => setHomeworkRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">강사 주간 종합 코멘트</label>
            <textarea
              rows={4}
              placeholder="예: 이번 주 원의 방정식 킬러 단원에서 자취의 방정식 원리를 명쾌하게 분석해냈습니다. 서술형 풀이에서 기하적 근거를 한 줄 더 적어주는 연습을 통해 내신 전교 1등 목표를 충분히 달성할 수 있습니다."
              value={teacherComment}
              onChange={(e) => setTeacherComment(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">다음 주 학습 목표</label>
            <input
              type="text"
              placeholder="예: 도형의 이동 심화 및 고난도 대칭이동 50제 정복"
              value={nextWeekGoal}
              onChange={(e) => setNextWeekGoal(e.target.value)}
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
              리포트 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
