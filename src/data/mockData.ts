import { Student, Course, Teacher, TestScore, AttendanceRecord, WeeklyReport, Booking } from '../types';

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    name: '정우성 대표원장',
    role: '대표원장 / 고등 수능·수리논술 총괄',
    degree: '서울대학교 수리과학부 졸업',
    subjects: ['미적분', '수리논술', '킬러문항 분석'],
    bio: '15년간 대치동 수능 1등급 3,200여 명 배출. 문제풀이 암기가 아닌 수식의 구조적 원리를 꿰뚫는 직관적 해법을 제시합니다.',
    career: [
      '전) 대치 대찬학원 최상위권 고등부 대표강사',
      '전) 메가스터디 수리영역 전국 모의고사 출제위원',
      '저서: 《Study Labs 수능 킬러 수학 300선》, 《수리논술 본고사 정복》'
    ]
  },
  {
    id: 't-2',
    name: '강지혜 부원장',
    role: '부원장 / 고1·2 공통수학·대수 전임',
    degree: 'KAIST 수리과학과 학·석사',
    subjects: ['공통수학 1·2', '대수', '기하'],
    bio: '어려운 증명과 복잡한 함수 식을 시각화하여 학생 스스로 논리적 비약을 찾아내도록 지도하는 정밀 클리닉의 전문가입니다.',
    career: [
      '전) 목동 씨앤씨 최상위권 경시/선행 팀장',
      '전국 대학생 수학경시대회 우수상 수상',
      '대치동 내신 만점자 누적 480명 돌파'
    ]
  },
  {
    id: 't-3',
    name: '박성민 수석연구원',
    role: '중등 심화 & 영재·KMO 연구소장',
    degree: '포항공과대학교(POSTECH) 수학과 졸업',
    subjects: ['중등 A급 기하·대수', 'KMO 1차', '영재교 지필'],
    bio: '단순 계산 실수를 줄이고 기하적 보조선 발상과 대수적 동치변형 능력을 극대화하여 영재교·과고 합격의 기틀을 완성합니다.',
    career: [
      '한국수학올림피아드(KMO) 금상 출신',
      '전) 대치 올림피아드 영재센터 대표강사',
      '한국영재학교/서울과고 1차 합격자 다수 배출'
    ]
  },
  {
    id: 't-4',
    name: '이민아 전임강사',
    role: '1:1 맞춤 클리닉 & 오답 연구소장',
    degree: '고려대학교 수학교육과 졸업 (중등정교사 자격증)',
    subjects: ['오답 클리닉', '확률과 통계', '내신 서술형 특화'],
    bio: '학생 한 명 한 명의 오답 유형을 정밀 진단하여 쌍둥이 문제와 유사 변형 문제를 맞춤 처방하는 1:1 취약점 치료 전문가입니다.',
    career: [
      '서울 사립고 수학과 정교사 역임',
      'Study Labs 개인별 오답 진단 시스템 총괄 설계'
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: '고1 공통수학 1·2 내신 1등급 완성반',
    gradeCategory: '고등부',
    track: '내신 1등급 집중반',
    targetGrades: '고1 재학생 (상위 10% 이내 목표)',
    badge: '대치 본원 마감임박',
    instructor: '강지혜 부원장',
    schedule: '화·목 18:30 ~ 22:00 (주 2회 + 토요 클리닉)',
    capacity: 12,
    enrolled: 10,
    price: '월 520,000원',
    description: '강남·서초 주요 15개 자사고/일반고 기출 5개년 킬러 문항과 서술형 감점 요소를 완벽 대비하는 최상위권 필수 코스입니다.',
    features: [
      '강남·서초 15개 고교 기출 킬러 300제 단권화 교재',
      '매주 화·목 단원평가 후 성적표 및 오답노트 당일 발송',
      '토요일 1:1 맞춤 대면 클리닉 (120분 무제한 첨삭)'
    ],
    syllabus: [
      { week: 1, title: '다항식의 연산과 항등식', detail: '나머지정리 킬러 변형 및 고난도 인수분해 테크닉' },
      { week: 2, title: '복소수와 이차방정식 심화', detail: '주기성을 이용한 복소수 계산 및 근의 판별 고난도' },
      { week: 3, title: '이차함수의 최대·최소와 위치 관계', detail: '축의 위치에 따른 구간별 최대최소와 절대부등식 응용' },
      { week: 4, title: '여러 가지 방정식과 연립방정식', detail: '고차방정식 인수정리 및 대칭식의 구조적 해법' },
      { week: 5, title: '직선의 방정식과 점과 직선 사이의 거리', detail: '도형의 대칭 및 거리의 최솟값 기하적 해석' },
      { week: 6, title: '원의 방정식 킬러 공략', detail: '접선의 방정식과 두 원의 위치 관계, 자취의 방정식 마스터' }
    ]
  },
  {
    id: 'course-2',
    title: '고3/N수 수능 수리영역 1등급 & 미적분 킬러 정복반',
    gradeCategory: '고등부',
    track: '수능·수리논술 킬러반',
    targetGrades: '고3 및 수능 준비생 (모의고사 1~2등급 목표)',
    badge: '정우성 원장 직강',
    instructor: '정우성 대표원장',
    schedule: '토·일 14:00 ~ 18:00 (주 2회 + 평일 비대면 Q&A)',
    capacity: 15,
    enrolled: 14,
    price: '월 680,000원',
    description: '수능 22번, 30번 킬러 문항을 해석하는 그래프 개형 추론법과 초월함수의 극한·미적분 결합문제를 꿰뚫는 실전 실전반입니다.',
    features: [
      '평가원·수능 최근 10개년 기출 전수 분해 및 유사 변형제',
      '매주 100분 실전 모의고사 (실제 수능 답안지 마킹 & 오답 분석표)',
      '대표원장 1:1 풀이 알고리즘 정밀 교정'
    ],
    syllabus: [
      { week: 1, title: '함수의 극한과 연속 조건 추론', detail: '미정계수 결정법과 불연속점의 합성함수 연속성 검증' },
      { week: 2, title: '삼차·사차함수 비율 관계 및 특이점', detail: '극대·극소 차공식과 대칭 중심을 활용한 고속 풀이법' },
      { week: 3, title: '역함수와 합성함수 미분법 킬러', detail: '음함수/매개변수 미분과 역함수 존재 조건 4점 문항 분해' },
      { week: 4, title: '정적분으로 정의된 함수와 주기·대칭', detail: '미적분 기본정리 활용 및 평행이동 결합 적분' },
      { week: 5, title: '치환적분과 부분적분의 실전 스킬', detail: '복합 초월함수 적분 테크닉 및 넓이·부피 킬러' },
      { week: 6, title: '최신 킬러 22/30번 실전 모의 테스트', detail: '시간 안배 전략과 조건 누락 방지 체크리스트 훈련' }
    ]
  },
  {
    id: 'course-3',
    title: '중2·3 최상위권 A급 수학 & 고등수학 선행 브릿지반',
    gradeCategory: '중등부',
    track: '영재·과고 선행반',
    targetGrades: '중2, 중3 (중등 내신 올A 및 고등 선행 희망자)',
    badge: '선행 & 심화 듀얼',
    instructor: '박성민 수석연구원',
    schedule: '월·수·금 17:00 ~ 19:30 (주 3회)',
    capacity: 10,
    enrolled: 8,
    price: '월 480,000원',
    description: '중등 최상위 심화서인 A급 수학과 블랙라벨을 완벽 마스터하며, 고등 공통수학으로 매끄럽게 연결되는 논리적 사고력을 완성합니다.',
    features: [
      '중등 기하 30대 핵심 정리 및 증명 노트 포트폴리오화',
      '고등수학과 직접 연계되는 대수·함수 심층 학습',
      '매 단원 통과제 (기준 미달 시 당일 무료 보강)'
    ],
    syllabus: [
      { week: 1, title: '삼각형의 성질과 외심·내심 심화', detail: 'A급 최고난도 기하 문제 및 보조선 작도 훈련' },
      { week: 2, title: '사각형과 평행선 사이의 넓이 변형', detail: '닮음의 조건과 메넬라우스·체바 정리 입문' },
      { week: 3, title: '피타고라스 정리와 입체도형의 활용', detail: '공간도형에서의 최단거리와 단면적 계산' },
      { week: 4, title: '경우의 수와 확률 심화', detail: '수형도와 조합적 사고, 확률의 곱셈정리 선행' },
      { week: 5, title: '고등 연계: 다항식과 곱셈공식 확장', detail: '중3 인수분해에서 고1 3차 곱셈공식으로의 도약' },
      { week: 6, title: '중등 심화 총괄 종합평가 및 개별 피드백', detail: '전국 단위 기준 석차 백분위 리포트 제공' }
    ]
  },
  {
    id: 'course-4',
    title: '의치한약수 & 서울대 이공계 수리논술 파이널반',
    gradeCategory: '고등부',
    track: '수능·수리논술 킬러반',
    targetGrades: '고3, N수생 (의학계열 및 상위 5개 대학 논술 전형)',
    badge: '대면 첨삭 1:1',
    instructor: '정우성 대표원장',
    schedule: '일요일 09:30 ~ 13:30 (주 1회 집중 + 대면 서면 첨삭)',
    capacity: 8,
    enrolled: 7,
    price: '월 750,000원',
    description: '대학별 기출 분석, 수학적 증명 서술 방식, 공간도형 및 미적분 심층 제시문 해결을 위한 1:1 초정밀 대면 첨삭반입니다.',
    features: [
      '서울대·연세대·가톨릭의대 수리논술 기출 분석 교재',
      '학생 본인의 답안지에 대한 원장 1:1 붉은 펜 첨삭 영상 제공',
      '수학적 귀납법, 사이값 정리, 평균값 정리 증명 테크닉'
    ],
    syllabus: [
      { week: 1, title: '수학적 증명 기초와 서술형 답안 구성법', detail: '정의와 정리의 엄밀한 사용법 및 감점 요인 분석' },
      { week: 2, title: '수열의 귀납적 정의와 극한의 존재성', detail: '조임정리(샌드위치 정리)와 점화식의 수렴성 증명' },
      { week: 3, title: '미분계수의 정의와 평균값 정리의 응용', detail: '코시 평균값 정리 및 다항함수의 근의 개수 증명' },
      { week: 4, title: '정적분과 부등식의 증명 기법', detail: '리만 합의 수렴과 적분을 이용한 부등식 판정법' },
      { week: 5, title: '기하 벡터와 공간도형 매개변수화', detail: '다면체 회전체 단면적과 삼수선의 정리 엄밀 논증' },
      { week: 6, title: '대학별 실전 모의논술 & 파이널 대면 첨삭', detail: '합격자 평균 답안과의 비교 분석 리포트' }
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    name: '김민준',
    school: '휘문고등학교',
    grade: '고1',
    track: '내신 1등급 집중반',
    classRoom: 'Lab A (101호)',
    assignedTeacher: '강지혜 부원장',
    parentPhone: '010-3847-1928',
    studentPhone: '010-8273-9182',
    joinDate: '2026-03-02',
    targetUniversity: '서울대학교 의예과',
    currentScoreAverage: 96.5,
    weakTopics: ['원의 방정식 자취', '복소수의 주기성'],
    notes: '수학적 직관이 뛰어나나 서술형 답안에서 중간 논증 생략으로 인한 감점 주의. 최근 모의고사 전교 3등.'
  },
  {
    id: 'std-2',
    name: '이서연',
    school: '대원외국어고등학교',
    grade: '고2',
    track: '내신 1등급 집중반',
    classRoom: 'Lab B (102호)',
    assignedTeacher: '이민아 전임강사',
    parentPhone: '010-4928-1182',
    studentPhone: '010-7281-4091',
    joinDate: '2026-02-15',
    targetUniversity: '고려대학교 경영대학',
    currentScoreAverage: 92.0,
    weakTopics: ['삼각함수 덧셈정리', '합성함수 그래프'],
    notes: '개념 이해는 매우 빠름. 시험 시간 부족 문제를 겪어 킬러 문제 시간 단축 훈련 집중 중.'
  },
  {
    id: 'std-3',
    name: '박도현',
    school: '단국대학교사범대학부속중학교',
    grade: '중3',
    track: '영재·과고 선행반',
    classRoom: 'Lab C (201호)',
    assignedTeacher: '박성민 수석연구원',
    parentPhone: '010-8192-3482',
    studentPhone: '010-3948-5719',
    joinDate: '2025-11-10',
    targetUniversity: '경기과학고등학교 진학 목표',
    currentScoreAverage: 98.0,
    weakTopics: ['정수론 부정방정식', '체바 정리 응용'],
    notes: 'KMO 1차 장려상 수상 이력. 고등 미적분 기본 과정까지 1회독 완료. 학습 몰입도가 매우 우수함.'
  },
  {
    id: 'std-4',
    name: '정지우',
    school: '숙명여자고등학교',
    grade: '고1',
    track: '내신 1등급 집중반',
    classRoom: 'Lab A (101호)',
    assignedTeacher: '강지혜 부원장',
    parentPhone: '010-6712-9081',
    studentPhone: '010-9182-4421',
    joinDate: '2026-03-12',
    targetUniversity: '연세대학교 약학과',
    currentScoreAverage: 88.5,
    weakTopics: ['이차함수 축의 범위 분할', '절대부등식 코시-슈바르츠'],
    notes: '기본기는 탄탄하나 킬러 문항에 대한 심리적 압박감 있음. 1:1 클리닉에서 단계별 힌트 제공으로 자신감 향상 중.'
  },
  {
    id: 'std-5',
    name: '최우진',
    school: '중동고등학교',
    grade: '고3',
    track: '수능·수리논술 킬러반',
    classRoom: 'Lab S (301호)',
    assignedTeacher: '정우성 대표원장',
    parentPhone: '010-2819-4829',
    studentPhone: '010-6192-8831',
    joinDate: '2025-08-01',
    targetUniversity: '서울대학교 컴퓨터공학부',
    currentScoreAverage: 94.0,
    weakTopics: ['수열의 귀납적 추론 (21번)', '초월함수 역함수 미분법 (30번)'],
    notes: '수능 1등급 안정권 진입 목표. 계산 속도가 빠르고 킬러 문항 정답률이 80% 수준으로 크게 상승.'
  },
  {
    id: 'std-6',
    name: '윤채은',
    school: '역삼중학교',
    grade: '중2',
    track: '영재·과고 선행반',
    classRoom: 'Lab C (201호)',
    assignedTeacher: '박성민 수석연구원',
    parentPhone: '010-5541-9283',
    studentPhone: '010-4491-3829',
    joinDate: '2026-01-08',
    targetUniversity: '세종과학예술영재학교 진학 목표',
    currentScoreAverage: 95.0,
    weakTopics: ['닮음의 활용', '경우의 수와 분할'],
    notes: '수업 참여도가 매우 높고 질문이 날카로움. 기하 보조선 긋는 직관이 발달되어 있음.'
  },
  {
    id: 'std-7',
    name: '한승우',
    school: '보성고등학교',
    grade: '고3',
    track: '수능·수리논술 킬러반',
    classRoom: 'Lab S (301호)',
    assignedTeacher: '정우성 대표원장',
    parentPhone: '010-7719-2810',
    studentPhone: '010-8821-4912',
    joinDate: '2025-12-18',
    targetUniversity: '한양대학교 미래자동차공학과',
    currentScoreAverage: 86.5,
    weakTopics: ['다항함수 극값 조건 추론', '정적분 부등식'],
    notes: '취약 단원 집중 복습 후 최근 모의고사에서 10점 향상. 주 1회 오답 집중 클리닉 필수 참석 중.'
  },
  {
    id: 'std-8',
    name: '서하은',
    school: '진선여자고등학교',
    grade: '고1',
    track: '내신 1등급 집중반',
    classRoom: 'Lab A (101호)',
    assignedTeacher: '강지혜 부원장',
    parentPhone: '010-9941-2039',
    studentPhone: '010-3329-8812',
    joinDate: '2026-03-05',
    targetUniversity: '성균관대학교 소프트웨어학과',
    currentScoreAverage: 91.0,
    weakTopics: ['여러 가지 부등식 영역', '나머지정리 고난도'],
    notes: '성실하며 과제 완수율 100%. 심화 서술형 문제에서 풀이 과정이 논리정연함.'
  }
];

export const INITIAL_TEST_SCORES: TestScore[] = [
  {
    id: 'sc-1',
    studentId: 'std-1',
    testName: '고1 10월 공통수학 전범위 실전모의',
    testType: '월간 종합모의고사',
    date: '2026-10-08',
    score: 97,
    maxScore: 100,
    averageScore: 78.4,
    weakTopics: ['원의 방정식 접선의 길이'],
    feedback: '킬러 21번, 30번 완벽 풀이. 계산 실수 1문항 제외 최상위 완성도.'
  },
  {
    id: 'sc-2',
    studentId: 'std-1',
    testName: '다항식과 항등식 고난도 단원평가',
    testType: '주간 단원평가',
    date: '2026-10-01',
    score: 96,
    maxScore: 100,
    averageScore: 81.2,
    weakTopics: ['나머지정리 차수 추론'],
    feedback: '안정적인 1등급 유지. 풀이 서술 속도 양호.'
  },
  {
    id: 'sc-3',
    studentId: 'std-2',
    testName: '고2 대수 수열의 귀납적 정의 주간테스트',
    testType: '주간 단원평가',
    date: '2026-10-07',
    score: 91,
    maxScore: 100,
    averageScore: 74.0,
    weakTopics: ['점화식 일반항 역추적'],
    feedback: '규칙성 파악은 정확함. 역추적 과정에서 연산 검토 습관 필요.'
  },
  {
    id: 'sc-4',
    studentId: 'std-3',
    testName: '중3 A급 기하·원주각 심화평가',
    testType: '주간 단원평가',
    date: '2026-10-06',
    score: 100,
    maxScore: 100,
    averageScore: 82.5,
    weakTopics: [],
    feedback: '만점. 보조선 작도 발상이 독창적이고 논증이 빈틈없음.'
  },
  {
    id: 'sc-5',
    studentId: 'std-4',
    testName: '고1 10월 공통수학 전범위 실전모의',
    testType: '월간 종합모의고사',
    date: '2026-10-08',
    score: 88,
    maxScore: 100,
    averageScore: 78.4,
    weakTopics: ['이차함수 제한구간 최댓값', '절대부등식 증명'],
    feedback: '중간 난이도 100% 정답. 킬러 2문제는 토요 클리닉에서 1:1 재점검 예정.'
  },
  {
    id: 'sc-6',
    studentId: 'std-5',
    testName: '수능 수학 10월 파이널 실전 모의평가',
    testType: '수능 킬러 진단',
    date: '2026-10-09',
    score: 96,
    maxScore: 100,
    averageScore: 71.8,
    weakTopics: ['22번 다항함수 사차방정식 실근 추론'],
    feedback: '미적분 선택과목 만점. 22번 킬러 아쉽게 오답 후 오답노트에서 재해결 완료.'
  },
  {
    id: 'sc-7',
    studentId: 'std-6',
    testName: '중2 피타고라스와 평면도형 심화',
    testType: '주간 단원평가',
    date: '2026-10-05',
    score: 95,
    maxScore: 100,
    averageScore: 79.0,
    weakTopics: ['히포크라테스 초승달 넓이 변형'],
    feedback: '중상위권 문제를 매우 빠른 속도로 돌파함. 심화 서술형 첨삭 완료.'
  },
  {
    id: 'sc-8',
    studentId: 'std-7',
    testName: '수능 수학 10월 파이널 실전 모의평가',
    testType: '수능 킬러 진단',
    date: '2026-10-09',
    score: 88,
    maxScore: 100,
    averageScore: 71.8,
    weakTopics: ['15번 수열 점화식', '22번 함수 개형 추론'],
    feedback: '지난달 대비 +12점 도약. 준킬러 타임어택 훈련 효과가 뚜렷함.'
  },
  {
    id: 'sc-9',
    studentId: 'std-8',
    testName: '고1 10월 공통수학 전범위 실전모의',
    testType: '월간 종합모의고사',
    date: '2026-10-08',
    score: 92,
    maxScore: 100,
    averageScore: 78.4,
    weakTopics: ['연립부등식 정수해의 개수'],
    feedback: '서술형 감점 0점 달성. 경계값 부등호 포함 여부만 더 유의할 것.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'std-1', date: '2026-10-12', time: '18:25', status: '출석', note: '수업 5분 전 착석 및 질문 준비 완료' },
  { id: 'att-2', studentId: 'std-2', date: '2026-10-12', time: '18:32', status: '출석', note: '학교 동아리 후 정시 도착' },
  { id: 'att-3', studentId: 'std-3', date: '2026-10-12', time: '16:55', status: '출석', note: 'KMO 기출 사전 질문 접수' },
  { id: 'att-4', studentId: 'std-4', date: '2026-10-12', time: '18:45', status: '지각', note: '학교 야간 자율학습 연장 (학부모 사전 연락)' },
  { id: 'att-5', studentId: 'std-5', date: '2026-10-12', time: '18:20', status: '출석', note: '실전 모의고사 세트 조기 수령' },
  { id: 'att-6', studentId: 'std-6', date: '2026-10-12', time: '16:50', status: '출석', note: '과제 노트 우수 제출' },
  { id: 'att-7', studentId: 'std-7', date: '2026-10-12', time: '-', status: '결석', note: '독감 증상으로 인한 결석 (10/14 수요일 1:1 보강 예정)' },
  { id: 'att-8', studentId: 'std-8', date: '2026-10-12', time: '18:28', status: '출석', note: '정상 등원' }
];

export const INITIAL_REPORTS: WeeklyReport[] = [
  {
    id: 'rep-1',
    studentId: 'std-1',
    weekRange: '2026년 10월 1주차 (10/05 ~ 10/11)',
    conceptScore: 5,
    problemSolvingScore: 5,
    homeworkRate: 100,
    teacherComment: '민준 학생은 이번 주 원의 방정식 킬러 단원에서 자취의 방정식 원리를 명쾌하게 분석해냈습니다. 서술형 풀이에서 기하적 근거를 한 줄 더 적어주는 연습을 통해 내신 전교 1등 목표를 충분히 달성할 수 있습니다.',
    nextWeekGoal: '도형의 이동 심화 및 고난도 대칭이동 50제 정복',
    createdAt: '2026-10-11',
    sentToParent: true,
    sentAt: '2026-10-11 20:30'
  },
  {
    id: 'rep-2',
    studentId: 'std-4',
    weekRange: '2026년 10월 1주차 (10/05 ~ 10/11)',
    conceptScore: 4,
    problemSolvingScore: 4,
    homeworkRate: 95,
    teacherComment: '지우 학생은 이차함수 판별식과 근의 분리 유형을 집중 트레이닝하였습니다. 스스로 조건을 나열하는 속도가 전월 대비 1.5배 빨라졌습니다. 토요일 1:1 클리닉을 통해 틀린 문제 쌍둥이 문항 20제를 완벽 마스터했습니다.',
    nextWeekGoal: '다항식의 나눗셈 복습 및 고난도 나머지정리 30제 오답 정리',
    createdAt: '2026-10-11',
    sentToParent: true,
    sentAt: '2026-10-11 20:35'
  },
  {
    id: 'rep-3',
    studentId: 'std-5',
    weekRange: '2026년 10월 1주차 (10/05 ~ 10/11)',
    conceptScore: 5,
    problemSolvingScore: 5,
    homeworkRate: 100,
    teacherComment: '우진 학생은 수능 실전 모의고사에서 미적분 4점 3문항을 안정적으로 풀어내며 96점을 획득했습니다. 사차함수 그래프 대칭성을 활용한 조건 추론에서 매우 날카로운 통찰을 보였습니다.',
    nextWeekGoal: '수능 22번 다항함수 추론 기출 10개년 완벽 단권화',
    createdAt: '2026-10-11',
    sentToParent: true,
    sentAt: '2026-10-11 20:40'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingCode: 'STL-2026-081',
    type: '입학 진단평가',
    studentName: '송준혁',
    parentPhone: '010-4829-1092',
    studentGrade: '고1',
    preferredDate: '2026-10-15',
    preferredTime: '15:00',
    currentMathProgress: '공통수학1 1회독 완료 / 중등 내신 95점대',
    notes: '대치 인근 고교 진학 예정, 상위 1등급 목표로 현재 실력 정밀 진단 희망',
    status: '접수대기',
    assignedTeacher: '강지혜 부원장',
    createdAt: '2026-10-12 11:20'
  },
  {
    id: 'bk-102',
    bookingCode: 'STL-2026-082',
    type: '1:1 맞춤 수학클리닉',
    studentName: '이지안',
    parentPhone: '010-3391-8842',
    studentGrade: '중3',
    preferredDate: '2026-10-16',
    preferredTime: '17:30',
    currentMathProgress: '중3-2 기하 심화 진행 중, 원주각 파트 오답 잦음',
    notes: '취약 단원 일대일 맞춤 클리닉 수업 1회 체험 희망',
    status: '예약확정',
    assignedTeacher: '박성민 수석연구원',
    createdAt: '2026-10-12 14:05'
  },
  {
    id: 'bk-103',
    bookingCode: 'STL-2026-083',
    type: '대표원장 심층 학습상담',
    studentName: '권도윤',
    parentPhone: '010-9182-7744',
    studentGrade: '고2',
    preferredDate: '2026-10-17',
    preferredTime: '11:00',
    currentMathProgress: '수능 미적분 모의고사 3등급 정체 / 의대 지망',
    notes: '고3 수능 커리큘럼 및 킬러 문항 돌파 학습 로드맵 원장 직접 상담 요청',
    status: '예약확정',
    assignedTeacher: '정우성 대표원장',
    createdAt: '2026-10-12 16:40'
  },
  {
    id: 'bk-104',
    bookingCode: 'STL-2026-080',
    type: '주말 파이널 특강 체험',
    studentName: '문수아',
    parentPhone: '010-8273-1948',
    studentGrade: '고1',
    preferredDate: '2026-10-18',
    preferredTime: '14:00',
    currentMathProgress: '공통수학2 원의 방정식 진행 중',
    notes: '토요 킬러 문항 특강 청강 신청',
    status: '상담완료',
    assignedTeacher: '강지혜 부원장',
    createdAt: '2026-10-11 18:22'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '10:30',
  '13:00',
  '15:00',
  '16:30',
  '18:00',
  '19:30'
];
