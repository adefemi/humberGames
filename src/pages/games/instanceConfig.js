import React, { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import { Spinner } from "../../components/spinner/Spinner";
import {
  conditionSort,
  operatorSort,
  secondaryColor,
  winningRules
} from "../../utils/data";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";
import { Select } from "../../components/select/Select";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import { WINNING_CONDITION_URL } from "../../utils/urls";

function InstanceConfig(props) {
  const headings = ["label", "Amount", "Quantity", ""];
  const conditionHeading = ["Condition", "Operator", "Operand", "Created At"];

  const [prize, setPrizes] = useState([]);
  const [activePrize, setActivePrize] = useState({});
  const [fetching, setFetching] = useState(true);
  const [activeInstance, setActiveInstance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [winningRuleMain, setRules] = useState(null);
  const [winningConditionMain, setConditions] = useState([]);
  const [winningConditionData, setConditionsData] = useState({});
  const [showNewCondition, setShowNewCondition] = useState(false);
  const [conditionSubmit, setConditionSubmit] = useState(false);

  useEffect(() => {
    if (!props.fetching) {
      setActiveInstance(props.activeInstance);
      getPrizes(props.prizesLink);
    }
  }, [props.fetching]);

  const getPrizes = link => {
    axiosHandler({
      method: "get",
      url: link,
      clientID: getClientId(),
      token: getToken()
    })
      .then(res => {
        setPrizes(res.data._embedded.prizes);
        setFetching(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
      });
  };

  const formatPrize = () => {
    const returnValue = [];
    prize.map(item => {
      returnValue.push([
        item.label,
        `NGN ${numberWithCommas(item.amount)}`,
        item.quantity,
        viewLoading ? (
          <Spinner color={secondaryColor} size={12} />
        ) : (
          <span
            className="link"
            onClick={() => {
              setActivePrize(item);
              showPriceInfo(item._links);
            }}
          >
            View
          </span>
        )
      ]);
      return null;
    });

    return returnValue;
  };

  const showPriceInfo = links => {
    setViewLoading(true);
    Promise.all([
      axiosHandler({
        method: "get",
        url: links.winningRule.href,
        clientID: getClientId(),
        token: getToken()
      }),
      axiosHandler({
        method: "get",
        url: links.winningConditions.href,
        clientID: getClientId(),
        token: getToken()
      })
    ])
      .then(([winningRules, winningConditions]) => {
        setRules(winningRules.data);
        setConditions(winningConditions.data._embedded.winningConditions);
        setShowModal(true);
        setViewLoading(false);
        console.log(winningRules);
        console.log(winningConditions);
      })
      .catch(err => {
        setViewLoading(true);
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
      });
  };

  const onConditionSubmit = e => {
    e.preventDefault();
    setConditionSubmit(true);
    axiosHandler({
      method: "post",
      url: WINNING_CONDITION_URL,
      data: {
        ...winningConditionData,
        prize: activePrize._links.self.href,
        operator: parseInt(winningConditionData.operator),
        operand: parseInt(winningConditionData.operand),
        condition: parseInt(winningConditionData.condition)
      },
      clientID: getClientId(),
      token: getToken()
    }).then(
      _ => {
        Notification.bubble({
          type: "success",
          content: "Winning condition added successfully"
        });
        setConditionSubmit(false);
        setShowNewCondition(false);
        setConditionsData({});
        showPriceInfo(activePrize._links);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
        setConditionSubmit(false);
      }
    );
  };

  const formatWinningCondition = () => {
    const returnValue = [];
    winningConditionMain.map(item => {
      returnValue.push([
        item.condition,
        item.operator,
        item.operand,
        moment(new Date(item.createdAt)).fromNow()
      ]);
      return null;
    });
    return returnValue;
  };

  return (
    <div>
      <Card heading="Game Settings">
        {!activeInstance && <Spinner color={secondaryColor} />}
        {activeInstance && (
          <>
            <div className="contentCard">
              <span className="info">Game label:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="content">{activeInstance.label}</span>
            </div>
            <div className="contentCard">
              <span className="info">Amount:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="content">NGN {activeInstance.amount}</span>
            </div>
            <div className="contentCard">
              <span className="info">Start Date:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="content">{activeInstance.startDate}</span>
            </div>
            <div className="contentCard">
              <span className="info">End Date:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="content">{activeInstance.endData}</span>
            </div>
            <div className="contentCard">
              <span className="info">Created At</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="content">
                {moment(new Date(activeInstance.createdAt)).fromNow()}
              </span>
            </div>
          </>
        )}
      </Card>

      <br />

      <Card heading="Prices">
        <TransactionTable
          keys={headings}
          values={formatPrize()}
          loading={fetching}
        />
      </Card>

      <ContentModal visible={showModal} setVisible={setShowModal}>
        <h4>Winning Rule</h4>
        {winningRuleMain && (
          <>
            <div>
              <span className="info">label:</span>&nbsp;&nbsp;&nbsp;
              <span className="context">{winningRuleMain.label}</span>
            </div>
            <div>
              <span className="info">type:</span>&nbsp;&nbsp;&nbsp;
              <span className="context">{winningRuleMain.type}</span>
            </div>
          </>
        )}
        <br />

        <h4>Winning Conditions</h4>
        {winningConditionMain && (
          <TransactionTable
            keys={conditionHeading}
            values={formatWinningCondition()}
            loading={viewLoading}
          />
        )}
        <br />
        {!showNewCondition && (
          <div className="flex justify-end">
            <span className="link" onClick={() => setShowNewCondition(true)}>
              Add new condition
            </span>
          </div>
        )}
        {showNewCondition && (
          <form action="" onSubmit={onConditionSubmit}>
            <div className="flex align-center justify-between">
              <h4>Create new condition</h4>
              <span className="link" onClick={() => setShowNewCondition(false)}>
                <AppIcon name="x" type="feather" />
              </span>
            </div>
            <div className="grid grid-3 grid-gap-2">
              <FormGroup label="Condition">
                <Select
                  onChange={e =>
                    genericChangeSingle(
                      e,
                      setConditionsData,
                      winningConditionData
                    )
                  }
                  optionList={conditionSort}
                  required
                  placeholder="--select condition--"
                  name="condition"
                />
              </FormGroup>
              <FormGroup label="Operator">
                <Select
                  onChange={e =>
                    genericChangeSingle(
                      e,
                      setConditionsData,
                      winningConditionData
                    )
                  }
                  optionList={operatorSort}
                  required
                  placeholder="--select operator--"
                  name="operator"
                />
              </FormGroup>
              <FormGroup label="operand">
                <Input
                  type="number"
                  onChange={e =>
                    genericChangeSingle(
                      e,
                      setConditionsData,
                      winningConditionData
                    )
                  }
                  required
                  value={winningConditionData.operand}
                  name="operand"
                />
              </FormGroup>
            </div>
            <br />
            <Button
              type="submit"
              disabled={conditionSubmit}
              loading={conditionSubmit}
            >
              Submit
            </Button>
          </form>
        )}
      </ContentModal>
    </div>
  );
}

export default InstanceConfig;
