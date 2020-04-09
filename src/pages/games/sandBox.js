import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { countryCode } from "../../utils/data";

import { Button } from "../../components/button/Button";
import ContentModal from "../../components/contentModal/contentModal";
import FormGroup from "../../components/formGroup/formGroup";
import { genericChangeMulti, genericChangeSingle } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { Radio } from "../../components/radio/Radio";
import FileUploadNew from "../../components/fileUploadNew/fileUploadNew";
import SelectInput from "../../components/selectInput/selectInput";

function Games(props) {
  const { dispatch } = useContext(store);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: "SandBox"
    });
  }, []);
  return (
    <div className="games">
      <br />
      <div className="grid grid-3 grid-gap-2">
        <div>
          <div className="game-card">
            <div
              className="img-con"
              style={{
                backgroundImage: `url("https://secureservercdn.net/45.40.148.106/l8q.5a1.myftpupload.com/wp-content/uploads/2016/11/WednesdaySundayRaffles-500x321.jpg")`
              }}
            />
            <div className="flex column justify-between conMain">
              <div>
                <div className="title">Diamond Xtra Daily Raffle</div>
                <div className="info">Raffle</div>
              </div>
              <Button onClick={() => setVisible(true)}>Play</Button>
            </div>
          </div>
        </div>
        <div>
          <div className="game-card">
            <div
              className="img-con"
              style={{
                backgroundImage: `url("https://techcrunch.com/wp-content/uploads/2018/03/facebook-instant-games.jpg?w=730&crop=1")`
              }}
            />

            <div className="flex column justify-between conMain">
              <div>
                <div className="title">Access Wallet Weekly Raffle</div>
                <div className="info">Raffle</div>
              </div>
              <Button onClick={() => setVisible(true)}>Play</Button>
            </div>
          </div>
        </div>
      </div>
      <ContentModal visible={visible} setVisible={setVisible}>
        <NewGame setVisible={setVisible} />
      </ContentModal>
    </div>
  );
}

const NewGame = props => {
  const [gameData, setGameData] = useState({});
  const [propertyType, setPropertyType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      Notification.bubble({
        type: "success",
        content: "You won, Congrats"
      });
      setLoading(false);
      props.setVisible(false);
    }, 2000);
  };

  return (
    <div className="newGame">
      <h3>Play Game</h3>

      <br />
      <FormGroup label="Choose game mode">
        <div className="flex align-center radio-group">
          <Radio
            onChange={() => setPropertyType("single")}
            name="propType"
            label="Single"
            checked={propertyType === "single"}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Radio
            onChange={() => setPropertyType("bulk")}
            name="propType"
            label="Bulk"
            checked={propertyType === "bulk"}
          />
        </div>
        <br />
        <br />
        {propertyType === "single" && (
          <>
            <FormGroup label="Phone number">
              <SelectInput
                defaultOption={{
                  title: "+234",
                  value: "+234"
                }}
                selectPosition="left"
                minWidth={90}
                optionList={countryCode}
                selectName="country_code"
                onChange={e => genericChangeMulti(e, setGameData, gameData)}
                name="phone_number"
                isCurrency={false}
                required
                type="number"
                value={gameData.phone_number || ""}
              />
            </FormGroup>
            <FormGroup label="Transaction Reference">
              <Input
                name="transRef"
                value={gameData.transRef}
                onChange={e => genericChangeSingle(e, setGameData, gameData)}
              />
            </FormGroup>
          </>
        )}
        {propertyType === "bulk" && (
          <>
            <FileUploadNew
              onChange={e => {
                if (e[0]) {
                  setSelectedFile(e[0].name);
                }
              }}
              disableUpload
            >
              Upload Game Plays
            </FileUploadNew>
            {selectedFile && (
              <>
                <br />
                <div className="flex align-center">
                  <div
                    onClick={() => setSelectedFile(null)}
                    className="pointer"
                  >
                    <AppIcon name="x" type="feather" />
                  </div>
                  &nbsp; &nbsp; &nbsp;
                  <div className="link">{selectedFile}</div>
                </div>
              </>
            )}
          </>
        )}
      </FormGroup>
      <br />
      <br />
      <Button
        loading={loading}
        disabled={loading || !propertyType}
        onClick={onSubmit}
      >
        Submit
      </Button>
      <br />
      <br />
    </div>
  );
};

export default Games;
