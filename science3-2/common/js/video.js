window.onload = function () {
  // Video
  var video = document.getElementById("video");
  // Buttons
  var playButton = document.getElementById("playPause");

  // Sliders
  var progressBar = document.querySelector(".progress_bar");
  var seekBar = document.querySelector(".seek_bar");

  // 동영상 자동 시작
  video.play();

  playButton.addEventListener("click", function () {
    if (video.paused == true) {
      video.play();
      playButton.innerHTML = "Pause";
    } else {
      video.pause();
      playButton.innerHTML = "Play";
    }
  });

  seekBar.addEventListener("input", function () {
    var time = video.duration * (seekBar.value / 100);
    video.currentTime = time;
  });

  // Update the seek bar as the video plays
  video.addEventListener("timeupdate", function () {
    var value = (100 / video.duration) * video.currentTime;

    seekBar.value = value;
    progressBar.value = value;

    // console.log(video.duration);
    // console.log(value);
  });

  seekBar.addEventListener("mousedown", function () {
    video.pause();
  });

  seekBar.addEventListener("mouseup", function () {
    video.play();
  });

  video.addEventListener("ended", function () {
    $(".btn_next").addClass("active");
    popNext();
  });

  var timeout;
  var fadeInterval;
  var opacity = 0;

  // 재생 & 정지 버튼, 컨트롤 바
  document.getElementById("videoContainer").addEventListener("click", function () {
    // fadeIn 애니메이션 실행
    fadeInterval = setInterval(fadeIn, 10);

    // 클릭 시 아래 Timeout 초기화 후 다시 실행
    clearTimeout(timeout);
    // 3초 뒤 fadeOut 애니메이션 실행
    timeout = setTimeout(function () {
      fadeInterval = setInterval(fadeOut, 10);
    }, 3000);
  });

  // 재생 & 정지 버튼, 컨트롤 바 fadeIn 애니메이션
  function fadeIn() {
    opacity = Number(window.getComputedStyle(playButton).getPropertyValue("opacity"));

    if (opacity < 1) {
      opacity = opacity + 0.1;
      playButton.style.opacity = opacity;
      seekBar.style.opacity = opacity;
    } else {
      clearInterval(fadeInterval);
    }
  }

  // 재생 & 정지 버튼, 컨트롤 바 fadeOut 애니메이션
  function fadeOut() {
    opacity = Number(window.getComputedStyle(playButton).getPropertyValue("opacity"));

    if (opacity > 0) {
      opacity = opacity - 0.1;
      playButton.style.opacity = opacity;
      seekBar.style.opacity = opacity;
    } else {
      clearInterval(fadeInterval);
    }
  }

  // 동영상 시간 변경 시 currentTimeUpdate 실행
  video.ontimeupdate = function () {
    currentTimeUpdate(video.currentTime.toFixed(0));
  };

  // currentTime 을 HH:mm:ss 형식으로 포맷
  function currentTimeUpdate(time) {
    current = new Date(time * 1000).toISOString().substr(11, 8);
    document.querySelector(".current").innerHTML = current;
  }

  // 동영상 로드 후 durationTimeUpdate 실행
  video.addEventListener("loadedmetadata", function () {
    durationTimeUpdate(video.duration.toFixed(0));
  });

  // durationTime 을 HH:mm:ss 형식으로 포맷
  function durationTimeUpdate(time) {
    duration = new Date(time * 1000).toISOString().substr(11, 8);
    document.querySelector(".duration").innerHTML = duration;
  }
};
