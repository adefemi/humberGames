export const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 5
  },
  title: {
    display: false,
    text: "Property Activity",
    fontSize: 20
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          display: false
        },
        gridLines: {
          display: false
        }
      }
    ]
  }
};
