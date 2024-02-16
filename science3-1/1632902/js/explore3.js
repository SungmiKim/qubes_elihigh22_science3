window.addEventListener("load", function () {
  directive1Audio.play();
});

let directive1Audio = new Audio("audio/explore3/directive1.mp3");
let directive2Audio = new Audio("audio/explore3/directive2.mp3");
let endDirective1Audio = new Audio("audio/explore3/endDirective1.mp3");
let endDirective2Audio = new Audio("audio/explore3/endDirective2.mp3");
let popAudio = new Audio();
let cameraAudio = new Audio("../common/sound/effect/camera.mp3");

directive1Audio.addEventListener("ended", function () {
  playGuide();
  popWait();

  $(".drag_box").bind("mousedown touchstart", function () {
    $(this).parents(".quiz_area").removeClass("on");
  });

  $(".drag_box").bind("mouseup touchend", function () {
    var drag_box = $(this).parents(".quiz_area");
    setTimeout(function () {
      drag_box.addClass("on");
    }, 500);
  });

  $(".blank").addClass("hide");

  scale();
});

var guide, num;
function scale() {
  guide = setTimeout(function () {
    $(".obj_list").addClass("on");
    $(".has_guide").addClass("hide");
  }, 2000);
}

function scale2() {
  guide = setTimeout(function () {
    $(".tablet .btn").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".obj_list .click_box").click(function (e) {
  if ($(".tablet").hasClass("on")) {
    e.preventDefault();
  } else {
    $(".obj_list").addClass("on");
    $(".has_guide").addClass("hide");
    $(this).parent().addClass("on");
    if ($(this).parent().attr("data-num") == 4) {
      $(".obj4 .img_bg").removeClass("scale");
    }
    clearTimeout(guide);
    $(this).siblings(".img_ani").addClass("on");
    $(".obj_list").removeClass("on");
    $(".blank").removeClass("hide");
    num = $(this).parent().data("num");
    $(".fixed.top").attr("data-num", "2");
    $(".tablet").attr("data-num", num).addClass("on");
    directive2Audio.play();
  }
});

// $(".obj_list .img_ani").click(function () {
//   clearTimeout(guide);
//   $(this).addClass("on");
//   $(".obj_list").removeClass("on");
//   $(".blank").removeClass("hide");
//   num = $(this).parent().data("num");
//   $(".fixed.top").attr("data-num", "2");
//   $(".tablet").attr("data-num", num).addClass("on");
//   directive2Audio.play();
// });

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  scale2();
});

$(".tablet .btn, .tablet .has_guide").click(function () {
  clearTimeout(guide);
  $(".tablet .btn").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".blank, .blink").removeClass("hide");
  setTimeout(function () {
    $(" .loading").removeClass("hide");
  }, 1000);
  $(".container").addClass("on");
  cameraAudio.play();
  setTimeout(function () {
    $(".loading, .blink").addClass("hide");
    openPop(num);
    popAudio.src = "audio/explore3/pop" + num + ".mp3";
    popAudio.play();
  }, 2500);
});

popAudio.addEventListener("ended", function () {
  $(".container").removeClass("on");
  setTimeout(function () {
    $(".blank").addClass("hide");
    $(".tablet").removeClass("on");
    $(".fixed.top").attr("data-num", "1");
    $(".obj_list").addClass("on");
    closePop(num);

    if ($(".img_ani.on").length == 4) {
      $(".blank").removeClass("hide");
      $(".obj_list .obj1 .img_ani, .obj_list .obj2 .img_ani").removeClass("on");
      endDirective1Audio.play();
    }
  }, 1000);
});

endDirective1Audio.addEventListener("ended", function () {
  $(".obj_list .obj1 .img_ani, .obj_list .obj2 .img_ani").addClass("on");
  $(".obj_list .obj3 .img_ani, .obj_list .obj4 .img_ani").removeClass("on");
  endDirective2Audio.play();
});

endDirective2Audio.addEventListener("ended", function () {
  $(".obj_list .obj3 .img_ani, .obj_list .obj4 .img_ani").addClass("on");
  clearTimeout(wait);
  playFeedback();
});
