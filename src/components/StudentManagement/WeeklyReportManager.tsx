import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { WeeklyReport } from '../../types';

interface WeeklyReportManagerProps {
  onOpenNewReport: () => void;
}

export const WeeklyReportManager: React.FC<WeeklyReportManagerProps> = ({ onOpenNewReport }) => {
  const { weeklyReports, students, sendReportNotification } = useAcademy();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');
  const [previewReport, setPreviewReport] = useState<WeeklyReport | null>(null);
  const [sendSuccessToast, setSendSuccessToast] = useState<string | null>(null);

  const filteredReports = weeklyReports.filter((r) => {
    if (selectedStudentId !== 'all' && r.studentId !== selectedStudentId) return false;
    return true;
  });

  const handleSendSimulation = (report: WeeklyReport) => {
    sendReportNotification(report.id);
    setPreviewReport(null);
    setSendSuccessToast(`[${report.weekRange}] 리포트가 학부모님 스마트폰으로 전송 완료되었습니다.`);
    setTimeout(() => setSendSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {sendSuccessToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <span>✓ {sendSuccessToast}</span>
          <button onClick={() => setSendSuccessToast(null)} className="font-bold cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">전체 학생 리포트 보기</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.school} {s.grade})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenNewReport}
          className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
        >
          + 새 주간 학습 리포트 작성
        </button>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => {
          const student = students.find((s) => s.id === report.studentId);
          if (!student) return null;

          return (
            <div
              key={report.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="text-[11px] text-slate-500">{report.weekRange}</div>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">
                      {student.name}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        ({student.school} {student.grade})
                      </span>
                    </h4>
                  </div>
                  <div>
                    {report.sentToParent ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                        전송 완료
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
                        전송 대기
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500">개념 이해도</span>
                    <div className="font-bold text-slate-900 font-mono-numbers">
                      {report.conceptScore} / 5
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">문제 해결력</span>
                    <div className="font-bold text-slate-900 font-mono-numbers">
                      {report.problemSolvingScore} / 5
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">과제 완수율</span>
                    <div className="font-bold text-indigo-600 font-mono-numbers">
                      {report.homeworkRate}%
                    </div>
                  </div>
                </div>

                {/* Teacher remarks */}
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-semibold text-slate-600">강사 종합 코멘트:</span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg">
                    {report.teacherComment}
                  </p>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-indigo-700">다음 주 목표: </span>
                  <span>{report.nextWeekGoal}</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono-numbers">
                  작성일 {report.createdAt}
                </span>

                <button
                  onClick={() => setPreviewReport(report)}
                  className="px-3.5 py-1.5 font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                >
                  학부모 알림톡 미리보기 / 전송 →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alimtalk Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            {/* Kakao-style header */}
            <div className="bg-[#FEE500] p-4 text-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-yellow-300 font-extrabold flex items-center justify-center text-xs">
                  S
                </div>
                <span className="font-bold text-sm">Study Labs 알림톡</span>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="text-slate-700 hover:text-slate-950 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs bg-slate-50">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <span className="text-[11px] text-indigo-600 font-bold">
                    [Study Labs 주간 학습 리포트]
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {students.find((s) => s.id === previewReport.studentId)?.name} 학생 주간 학습 현황 보고
                  </h4>
                  <div className="text-[11px] text-slate-400 font-mono-numbers mt-0.5">
                    {previewReport.weekRange}
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-700 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">개념 이해도:</span>
                    <span className="font-bold text-slate-900 font-mono-numbers">{previewReport.conceptScore} / 5 점</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">문제 해결력:</span>
                    <span className="font-bold text-slate-900 font-mono-numbers">{previewReport.problemSolvingScore} / 5 점</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">주간 과제 완수율:</span>
                    <span className="font-bold text-indigo-600 font-mono-numbers">{previewReport.homeworkRate}%</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed text-[11px]">
                  <strong>[담임 강사 총평]</strong>
                  <p className="mt-1">{previewReport.teacherComment}</p>
                </div>

                <div className="text-[11px] text-slate-600">
                  <strong>[다음 주 목표]</strong>: {previewReport.nextWeekGoal}
                </div>

                <div className="pt-2 text-[10px] text-slate-400 text-center">
                  수신처: {students.find((s) => s.id === previewReport.studentId)?.parentPhone}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewReport(null)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg font-medium cursor-pointer"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={() => handleSendSimulation(previewReport)}
                  className="px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  학부모 알림 발송 (시뮬레이션)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
