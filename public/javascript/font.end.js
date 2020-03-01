const sentencesDOM = document.getElementById("sentences");
const ctxSentences = sentencesDOM.getContext("2d");
const sentencesData = sentencesDOM.data.sentences;

console.log(sentencesData);

const sentencesChart = new Chart(ctxSentences, {
  type: "horizontalBar",
  data: {
    datasets: [
      {
        data: sentences,
        backgroundColor: ["#78c800", "#e5e5e5"],
        borderWidth: 0
      }
    ]
  }
});
