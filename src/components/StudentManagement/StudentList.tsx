import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Student } from '../../types';

interface StudentListProps {
  onSelectStudent: (student: Student) => void;
  onOpenNewStudent: () => void;
}

export const StudentList: React.FC<StudentListProps> = ({
  onSelectStudent,
  onOpenNewStudent
}) => {
  const { students, deleteStudent } = useAcademy();

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [trackFilter, setTrackFilter] = useState<string>('all');

  const filteredStudents = students.filter((s) => {
    // Search query
    const matchSearch =
      s.name.includes(search.trim()) ||
      s.school.includes(search.trim()) ||
      s.assignedTeacher.includes(search.trim()) ||
      s.weakTopics.some((t) => t.includes(search.trim()));

    if (!matchSearch) return false;

    // Grade filter
    if (gradeFilter === 'middle' && !s.grade.startsWith('중')) return false;
    if (gradeFilter === 'high1' && s.grade !== '고1') return false;
    if (gradeFilter === 'high2' && s.grade !== '고2') return false;
    if (gradeFilter === 'high3' && s.grade !== '고3') return false;

    // Track filter
    if (trackFilter !== 'all' && !s.track.includes(trackFilter)) return false;

    return true;
  });

  const exportCSV = () => {
    const headers = ['이름', '소속학교', '학년', '수강트랙', '강의실', '담당강사', '학부모연락처', '평균성적', '목표대학'];
    const rows = filteredStudents.map((s) => [
      s.name,
      s.school,
      s.grade,
      s.track,
      s.classRoom,
      s.assignedTeacher,
      s.parentPhone,
      `${s.currentScoreAverage}점`,
      s.targetUniversity
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StudyLabs_원생명부_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="학생명, 소속 학교, 담당 강사, 취약 단원 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">전체 학년</option>
            <option value="middle">중등부 (중1~중3)</option>
            <option value="high1">고등 1학년</option>
            <option value="high2">고등 2학년</option>
            <option value="high3">고등 3학년</option>
          </select>

          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="hidden sm:block px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">전체 트랙</option>
            <option value="내신 1등급">내신 1등급 집중반</option>
            <option value="수능·수리논술">수능 킬러반</option>
            <option value="영재·과고">영재·선행반</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            CSV 명부 다운로드
          </button>
          <button
            onClick={onOpenNewStudent}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            + 신규 학생 등록
          </button>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">학생명</th>
                <th className="py-3 px-4">학교 / 학년</th>
                <th className="py-3 px-4">수강 과정 / 반</th>
                <th className="py-3 px-4 text-right">평균 성적</th>
                <th className="py-3 px-4">집중 케어 취약 단원</th>
                <th className="py-3 px-4">학부모 연락처</th>
                <th className="py-3 px-4">담당 강사</th>
                <th className="py-3 px-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    검색 조건에 맞는 학생이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectStudent(student)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{student.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono-numbers">
                        목표: {student.targetUniversity}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{student.school}</div>
                      <div className="text-[11px] text-slate-500">{student.grade}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-indigo-700">{student.track}</span>
                      <div className="text-[11px] text-slate-400">{student.classRoom}</div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-bold text-slate-900 font-mono-numbers">
                        {student.currentScoreAverage}점
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {student.weakTopics.slice(0, 2).map((topic, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                        {student.weakTopics.length > 2 && (
                          <span className="text-[10px] text-slate-400">
                            +{student.weakTopics.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono-numbers text-slate-600">
                      {student.parentPhone}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {student.assignedTeacher}
                    </td>

                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onSelectStudent(student)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                        >
                          상세보기
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`${student.name} 학생을 원생 명부에서 삭제하시겠습니까?`)) {
                              deleteStudent(student.id);
                            }
                          }}
                          className="px-2 py-1 text-[11px] text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>총 재원생 {students.length}명 중 {filteredStudents.length}명 표시</span>
          <span className="text-[11px] text-slate-400">* 학생 행을 클릭하면 성적 추이 및 주간 리포트 상세 카드가 열립니다.</span>
        </div>
      </div>
    </div>
  );
};
