import React, { useContext, useEffect, useState } from "react";
import "./settings.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Card } from "../../components/card/Card";
import Input from "../../components/input/Input";
import {
  errorHandler,
  genericChangeMulti,
  genericChangeSingle,
  getClientId,
  getToken
} from "../../utils/helper";
import FormGroup from "../../components/formGroup/formGroup";
import { countryCode, secondaryColor } from "../../utils/data";
import SelectInput from "../../components/selectInput/selectInput";
import { Button } from "../../components/button/Button";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler } from "../../utils/axiosHandler";
import { CLIENT_SETTING } from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";
import AppIcon from "../../components/icons/Icon";
import { DropDown } from "../../components/dropdown/Dropdown";
import { cleanParameters } from "../campaign/campaign";

function Settings(props) {
  const {
    dispatch,
    state: { userDetails, activeClient }
  } = useContext(store);
  const [profileData, setProfileData] = useState({
    compName: "Access Bank PLC",
    compEmail: "info@accessbank.com",
    phone_number: 6777867867
  });
  const [loading, setLoading] = useState(false);
  const [dropTrigger, setDropTrigger] = useState(false);
  const [submitting, setSubitting] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [fetching, setFetching] = useState(true);
  const [clientSettings, setClientSettings] = useState({});
  const [activeClientSetting, setActiveClientSetting] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      Notification.bubble({
        type: "success",
        content: "Updated successfully"
      });
      setLoading(false);
      props.setVisible(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: `Settings`
    });
  }, []);

  useEffect(() => {
    if (!activeClient || !userDetails) return;
    getSettings();
  }, [userDetails, activeClient]);

  const getSettings = () => {
    axiosHandler({
      method: "get",
      url: CLIENT_SETTING + `?clientId=${getClientId()}`,
      token: getToken(),
      clientID: getClientId()
    }).then(
      res => {
        if (res.data._embedded.clientSettings[0]) {
          setClientSettings(res.data._embedded.clientSettings[0].settings);
          setActiveClientSetting(res.data._embedded.clientSettings[0]);
        }
        setFetching(false);
        setSubitting(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
      }
    );
  };

  const saveSettings = e => {
    e.preventDefault();
    setSubitting(true);
    let method = "post";
    let url = CLIENT_SETTING;
    if (activeClientSetting) {
      method = "put";
      url = url + `/${activeClientSetting.id}`;
    }
    axiosHandler({
      method,
      url,
      clientID: getClientId(),
      token: getToken(),
      data: {
        clientId: getClientId(),
        settings: cleanParameters(clientSettings)
      }
    }).then(
      _ => {
        Notification.bubble({
          type: "success",
          content: "Settings updated successfully"
        });
        getSettings();
      },
      err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setSubitting(false);
      }
    );
  };

  const getOtherSettings = () => {
    const returnValue = [];
    for (let key in clientSettings) {
      if (clientSettings.hasOwnProperty(key)) {
        if (key === "networkId" || key === "senderId") continue;
        returnValue.push(
          <FormGroup label={key.replace("_", " ")} className="text-capitalized">
            <Input
              value={clientSettings[key]}
              name={key}
              onChange={e =>
                genericChangeSingle(e, setClientSettings, clientSettings)
              }
            />
          </FormGroup>
        );
      }
    }
    return returnValue;
  };

  return (
    <div className="settings">
      <br />
      {userDetails && activeClient && (
        <Card heading="Profile">
          <form className="contentCard" onSubmit={onSubmit}>
            <div className="grid grid-2 grid-gap-2">
              <FormGroup label="Company Name">
                <Input
                  value={activeClient.name}
                  name="compName"
                  disabled
                  onChange={e =>
                    genericChangeSingle(e, setProfileData, profileData)
                  }
                />
              </FormGroup>
              <div className="flex align-center">
                <div
                  className="image-circle"
                  style={{
                    backgroundImage: `url("https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241__340.jpg")`
                  }}
                />
                &nbsp;
                <div className="link">Change logo</div>
              </div>
            </div>
            <br />
            <div className="grid grid-2 grid-gap-2">
              <FormGroup label="Company Email">
                <Input
                  value={userDetails.email}
                  name="compEmail"
                  onChange={e =>
                    genericChangeSingle(e, setProfileData, profileData)
                  }
                  disabled
                />
              </FormGroup>

              <FormGroup label="Company Email">
                <SelectInput
                  defaultOption={{
                    title: "+234",
                    value: "+234"
                  }}
                  selectPosition="left"
                  minWidth={90}
                  optionList={countryCode}
                  selectName="country_code"
                  onChange={e =>
                    genericChangeMulti(e, setProfileData, profileData)
                  }
                  name="phone_number"
                  isCurrency={false}
                  required
                  disabled
                  type="number"
                  value={userDetails.phoneNumber || ""}
                />
              </FormGroup>
            </div>
            <br />
            <Button type="submit" loading={loading} disabled>
              Update
            </Button>
          </form>
        </Card>
      )}
      <br />
      <br />
      {activeClient && (
        <Card heading="API Keys">
          <div className="contentCard">
            <div>
              <div className="info">Public Key </div>
              <div className="context">{activeClient.clientId}</div>
            </div>
            <br />
            <div>
              <div className="info">Secret Key </div>
              <div className="context">{activeClient.secret}</div>
            </div>
          </div>
        </Card>
      )}
      <br />
      <br />
      <Card
        heading={
          <div className="flex align-center justify-between">
            <div>Other Settings</div>
            <DropDown
              fixedContent
              dropTrigger={dropTrigger}
              setDropTrigger={setDropTrigger}
              dropDownWidth={300}
              active={
                <div className="link">
                  <AppIcon name="plusCircle" type="feather" /> Add Settings
                </div>
              }
            >
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setClientSettings({ ...clientSettings, [newKey]: null });
                  setNewKey("");
                  setDropTrigger(true);
                }}
                className="padding-20"
              >
                <FormGroup label="Key">
                  <Input
                    name="senderId"
                    value={newKey}
                    onChange={e => setNewKey(e.target.value)}
                    required
                  />
                </FormGroup>
                <div className="flex justify-end">
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </DropDown>
          </div>
        }
      >
        {fetching ? (
          <div className="padding-20">
            <Spinner color={secondaryColor} />
          </div>
        ) : (
          <form onSubmit={saveSettings} className="padding-20">
            <div className="grid grid-2 grid-gap-h-2">
              <FormGroup label="NetworkID">
                <Input
                  value={clientSettings["networkId"]}
                  name="networkId"
                  onChange={e =>
                    genericChangeSingle(e, setClientSettings, clientSettings)
                  }
                />
              </FormGroup>
              <FormGroup label="SenderID">
                <Input
                  value={clientSettings["senderId"]}
                  name="senderId"
                  onChange={e =>
                    genericChangeSingle(e, setClientSettings, clientSettings)
                  }
                />
              </FormGroup>
              {getOtherSettings()}
            </div>
            <br />
            <Button type="submit" loading={submitting} disabled={submitting}>
              Update
            </Button>
          </form>
        )}
      </Card>
      <br />
      <br />
    </div>
  );
}

export default Settings;
