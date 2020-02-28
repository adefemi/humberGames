import React, { useContext, useEffect, useState } from "react";
import "./Branch.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import branchImg from "../../assets/svg/branch.svg";
import { Button } from "../../components/button/Button";
import { Select } from "../../components/select/Select";
import Input from "../../components/input/Input";
import Skeleton from "react-loading-skeleton";
import BranchCard from "../../components/branch/BranchCard";
import { axiosHandler } from "../../utils/axiosHandler";
import { BRANCH_URL } from "../../utils/urls";
import { Modal } from "../../components/modal/Modal";

function Branch() {
  const { dispatch } = useContext(store);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Application" });
    getBranches();
  }, []);

  const getBranches = () => {
    setLoading(true);
    axiosHandler("GET", BRANCH_URL).then(res => {
      setBranches(res.data.results.results);
      setLoading(false);
    });
  };

  const renderBranches = () => {
    if (loading) {
      return Array(8)
        .fill(null)
        .map((v, i) => <Skeleton key={i} height={320} />);
    } else {
      if (branches.length === 0) {
        return <h1>No Applications to Display</h1>;
      } else {
        return branches.map(branch => <BranchCard />);
      }
    }
  };

  return (
    <div className="Branch">
      <div className="rectangle flex">
        <img src={branchImg} alt="branch-svg" />
        <div className="rectangle-text">
          <p className="text-1">Branches</p>
          <p className="text-2">
            You can create branches fo your agency and manage agents in each
            branch.
          </p>
        </div>
      </div>
      <div className="flex justify-end add-branch">
        <Button color="success">Add New Branch</Button>
      </div>
      <div className="flex justify-between branch-filter">
        <div className="input-container">
          <Input placeholder="Hello I need your soul" />
        </div>
        <div className="select-container">
          <Select optionList={[{ title: "Date", value: "Date" }]} />
        </div>
      </div>
      <section className="branch-cards">{renderBranches()}</section>
      <Modal visible={true} onOk={() => null} onClose={() => null}></Modal>
    </div>
  );
}
export default Branch;
