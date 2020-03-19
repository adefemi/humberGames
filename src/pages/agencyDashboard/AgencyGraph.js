import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { axiosHandler, testToken } from "../../utils/axiosHandler";
import { AGENCY_TRANSACTION_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import _ from "lodash";

export default function AgencyGraph() {
  let chartRef = React.createRef();

  const [transactionData, setTransactionData] = useState({});
  const [transactionLoader, setTransactionLoader] = useState(true);

  const getTransaction = () => {
    axiosHandler("GET", AGENCY_TRANSACTION_URL, testToken)
      .then(res => {
        setTransactionData(res.data);
        setTransactionLoader(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: "Error getting transactions"
        });
        setTransactionLoader(false);
      });
  };

  const tvals = transactionLoader ? 0 : transactionData;

  const transactionContent = () => {
    let tc = transactionData.expenses_graph_data;
    if (tc) {
      //   console.log(tc);
      return <p>Yo!!</p>;
    }
    return <h4>Failed to load expenses graph</h4>;
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    const agencyChartRef = chartRef.current.getContext("2d");

    new Chart(agencyChartRef, {
      type: "bar",
      data: {
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
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
      }
    });
  }, []);
  transactionContent();
  return (
    <div className="agency-graph">
      <div className="acct-statements-container">
        <h6>Financial Report</h6>
        <div className="acct-statements flex">
          <div className="revenue">
            <h5>{`${_.get(tvals, "currency_type")} ${_.get(
              tvals,
              "revenue"
            )}`}</h5>
            <p>Revenue generated</p>
          </div>
          <div className="expenses">
            <h5>{`${_.get(tvals, "currency_type")} ${_.get(
              tvals,
              "expenses"
            )}`}</h5>
            <p>Expenses incured</p>
          </div>
          <div className="profit">
            <h5>{`${_.get(tvals, "currency_type")} ${_.get(
              tvals,
              "profit"
            )}`}</h5>
            <p>Profit</p>
          </div>
        </div>
      </div>
      <canvas id="agency-chart" ref={chartRef} />
    </div>
  );
}
