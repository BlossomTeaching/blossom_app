const ctxLevel = document.getElementById("level-chart").getContext("2d");
const levelData = document.getElementById("level-chart").dataset.level.split(",");

console.log("LEVEL DATA", levelData);

const levelChart = new Chart(ctxLevel, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: levelData,
        backgroundColor: ["#78c800", "#e5e5e5"],
        borderWidth: 0
      }
    ]
  }
});

const lessonsChart = new Chart(ctxLessons, {
  type: "horizontalBar",
  data: {
    datasets: [
      {
        data: lessonData,
        backgroundColor: ["#78c800", "#e5e5e5"],
        borderWidth: 0
      }
    ]
  }
});
