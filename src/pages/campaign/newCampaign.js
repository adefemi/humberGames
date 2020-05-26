import React, { useContext, useEffect, useState } from "react";
import FormGroup from "../../components/formGroup/formGroup";
import { Select } from "../../components/select/Select";
import { secondaryColor } from "../../utils/data";
import Input from "../../components/input/Input";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Spinner } from "../../components/spinner/Spinner";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Button } from "../../components/button/Button";
import {
  setGlobalLoader,
  setPageTitleAction
} from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import DatePicker from "../../components/DatePicker/datePicker";
import TimePicker from "../../components/timePicker/timePicker";
import { Tabs } from "../../components/tabs/tabs";
import "./campaign.css";
import { Notification } from "../../components/notification/Notification";
import AppIcon from "../../components/icons/Icon";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken
} from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { CAMPAIGN_URL, ETL_FILTER_URL, REWARDS_URL } from "../../utils/urls";
import { Modal } from "../../components/modal/Modal";
import { QualificationRuleForm } from "../reward/newReward";
import "../reward/reward.css";

function NewCampaign(props) {
  const [active, setActive] = useState("sms");
  const [targetDemographyRules, setTargetDemographyRules] = useState([{}]);
  const [submit, setSubmit] = useState(false);
  const [fetchingReward, setFetching] = useState(true);
  const [fetchingMain, setFetchingMain] = useState(props.duplicate);
  const [receptType, setRecieptType] = useState(0);
  const [scheduleData, setScheduleData] = useState({});
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [recipientData, setRecipientData] = useState({});
  const [payload, setPayload] = useState({
    message: "",
    title: ""
  });
  const [loadingIVR, setLoadingIVR] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(true);
  const {
    dispatch,
    state: { activeClient }
  } = useContext(store);
  const [showModal, setShowModal] = useState(false);
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "New Campaign" });
    getRewards();
    if (props.duplicate) {
      getActiveCampaign();
    }
  }, []);

  const getActiveCampaign = () => {
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: CAMPAIGN_URL + `/sms/${props.match.params.uuid}`
    }).then(
      res => {
        let data = {
          title: res.data.data.title,
          message: res.data.data.message,
          sender: res.data.data.sender
        };
        setScheduleStatus(res.data.data.status === "scheduled");
        setPayload(data);
        const sched = res.data.data.schedule.split(" ");
        setScheduleData({ date: sched[0], time: sched[1] });
        setFetchingMain(false);
      },
      _ => {
        Notification.bubble({
          type: "error",
          content: "Campaign with the ID not found!"
        });
        props.history.push("/campaigns");
      }
    );
  };

  const onChange = e => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const onChangeFile = e => {
    setRecipientData({ ...recipientData, [e.target.name]: e.target.files[0] });
  };

  const getRewards = () => {
    axiosHandler({
      method: "get",
      token: getToken(),
      clientID: getClientId(),
      url: REWARDS_URL + `?clientId=${activeClient.id}`
    }).then(res => {
      setRewards(res.data._embedded.rewards);
      setFetching(false);
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    let contentData = payload;
    delete contentData["campaignId"];
    if (scheduleStatus) {
      if (!scheduleData.date || !scheduleData.time) {
        Notification.bubble({
          type: "error",
          content: "Specify schedule date and time"
        });
        setSubmit(false);
        return;
      }
      contentData.schedule = `${scheduleData.date} ${scheduleData.time}`;
    }

    contentData.recipientContentType = receptType === 1 ? "file" : "array";

    if (receptType === 0 || receptType === 3) {
      if (receptType === 0 && !selectedReward) {
        Notification.bubble({
          type: "info",
          content: "Select a reward first"
        });
        setSubmit(false);
        return;
      }
      if (receptType === 3 && targetDemographyRules.length < 1) {
        Notification.bubble({
          type: "info",
          content: "You need to define a rule"
        });
        setSubmit(false);
        return;
      }
      let newData = {
        returnFields: ["phone"],
        distinctOn: ["phone"]
      };
      if (receptType === 0 && selectedReward.targetDemographyRules.length < 1) {
        Notification.bubble({
          type: "info",
          content: "There is no campaign for selected reward!!!"
        });
        setSubmit(false);
        return;
      }

      if (receptType === 0) {
        newData.rule = selectedReward.targetDemographyRules;
      } else {
        newData.rule = targetDemographyRules;
      }

      dispatch({
        type: setGlobalLoader,
        payload: {
          status: true,
          content: "Processing Request, this may take a while, Please wait..."
        }
      });
      axiosHandler({
        method: "post",
        clientID: getClientId(),
        token: getToken(),
        url: ETL_FILTER_URL,
        data: newData
      }).then(
        res => {
          if (res.data.length < 1) {
            Notification.bubble({
              type: "info",
              content: "There is no campaign for selected reward!!!"
            });
            setSubmit(false);
            return;
          }
          contentData.recipients = res.data.map(item => item.phone);
          saveData(contentData);
          dispatch({
            type: setGlobalLoader,
            payload: {
              status: false,
              content: ""
            }
          });
        },
        err => {
          Notification.bubble({
            type: "error",
            content: errorHandler(err)
          });
          dispatch({
            type: setGlobalLoader,
            payload: {
              status: false,
              content: ""
            }
          });
          setSubmit(false);
        }
      );
    } else if (receptType === 1) {
      if (!recipientData.file) {
        Notification.bubble({
          type: "error",
          content: "Specify recipients CSV file"
        });
        setSubmit(false);
        return;
      }
      let fileSplit = recipientData.file.type.split("/");
      if (fileSplit[fileSplit.length - 1].toLowerCase() !== "csv") {
        Notification.bubble({
          type: "error",
          content: "Only CSV file is allowed"
        });
        setSubmit(false);
        return;
      }
      contentData.recipients = recipientData.file;
      saveData(contentData);
    } else {
      if (!recipientData.phoneNumbers) {
        Notification.bubble({
          type: "error",
          content: "Specify recipients, separate them with a comma"
        });
        setSubmit(false);
        return;
      }
      contentData.recipients = recipientData.phoneNumbers
        .split(",")
        .map(item => item.trim());
      saveData(contentData);
    }
  };

  const saveData = contentData => {
    if (receptType === 1) {
      let tempData = new FormData();
      for (let key in contentData) {
        tempData.append(key, contentData[key]);
      }
      contentData = tempData;
    }
    setSubmit(true);
    setActiveData(contentData);
    setShowModal(true);
  };

  const completeSave = () => {
    setShowModal(false);
    axiosHandler({
      method: "post",
      clientID: getClientId(),
      token: getToken(),
      data: activeData,
      url: CAMPAIGN_URL + "/sms"
    }).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Campaign added successfully"
        });
        props.history.push("/campaigns");
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setSubmit(false);
      }
    );
  };

  const fileChanged = e => {
    let payload = new FormData();
    payload.append("file_url", e.target.files[0]);
    setLoadingIVR(true);
    // axiosFunc("post", fileUpload, payload, "yes", onSaveMain);
  };

  const onRuleChange = (ruleType, e, index) => {
    const activeCharge = targetDemographyRules.filter(
      (item, ind) => ind === index
    )[0];
    activeCharge[e.target.name] = e.target.value;
    const newRulesData = targetDemographyRules.map((item, ind) => {
      if (ind === index) return activeCharge;
      return item;
    });
    setTargetDemographyRules(newRulesData);
  };

  const formatRewards = () => {
    const result = [];
    rewards.map(item => {
      result.push({
        title: item.title,
        value: item
      });
      return null;
    });
    return result;
  };

  useEffect(() => {}, []);

  return (
    <div className="newCampaign">
      <Modal
        onClose={() => {
          setShowModal(false);
          setSubmit(false);
        }}
        visible={showModal}
        title="Verify Data"
        okText="Submit"
        onOK={completeSave}
        footer
      >
        {activeData && (
          <>
            <FormGroup>
              <div className="grid grid-2 grid-gap-2">
                <div>
                  <div className="info">Type</div>
                  <div className="context">SMS</div>
                </div>
                <div>
                  <div className="info">Title</div>
                  <div className="context">{activeData.title}</div>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <div>
                <div className="info">Message</div>
                <div className="context">{activeData.message}</div>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="grid grid-2 grid-gap-2">
                {activeData.sender && (
                  <div>
                    <div className="info">Sender ID</div>
                    <div className="context">{activeData.sender}</div>
                  </div>
                )}
                <div>
                  <div className="info">Schedule</div>
                  <div className="context">{activeData.schedule}</div>
                </div>
                {receptType !== 1 && (
                  <div>
                    <div className="info">Total Recipients</div>
                    <div className="context">
                      {activeData.recipients.length}
                    </div>
                  </div>
                )}
              </div>
            </FormGroup>
          </>
        )}
      </Modal>
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>Add Campaign</h3>
      </div>
      <br />
      <div className="form-container-main">
        {fetchingMain ? (
          <Spinner color={secondaryColor} />
        ) : (
          <form onSubmit={onSubmit} className="main-container">
            <div className="grid grid-2 grid-gap-2">
              <FormGroup label="Campaign type">
                <Input disabled value="SMS" />
              </FormGroup>
              <FormGroup label="Title">
                <Input
                  placeholder="Enter campaign title"
                  name="title"
                  required
                  value={payload.title || ""}
                  onChange={onChange}
                />
              </FormGroup>
            </div>
            {active === "sms" || active === "ussd" ? (
              <FormGroup label="Message">
                <TextAreaField
                  required
                  placeholder="Enter campaign message"
                  name="message"
                  value={payload.message || ""}
                  onChange={onChange}
                />
                <div className="campaignMessageCounter">
                  {`${Math.floor(payload.message.length / 160)} /
                  ${payload.message.length % 160}`}
                </div>
              </FormGroup>
            ) : (
              <div>
                <FormGroup label="Audio Input">
                  {loadingIVR && <Spinner color={secondaryColor} />}
                  <input type="file" onChange={fileChanged} />
                </FormGroup>
                <div className="info input-small-top">
                  Supported types includes: Mp3, WAV and AFF
                </div>
              </div>
            )}
            <div className="grid grid-2 grid-gap-2">
              <FormGroup label="Sender (optional)">
                <Input
                  name="sender"
                  value={payload.sender || ""}
                  onChange={onChange}
                />
              </FormGroup>
            </div>
            <br />
            <Checkbox
              id={1}
              checked={scheduleStatus}
              onChange={e => {
                setScheduleStatus(e.target.checked);
              }}
              label="Schedule (Date/Time)"
            />
            <br />
            <br />
            {scheduleStatus && (
              <FormGroup label="Schedule">
                <div className="grid grid-2 grid-gap-2">
                  <DatePicker
                    disablePastDate
                    value={scheduleData.date}
                    name="date"
                    showToday
                    onChange={e =>
                      genericChangeSingle(e, setScheduleData, scheduleData)
                    }
                  />
                  <TimePicker
                    defaultValue={scheduleData.time}
                    name="time"
                    onChange={e =>
                      genericChangeSingle(e, setScheduleData, scheduleData)
                    }
                    use24H
                  />
                </div>
              </FormGroup>
            )}
            <br />
            <Tabs
              activeIndex={receptType}
              onSwitch={setRecieptType}
              heading={[
                <span>Reward</span>,
                <span>Upload CSV file</span>,
                <span>Enter Phone Numbers</span>,
                <span>Rule Definition</span>
              ]}
              body={[
                <FormGroup label="Reward">
                  <Select
                    optionList={formatRewards()}
                    placeholder={
                      fetchingReward
                        ? "fetching rewards please wait..."
                        : "--choose a reward--"
                    }
                    onChange={e => setSelectedReward(e.target.value)}
                  />
                </FormGroup>,
                <>
                  <h3>Recipients</h3>
                  <div>
                    <FormGroup title="">
                      <input type="file" onChange={onChangeFile} name="file" />
                    </FormGroup>
                    <div className="info input-small-top">
                      Supported types includes: CSV
                    </div>
                  </div>
                </>,
                <>
                  <h3>
                    Recipients{" "}
                    <small>(separate each recipients with a comma)</small>
                  </h3>
                  <FormGroup>
                    <TextAreaField
                      placeholder="e.g: 0909390303030, 090302039930, 09018393939 ..."
                      name="phoneNumbers"
                      value={recipientData.phoneNumbers || ""}
                      onChange={e =>
                        genericChangeSingle(e, setRecipientData, recipientData)
                      }
                    />
                  </FormGroup>
                </>,
                <div className="reward">
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
                            targetDemographyRules.filter(
                              (_, key) => key !== ind
                            )
                          )
                        }
                      />
                    );
                  })}
                  <div
                    className="link"
                    onClick={() =>
                      setTargetDemographyRules([...targetDemographyRules, {}])
                    }
                  >
                    Add More Rule
                  </div>
                </div>
              ]}
            />

            <br />
            <br />
            <Button type="submit" loading={submit} disabled={submit}>
              Submit
            </Button>
          </form>
        )}
        <div>
          <div className="sub-container" />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default NewCampaign;
