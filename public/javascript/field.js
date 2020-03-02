const rollSelector = document.querySelector("#roll-input");
rollSelector.addEventListener("change", event => {
  if (event.target.value === "Student") {
    document.getElementById("teacher-form").style.display = "block";
  } else {
    document.getElementById("teacher-form").style.display = "none";
  }
});
