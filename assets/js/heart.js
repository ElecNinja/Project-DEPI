window.addEventListener("DOMContentLoaded", function () {
  const hearts = document.querySelectorAll(".heart");
  const heartcnts = document.querySelectorAll(".heartcnt");

  if (hearts.length > 0 && heartcnts.length > 0) {
    hearts.forEach(function (heartIcon) {
      heartIcon.addEventListener("click", function () {
        heartcnts.forEach(function (heartcnt) {
          heartcnt.textContent = parseInt(heartcnt.textContent) + 1;
        });
      });
    });
  }
});

// test
