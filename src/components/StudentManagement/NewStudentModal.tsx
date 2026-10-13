import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { GradeLevel, MathTrack } from '../../types';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewStudentModal: React.FC<NewStudentModalProps> = ({ isOpen, onClose }) => {
  const { addStudent, teachers } = useAcademy();

  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('고1');
  const [track, setTrack] = useState<MathTrack>('내신 1등급 집중반');
  const [classRoom, setClassRoom] = useState('Lab A (101호)');
  const [assignedTeacher, setAssignedTeacher] = useState(teachers[0]?.name || '강지혜 부원장');
  const [parentPhone, setParentPhone] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [targetUniversity, setTargetUniversity] = useState('서울대학교');
  const [weakTopicsStr, setWeakTopicsStr] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !school.trim() || !parentPhone.trim()) {
      alert('학생 이름, 학교, 학부모 연락처는 필수 입력 사항입니다.');
      return;
    }

    const weakTopics = weakTopicsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addStudent({
      name: name.trim(),
      school: school.trim(),
      grade,
      track,
      classRoom,
      assignedTeacher,
      parentPhone: parentPhone.trim(),
      studentPhone: studentPhone.trim() || '010-0000-0000',
      targetUniversity: targetUniversity.trim() || '상담 후 설정',
      weakTopics: weakTopics.length > 0 ? weakTopics : ['개념 재점검 필요'],
      notes: notes.trim() || '신규 입학 상담 완료'
    });

    onClose();
  };

  const grades: GradeLevel[] = [
    '초등 5-6학년',
    '중1',
    '중2',
    '중3',
    '고1',
    '고2',
    '고3',
    'N수/재수'
  ];

  const tracks: MathTrack[] = [
    '내신 1등급 집중반',
    '수능·수리논술 킬러반',
    '영재·과고 선행반',
    '기초·개념 완성반'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            신규 학생 등록 (원생 카드 발급)
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                학생 이름 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 김민준"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                소속 학교 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 휘문고등학교"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">학년</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">수강 트랙</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value as MathTrack)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {tracks.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">담당 강사</label>
              <select
                value={assignedTeacher}
                onChange={(e) => setAssignedTeacher(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.name}>{t.name} ({t.role.split('/')[0]})</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">배정 강의실</label>
              <input
                type="text"
                value={classRoom}
                onChange={(e) => setClassRoom(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                학부모 연락처 <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="010-1234-5678"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">학생 연락처</label>
              <input
                type="tel"
                placeholder="010-9876-5432"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">목표 대학 / 진로</label>
              <input
                type="text"
                placeholder="예: 서울대 의예과"
                value={targetUniversity}
                onChange={(e) => setTargetUniversity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                초기 취약 단원 (쉼표로 구분)
              </label>
              <input
                type="text"
                placeholder="예: 원의 방정식, 복소수 주기성"
                value={weakTopicsStr}
                onChange={(e) => setWeakTopicsStr(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">학습 상담 특이사항 / 메모</label>
            <textarea
              rows={2}
              placeholder="예: 서술형 답안 감점 요인 훈련 집중 필요, 토요일 1:1 클리닉 상시 참여"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition-colors cursor-pointer"
            >
              학생 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
