import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Tabs } from "../../components/tabs/tabs";
import WalletList from "./walletList";
import TransactionList from "./transactionList";
import "../dashboard/dashboard.css";
import PerformanceReport from "./performanceRep"


function Billings(props) {
  const { dispatch } = useContext(store);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Billings" });
  }, []);

  return (
    <div className="dashboard">
      <Tabs
        body={[<PerformanceReport/>, <WalletList />, <TransactionList />]}
        heading={["PerformanceReport", "Wallet Transaction", "Transction Record"]}
        activeIndex={activeIndex}
        onSwitch={setActiveIndex}
      />
    </div>
  );
}

export default Billings;
