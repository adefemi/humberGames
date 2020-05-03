import React, { useContext, useEffect, useState } from "react";
import FormGroup from "../../components/formGroup/formGroup";
import { Select } from "../../components/select/Select";
import {
  campaignChannelOptions,
  campaignNetworkOptions,
  secondaryColor
} from "../../utils/data";
import Input from "../../components/input/Input";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { Spinner } from "../../components/spinner/Spinner";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Button } from "../../components/button/Button";
import { setPageTitleAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import DatePicker from "../../components/DatePicker/datePicker";
import TimePicker from "../../components/timePicker/timePicker";
import { Tabs } from "../../components/tabs/tabs";
import "./campaign.css";
import { Notification } from "../../components/notification/Notification";
import AppIcon from "../../components/icons/Icon";

function NewCampaign(props) {
  const [active, setActive] = useState("sms");
  const [submit, setSubmit] = useState(false);
  const [receptType, setRecieptType] = useState(1);
  const [payload, setPayload] = useState({
    message: "",
    title: ""
  });
  const [loadingIVR, setLoadingIVR] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(true);
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "New Campaign" });
  }, []);

  const onChange = e => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const onChangeFile = e => {
    setPayload({ ...payload, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = () => {
    setSubmit(true);
    const contentData = payload;
    delete contentData["campaignId"];

    if (!contentData.phoneNumbers) {
      Notification.bubble({
        type: "error",
        content: "Provide Recipients..."
      });
      setSubmit(false);
      return;
    }

    setTimeout(() => {
      Notification.bubble({
        type: "success",
        content: "Campaign created successfully"
      });
      setSubmit(false);
      props.history.push("/campaigns");
    }, 2000);
  };

  const fileChanged = e => {
    let payload = new FormData();
    payload.append("file_url", e.target.files[0]);
    setLoadingIVR(true);
    // axiosFunc("post", fileUpload, payload, "yes", onSaveMain);
  };

  useEffect(() => {}, []);

  return (
    <div className="newCampaign">
      <div className="flex align-center">
        <span onClick={() => props.history.goBack()} className="link">
          <AppIcon name="arrowLeft" type="feather" />{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>Add Campaign</h3>
      </div>
      <br />
      <div className="form-container-main">
        <form onSubmit={onSubmit} className="main-container">
          <div className="grid grid-2 grid-gap-2">
            <FormGroup label="Campaign type">
              <Select
                placeholder="--choose campaign type"
                optionList={campaignChannelOptions}
                onChange={e => setActive(e.target.value)}
              />
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
            <FormGroup label="Network">
              <Select
                name="network"
                required
                placeholder="--select network--"
                optionList={campaignNetworkOptions}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup label="Sender ID (optional)">
              <Input
                name="senderId"
                value={payload.senderId || ""}
                onChange={onChange}
              />
            </FormGroup>
          </div>
          <br />
          <div className="grid grid-2 grid-gap-2">
            <FormGroup label="Reward">
              <Select
                optionList={[{ title: "Winning Bowl", value: "1" }]}
                placeholder="--choose a reward--"
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
            <div className="grid grid-2 grid-gap-2">
              <DatePicker />
              <TimePicker use24H />
            </div>
          )}
          <br />
          <Tabs
            activeIndex={receptType}
            onSwitch={setRecieptType}
            heading={[
              <span>Upload CSV file</span>,
              <span>Enter Phone Numbers</span>
            ]}
            body={[
              <>
                <h3>Recipients</h3>
                <div>
                  <FormGroup title="">
                    <input
                      type="file"
                      onChange={onChangeFile}
                      name="phoneNumbers"
                    />
                  </FormGroup>
                  <div className="info input-small-top">
                    Supported types includes: CSV
                  </div>
                </div>
              </>,
              <>
                <h3>Recipients</h3>
                <FormGroup>
                  <TextAreaField
                    placeholder="e.g: 0909390303030, 090302039930, 09018393939 ..."
                    name="phoneNumbers"
                    value={payload.phoneNumbers || ""}
                    onChange={onChange}
                  />
                </FormGroup>
              </>
            ]}
          />

          <br />
          <br />
          <Button type="submit" loading={submit} disabled={submit}>
            Submit
          </Button>
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

export default NewCampaign;
