const ctx = document.getElementById("levelChart").getContext("2d");

const levelChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [10, 90],
        backgroundColor: ["#78c800", "#e5e5e5"],
        borderWidth: 0
      }
    ]
  }
});
console.log("CANVAS");
