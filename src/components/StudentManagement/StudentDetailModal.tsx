import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Student } from '../../types';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onOpenAddScore: (studentId: string) => void;
  onOpenAddReport: (studentId: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onOpenAddScore,
  onOpenAddReport
}) => {
  const { testScores, attendanceRecords, weeklyReports, sendReportNotification, updateStudent } = useAcademy();
  const [activeTab, setActiveTab] = useState<'overview' | 'scores' | 'attendance' | 'reports'>('overview');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesContent, setNotesContent] = useState(student?.notes || '');
  const [sentNotice, setSentNotice] = useState<string | null>(null);

  if (!student) return null;

  const studentScores = testScores.filter((s) => s.studentId === student.id);
  const studentAttendance = attendanceRecords.filter((a) => a.studentId === student.id);
  const studentReports = weeklyReports.filter((r) => r.studentId === student.id);

  const handleSaveNotes = () => {
    updateStudent({
      ...student,
      notes: notesContent
    });
    setIsEditingNotes(false);
  };

  const handleSendNotification = (reportId: string) => {
    sendReportNotification(reportId);
    setSentNotice('학부모님 스마트폰으로 주간 학습 리포트가 성공적으로 발송되었습니다.');
    setTimeout(() => setSentNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-indigo-700">{student.school}</span>
              <span aria-hidden="true">·</span>
              <span>{student.grade}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-numbers">입학일 {student.joinDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                {student.track}
              </span>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-4 pt-1">
              <span>담당: <strong className="text-slate-800">{student.assignedTeacher}</strong></span>
              <span>강의실: <strong className="text-slate-800">{student.classRoom}</strong></span>
              <span>목표: <strong className="text-indigo-600">{student.targetUniversity}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-white gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            학생 종합 프로필
          </button>
          <button
            onClick={() => setActiveTab('scores')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'scores'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            성적 & 테스트 이력 ({studentScores.length})
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'attendance'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            출결 기록 ({studentAttendance.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reports'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            학부모 학습 리포트 ({studentReports.length})
          </button>
        </div>

        {/* Notice alert */}
        {sentNotice && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center justify-between">
            <span>{sentNotice}</span>
            <button onClick={() => setSentNotice(null)} className="font-bold">✕</button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Metric strip */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[11px]">최근 종합 평균 점수</span>
                  <div className="text-2xl font-bold text-slate-900 font-mono-numbers">
                    {student.currentScoreAverage}점
                  </div>
                  <span className="text-[11px] text-emerald-600">상위 5% 이내 유지</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[11px]">응시 테스트 수</span>
                  <div className="text-2xl font-bold text-slate-900 font-mono-numbers">
                    {studentScores.length}회
                  </div>
                  <span className="text-[11px] text-slate-500">누적 평가 기록</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[11px]">출석 현황</span>
                  <div className="text-2xl font-bold text-slate-900 font-mono-numbers">
                    100%
                  </div>
                  <span className="text-[11px] text-indigo-600">성실 등원 중</span>
                </div>
              </div>

              {/* Contact info & Weak topics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs">비상 연락망</h4>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">학부모 연락처:</span>
                      <span className="font-medium text-slate-900 font-mono-numbers">{student.parentPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">학생 본인 연락처:</span>
                      <span className="font-medium text-slate-900 font-mono-numbers">{student.studentPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs">현재 집중 케어 취약 단원</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {student.weakTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[11px]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Teacher Memo */}
              <div className="p-4 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs">강사 종합 메모 & 피드백</h4>
                  {!isEditingNotes ? (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                    >
                      메모 수정
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveNotes}
                        className="text-xs text-emerald-600 font-bold cursor-pointer"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setIsEditingNotes(false)}
                        className="text-xs text-slate-500 cursor-pointer"
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>

                {isEditingNotes ? (
                  <textarea
                    rows={3}
                    value={notesContent}
                    onChange={(e) => setNotesContent(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg">
                    {student.notes}
                  </p>
                )}
              </div>

              {/* Fast action footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => onOpenAddScore(student.id)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  + 새 테스트 점수 등록
                </button>
                <button
                  onClick={() => onOpenAddReport(student.id)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  + 이번 주 학습 리포트 작성
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SCORES */}
          {activeTab === 'scores' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">최근 응시 내역</span>
                <button
                  onClick={() => onOpenAddScore(student.id)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md text-xs cursor-pointer"
                >
                  + 점수 등록
                </button>
              </div>

              {studentScores.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl text-slate-500">
                  아직 등록된 테스트 점수가 없습니다. 점수 등록 버튼을 눌러 추가하세요.
                </div>
              ) : (
                <div className="space-y-3">
                  {studentScores.map((score) => {
                    const percent = Math.round((score.score / score.maxScore) * 100);
                    return (
                      <div
                        key={score.id}
                        className="p-4 border border-slate-200 rounded-xl bg-white space-y-2 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-slate-500 font-mono-numbers">{score.date} · {score.testType}</span>
                            <h5 className="font-bold text-slate-900 text-sm">{score.testName}</h5>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-indigo-600 font-mono-numbers">
                              {score.score}
                            </span>
                            <span className="text-slate-400 font-mono-numbers"> / {score.maxScore}점</span>
                            <div className="text-[11px] text-slate-500 font-mono-numbers">
                              반 평균: {score.averageScore}점
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {score.feedback && (
                          <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded-md mt-1">
                            강사 코멘트: {score.feedback}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">최근 등원 기록</h4>
              {studentAttendance.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl text-slate-500">
                  출결 기록이 없습니다.
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">일자</th>
                        <th className="py-2.5 px-4 font-semibold">입실 시간</th>
                        <th className="py-2.5 px-4 font-semibold">상태</th>
                        <th className="py-2.5 px-4 font-semibold">비고 / 사유</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentAttendance.map((att) => (
                        <tr key={att.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-mono-numbers">{att.date}</td>
                          <td className="py-2.5 px-4 font-mono-numbers">{att.time}</td>
                          <td className="py-2.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                att.status === '출석'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : att.status === '지각'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {att.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-600">{att.note || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">학부모 전송 리포트 내역</span>
                <button
                  onClick={() => onOpenAddReport(student.id)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md text-xs cursor-pointer"
                >
                  + 리포트 작성
                </button>
              </div>

              {studentReports.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl text-slate-500">
                  작성된 주간 리포트가 없습니다. 리포트 작성 버튼을 눌러 새로 생성하세요.
                </div>
              ) : (
                <div className="space-y-4">
                  {studentReports.map((rep) => (
                    <div
                      key={rep.id}
                      className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="font-bold text-slate-900">{rep.weekRange}</span>
                        <div className="flex items-center gap-2">
                          {rep.sentToParent ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              ✓ 발송 완료 ({rep.sentAt})
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSendNotification(rep.id)}
                              className="px-2.5 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors cursor-pointer"
                            >
                              학부모 알림 발송하기
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-3 rounded-lg">
                        <div>
                          <span className="text-[11px] text-slate-500">개념 이해도</span>
                          <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono-numbers">
                            {rep.conceptScore} / 5
                          </div>
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-500">문제 해결력</span>
                          <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono-numbers">
                            {rep.problemSolvingScore} / 5
                          </div>
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-500">과제 완수율</span>
                          <div className="text-sm font-bold text-indigo-600 mt-0.5 font-mono-numbers">
                            {rep.homeworkRate}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-slate-500">강사 주간 피드백</span>
                        <p className="text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-lg">
                          {rep.teacherComment}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <span className="font-semibold text-indigo-700">다음 주 학습 목표:</span>
                        <span>{rep.nextWeekGoal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
