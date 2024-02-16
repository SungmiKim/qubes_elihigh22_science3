var pageInfo = {
  subject: "science",
  grade: "3",
  term: "2",
  lessonNum: 2,
  feedback: ["concept3_h"],
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
    nextPage: "concept1_a.html",
  },
  // 생각하이
  think: {
    step: 1,
    page: 1,
    prevPage: "",
    nextPage: "",
    bgm: false,
  },
  // 탐구하이 인트로 (간지)
  explore1: {
    step: 1,
    page: 2,
    prevPage: "",
    nextPage: "",
    bgm: "gap.mp3",
  },

  // 개념하이 1_a
  concept1_a: {
    step: 1,
    page: 3,
    prevPage: "intro.html",
    nextPage: "concept1_h.html",
    bgm: false,
  },

  // 개념하이 1_h
  concept1_h: {
    step: 1,
    page: 3,
    prevPage: "intro.html",
    nextPage: "concept2_a.html",
    bgm: "concept_h.mp3",
  },

  // 개념하이 2_a
  concept2_a: {
    step: 1,
    page: 4,
    prevPage: "concept1_a.html",
    nextPage: "concept2_h.html",
    bgm: false,
  },

  // 개념하이 2_h
  concept2_h: {
    step: 1,
    page: 4,
    prevPage: "concept1_a.html",
    nextPage: "concept3_a.html",
    bgm: "concept_h.mp3",
  },

  // 개념하이 3_a
  concept3_a: {
    step: 1,
    page: 5,
    prevPage: "concept2_a.html",
    nextPage: "concept3_h.html",
    bgm: false,
  },

  // 개념하이 3_h
  concept3_h: {
    step: 1,
    page: 5,
    prevPage: "concept2_a.html",
    nextPage: "outro.html",
    bgm: "concept_h.mp3",
  },
  // 정리하이 인트로 (간지)
  summary1: {
    step: 4,
    page: 5,
    prevPage: "",
    nextPage: "",
    bgm: "summary.mp3",
  },
  // 아웃트로
  outro: {
    step: 5,
    page: 6,
    prevPage: "",
    nextPage: "",
    bgm: "outro.mp3",
  },
};
