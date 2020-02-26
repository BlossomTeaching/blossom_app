document.addEventListener("DOMContentLoaded", () => {
  let word = document.getElementsByClassName("click-word");
  let mistake = [];

  word.onclick() = function() {
    mistake.push(word.textContent);
  };
});
console.log("hi");
