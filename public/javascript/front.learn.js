document.addEventListener("DOMContentLoaded", () => {
  const length = english.getElementsByClassName("word").length;
  const sentence = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;
  const scoreBar = document.getElementById("scoreBar");
  let mistakes = [];
  let wordCount = 0;
  let score = 0;

  var xhr = new XMLHttpRequest();

  for (let i = 0; i < length; i++) {
    sentence.push(document.getElementById("answerWord" + i));
    buttons.push(document.getElementById("buttonWord" + i));
    console.log(sentence);
  }

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
  timer(length);

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
  const response = (word, sentence, value) => {
    if (value) {
      word.setAttribute("disabled", "");
      sentence[0].className = "word";
      sentence.shift();
      wordCount++;
      if (sentence.length === 0) {
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

  sentence.forEach(w => (w.className += " hidden"));
  buttons.forEach(w => {
    w.onclick = () => {
      if (w.textContent === sentence[0].textContent.replace(regex, "")) {
        response(w, sentence, true);
      } else {
        response(w, sentence, false);
      }
    };
  });
});
