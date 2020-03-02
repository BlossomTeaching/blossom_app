document.addEventListener("DOMContentLoaded", () => {
  const timeBar = document.getElementById("timeBar");
  const getAnswer = document.getElementById("answer");
  const answer = getAnswer.dataset.answer.split(",");
  const quit = document.getElementById("exitButton");
  const answerDisplay = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;
  let mistakes = [];
  let wordCount = 0;
  let score = 0;
  var xhr = new XMLHttpRequest();
  let interval;
  let time;

  for (let i = 0; i < answer.length; i++) {
    answerDisplay.push(document.getElementById("answerDisplay" + i));
    buttons.push(document.getElementById("buttonWord" + i));
  }
  console.log(buttons);
  console.log("ANSWER", answer);

  const sendPost = quit => {
    console.log("SCORE POST", score);

    xhr.open("POST", "/learn/practice", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        mistakes: mistakes,
        score: score
      })
    );
    location.reload();
    console.log("RELOAD DOM");
  };

  const scoreCalculator = (words, correct, mistakes, time) => {
    return Math.floor((((correct - mistakes) / words) * 100 + time * 1.5) / 2);
  };

  const timer = words => {
    const goal = words * 20;
    let timer = goal;
    interval = setInterval(() => {
      time = Math.floor((timer / goal) * 100);
      timer--;
      score = scoreCalculator(answer.length, wordCount, mistakes.length, time);
      console.log("SCORE", score);
      timeBar.setAttribute("style", `width: ${time}%`);
      if (time < 0) {
        clearInterval(interval);
        goToNext();
      }
    }, 100);
  };
  timer(answer.length);

  const goToNext = () => {
    score < 0 ? (score = 0) : score;
    console.log("SCORE SENT", score);
    clearInterval(interval);
    sendPost();
  };
  const response = (word, answer, value) => {
    if (value) {
      word.setAttribute("disabled", "");
      answerDisplay[wordCount].className = "button-words answer";
      answerDisplay[wordCount].textContent = answer[wordCount];
      word.className = "button-words clicked";
      wordCount++;
      if (answer.length === wordCount) {
        goToNext();
      }
    } else {
      word.animate([{ transform: "translateX(0px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }], {
        duration: 100,
        iterations: 4
      });
      mistakes.push(wordCount);
    }
  };
  answerDisplay.forEach(w => (w.className += " hidden"));
  buttons.forEach(w => {
    w.onclick = () => {
      if (w.textContent === answer[wordCount].replace(regex, "")) {
        console.log("correct");

        response(w, answer, true);
      } else {
        console.log("incorrect", mistakes);

        response(w, answer, false);
      }
    };
  });
  quit.onclick = () => {
    console.log("QUIT");

    sendPost(true);
  };
});
