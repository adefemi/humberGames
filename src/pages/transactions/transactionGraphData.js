export const DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Expenses",
      data: [0, 20, 50, 10, 100, 43, 5],
      fill: false,
      borderColor: "#EB008A"
    },
    {
      label: "Revenue",
      data: [100, 40, 3, 12, 62, 0, 30],
      fill: false,
      borderColor: "#0094D8"
    }
  ]
};

export const OPTIONS = {
  responsive: true,
  maintainApsectRatio: false,
  legend: {
    display: true,
    position: "right"
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  }
};
