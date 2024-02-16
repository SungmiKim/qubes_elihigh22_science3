var pageInfo = {
  subject: "science",
  grade: "3",
  term: "1",
  lessonNum: 9,
  feedback: ["explore5", "concept1_h", "summary4"],
  // index
  index: {
    step: 0,
    page: 0,
    bgm: false,
  },
  // 인트로
  intro: {
    step: 0,
    page: 0,
    bgm: "intro.mp3",
    nextPage: "think.html",
  },
  // 생각하이
  think: {
    step: 1,
    page: 1,
    prevPage: "",
    nextPage: "explore1.html",
    bgm: false,
  },

  // 탐구하이 인트로 (간지)
  explore1: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "gap.mp3",
  },
  // 탐구하이 2
  explore2: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },
  // 탐구하이 3
  explore3: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },
  // 탐구하이 4
  explore4: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },
  // 탐구하이 5
  explore5: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },

  // 개념하이 1_a
  concept1_a: {
    step: 3,
    page: 3,
    prevPage: "explore1.html",
    nextPage: "concept1_h.html",
    bgm: false,
  },

  // 개념하이 1_h
  concept1_h: {
    step: 3,
    page: 3,
    prevPage: "explore1.html",
    nextPage: "summary1.html",
    bgm: "concept_h.mp3",
  },

  // 정리하이 인트로 (간지)
  summary1: {
    step: 4,
    page: 6,
    prevPage: "concept1_a.html",
    nextPage: "outro.html",
    bgm: "summary.mp3",
  },

  // 정리하이 1
  summary2: {
    step: 4,
    page: 6,
    prevPage: "concept1_a.html",
    nextPage: "summary3.html",
    bgm: "summary.mp3",
  },

  // 정리하이 2
  summary3: {
    step: 4,
    page: 6,
    prevPage: "concept1_a.html",
    nextPage: "summary4.html",
    bgm: "summary.mp3",
  },
  // 정리하이 3
  summary4: {
    step: 4,
    page: 6,
    prevPage: "concept1_a.html",
    nextPage: "outro.html",
    bgm: "summary.mp3",
  },

  // 아웃트로
  outro: {
    step: 5,
    page: 7,
    prevPage: "",
    nextPage: "",
    bgm: "outro.mp3",
  },
};
