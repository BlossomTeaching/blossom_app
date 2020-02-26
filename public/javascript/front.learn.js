document.addEventListener("DOMContentLoaded", () => {
  const scoreBar = document.getElementById("scoreBar");
  const getAnswer = document.getElementById("english");
  const answer = getAnswer.dataset.english.split(",");
  const answerDisplay = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;
  let mistakes = [];
  let wordCount = 0;
  let score = 0;
  var xhr = new XMLHttpRequest();
  console.log(answer);

  for (let i = 0; i < answer.length; i++) {
    answerDisplay.push(document.getElementById("answerDisplay" + i));
    buttons.push(document.getElementById("buttonWord" + i));
  }
  console.log(buttons);

  const scoreCalculator = (words, timer, mistakes) => {
    const goal = words * 20;
    return Math.floor(((timer - (mistakes.length * 100) / 10) / goal) * 100);
  };

  const timer = words => {
    let time = words * 20;
    const interval = setInterval(() => {
      time--;
      score = scoreCalculator(words, time, mistakes);
      scoreBar.setAttribute("style", `width: ${score}%`);
      if (time < 0) {
        clearInterval(interval);
        score = 0;
        goToNext();
      }
    }, 100);
  };
  timer(answer.length);

  const goToNext = () => {
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
