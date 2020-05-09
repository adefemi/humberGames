import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { axiosHandler } from "../../utils/axiosHandler";
import { REWARDS_URL } from "../../utils/urls";
import { errorHandler, getClientId, getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Spinner } from "../../components/spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import moment from "moment";
import TransactionTable from "../../components/transactionTable/transactionTable";
import "./reward.css";
import Divider from "../../components/Divider/divider";
import AppIcon from "../../components/icons/Icon";
import { Card } from "../../components/card/Card";

function SingleReward(props) {
  const { dispatch } = useContext(store);
  const [fetching, setFetching] = useState(true);
  const [reward, setReward] = useState([]);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Single Rewards" });
    getRewards();
  }, []);

  const getRewards = () => {
    axiosHandler({
      method: "get",
      url: REWARDS_URL + `?id=${props.match.params.uuid}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        setReward(res.data._embedded.rewards[0]);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const heading = ["DataHead", "Field", "Condition"];

  if (fetching) {
    return (
      <>
        <br />
        <Spinner color={secondaryColor} />
      </>
    );
  }

  const formatConditions = value => {
    const result = [];
    value.map(item => {
      result.push([item.dataHead, item.field, JSON.stringify(item.condition)]);
      return null;
    });
    return result;
  };

  return (
    <div className="reward">
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
      </div>
      <br />
      <Card className="padding-20">
        <div className="flex align-center">
          <div className="info">Id:&nbsp;&nbsp;</div>
          <div className="context">{reward.id}</div>
        </div>
        <br />
        <div className="flex align-center">
          <div className="info">Title:&nbsp;&nbsp;</div>
          <div className="context">{reward.title}</div>
        </div>
        <br />
        <div className="flex align-center">
          <div className="info">Created at:&nbsp;&nbsp;</div>
          <div className="context">
            {moment(new Date(reward.createdAt)).fromNow()}
          </div>
        </div>
      </Card>
      <Divider />
      <h3>Qualification Rules</h3>
      <TransactionTable
        keys={heading}
        values={formatConditions(reward.qualificationRules)}
        loading={fetching}
      />
      <br />
      <h3>Target Demography Rules</h3>
      <TransactionTable
        keys={heading}
        values={formatConditions(reward.targetDemographyRules)}
        loading={fetching}
      />
      <br />
    </div>
  );
}

export default SingleReward;
