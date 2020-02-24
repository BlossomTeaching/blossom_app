document.addEventListener("DOMContentLoaded", () => {
  const length = english.getElementsByClassName("word").length;
  const sentence = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;
  const id = document.getElementById("id").textContent;
  console.log("id", id);
  let mistakes = [];
  let wordCount = 0;

  var xhr = new XMLHttpRequest();

  for (let i = 0; i < length; i++) {
    sentence.push(document.getElementById("answerWord" + i));
    buttons.push(document.getElementById("buttonWord" + i));
    console.log(sentence);
  }

  const isCompleted = () => (sentence.length === 0 ? true : false);
  const response = (word, sentence, value) => {
    if (value) {
      word.setAttribute("disabled", "");
      sentence[0].className = "word";
      sentence.shift();
      wordCount++;
      if (isCompleted()) {
        xhr.open("POST", "/learn", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            mistakes: mistakes,
            id: id
          })
        );
        location.reload();
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
