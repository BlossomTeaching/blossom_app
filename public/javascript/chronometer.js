function timer() {
  let sec = 30;
  let timer = setInterval(function() {
    document.getElementById("timer").innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}
