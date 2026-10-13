import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { AttendanceStatus } from '../../types';

export const AttendanceTracker: React.FC = () => {
  const { students, attendanceRecords, toggleAttendance } = useAcademy();
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // Today records
  const dateRecords = attendanceRecords.filter((a) => a.date === selectedDate);

  const getRecordForStudent = (studentId: string) => {
    return dateRecords.find((a) => a.studentId === studentId);
  };

  const presentCount = students.filter((s) => getRecordForStudent(s.id)?.status === '출석').length;
  const lateCount = students.filter((s) => getRecordForStudent(s.id)?.status === '지각').length;
  const absentCount = students.filter((s) => getRecordForStudent(s.id)?.status === '결석').length;
  const rate = students.length > 0
    ? Math.round(((presentCount + lateCount) / students.length) * 100)
    : 0;

  const handleSetAllPresent = () => {
    students.forEach((s) => {
      toggleAttendance(s.id, selectedDate, '출석');
    });
  };

  return (
    <div className="space-y-6">
      {/* Attendance Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700">출결 체크 일자:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono-numbers text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div>출석: <strong className="text-emerald-600 font-mono-numbers">{presentCount}명</strong></div>
          <div>지각: <strong className="text-amber-600 font-mono-numbers">{lateCount}명</strong></div>
          <div>결석: <strong className="text-rose-600 font-mono-numbers">{absentCount}명</strong></div>
          <div>출석률: <strong className="text-indigo-600 font-mono-numbers">{rate}%</strong></div>
          <button
            onClick={handleSetAllPresent}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            전원 출석 일괄 체크
          </button>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">학생명</th>
                <th className="py-3 px-4">소속 학교 / 학년</th>
                <th className="py-3 px-4">수강 반 / 강의실</th>
                <th className="py-3 px-4">담당 강사</th>
                <th className="py-3 px-4">등원 시간</th>
                <th className="py-3 px-4">출결 상태 원클릭 변경</th>
                <th className="py-3 px-4">비고 / 사유</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const record = getRecordForStudent(student.id);
                const currentStatus: AttendanceStatus = record ? record.status : '출석';
                const time = record ? record.time : '-';

                return (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {student.name}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {student.school} {student.grade}
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      <div>{student.track}</div>
                      <div className="text-[11px] text-slate-400">{student.classRoom}</div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {student.assignedTeacher}
                    </td>

                    <td className="py-3 px-4 font-mono-numbers text-slate-600">
                      {time}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {(['출석', '지각', '결석', '보강완료'] as AttendanceStatus[]).map((st) => {
                          const isActive = currentStatus === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => toggleAttendance(student.id, selectedDate, st)}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                                isActive
                                  ? st === '출석'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : st === '지각'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : st === '결석'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-500">
                      {record?.note || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
