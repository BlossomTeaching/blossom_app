document.addEventListener("DOMContentLoaded", () => {
  const length = english.getElementsByClassName("word").length;
  const answer = [];
  const buttons = [];
  const regex = /[^a-zA-Z']/g;

  const isCompleted = () => (answer.length === 0 ? true : false);

  for (let i = 0; i < length; i++) {
    answer.push(document.getElementById("answerWord" + i));
    buttons.push(document.getElementById("buttonWord" + i));
    console.log(answer);
  }
  answer.forEach(w => (w.className += " hidden"));
  buttons.forEach(w => {
    w.onclick = () => {
      if (w.textContent === answer[0].textContent.toLowerCase().replace(regex, "")) {
        w.setAttribute("disabled", "");
        answer[0].className = "word";
        answer.shift();
        if (isCompleted()) location.reload();
      } else {
        w.animate([{ transform: "translateX(0px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }], {
          duration: 100,
          iterations: 4
        });
      }
    };
  });
});
