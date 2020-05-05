import React from "react";
import "./dashboard.css";
import { Card } from "../../components/card/Card";
import { DATA, OPTIONS, DATA2, OPTIONS2 } from "./transactionGraphData";
import Graph from "../../components/graph/Graph";
import DatePicker from "../../components/DatePicker/datePicker";

function Dashboard(props) {
  return (
    <div className="dashboard">
      <div className="flex align-center">
        <DatePicker rangePicker />
        <h3 className="link">
          &nbsp;&nbsp;Showing data between 2020-12-20 to 2021-10-22
        </h3>
      </div>
      <br />
      <br />

      <div className="computes">
        <Card heading="Total GamePlays">
          <div className="contentCard">
            <center>
              <h1>0</h1>
            </center>
          </div>
        </Card>
        <Card heading="Total Winnings">
          <div className="contentCard">
            <center>
              <h1>0</h1>
            </center>
          </div>
        </Card>
        <Card heading="Winning Ration">
          <div className="contentCard">
            <center>
              <h1>0</h1>
            </center>
          </div>
        </Card>
      </div>
      <br />
      <Card heading="GamePlays/Winnings vs Time">
        <div className="contentCard">
          <div className="graph-container">
            <div className="">
              <Graph
                options={OPTIONS}
                labels={DATA.labels}
                datasets={DATA.datasets}
                height={300}
                width={1000}
                className="transaction-graph"
              />
            </div>
          </div>
        </div>
      </Card>
      <br />
      {/*<Card heading="Revenue Income/Expense vs Time">*/}
      {/*  <div className="contentCard">*/}
      {/*    <div className="graph-container">*/}
      {/*      <div className="">*/}
      {/*        <Graph*/}
      {/*          options={OPTIONS2}*/}
      {/*          labels={DATA2.labels}*/}
      {/*          datasets={DATA2.datasets}*/}
      {/*          height={300}*/}
      {/*          width={1000}*/}
      {/*          className="transaction-graph"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Card>*/}
      <br />
      <br />
    </div>
  );
}

export default Dashboard;
