window.addEventListener("load", function () {
  directive1Audio.play();
});

let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let directive1Audio = new Audio("audio/explore4/directive.mp3");
let directiveAudio = new Audio();


function directive(num) {

  directiveAudio.src = "audio/explore4/directive" + num + ".mp3";
  directiveAudio.play();

}

directive1Audio.addEventListener("ended", function () {
  playGuide();
  popWait();
  $(".blank").addClass("hide");
  $(".screen1 li .img_ani").addClass("scale");
  scale();
});


var guide, num;
function scale() {
  guide = setTimeout(function () {
    $(".screen1 .obj_list").addClass("on");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".obj_list .obj1 .click_box").click(function () {
  sparkleAudio.play();
  setTimeout(function () {
    $(".img_ani.ani1").addClass("on");
    $(".screen1 .obj2 .img_ani").removeClass("scale");
    $(".blank").removeClass("hide");
  });
  
  setTimeout(function () {
    directive(2);
    $(".img_ani.ani1").removeClass("on");
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");
    $(".screen2 .t1").addClass("on");
  }, 1000);
  setTimeout(function () {
    $(".screen2 .o1").removeClass("hide");
    $(".screen2 .obj_list").addClass("n1");
  }, 2500);
  setTimeout(function () {
    $(".screen2 .o1").addClass("hide");
    $(".screen2 .o2").removeClass("hide");
    $(".screen2 .obj_list.n1").addClass("on");
  }, 3500);
  setTimeout(function () {
    $(".screen2 .o2").addClass("hide");
    $(".screen2 .o3").removeClass("hide");
    
    $(".screen2 img.earth").addClass("hide");
  }, 4500);
  setTimeout(function () {
    $(".screen2 .obj_list").addClass("n1");
    $(".screen2 img.earth").removeClass("hide");
  }, 5500);
  setTimeout(function () {
    $(".screen2 .obj").addClass("hide");
    $(".screen2 .obj_list").removeClass("n1");
  }, 6000);
  setTimeout(function () {
    $(".screen2").addClass("hide");
    $(".screen1").removeClass("hide");
    $(".obj_list li.obj1 .click_box").addClass("on");
    $(".obj_list li.obj1").addClass("on");
    $(".screen1 .obj1 .line").removeClass("hide");
    $(".screen1 .obj1 .img_ani.ani1").addClass("hide");
    $(".has_guide").addClass("hide");
    $(".screen1 .obj2 .img_ani").addClass("scale");
    $(".blank").addClass("hide");

    if($(".obj_list li.obj2 .click_box").hasClass("on")){
      $(".screen1 li .img_ani").removeClass("hide scale");
      $(".screen1 li .line").addClass("hide");
      $(".obj_list li").removeClass("on");
    }
  }, 10000);
});

$(".obj_list .obj2 .click_box").click(function () {
  $(".has_guide").addClass("hide");
  sparkleAudio.play();
  setTimeout(function () {
    $(".img_ani.ani2").addClass("on");
    $(".screen1 .obj1 .img_ani").removeClass("scale");
    $(".blank").removeClass("hide");
  });

  setTimeout(function () {
   directive(3);
   $(".img_ani.ani2").removeClass("on");
    $(".screen1").addClass("hide");
    $(".screen3").removeClass("hide");
    $(".screen3 .t1").addClass("on");
  }, 1000);
  setTimeout(function () {
    $(".screen3 .obj_list").addClass("n1");
    $(".screen3 .o1").removeClass("hide");
  }, 2500);
  setTimeout(function () {
    $(".screen3 .o1").addClass("hide");
    $(".screen3 .o2").removeClass("hide");
  }, 3500);
  setTimeout(function () {
    $(".screen3 .o2").addClass("hide");
    $(".screen3 .obj_list").removeClass("n1");
  }, 4500);
  setTimeout(function () {
    $(".screen3 .obj").addClass("hide");
  }, 7500);
  setTimeout(function () {
    $(".screen3").addClass("hide");
    $(".screen1").removeClass("hide");
    $(".obj_list li.obj2 .click_box").addClass("on");
    $(".obj_list li.obj2").addClass("on");
    $(".screen1 .obj2 .line").removeClass("hide");
    $(".screen1 .obj2 .img_ani.ani2").addClass("hide");
    $(".has_guide").addClass("hide");
    $(".screen1 .obj1 .img_ani").addClass("scale");
    $(".blank").addClass("hide");

    if($(".obj_list li.obj1 .click_box").hasClass("on")){
      $(".screen1 li .img_ani").removeClass("hide scale");
      $(".screen1 li .line").addClass("hide");
      $(".obj_list li").removeClass("on");
    }
  }, 9000);
});

directiveAudio.addEventListener("ended", function () {
  if($(".obj_list li.obj1 .click_box, .obj_list li.obj2 .click_box").hasClass("on")) {
    setTimeout(function () {
      $(".blank").removeClass("hide");
      playFeedback();  
    }, 3000);
  }
});