document.addEventListener("DOMContentLoaded", () => {
  const scoreBar = document.getElementById("scoreBar");
  const getAnswer = document.getElementById("answer");
  const answer = getAnswer.dataset.answer.split(",");
  const answerDisplay = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;
  let mistakes = [];
  let wordCount = 0;
  let score = 0;
  var xhr = new XMLHttpRequest();

  for (let i = 0; i < answer.length; i++) {
    answerDisplay.push(document.getElementById("answerDisplay" + i));
    buttons.push(document.getElementById("buttonWord" + i));
  }
  console.log(buttons);
  console.log("ANSWER", answer);

  const scoreCalculator = (words, correct, mistakes) => {
    return Math.floor(((correct - mistakes) / words) * 100);
  };

  const timer = words => {
    const goal = words * 20;
    let timer = goal;
    const interval = setInterval(() => {
      let time = Math.floor((timer / goal) * 100);
      timer--;
      score = scoreCalculator(answer.length, wordCount, mistakes.length);
      console.log("SCORE", score);

      scoreBar.setAttribute("style", `width: ${time}%`);
      if (time < 0) {
        clearInterval(interval);
        goToNext();
      }
    }, 100);
  };
  timer(answer.length);

  const goToNext = () => {
    score = scoreCalculator(answer.length, wordCount, mistakes.length);
    score < 0 ? (score = 0) : score;
    console.log("SCORE SENT", score);

    xhr.open("POST", "/learn/practice", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        mistakes: mistakes,
        score: score
      })
    );
    location.reload();
  };
  const response = (word, answer, value) => {
    if (value) {
      word.setAttribute("disabled", "");
      answerDisplay[wordCount].className = "word";
      answerDisplay[wordCount].textContent = answer[wordCount];
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
        console.log("incorrect");

        response(w, answer, false);
      }
    };
  });
});
