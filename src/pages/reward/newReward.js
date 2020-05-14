import React, { useEffect, useContext, useState } from "react";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import "./reward.css";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken
} from "../../utils/helper";
import { Select } from "../../components/select/Select";
import DatePicker from "../../components/DatePicker/datePicker";
import TimePicker from "../../components/timePicker/timePicker";
import Divider from "../../components/Divider/divider";
import { Button } from "../../components/button/Button";
import {
  ccEnRules,
  ccMainRules,
  ccTRules,
  rewardRuleTypes,
  secondaryColor
} from "../../utils/data";
import AppIcon from "../../components/icons/Icon";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_INSTANCE_URL, REWARDS_URL } from "../../utils/urls";
import ms from "microseconds";
import { Spinner } from "../../components/spinner/Spinner";
import { Modal } from "../../components/modal/Modal";

const getDefaultInstance = (InstanceList, activeInstanceLink) => {
  const activeInstance = InstanceList.filter(
    item => item.value === activeInstanceLink
  );
  return activeInstance[0];
};

function NewReward(props) {
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);
  const [rewardData, setRewardData] = useState({});
  const [qualificationRules, setQualificationRules] = useState([]);
  const [targetDemographyRules, setTargetDemographyRules] = useState([]);
  const [gameInstance, setGameInstance] = useState([]);
  const [fetchingInstance, setfetchingInstance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!props.update);
  const [showModal, setShowModal] = useState(false);
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: props ? "Update Reward" : "New Reward"
    });
    getGameInstances();
    if (props.update) {
      getActiveReward();
    }
  }, []);

  const getActiveReward = () => {
    axiosHandler({
      method: "get",
      token: getToken(),
      clientID: getClientId(),
      url: REWARDS_URL + `?id=${props.match.params.uuid}`
    }).then(
      res => {
        const activeReward = res.data._embedded.rewards[0];
        axiosHandler({
          method: "get",
          token: getToken(),
          clientID: getClientId(),
          url: activeReward._links.gameInstance.href
        }).then(
          res => {
            setRewardData({
              ...activeReward,
              gameInstance: res.data._links.self.href
            });
            setQualificationRules(activeReward.qualificationRules);
            setTargetDemographyRules(activeReward.targetDemographyRules);
            setFetching(false);
          },
          err => {
            Notification.bubble({
              type: "error",
              content: errorHandler(err)
            });
          }
        );
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const getGameInstances = () => {
    axiosHandler({
      method: "get",
      token: getToken(),
      clientID: getClientId(),
      url: GAME_INSTANCE_URL + `?clientId=${activeClient.id}`
    }).then(
      res => {
        if (res.data._embedded && res.data._embedded.gameInstances) {
          let newList = [];
          res.data._embedded.gameInstances.map(item => {
            newList.push({
              title: item.label,
              value: item._links.self.href
            });
            return null;
          });
          setGameInstance(newList);
          setfetchingInstance(false);
        }
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const onRuleChange = (ruleType, e, index) => {
    if (ruleType === "qrules") {
      const activeCharge = qualificationRules.filter(
        (item, ind) => ind === index
      )[0];
      activeCharge[e.target.name] = e.target.value;
      const newRulesData = qualificationRules.map((item, ind) => {
        if (ind === index) return activeCharge;
        return item;
      });
      setQualificationRules(newRulesData);
    } else {
      const activeCharge = targetDemographyRules.filter(
        (item, ind) => ind === index
      )[0];
      activeCharge[e.target.name] = e.target.value;
      const newRulesData = targetDemographyRules.map((item, ind) => {
        if (ind === index) return activeCharge;
        return item;
      });
      setTargetDemographyRules(newRulesData);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const newData = {
      ...rewardData,
      qualificationRules,
      targetDemographyRules,
      clientId: activeClient.id
    };
    setLoading(true);
    setActiveData(newData);
    setShowModal(true);
  };

  const completeSave = () => {
    setShowModal(false);
    let method = "post";
    let url = REWARDS_URL;
    if (props.update) {
      method = "put";
      url = url + `/${activeData.id}`;
    }
    axiosHandler({
      method,
      url,
      clientID: getClientId(),
      token: getToken(),
      data: activeData
    }).then(
      _ => {
        Notification.bubble({
          type: "success",
          content: `Reward ${props.update ? "Update" : "Added"} Successfully`
        });
        props.history.push("/rewards");
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

  if (props.update) {
    if (fetching) {
      return <Spinner color={secondaryColor} />;
    }
  }

  return (
    <div className="reward">
      <Modal
        onClose={() => {
          setShowModal(false);
          setLoading(false);
        }}
        visible={showModal}
        title="Verify Data"
        okText="Submit"
        onOK={completeSave}
        footer
      >
        <pre>{JSON.stringify(activeData, null, 2)}</pre>
      </Modal>
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>{props.update ? "Update" : "Add"} Reward</h3>
      </div>

      <div className="form-container-main">
        <form onSubmit={onSubmit} className="main-container">
          <FormGroup label="Title">
            <Input
              placeholder="Enter reward title"
              name="title"
              required
              value={rewardData.title || ""}
              onChange={e => genericChangeSingle(e, setRewardData, rewardData)}
            />
          </FormGroup>
          {/*<div className="">*/}
          {/*<FormGroup label="Draw Frequency (in hours)">*/}
          {/*  <Input*/}
          {/*    placeholder="Specify frequency"*/}
          {/*    name="drawFrequenceInHours"*/}
          {/*    type="number"*/}
          {/*    required*/}
          {/*    value={rewardData.drawFrequenceInHours || ""}*/}
          {/*    onChange={e =>*/}
          {/*      genericChangeSingle(e, setRewardData, rewardData)*/}
          {/*    }*/}
          {/*  />*/}
          {/*</FormGroup>*/}

          {/*</div>*/}
          <div className="grid grid-2 grid-gap-2">
            <FormGroup label="Game Instance">
              <Select
                placeholder={
                  fetchingInstance
                    ? "fetching game instances..."
                    : "--choose game instance--"
                }
                name="gameInstance"
                required
                onChange={e =>
                  genericChangeSingle(e, setRewardData, rewardData)
                }
                defaultOption={
                  props.update &&
                  !fetchingInstance &&
                  getDefaultInstance(gameInstance, rewardData.gameInstance)
                }
                optionList={gameInstance}
              />
            </FormGroup>
            <FormGroup label="Cutoff Time (in minutes)">
              <Input
                placeholder="Specify cutoff time"
                name="cutOffTimeInMins"
                type="number"
                required
                value={rewardData.cutOffTimeInMins || ""}
                onChange={e =>
                  genericChangeSingle(e, setRewardData, rewardData)
                }
              />
            </FormGroup>
          </div>
          {/*<FormGroup label="Next Draw Time">*/}
          {/*  <div className="grid grid-2 grid-gap-2">*/}
          {/*    <DatePicker*/}
          {/*      id={1}*/}
          {/*      name="nextdrawDate"*/}
          {/*      required*/}
          {/*      onChange={e =>*/}
          {/*        genericChangeSingle(e, setNextDrawInfo, nextDrawInfo)*/}
          {/*      }*/}
          {/*    />*/}
          {/*    <TimePicker*/}
          {/*      use24H*/}
          {/*      name="nextdrawTime"*/}
          {/*      onChange={e =>*/}
          {/*        genericChangeSingle(e, setNextDrawInfo, nextDrawInfo)*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</FormGroup>*/}
          <br />
          <h3>Qualification Rules</h3>
          {qualificationRules.map((item, index) => {
            return (
              <QualificationRuleForm
                onChange={e => onRuleChange("qrules", e, index)}
                data={item}
                key={index}
                index={index}
                update={props.update}
                onConditionChange={e =>
                  onRuleChange(
                    "qrules",
                    {
                      target: {
                        name: "condition",
                        value: e
                      }
                    },
                    index
                  )
                }
                removeRule={ind =>
                  setQualificationRules(
                    qualificationRules.filter((_, key) => key !== ind)
                  )
                }
              />
            );
          })}
          <Button
            type="button"
            onClick={() => setQualificationRules([...qualificationRules, {}])}
          >
            Add Rule
          </Button>
          <br />
          <h3>Target Demography Rules</h3>
          {targetDemographyRules.map((item, index) => {
            return (
              <QualificationRuleForm
                onChange={e => onRuleChange("trules", e, index)}
                data={item}
                key={index}
                index={index}
                update={props.update}
                onConditionChange={e =>
                  onRuleChange(
                    "trules",
                    {
                      target: {
                        name: "condition",
                        value: e
                      }
                    },
                    index
                  )
                }
                removeRule={ind =>
                  setTargetDemographyRules(
                    targetDemographyRules.filter((_, key) => key !== ind)
                  )
                }
              />
            );
          })}
          <Button
            type="button"
            onClick={() =>
              setTargetDemographyRules([...targetDemographyRules, {}])
            }
          >
            Add Rule
          </Button>
          <br />
          <Divider />
          <div className="flex justify-end">
            <Button
              type="submit"
              color="success"
              loading={loading}
              disabled={loading}
            >
              {props.update ? "Update" : "Create"} Reward
            </Button>
          </div>
        </form>
        <div>
          <div className="sub-container" />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

const getRuleFields = type => {
  let result = [];
  if (type === "ClientCustomerTransaction") {
    result = ccTRules;
  } else {
    result = ccEnRules;
  }
  return result;
};

const getRuleConditions = (type, optType, index, onChange, data) => {
  const result = [];
  let typeFromList = ccEnRules.filter(item => item.value === type);
  if (optType === "ClientCustomerTransaction") {
    typeFromList = ccTRules.filter(item => item.value === type);
  }
  typeFromList = typeFromList[0];
  if (!typeFromList) return;
  const options = ccMainRules.filter(item =>
    item.optionTypes.includes(typeFromList.type)
  );
  if (options.length > 0) {
    result.push(
      <Select
        optionList={options}
        placeholder="--select rule condition--"
        name="condType"
        onChange={e => onChange(e, index)}
        required
        defaultOption={getDefaultInstance(options, data.condType)}
      />
    );
  } else {
    result.push(<Input name="condType" value="Equals" disabled />);
  }

  if (typeFromList.type === "string" || typeFromList.type === "number") {
    result.push(
      <Input
        type={typeFromList.type === "number" ? "number" : "text"}
        placeholder={`enter ${type}`}
        name="condValue"
        value={data.condValue || ""}
        onChange={e => onChange(e, index, options.length < 1)}
        required
      />
    );
  } else if (typeFromList.type === "date") {
    result.push(
      <DatePicker
        id={ms.now()}
        name="condValue"
        onChange={e => onChange(e, index, options.length < 1)}
        required
      />
    );
  } else if (typeFromList.type === "option") {
    result.push(
      <Select
        placeholder="--make a selection--"
        optionList={typeFromList.optionList}
        name="condValue"
        onChange={e => onChange(e, index, options.length < 1)}
        required
      />
    );
  }

  return result;
};

const formatConditions = condition => {
  let result = {};
  condition.map(item => {
    result[item.condType] = item.condValue;
    return null;
  });
  return result;
};

const QualificationRuleForm = props => {
  const getConditions = () => {
    const conds = [];
    for (let key in props.data.condition) {
      if (props.data.condition.hasOwnProperty(key)) {
        conds.push({
          condType: key,
          condValue: props.data.condition[key]
        });
      }
    }
    if (conds.length < 1) {
      return [{}];
    }
    return conds;
  };

  const [conditions, setCondition] = useState(
    props.update ? getConditions() : [{}]
  );

  const removeCondition = index => {
    setCondition(conditions.filter((_, key) => key !== index));
  };
  const onChange = (e, index, defaultState) => {
    const activeCharge = conditions.filter((item, ind) => ind === index)[0];
    activeCharge[e.target.name] = e.target.value;
    if (defaultState) {
      activeCharge.condType = "eq";
    }
    const newRulesData = conditions.map((item, ind) => {
      if (ind === index) return activeCharge;
      return item;
    });
    setCondition(newRulesData);
  };

  useEffect(() => {
    if (props.onConditionChange) {
      props.onConditionChange(formatConditions(conditions));
    }
  }, [conditions]);

  return (
    <div className="qualificationForm" key={props.index}>
      <div className="close" onClick={() => props.removeRule(props.index)}>
        <AppIcon name="x" type="feather" />
      </div>
      <div className="grid grid-2 grid-gap-2">
        <FormGroup label="Rule Type">
          <Select
            placeholder="--choose rule type--"
            optionList={rewardRuleTypes}
            name="dataHead"
            onChange={props.onChange}
            defaultOption={
              props.update &&
              getDefaultInstance(rewardRuleTypes, props.data.dataHead)
            }
            required
          />
        </FormGroup>
        {props.data.dataHead && (
          <FormGroup label="Rule Field">
            <Select
              placeholder="--choose rule file--"
              optionList={getRuleFields(props.data.dataHead)}
              name="field"
              defaultOption={
                props.update &&
                getDefaultInstance(
                  getRuleFields(props.data.dataHead),
                  props.data.field
                )
              }
              onChange={props.onChange}
            />
          </FormGroup>
        )}
      </div>

      {props.data.field && (
        <>
          <FormGroup label="Rule Conditions">
            {conditions.map((item, key) => (
              <div className="singleConditions" key={key}>
                {conditions.length > 1 && (
                  <div className="close" onClick={() => removeCondition(key)}>
                    <AppIcon name="x" type="feather" />
                  </div>
                )}

                <div className="grid grid-2 grid-gap-2">
                  {getRuleConditions(
                    props.data.field,
                    props.data.dataHead,
                    key,
                    onChange,
                    item
                  )}
                </div>
                {conditions.length > 1 && conditions.length - 1 !== key && (
                  <Divider />
                )}
              </div>
            ))}
          </FormGroup>
          <p />
          <div
            className="flex justify-end link"
            onClick={() => setCondition([...conditions, {}])}
          >
            Add condition
          </div>
        </>
      )}
    </div>
  );
};

export default NewReward;
