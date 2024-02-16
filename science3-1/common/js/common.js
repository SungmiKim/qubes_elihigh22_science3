var pageName = $("#wrap").attr("data-page");
var bgmFile = pageInfo[pageName].bgm;
var getModes = PreelemBridge.getModes();
var item = pageInfo["subject"] + pageInfo["grade"] + pageInfo["term"] + pageInfo["lessonNum"];
var headerTimer;
$(document).ready(function () {
  var stopVolume;
  var page = new PageEvent();

  page.init();
  $("body").addClass("on");
  $(".header").load("../common/template/header.html", function () {
    /**
     * 상단바
     */
    $(".header_btn").click(function () {
      $(".header").toggleClass("active");
      if ($(".header").hasClass("active")) {
        headerTimer = setTimeout(function () {
          $(".header").removeClass("active");
        }, 3000);
      } else {
        clearTimeout(headerTimer);
      }
    });

    // 페이지 닫기
    $(".header .btn.quit").click(function () {
      // stopVolume = PreelemBridge.getMediaVolume();
      // PreelemBridge.setMediaVolume(0);
      $(".header").removeClass("active");
      if (getModes === '["dailywork"]') {
        $(".pop_close").addClass("show set_day");
      } else {
        $(".pop_close").addClass("show");
      }
    });

    $(".header .btn.keep").click(function () {
      // PreelemBridge.setMediaVolume(stopVolume + 1);
      $(".pop_close").removeClass("show");
    });

    $(".header .btn.exit").click(function () {
      // PreelemBridge.setMediaVolume(stopVolume + 1);
      PreelemBridge.quit();
    });

    $(".step").click(function () {
      if ($(this).hasClass("step4")) {
        if (PreelemBridge.getInitialStepIndex() >= 3 || sessionStorage.getItem(item) >= 3) {
          window.location.href = "summary1.html";
        }
      } else if ($(this).hasClass("step3")) {
        if (PreelemBridge.getInitialStepIndex() >= 2 || sessionStorage.getItem(item) >= 2) {
          window.location.href = "concept1_a.html";
        }
      } else if ($(this).hasClass("step2")) {
        if (PreelemBridge.getInitialStepIndex() >= 1 || sessionStorage.getItem(item) >= 1) {
          window.location.href = "explore1.html";
        }
      } else if ($(this).hasClass("step1")) {
        if (PreelemBridge.getInitialStepIndex() >= 0 || sessionStorage.getItem(item) >= 0) {
          if ($("#wrap").hasClass("single")) {
            window.location.href = "concept1_a.html";
          } else {
            window.location.href = "think.html";
          }
        }
      }
    });

    page.pageControl();
    page.setPage();

    window.ContentHandler = {
      updateVolume: function updateVolume(number) {
        $(".sound_slide .slider").val(number);
        handleInputChange();
      },
      onStop: function onStop() {
        stopVolume = PreelemBridge.getMediaVolume();
        PreelemBridge.setMediaVolume(0);
      },
      onStart: function onStart() {
        PreelemBridge.setMediaVolume(stopVolume + 1);
      },
      onVideoClosed: function () {
        if (pageName == "think") {
          if (PreelemBridge.getInitialStepIndex() < pageInfo[pageName].step) {
            PreelemBridge.saveStudyProgress(pageInfo[pageName].step);
          }
          if (sessionStorage.getItem(item) < pageInfo[pageName].step) {
            sessionStorage.setItem(item, pageInfo[pageName].step);
          }
        }
        window.location.href = pageInfo[pageName].nextPage;
      },
    };
  });

  // 도움말 버튼
  $(".btn.help").click(function () {
    $(this).parents(".help_wrap").addClass("on");
  });

  $(".help_wrap .close").click(function () {
    $(this).parents(".help_wrap").removeClass("on");
  });
});

window.addEventListener("load", function () {
  handleInputChange();
});
/**
 * Gif sequence
 */
function seqGif(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];

  seqGif0 = setInterval(playSeqGif, time);

  function playSeqGif() {
    seqCnt++;
    console.log("playSeqGif");
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif0);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

function stopSeqGif(name) {
  var pageName = $("#wrap").attr("data-page");
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var fileName = option[0];
  clearInterval(seqGif0);
  $(name + " img").attr("src", "./img/" + pageName + "/" + fileName + "/1.webp");
}

/**
 * 스케폴딩
 */
function startScaffolding(key, text) {
  const charStart = document.querySelector(".scaffolding");
  playGif(".scaffolding img");

  charStart.classList.add("on");

  if (key === "bubble") {
    $(".scaffolding .bubble").removeClass("hide");
  }
  if (text) {
    $(".scaffolding .bubble").html(text);
  }
}

function endScaffolding(key) {
  const charStart = document.querySelector(".scaffolding");
  if (key === "bubble") {
    setTimeout(function () {
      charStart.classList.remove("on");
    }, 1500);
  } else {
    charStart.classList.remove("on");
  }
}

/**
 * 상단바 볼륨 컨트롤
 */
function handleInputChange() {
  let target = document.querySelector(".slider");
  const min = target.min;
  const max = target.max;
  const val = target.value;
  if (val == 0) {
    document.querySelector(".btn.sound").classList.add("mute");
  } else {
    document.querySelector(".btn.sound").classList.remove("mute");
  }

  var getSize = ((val - min) * 100) / (max - min);
  target.style.backgroundSize = getSize + "% 100%";
}

/**
 * 정오답 사운드
 */

function answerAudio(answer) {
  let correctAudio = new Audio("../common/sound/effect/correct.mp3");
  let incorrectAudio = new Audio("../common/sound/effect/incorrect.mp3");
  if (answer) {
    try {
      PreelemBridge.stopAudio(4);
      PreelemBridge.playAudio("common/sound/effect/correct.mp3", 4);
    } catch (error) {
      correctAudio.pause();
      correctAudio.currentTime = 0;
      correctAudio.play();
    }
  } else {
    try {
      PreelemBridge.stopAudio(3);
      PreelemBridge.playAudio("common/sound/effect/incorrect.mp3", 3);
    } catch (error) {
      incorrectAudio.pause();
      incorrectAudio.currentTime = 0;
      incorrectAudio.play();
    }
  }
}

// 선택자
function qs(query) {
  return document.querySelector(query);
}

function qsa(query) {
  return document.querySelectorAll(query);
}

// 팝업
function openPop(num) {
  $(".pop_bg").fadeIn();
  $(".pop_ct" + num).fadeIn();
}
function closePop(num) {
  $(".pop_bg").fadeOut();
  $(".pop_ct" + num).fadeOut();
}
/**
 * 다음 페이지 자동 이동
 */
function autoNextPage(sec, nextPageUrl) {
  var pageName = $("#wrap").attr("data-page");
  setTimeout(function () {
    window.location.href = nextPageUrl;
  }, sec);
}

/**
 * gif 재생
 */
function playGif(tag) {
  let gifImg = $(tag);
  let gifImgSrc = gifImg.attr("src").replace("png", "gif");
  let randNum = Math.floor(Math.random() * 10000);
  gifImg.attr("src", gifImgSrc + "?" + randNum);
}

/**
 * 손가락 가이드
 */
var cnt0 = 0;
function playGuide() {
  id0 = setInterval(guideHand, 100);
  $(".has_guide").removeClass("hide");

  function guideHand() {
    cnt0++;
    if (cnt0 > 27) {
      clearInterval(id0);
      cnt0 = 0;
    } else {
      $(".has_guide img").attr("src", "../common/images/icon/hand/" + cnt0 + ".png");
    }
  }
}

/**
 * gif 정지
 */
function stopGif(tag) {
  let gifImg = $(tag);
  let gifImgSrc = gifImg.attr("src").replace("gif", "png");
  let randNum = Math.floor(Math.random() * 10000);
  gifImg.attr("src", gifImgSrc + "?" + randNum);
}

/**
 * 칭찬 스탬프 피드백
 */

function playFeedback() {
  var arr = ["ella", "haro", "io", "lizzy"];
  var pageName = $("#wrap").attr("data-page");
  var feedbackArr = pageInfo["feedback"];

  if (feedbackArr.includes(pageName)) {
    if (PreelemBridge.getInitialStepIndex() < pageInfo[pageName].step) {
      PreelemBridge.saveStudyProgress(pageInfo[pageName].step);
    }
    if (sessionStorage.getItem(item) < pageInfo[pageName].step) {
      sessionStorage.setItem(item, pageInfo[pageName].step);
    }
  }

  $(".completeStamp").fadeIn();
  let feedbackAudio = new Audio();
  let num2 = Math.floor(Math.random() * 4);
  let name1 = arr[num2];
  let num1 = Math.floor(Math.random() * 3) + 1;
  $(".completeStamp img").attr("src", "../common/images/pop/" + name1 + ".png");
  feedbackAudio.src = "../common/sound/feedback/feedback_" + name1 + "0" + num1 + ".mp3";
  feedbackAudio.play();

  setTimeout(function () {
    if (!$(".btn_next").hasClass("active")) {
      var correctAudio = new Audio("../common/sound/effect/next_page.mp3");
      correctAudio.play();
    }
    qs(".btn_next").classList.add("active");
    popNext();
  }, 3000);
}

/**
 * 애니메이션 시퀀스 무한반복
 */
var seqIdx = 0;

function seq_init(seqCnt, sec, type) {
  var seq_play = true;
  var _img_load = 0;
  var _img_count = seqCnt;

  var gap = "gap";
  for (seqIdx = 0; seqIdx <= _img_count; seqIdx++) {
    var _img_tmp = new Image();
    if (type) {
      _img_tmp.src = "./img/" + pageName + "/" + pageName + "" + seqIdx + "." + type;
    } else if ($("#wrap").hasClass("gap")) {
      _img_tmp.src = "./img/" + gap + "/" + gap + "" + seqIdx + ".webp";
    } else {
      _img_tmp.src = "./img/" + pageName + "/" + pageName + "" + seqIdx + ".webp";
    }

    _img_tmp.onload = function () {
      ++_img_load;
      if (_img_load == _img_count) {
        rolling(sec);
      }
    };
    _img_tmp.onerror = function () {
      ++_img_load;
      if (_img_load == _img_count) {
        rolling(sec);
      }
    };
  }
  seqIdx = 0;
  function rolling(sec) {
    setTimeout(
      function () {
        if (seq_play) seqIdx++;
        if (type) {
          $(".seq_img img").attr("src", "./img/" + pageName + "/" + pageName + "" + seqIdx + "." + type);
        } else if ($("#wrap").hasClass("gap")) {
          $(".seq_img img").attr("src", "./img/" + gap + "/" + gap + "" + seqIdx + ".webp");
        } else {
          $(".seq_img img").attr("src", "./img/" + pageName + "/" + pageName + "" + seqIdx + ".webp");
        }

        if (seqIdx == _img_count) {
          seq_play = false;
          seqIdx = 0;
        }
        if (!seq_play) {
          if (seqIdx == 0) seq_play = true;
        }
        rolling(sec);
        $(".test").text(seqIdx);
      },
      sec ? sec : 100
    );
  }
}

function PageEvent() {
  // 다음 페이지 버튼 클릭 시
  $(".btn_next, .btn_intro").click(function (e) {
    if (!$(this).hasClass("active")) {
      e.preventDefault();
    } else {
      e.preventDefault();
      var pageName = $("#wrap").attr("data-page");
      let dripAudio = new Audio("../common/sound/effect/drip.wav");
      try {
        PreelemBridge.playAudio("common/sound/effect/drip.wav", 0);
        setTimeout(function () {
          window.location.href = pageInfo[pageName].nextPage;
        }, 700);
      } catch (error) {
        dripAudio.play();
        dripAudio.addEventListener("ended", function () {
          setTimeout(function () {
            window.location.href = pageInfo[pageName].nextPage;
          }, 500);
        });
      }
    }
  });
  // 이전 페이지 버튼 클릭 시
  $(".btn_prev").click(function (e) {
    e.preventDefault();
    var href = $(this).attr("href");
    let dripAudio = new Audio("../common/sound/effect/drip.wav");
    try {
      PreelemBridge.playAudio("common/sound/effect/drip.wav", 0);
      setTimeout(function () {
        if ($(this).hasClass("move")) {
          window.location.href = pageInfo[pageName].prevPage;
        } else {
          window.location.href = href;
        }
      }, 700);
    } catch (error) {
      dripAudio.play();
      dripAudio.addEventListener("ended", function () {
        setTimeout(function () {
          if ($(this).hasClass("move")) {
            window.location.href = pageInfo[pageName].prevPage;
          } else {
            window.location.href = href;
          }
        }, 500);
      });
    }
  });

  // 화면 가로,세로값
  var stdWidth = 2000;
  var stdHeight = 1200;

  // 기본 스케일
  var currentScale = 1;

  this.init = function () {
    //스케일 설정되는 영역의 기본 가로,세로 설정
    $(".container").css("width", stdWidth + "px");
    $(".container").css("height", stdHeight + "px");

    $(window).resize(function () {
      // setPageScale();
    });
    setPageScale();

    if (window.innerWidth <= 1920) {
      $("#wrap").addClass("w1920");
    }
  };

  /**
   * 컨텐츠영역 스케일 조절
   */
  function setPageScale() {
    var windowW = $(window).width();
    var windowH = $(window).height();

    var contentW = stdWidth;
    var contentH = stdHeight;
    var scale;
    scale = windowH / contentH;

    $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no, initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale);
  }

  this.pageControl = function () {
    // 시작 볼륨 셋팅
    var volume = PreelemBridge.getMediaVolume();
    $(".sound_slide .slider").val(volume);
    $(".sound_slide .slider").css("background-size", volume + "%");

    // 미디어 음량 on & off
    $(".btn.sound").click(function () {
      $(this).toggleClass("mute");
      if ($(this).hasClass("mute")) {
        volume = PreelemBridge.getMediaVolume();
        setVolume(0);
      } else {
        setVolume(volume + 1);
      }
    });

    //  볼륨 조절
    $(".sound_slide .slider").on("propertychange change keyup paste input", function () {
      var volume = $(this).val();
      setVolume(volume);
    });

    function setVolume(num) {
      num = Math.ceil(num);
      $(".sound_slide .slider").val(num);
      PreelemBridge.setMediaVolume(+num);
      handleInputChange();
    }

    if (sessionStorage.getItem("bgmMute") == "mute") {
      $(".btn.bgm").addClass("mute");
    } else {
      // 배경음악 play
      if (sessionStorage.getItem("bgmFile") == bgmFile) {
      } else {
        sessionStorage.setItem("bgmFile", bgmFile);
        if (bgmFile) {
          PreelemBridge.playBgm("common/sound/bgm/" + bgmFile);
        } else if (!bgmFile) {
          PreelemBridge.stopBgm();
        }
      }
    }

    // 배경음악 on & off
    $(".btn.bgm").click(function () {
      $(this).toggleClass("mute");
      if ($(this).hasClass("mute")) {
        sessionStorage.setItem("bgmMute", "mute");
        PreelemBridge.stopBgm();
      } else {
        sessionStorage.removeItem("bgmMute");
        PreelemBridge.playBgm("common/sound/bgm/" + bgmFile);
      }
    });
  };

  this.setPage = function () {
    var step = $(".step" + pageInfo[pageName].step);

    $(".header .lecture_num span").text(pageInfo["lessonNum"]);
    $(".move.btn_prev").attr("href", pageInfo[pageName].prevPage);
    $(".move.btn_next").attr("href", pageInfo[pageName].nextPage);

    if (PreelemBridge.getInitialStepIndex() >= 4) {
      $(".step").addClass("finish");
    } else if (PreelemBridge.getInitialStepIndex() >= 3) {
      $(".step4").prevAll(".step").addClass("finish");
    } else if (PreelemBridge.getInitialStepIndex() >= 2) {
      $(".step3").prevAll(".step").addClass("finish");
    } else if (PreelemBridge.getInitialStepIndex() >= 1) {
      $(".step2").prevAll(".step").addClass("finish");
    }

    if (sessionStorage.getItem(item) >= 4) {
      $(".step").addClass("finish");
    } else if (sessionStorage.getItem(item) >= 3) {
      $(".step4").prevAll(".step").addClass("finish");
    } else if (sessionStorage.getItem(item) >= 2) {
      $(".step3").prevAll(".step").addClass("finish");
    } else if (sessionStorage.getItem(item) >= 1) {
      $(".step2").prevAll(".step").addClass("finish");
    }

    step.addClass("ing").removeClass("finish");
    step.prevAll(".step").addClass("finish");

    if (PreelemBridge.getInitialStepIndex() >= pageInfo[pageName].step) {
      if (pageName == "summary2" || pageName == "summary3") {
        $(".sub_move.btn_next").addClass("active");
      } else {
        $(".btn_next").addClass("active");
      }
    }
    if (sessionStorage.getItem(item) >= pageInfo[pageName].step) {
      if (pageName == "summary2" || pageName == "summary3") {
        $(".sub_move.btn_next").addClass("active");
      } else {
        $(".btn_next").addClass("active");
      }
    }
  };
}

var wait;
function popWait() {
  clearTimeout(wait);
  wait = setTimeout(function () {
    if (document.querySelector(".pop_ct.pop_next").style.display != "block") {
      document.querySelector(".pop_ct.pop_wait").style.display = "block";
    }
  }, 30000);
}

$(".pop_wait").click(function () {
  document.querySelector(".pop_ct.pop_wait").style.display = "none";
  popWait();
});

$(document).bind("touchstart mousedown click", function () {
  popWait();
});

function popNext() {
  clearTimeout(wait);
  if (document.querySelector(".btn_next").classList.contains("active") || document.querySelector(".sub_move").classList.contains("active")) {
    setTimeout(function () {
      document.querySelector(".pop_ct.pop_next").style.display = "block";
    }, 10000);
  }
}

$(".pop_next").click(function () {
  document.querySelector(".pop_ct.pop_next").style.display = "none";
  popNext();
});

function scratch(num, beforeImgSrc, scratchComplete) {
  let canvas = document.querySelectorAll("canvas")[num];
  let context = canvas.getContext("2d");
  let beforeImg = new Image();

  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;

  beforeImg.src = beforeImgSrc;
  beforeImg.onload = function () {
    context.drawImage(beforeImg, 0, 0, canvas.width, canvas.height);
  };

  context.lineJoin = "round";
  context.lineCap = "round";

  let mouseX = 0;
  let mouseY = 0;
  let isDrawing = false;

  let events = {
    mouse: {
      down: "mousedown",
      move: "mousemove",
      up: "mouseup",
    },
    touch: {
      down: "touchstart",
      move: "touchmove",
      up: "touchend",
    },
  };

  let deviceType = "";

  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      deviceType = "touch";
      return true;
    } catch (e) {
      deviceType = "mouse";
      return false;
    }
  };

  let rectLeft = canvas.getBoundingClientRect().left;
  let rectTop = canvas.getBoundingClientRect().top;

  const getXY = (e) => {
    mouseX = (!isTouchDevice() ? e.clientX : e.touches[0].clientX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.clientY : e.touches[0].clientY) - rectTop;
  };

  isTouchDevice();

  canvas.addEventListener(events[deviceType].down, (event) => {
    document.querySelector(".scratch_content").classList.remove("on");

    getXY(event);
    scratch(mouseX, mouseY);
  });

  canvas.addEventListener(events[deviceType].move, (event) => {
    if (!isTouchDevice()) {
      event.preventDefault();
    }
    if (isDrawing) {
      isDrawing = true;
      getXY(event);
      scratch(mouseX, mouseY);
    }
  });

  canvas.addEventListener(events[deviceType].up, () => {
    isDrawing = false;
    context.globalCompositeOperation = "source-over";
    context.lineWidth = 0;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  const scratch = (x, y) => {
    if (!isDrawing) {
      isDrawing = true;
      context.beginPath();
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 80;
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
      context.stroke();
    }

    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    const pixels = data.length / 4;
    let transparent = 0;

    for (let i = 3; i < data.length; i += 4) {
      transparent += data[i] ? 0 : 1;
    }

    const percent = (transparent / pixels) * 100;

    if (percent >= 80) {
      canvas.parentNode.removeChild(canvas);
      scratchComplete();
    }
  };
}

function camera() {
  var video = document.getElementById("camera--view");
  var cover = document.querySelector("#camera .cover");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
      video.srcObject = stream;
      video.play();
      cover.classList.add("off");
    });
  }

  $("#picStartBtn").click(function () {
    video.pause();
  });
  $("#picEndBtn").click(function () {
    video.play();
  });

  let canvas1 = document.querySelector("#canvas");

  $("#picSaveBtn").on("click", function () {
    canvas1.getContext("2d").drawImage(video, 0, 0, canvas1.width, canvas1.height);
    var base64 = canvas1.toDataURL("image/*");
    var strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "");
    console.log(strImage);
    PreelemBridge.saveImage(strImage);
  });
}

function record() {
  // alert(Object.keys(PreelemBridge));

  var ar = new AudioRecorder();
  $("#recordStartBtn").click(function () {
    // 녹음 시작
    // 통화 녹음 셋팅
    PreelemBridge.setVoiceCallVolume(80);
    PreelemBridge.stopBgm();
    ar.startRecord();
    $(".btn_record_wrap").addClass("finish");
  });

  $("#recordEndBtn").click(function () {
    // 녹음 중지
    ar.stopRecord();
    $("#recordPlayBtn").addClass("on");
    $("#recordPlayBtn").addClass("play");
  });

  $("#recordPlayBtn").click(function () {
    if ($(this).hasClass("on")) {
      // 녹음 듣기
      ar.playRecordedFile(function () {
        $("#recordPlayBtn").removeClass("play");
        recordPlayEnd();
        // 녹음 완료
      });

      $(".blank").removeClass("hide");
    }
  });
}

function AudioRecorder() {
  //현재 녹음중인지 여부
  this.isRecording = false;

  // MediaRecorder 변수
  var mediaRecorder = null;

  const audioArray = [];

  var blobURL = "";

  /*
   * *** 녹음 시작
   * */
  this.startRecord = async function () {
    if (this.isRecording == false) {
      // 마이크 mediaStream 생성: Promise를 반환하므로 async/await 사용
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channels: 2,
          autoGainControl: true,
          echoCancellation: false, //이 옵션을 true로 설정하면 디바이스에서 소리녹음 과정이나 녹음후 다른 볼륨들이 불규칙하게 변함
          noiseSuppression: true,
        },
      });

      // MediaRecorder 생성
      mediaRecorder = new MediaRecorder(mediaStream);

      // 이벤트핸들러: 녹음 데이터 취득 처리
      mediaRecorder.ondataavailable = (event) => {
        audioArray.push(event.data);
      };

      // 이벤트핸들러: 녹음 종료 처리 & 재생하기
      mediaRecorder.onstop = (event) => {
        console.log(audioArray);
        // 녹음이 종료되면, 배열에 담긴 오디오 데이터(Blob)들을 합친다: 코덱도 설정해준다.
        const blob = new Blob(audioArray, {
          type: "audio/ogg codecs=opus",
        });
        audioArray.splice(0);

        // Blob 데이터에 접근할 수 있는 주소를 생성한다.
        blobURL = window.URL.createObjectURL(blob);
      };

      // 녹음 시작
      mediaRecorder.start();
      this.isRecording = true;

      timer();
    }
  };

  /*
   * *** 녹음 중지
   * */
  this.stopRecord = function () {
    if (this.isRecording == true) {
      mediaRecorder.stop();
      this.isRecording = false;
    }
    clearInterval(timerInterval);
  };

  /*
   * *** 녹음된 파일 재생
   * */
  this.playRecordedFile = function (_endCallback) {
    console.log(blobURL);
    var audio = new Audio(blobURL);
    // document.querySelector("audio").src = blobURL;
    audio.play();
    audio.volume = 1;

    audio.addEventListener("ended", function () {
      if (typeof _endCallback == "function") {
        _endCallback();
      }
    });
  };
}

let timerInterval;
let count, time;

function timer() {
  // document.querySelector(".time").innerHTML = "0:00";
  count = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    count += 1;
    document.querySelector(".gauge .inner").style.width = (count / 60) * 100 + "%";
    if (count < 60) {
      // time = new Date(count * 1000).toISOString().substr(15, 4);
      // document.querySelector(".time").innerHTML = time;
    } else {
      // time = new Date(count * 1000).toISOString().substr(15, 4);
      // document.querySelector(".time").innerHTML = time;
      document.querySelector("#recordEndBtn").click();
    }
  }, 1000);
}
