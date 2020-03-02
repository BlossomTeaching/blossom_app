const sentencesDOM = document.getElementById("sentence-chart");
const ctxSentences = sentencesDOM.getContext("2d");
const completed = document.getElementById("completed").dataset.completed;
const english = [];
const spanish = [];
const score = [];
const chartData = [];
console.log("COMPLETED", completed);

for (let i = 0; i < completed; i++) {
  const sentencesData = document.getElementById(`sentence-data${i}`).dataset;
  english.push(sentencesData.english.split(","));
  spanish.push(sentencesData.spanish.split(","));
  score.push(sentencesData.score.split(","));
}
console.log("PUSH RESULT", english, spanish, score);
const scoreChart = score.map(e => e[e.length - 1]);
const englishChart = english.map(e => e[0]);
console.log("CHART DATA", scoreChart, englishChart);

const sentencesChart = new Chart(ctxSentences, {
  type: "horizontalBar",
  data: {
    labels: english,
    datasets: [
      {
        data: scoreChart,
        backgroundColor: "#78c800",
        borderWidth: 0,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0
          }
        }
      ]
    }
  }
});
