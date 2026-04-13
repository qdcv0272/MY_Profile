export const PROFILE = {
  name: "김창훈",
  nameEn: "Kim Chang Hun",
  title: "Front-end Engineer",
  subtitle: "복잡한 인터랙션을 안정적인 구조로 설계하는 개발자",
  email: "qdcv0272@naver.com",
  github: "https://github.com/qdcv0272",
  githubUsername: "qdcv0272",
  avatar: "https://avatars.githubusercontent.com/u/91595135?v=4",
};

export const CAREER = [
  {
    company: "㈜아만타",
    position: "개발팀 사원",
    period: "2023.02 ~ 2025.10",
    duration: "2년 9개월",
    tasks: ["밀크티 초등 수학 콘텐츠 개발 (TypeScript, 드래그앤드롭/선긋기 인터랙션 공통 모듈화)", "중등 국어 / 초등 영어 전자저작물 구축", "AIDT(AI 디지털 교과서) 초등 영어 개발 — KWCAG 2.2 웹 접근성 준수"],
    tags: ["TypeScript", "JavaScript", "GSAP", "Adobe Animate", "HTML5", "CSS3"],
  },
];

export const PROJECTS = [
  {
    id: "algocanvas",
    title: "AlgoCanvas",
    description: "알고리즘 흐름을 직관적으로 이해할 수 있도록 시각화한 프로젝트",
    detail: [
      "Zustand 기반 상태 관리로 고빈도 상태 변화 효율적 제어",
      "불변 스냅샷(buildSteps) 구조로 알고리즘 실행 흐름 관리",
      "Next.js API Routes + Prisma + PostgreSQL 백엔드 구현",
      "JWT 인증 기반 북마크·메모 기능 upsert 패턴 적용",
    ],
    tags: ["Next.js", "TypeScript", "Zustand", "Prisma", "PostgreSQL", "JWT"],
    github: "https://github.com/qdcv0272/AlgoCanvas",
    demo: "https://algocans.netlify.app/",
    color: "#2c5364",
    gradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  {
    id: "used-shopping",
    title: "Used Shopping",
    description: "실시간 데이터 흐름과 사용자 신뢰를 고려한 중고거래 서비스",
    detail: ["Firebase 기반 인증·데이터 저장·실시간 채팅 구현", "onSnapshot 활용한 실시간 데이터 동기화", "DAL 패턴으로 Firebase 함수 집중 관리", "useForm<T> 제네릭 커스텀 훅으로 재사용성 확보"],
    tags: ["React", "TypeScript", "Firebase", "TanStack Query", "Zustand"],
    github: "https://github.com/qdcv0272/Used-Shopping",
    demo: "https://used-shopping.netlify.app/",
    color: "#4a1942",
    gradient: "linear-gradient(135deg, #1a0a2e, #2d1b69, #4a0e8f)",
  },
  {
    id: "plane-figures",
    title: "평면 도형의 이동",
    description: "교육용 인터랙티브 수학 콘텐츠",
    detail: ["Page/Step 2계층 클래스 구조로 콘텐츠 흐름 관리", "GsapExecutor 단일 액션 큐 패턴 구현", "ImagePreloader(Promise.all 병렬 로딩) 최적화", "Half-edge Traversal로 SVG 선긋기 폴리곤 추출"],
    tags: ["TypeScript", "GSAP", "Vite", "SVG"],
    github: "https://github.com/qdcv0272/-Movement-of-plane-figures",
    demo: "https://movement-of-plane-figures.netlify.app/",
    color: "#0d3b2e",
    gradient: "linear-gradient(135deg, #0d3b2e, #1a6b4a, #0f5132)",
  },
];

export const SKILLS = {
  frontend: [
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "React", level: 80 },
    { name: "HTML5 / CSS3", level: 90 },
    { name: "Next.js", level: 65 },
  ],
  animation: [
    { name: "GSAP", level: 75 },
    { name: "CSS Animation", level: 80 },
  ],
  state: [
    { name: "Zustand", level: 80 },
    { name: "TanStack Query", level: 70 },
  ],
  backend: [
    { name: "Firebase", level: 75 },
    { name: "Prisma / PostgreSQL", level: 55 },
  ],
  tools: ["Git", "SVN", "Vite", "Webpack", "Adobe Animate"],
};
