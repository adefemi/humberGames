import React, { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getArrayCount,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import moment from "moment";
import { Spinner } from "../../components/spinner/Spinner";
import { conditionSort, operatorSort, secondaryColor } from "../../utils/data";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";
import { Select } from "../../components/select/Select";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import AppIcon from "../../components/icons/Icon";
import { GAME_PRICE_URL, WINNING_CONDITION_URL } from "../../utils/urls";
import CurrencyInput from "../../components/currencyInput/currencyInput";
import Divider from "../../components/Divider/divider";
import { Modal } from "../../components/modal/Modal";
import { TextAreaField } from "../../components/textarea/TextAreaField";

function InstanceConfig(props) {
  const headings = ["label", "Amount", ""];
  const conditionHeading = [
    "Condition",
    "Operator",
    "Operand",
    "Created At",
    ""
  ];

  const [prize, setPrizes] = useState([]);

  const [activePrize, setActivePrize] = useState({});
  const [fetching, setFetching] = useState(true);
  const [activeInstance, setActiveInstance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState(1);
  const [viewLoading, setViewLoading] = useState(null);
  const [winningRuleMain, setRules] = useState(null);
  const [winningConditionMain, setConditions] = useState([]);
  const [winningConditionData, setConditionsData] = useState({});
  const [showNewCondition, setShowNewCondition] = useState(false);
  const [conditionSubmit, setConditionSubmit] = useState(false);
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    if (!props.fetching) {
      setActiveInstance(props.activeInstance);
      getPrizes(props.prizesLink);
      axiosHandler({
        method: "get",
        url: props.gameLink,
        token: getToken(),
        clientID: getClientId()
      }).then(res => {
        setActiveGame(res.data);
      });
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
    prize.map((item, key) => {
      returnValue.push([
        item.label,
        `NGN ${numberWithCommas(item.amount)}`,
        <span>
          {viewLoading === key ? (
            <Spinner color={secondaryColor} size={12} />
          ) : (
            <span
              className="link"
              onClick={() => {
                setActivePrize(item);
                showPriceInfo(item._links, key);
              }}
            >
              View Winning Conditions
            </span>
          )}{" "}
          |{" "}
          <span
            className="link"
            onClick={() => {
              setModalState(3);
              setActivePrize(item);
              setShowModal(true);
            }}
          >
            Edit Prize
          </span>
        </span>
      ]);
      return null;
    });

    return returnValue;
  };

  const showPriceInfo = (links, key) => {
    setViewLoading(key);
    if (activeGame.type && activeGame.type.toLowerCase() === "number") {
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
          setModalState(1);
          setShowModal(true);
          setViewLoading(null);
        })
        .catch(err => {
          setViewLoading(null);
          Notification.bubble({
            type: "error",
            content: errorHandler(err, true)
          });
        });
    } else {
      axiosHandler({
        method: "get",
        url: links.winningConditions.href,
        clientID: getClientId(),
        token: getToken()
      })
        .then(res => {
          setConditions(res.data._embedded.winningConditions);
          setModalState(1);
          setShowModal(true);
          setViewLoading(null);
        })
        .catch(err => {
          setViewLoading(null);
          Notification.bubble({
            type: "error",
            content: errorHandler(err, true)
          });
        });
    }
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

  const closeModal = () => {
    setFetching(true);
    getPrizes(props.prizesLink);
    setModalState(1);
    setShowModal(false);
  };

  const formatWinningCondition = () => {
    const returnValue = [];
    winningConditionMain.map(item => {
      returnValue.push([
        item.condition,
        item.operator,
        item.operand,
        moment(new Date(item.createdAt)).fromNow(),
        <span
          className="link"
          onClick={() => confirmWinningConditionDelete(item)}
        >
          Delete
        </span>
      ]);
      return null;
    });
    return returnValue;
  };

  const confirmWinningConditionDelete = condition => {
    Modal.confirm({
      title: "Delete Confirmation",
      onOK: () => {
        axiosHandler({
          method: "delete",
          url: WINNING_CONDITION_URL + `/${condition.id}`,
          clientID: getClientId(),
          token: getToken()
        });
        setConditions(
          winningConditionMain.filter(item => item.id !== condition.id)
        );
      }
    });
  };

  const getGameConfigs = configs => {
    const results = [];
    for (let key in configs) {
      if (configs.hasOwnProperty(key)) {
        results.push(
          <div>
            <div className="info">{key}</div>{" "}
            <div className="content">{configs[key]}</div>
          </div>
        );
      }
    }
    return results;
  };

  return (
    <div>
      <Card
        heading={
          <div className="flex align-center justify-between">
            <div>Game Settings</div>
            <div
              className="link"
              onClick={_ =>
                props.history.push(
                  `/games/update/${activeInstance.id}/${activeInstance.label}`
                )
              }
            >
              Update Instance
            </div>
          </div>
        }
      >
        <div className="padding-20">
          {!activeInstance && <Spinner color={secondaryColor} />}
          {activeInstance && (
            <>
              <div className="grid grid-2 grid-gap-2">
                <div>
                  <div className="info">Game label:</div>{" "}
                  <div className="content">{activeInstance.label}</div>
                </div>
                <div>
                  <div className="info">Amount:</div>
                  <div className="content">NGN {activeInstance.amount}</div>
                </div>
                <div>
                  <div className="info">Start Date:</div>
                  <div className="content">{activeInstance.startDate}</div>
                </div>
                <div>
                  <div className="info">End Date:</div>
                  <div className="content">
                    {activeInstance.endData || "Not Defined"}
                  </div>
                </div>
                <div>
                  <div className="info">Created At</div>
                  <div className="content">
                    {moment(new Date(activeInstance.createdAt)).fromNow()}
                  </div>
                </div>
              </div>
              <br />
              <h3>Game Instance Configs</h3>
              <div className="grid grid-2 grid-gap-2">
                {getGameConfigs(activeInstance.gameConfig)}
              </div>
            </>
          )}
        </div>
      </Card>

      <br />

      <Card
        heading={
          <div className="flex align-center justify-between">
            <h3>Prizes</h3>
            <Button
              onClick={() => {
                setModalState(2);
                setShowModal(true);
              }}
            >
              Add Prize
            </Button>
          </div>
        }
      >
        <TransactionTable
          keys={headings}
          values={formatPrize()}
          loading={fetching}
        />
      </Card>

      <ContentModal visible={showModal} setVisible={setShowModal}>
        {modalState === 1 && (
          <EditWinningConditions
            winningRuleMain={winningRuleMain}
            winningConditionMain={winningConditionMain}
            conditionHeading={conditionHeading}
            formatWinningCondition={formatWinningCondition}
            viewLoading={viewLoading}
            showNewCondition={showNewCondition}
            setShowNewCondition={setShowNewCondition}
            setConditionsData={setConditionsData}
            winningConditionData={winningConditionData}
            conditionSubmit={conditionSubmit}
            gameType={activeGame && activeGame.type}
            onConditionSubmit={onConditionSubmit}
          />
        )}
        {(modalState === 2 || modalState === 3) && (
          <NewPrice
            gameInstance={props.activeInstance}
            gameLink={props.gameLink}
            activeGame={activeGame}
            edit={modalState === 3}
            activePrize={activePrize}
            closeModal={closeModal}
          />
        )}
      </ContentModal>
    </div>
  );
}

const NewPrice = props => {
  const [prices, setPrices] = useState(props.edit ? [props.activePrize] : [{}]);
  const [winningRules, setWinningRule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      props.activeGame.type &&
      props.activeGame.type.toLowerCase() === "number"
    ) {
      axiosHandler({
        method: "get",
        url: props.activeGame._links.winningRules.href,
        token: getToken(),
        clientID: getClientId()
      }).then(res => {
        setWinningRule(res.data._embedded.winningRules);
      });
    }
  }, []);

  const formatWinningRules = () => {
    const returnValue = [];
    winningRules.map(item => {
      returnValue.push({
        title: item.label,
        value: item._links.self.href
      });
      return null;
    });
    return returnValue;
  };

  const remove = key => {
    setPrices(prices.filter((_, key2) => key2 !== key));
  };
  const change = (key, e) => {
    const activeCharge = prices.filter((item, index) => index === key)[0];
    activeCharge[e.target.name] = e.target.value;
    if (e.target.currency) activeCharge.currency_type = e.target.currency;
    if (e.target.rawValue) activeCharge[e.target.name] = e.target.rawValue;
    const newChargeList = prices.map((item, index) => {
      if (index === key) return activeCharge;
      return item;
    });

    setPrices(newChargeList);
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    let method = "post";
    let url = GAME_PRICE_URL;
    if (props.edit) {
      method = "put";
      url = url + `/${props.activePrize.id}`;
    }
    Promise.all(
      prices.map(item => {
        return axiosHandler({
          method,
          url,
          data: {
            ...item,
            winningRule:
              props.activeGame.type &&
              props.activeGame.type.toLowerCase() !== "number"
                ? null
                : item.winningRule,
            description: item.description | "",
            gameInstance: props.gameInstance._links.self.href
          },
          token: getToken(),
          clientID: getClientId()
        });
      })
    ).then(
      () => {
        Notification.bubble({
          type: "success",
          content: "Prize added successfully"
        });
        props.closeModal();
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <h3>Add Prizes</h3>
      <form action="" onSubmit={onSubmit}>
        <div className="prices-lists">
          {prices.map((item, key) => (
            <>
              <PricesConfig
                onRemove={() => remove(key)}
                gameData={item}
                key={key}
                winningList={formatWinningRules(winningRules)}
                canShow={prices.length > 1}
                gameType={props.activeGame.type}
                onChange={e => change(key, e)}
              />
              {prices.length > 1 && prices.length - 1 !== key && <Divider />}
            </>
          ))}
        </div>

        {!props.edit && (
          <>
            <p />
            <div className="flex justify-end">
              <div className="link" onClick={() => setPrices([...prices, {}])}>
                Add More Prizes
              </div>
            </div>
          </>
        )}
        <br />

        <Button type="submit" loading={loading} disabled={loading}>
          {!props.edit ? "Save" : "Update"}
        </Button>
      </form>
    </div>
  );
};

const PricesConfig = props => {
  return (
    <div className="prices-card">
      {props.canShow && (
        <div className="close" onClick={props.onRemove}>
          <AppIcon name="x" type="feather" />
        </div>
      )}

      <div className="grid grid-2 grid-gap-h-2">
        <FormGroup label="Label">
          <Input
            name="label"
            onChange={props.onChange}
            value={props.gameData.label || ""}
            required
            placeholder="Give price a label"
          />
        </FormGroup>
        <FormGroup label="Amount">
          <CurrencyInput
            onChange={props.onChange}
            value={props.gameData.amount || 0}
            name={"amount"}
            required
            defaultCurrencyOption={{
              title: "NGN",
              value: "NGN"
            }}
          />
        </FormGroup>
        {props.gameType && props.gameType.toLowerCase() === "number" && (
          <FormGroup label="Winning Rule">
            <Select
              onChange={props.onChange}
              name={"winningRule"}
              placeholder="--select a winning rule--"
              optionList={props.winningList}
              required
            />
          </FormGroup>
        )}

        {/*<FormGroup label="Quantity">*/}
        {/*  <Select*/}
        {/*    onChange={props.onChange}*/}
        {/*    value={props.gameData.quantity || ""}*/}
        {/*    name={"quantity"}*/}
        {/*    placeholder="--choose quantify--"*/}
        {/*    optionList={getArrayCount({ start: 1, count: 20 }).map(item => {*/}
        {/*      return {*/}
        {/*        title: item,*/}
        {/*        value: item*/}
        {/*      };*/}
        {/*    })}*/}
        {/*    required*/}
        {/*  />*/}
        {/*</FormGroup>*/}
      </div>
      <FormGroup label="Notification Message">
        <TextAreaField
          onChange={props.onChange}
          name={"notificationMessage"}
          placeholder="Enter message"
          value={props.gameData.notificationMessage || ""}
          required
        />
      </FormGroup>
    </div>
  );
};

const EditWinningConditions = props => {
  return (
    <div>
      {props.gameType && props.gameType.toLowerCase() === "number" && (
        <>
          <h4>Winning Rule</h4>
          {props.winningRuleMain && (
            <>
              <div>
                <span className="info">label:</span>&nbsp;&nbsp;&nbsp;
                <span className="context">{props.winningRuleMain.label}</span>
              </div>
              <div>
                <span className="info">type:</span>&nbsp;&nbsp;&nbsp;
                <span className="context">{props.winningRuleMain.type}</span>
              </div>
            </>
          )}
          <br />
        </>
      )}
      <h4>Winning Conditions</h4>
      {props.winningConditionMain && (
        <TransactionTable
          keys={props.conditionHeading}
          values={props.formatWinningCondition()}
          loading={props.viewLoading}
        />
      )}
      <br />
      {!props.showNewCondition && (
        <div className="flex justify-end">
          <span
            className="link"
            onClick={() => props.setShowNewCondition(true)}
          >
            Add new condition
          </span>
        </div>
      )}
      {props.showNewCondition && (
        <form action="" onSubmit={props.onConditionSubmit}>
          <div className="flex align-center justify-between">
            <h4>Create new condition</h4>
            <span
              className="link"
              onClick={() => props.setShowNewCondition(false)}
            >
              <AppIcon name="x" type="feather" />
            </span>
          </div>
          <div className="grid grid-3 grid-gap-2">
            <FormGroup label="Condition">
              <Select
                onChange={e =>
                  genericChangeSingle(
                    e,
                    props.setConditionsData,
                    props.winningConditionData
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
                    props.setConditionsData,
                    props.winningConditionData
                  )
                }
                optionList={
                  props.winningConditionData.condition === "3"
                    ? operatorSort.filter(item => item.value === "0")
                    : operatorSort
                }
                defaultOption={
                  props.winningConditionData.condition === "3"
                    ? operatorSort.filter(item => item.value === "0")[0]
                    : {}
                }
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
                    props.setConditionsData,
                    props.winningConditionData
                  )
                }
                required
                value={props.winningConditionData.operand}
                name="operand"
              />
            </FormGroup>
          </div>
          <br />
          <Button
            type="submit"
            disabled={props.conditionSubmit}
            loading={props.conditionSubmit}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default InstanceConfig;
