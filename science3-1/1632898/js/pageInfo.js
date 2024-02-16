var pageInfo = {
  subject: "science",
  grade: "3",
  term: "1",
  lessonNum: 3,
  feedback: ["explore9", "concept2_h", "summary3"],
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
    prevPage: "index.html",
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
  // 탐구하이 6
  explore6: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },
  // 탐구하이 7
  explore7: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },
  // 탐구하이 8
  explore8: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },
  // 탐구하이 9
  explore9: {
    step: 2,
    page: 2,
    prevPage: "think.html",
    nextPage: "concept1_a.html",
    bgm: "explore.mp3",
  },

  // 탐구하이 10
  explore10: {
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
    nextPage: "concept2_a.html",
    bgm: "concept_h.mp3",
  },

  // 개념하이 2_a
  concept2_a: {
    step: 3,
    page: 4,
    prevPage: "concept1_a.html",
    nextPage: "concept2_h.html",
    bgm: false,
  },

  // 개념하이 2_h
  concept2_h: {
    step: 3,
    page: 4,
    prevPage: "concept1_a.html",
    nextPage: "summary1.html",
    bgm: "concept_h.mp3",
  },

  // 정리하이 인트로 (간지)
  summary1: {
    step: 4,
    page: 5,
    prevPage: "concept2_a.html",
    nextPage: "outro.html",
    bgm: "gap.mp3",
  },

  // 정리하이 1
  summary2: {
    step: 4,
    page: 5,
    prevPage: "concept2_a.html",
    nextPage: "summary3.html",
    bgm: "summary.mp3",
  },

  // 정리하이 2
  summary3: {
    step: 4,
    page: 5,
    prevPage: "concept2_a.html",
    nextPage: "outro.html",
    bgm: "summary.mp3",
  },
  // 아웃트로
  outro: {
    step: 5,
    page: 6,
    prevPage: "summary3.html",
    nextPage: "",
    bgm: "outro.mp3",
  },
};
