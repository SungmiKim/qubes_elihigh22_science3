window.addEventListener("load", function () {
  let directive1Audio = new Audio("audio/explore2/directive1.mp3");
  directive1Audio.play();

  directive1Audio.addEventListener("ended", function () {
    playGif(".ani_area .eo");
    $(".ani_area .eo").attr("data-num", "ing1");

    setTimeout(function () {
      $(".ani_area .eo").attr("src", "./img/explore2/cha.png");
      openPop(1);
      directive2("audio/explore2/directive2_1.mp3");
    }, 5000);
  });
});

let directive2Audio = new Audio();
let helpAudio = new Audio("audio/explore2/help.mp3");
let iconSearchAudio = new Audio();
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let dataNum, popNum, aniAreaImg;
let incorrectAudio = new Audio("audio/explore2/incorrect.mp3");

var guide;

function directive2(src) {
  directive2Audio.src = src;
  directive2Audio.play();

  directive2Audio.addEventListener(
    "ended",
    function () {
      if (src == "audio/explore2/directive2_1.mp3") {
        helpAudio.play();
        qs(".help.po_ab").classList.remove("hide");
        playGif(".help img");
        qsa(".icon_search").forEach((search) => {
          search.classList.add("on");
        });

        helpAudio.addEventListener(
          "ended",
          function () {
            aa(src);
          },
          { once: true }
        );
      } else {
        aa(src);
      }
    },
    { once: true }
  );
}

function aa(src) {
  popWait();
  if (src == "audio/explore2/directive2_1.mp3") {
    playGuide();

    guide = setTimeout(function () {
      qs(".has_guide").classList.add("hide");
      qsa(".btn_wrap").forEach((wrap) => {
        wrap.classList.add("ani");
      });
    }, 1800);
  } else {
    qs(".has_guide").classList.add("hide");
    qsa(".btn_wrap").forEach((wrap) => {
      wrap.classList.add("ani");
    });
  }
  qsa(".icon_search").forEach((search) => {
    search.classList.remove("on");
  });
  qs(".help.po_ab").classList.add("hide");
  qs(".blank").classList.add("hide");
}

function iconSearch(eo) {
  clearTimeout(guide);
  if (eo == "eo1") {
    if ($(".pop_ct1 .ex_box").hasClass("on")) {
      $(".pop_ct1 .ex_box").removeClass("on");
      $(".pop_ct1 .ani img").attr("src", "./img/explore2/ani1.png");
      qsa(".btn_wrap").forEach((wrap) => {
        wrap.classList.add("ani");
      });
      return;
    }
  } else if (eo == "eo2") {
    if ($(".pop_ct2 .ex_box").hasClass("on")) {
      $(".pop_ct2 .ex_box").removeClass("on");
      $(".pop_ct1 .ani img").attr("src", "./img/explore2/ani2.png");
      qsa(".btn_wrap").forEach((wrap) => {
        wrap.classList.add("ani");
      });
      return;
    }
  } else {
    if ($(".pop_ct3 .ex_box").hasClass("on")) {
      $(".pop_ct3 .ex_box").removeClass("on");
      $(".pop_ct1 .ani img").attr("src", "./img/explore2/ani3.png");
      qsa(".btn_wrap").forEach((wrap) => {
        wrap.classList.add("ani");
      });
      return;
    }
  }
  qs(".has_guide").classList.add("hide");
  qsa(".btn_wrap").forEach((wrap) => {
    wrap.classList.remove("ani");
  });
  qs(".blank").classList.remove("hide");
  qsa(".ex_box").forEach((ex) => {
    ex.classList.add("on");
  });
  if (eo == "eo1") {
    $(".pop_ct1 .ani img").attr("src", "./img/explore2/ani1.gif");
  } else if (eo == "eo2") {
    $(".pop_ct2 .ani img").attr("src", "./img/explore2/ani2.gif");
  } else {
    $(".pop_ct3 .ani img").attr("src", "./img/explore2/ani3.gif");
  }
  iconSearchAudio.src = "audio/explore2/" + eo + ".mp3";
  iconSearchAudio.play();

  iconSearchAudio.addEventListener(
    "ended",
    function () {
      qs(".blank").classList.add("hide");
      $(".btn_wrap").addClass("ani");
    },
    { once: true }
  );
}

function correct(popNum) {
  playGif(".ani_area .eo");
  $(".ani_area .eo").attr("data-num", "ing" + (popNum + 1));
  // qs(".ani_area img").src = "./img/explore2/result_" + popNum + "_o.png";
  if (popNum < 3) {
    var time = 3000;
    if (popNum === 1) {
      time = 5000;
    }
    setTimeout(function () {
      qsa(".btn_wrap").forEach((wrap) => {
        wrap.classList.remove("on");
      });
      qsa(".ex_box").forEach((ex) => {
        ex.classList.remove("on");
      });
      // $(".ani_area .eo").attr("src", "./img/explore2/cha.png");
      console.log(popNum, "/", time);
      openPop(popNum + 1);
      directive2("audio/explore2/directive2_" + (popNum + 1) + ".mp3");
    }, time);
  } else {
    setTimeout(function () {
      $(".ani_area .eo").attr("src", "./img/explore2/cha2.gif");
      setTimeout(function () {
        $(".ani_area .eo").attr("src", "./img/explore2/cha2.png");
      }, 2200);
      setTimeout(function () {
        playFeedback();
      }, 3000);
    }, 3000);
  }
}

function incorrect(popNum) {
  playGif(".ani_area .eo");
  $(".ani_area .eo").attr("data-num", "fail" + popNum);

  setTimeout(function () {
    incorrectAudio.play();
    $(".ani_area .eo").attr("src", "./img/explore2/cha1.gif");

    setTimeout(function () {
      $(".ani_area .eo").attr("src", "./img/explore2/cha1.png");
    }, 1500);
  }, 3000);
}

incorrectAudio.addEventListener("ended", function () {
  qsa(".btn_wrap .btn").forEach((wrap) => {
    wrap.classList.remove("on");
  });
  qsa(".ex_box").forEach((ex) => {
    ex.classList.remove("on");
  });
  $(".ani_area .eo").attr({ src: "./img/explore2/cha.gif", "data-num": "return" + popNum });
  setTimeout(function () {
    openPop(popNum);
    directive2("audio/explore2/directive2_" + popNum + ".mp3");
  }, 3000);
});

qsa(".icon_search").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.previousElementSibling.innerText == "풍선") {
      iconSearch("eo1");
    } else if (this.previousElementSibling.innerText == "어항") {
      iconSearch("eo2");
    } else if (this.previousElementSibling.innerText == "공책") {
      iconSearch("eo3");
    }
  });
});

qsa(".btn_wrap .btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    dataNum = this.dataset.num;
    if (this.dataset.num <= 2) {
      popNum = 1;
    } else if (this.dataset.num <= 4) {
      popNum = 2;
    } else if (this.dataset.num <= 6) {
      popNum = 3;
    }
    qs(".has_guide").classList.add("hide");
    clearTimeout(guide);
    qsa(".btn_wrap").forEach((wrap) => {
      wrap.classList.remove("ani");
    });
    qs(".blank").classList.remove("hide");
    this.classList.add("on");
    sparkleAudio.play();

    sparkleAudio.addEventListener(
      "ended",
      function () {
        closePop(popNum);
        if (dataNum == 1 || dataNum == 3 || dataNum == 6) {
          correct(popNum);
        } else {
          incorrect(popNum);
        }
      },
      { once: true }
    );
  });
});
