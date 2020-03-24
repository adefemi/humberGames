export const agencyGraphOptions = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: 5
  },
  scales: {
    xAxes: [
      {
        gridLines: {
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

export const agencyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Expenses",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "#DD093A",
      // barThickness: 10
      barPercentage: 1,
      categoryPercentage: 0.8
    },
    {
      label: "Revenue",
      data: [1, 2, 3, 4, 5, 6],
      backgroundColor: "#46A9FC",
      // barThickness: 10
      barPercentage: 1,
      categoryPercentage: 0.8
    }
  ]
};
