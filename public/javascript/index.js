document.addEventListener("DOMContentLoaded", () => {
  const length = english.getElementsByClassName("word").length;
  const sentence = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;
  const id = document.getElementById("id").textContent;
  console.log("id", id);
  let mistakes = "";

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
      if (isCompleted()) location.assign("/learn/" + id + "+" + mistakes);
    } else {
      word.animate([{ transform: "translateX(0px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }], {
        duration: 100,
        iterations: 4
      });
      mistakes += sentence[0].textContent + " ";
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
