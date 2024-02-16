//  zoom(스크린넘버);
function zoom1() {
  $(".screen1 .moon").addClass("zoom1");
  
  setTimeout(function () {
    $(".screen1").addClass("zoom");
  }, 100);
  setTimeout(function () {
    $(".screen1").addClass("hide");
    $(".screen1").removeClass("hide");
  }, 2000);
}

function zoom2() {
  $(".screen1 .moon").addClass("zoom2");
  
  setTimeout(function () {
    $(".screen1").addClass("zoom");
  }, 100);
  setTimeout(function () {
    $(".screen1").addClass("hide");
    $(".screen1").removeClass("hide");
  }, 2000);
}