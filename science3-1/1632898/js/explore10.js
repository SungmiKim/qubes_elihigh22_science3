window.addEventListener("load", function () {
  let directive1Audio = new Audio("audio/explore10/directive1.mp3");
  directive1Audio.play();

  directive1Audio.addEventListener("ended", function () {
    qs(".quiz_area").classList.add("on");

    setTimeout(function () {
      qs(".quiz_area").classList.remove("on");
      qs(".blank").classList.add("hide");
    }, 3000);
  });
});

function drop(fixDragBox) {
  qs(".drop_area").classList.add("hide");
  qs(".drag_box.d" + fixDragBox).classList.add("hide");
  qs(".obj_name.n" + fixDragBox).classList.add("hide");
  qs(".gif").src = "./img/explore10/ani" + fixDragBox + ".gif";
  setTimeout(function () {
    qs(".ani_frame").classList.add("hide");
    qs(".ani_cover").classList.add("hide");
  }, 20);

  setTimeout(function () {
    qs(".drop_area").classList.remove("hide");
    qs(".ani_frame").classList.remove("hide");
    qs(".ani_cover").classList.remove("hide");
    qs(".ani_obj.a" + fixDragBox).classList.remove("hide");

    if (qsa(".ani_obj.hide").length == 0) {
      qs(".drop_area").classList.add("hide");
      qs(".drag_area").classList.add("hide");
      qs(".ani_area").classList.add("on");

      let directive2Audio = new Audio("audio/explore10/directive2.mp3");
      setTimeout(function () {
        directive2Audio.play();
        $(".name_list").addClass("on");
      }, 1000);
      directive2Audio.addEventListener("ended", function () {
        qs(".completeStamp").classList.remove("hide");

        let feedbackAudio = new Audio();
        let name1 = qs(".completeStamp").dataset.name;
        let num1 = Math.floor(Math.random() * 3) + 1;
        feedbackAudio.src = "../common/sound/feedback/feedback_" + name1 + "0" + num1 + ".mp3";
        feedbackAudio.play();

        qs(".completeStamp").addEventListener("animationend", function () {
          qs(".btn_next").classList.add("active");
          popNext();
        });
      });
    }
  }, 2000);
}

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutations) {
    if ($(".drop_box").hasClass("ui-droppable-hover")) {
      $(".drop_area").css("opacity", "0.5");
    } else {
      $(".drop_area").css("opacity", "1");
    }
  });
});

var config = {
  attributes: true,
};

observer.observe(qs(".drop_box"), config);
