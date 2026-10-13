import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { BookingStatus } from '../../types';

export const BookingManager: React.FC = () => {
  const { bookings, updateBookingStatus, teachers } = useAcademy();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    return true;
  });

  const pendingCount = bookings.filter((b) => b.status === '접수대기').length;
  const confirmedCount = bookings.filter((b) => b.status === '예약확정').length;

  return (
    <div className="space-y-6">
      {/* Metric & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-4 text-xs">
          <div>
            신규 접수 대기: <strong className="text-amber-600 font-mono-numbers">{pendingCount}건</strong>
          </div>
          <div>
            예약 확정: <strong className="text-emerald-600 font-mono-numbers">{confirmedCount}건</strong>
          </div>
          <div>
            총 누적 예약: <strong className="text-slate-900 font-mono-numbers">{bookings.length}건</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600">상태 필터:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">전체 예약 보기</option>
            <option value="접수대기">접수대기</option>
            <option value="예약확정">예약확정</option>
            <option value="상담완료">상담완료</option>
            <option value="예약취소">예약취소</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">예약 번호</th>
                <th className="py-3 px-4">예약 프로그램</th>
                <th className="py-3 px-4">학생 / 학년</th>
                <th className="py-3 px-4">희망 일시</th>
                <th className="py-3 px-4">학부모 연락처</th>
                <th className="py-3 px-4">현재 진도 / 문의 사항</th>
                <th className="py-3 px-4">상태 관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    접수된 예약 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono-numbers font-bold text-slate-900">
                      {bk.bookingCode}
                      <div className="text-[10px] text-slate-400 font-normal">
                        {bk.createdAt}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-semibold text-indigo-700">
                      {bk.type}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{bk.studentName}</div>
                      <div className="text-[11px] text-slate-500">{bk.studentGrade}</div>
                    </td>

                    <td className="py-3 px-4 font-mono-numbers text-slate-700">
                      <div>{bk.preferredDate}</div>
                      <div className="text-[11px] text-slate-400">{bk.preferredTime}</div>
                    </td>

                    <td className="py-3 px-4 font-mono-numbers text-slate-700">
                      {bk.parentPhone}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="text-slate-800 font-medium truncate" title={bk.currentMathProgress}>
                        {bk.currentMathProgress}
                      </div>
                      {bk.notes && (
                        <div className="text-[11px] text-slate-500 truncate" title={bk.notes}>
                          메모: {bk.notes}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <select
                          value={bk.status}
                          onChange={(e) => updateBookingStatus(bk.id, e.target.value as BookingStatus)}
                          className={`px-2.5 py-1 text-xs font-bold rounded border cursor-pointer ${
                            bk.status === '예약확정'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : bk.status === '접수대기'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : bk.status === '상담완료'
                              ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="접수대기">접수대기</option>
                          <option value="예약확정">예약확정</option>
                          <option value="상담완료">상담완료</option>
                          <option value="예약취소">예약취소</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
