import React, { useContext, useEffect, useState } from "react";
import "./games.css";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import Affixed from "../../components/Affixed/affixed";
import SummaryCard from "../../components/property/SummaryCard";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import {
  countryCode,
  gameStatusSort,
  gameTypeSort,
  statusMode,
  timeSortOption
} from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { Button } from "../../components/button/Button";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge/badge";
import Pagination from "../../components/Pagination/pagination";
import {
  errorHandler,
  genericChangeMulti,
  genericChangeSingle,
  getClientId,
  getToken,
  numberWithCommas
} from "../../utils/helper";
import { axiosHandler } from "../../utils/axiosHandler";
import { GAME_INSTANCE_URL, GAME_PLAY_URL, GAME_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import qs from "querystring";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import Result from "../../components/Result/result";
import FormGroup from "../../components/formGroup/formGroup";
import { Radio } from "../../components/radio/Radio";
import SelectInput from "../../components/selectInput/selectInput";
import FileUploadNew from "../../components/fileUploadNew/fileUploadNew";
import ContentModal from "../../components/contentModal/contentModal";
import { Modal } from "../../components/modal/Modal";
import { cleanParameters } from "../campaign/campaign";

function Sandbox(props) {
  const { dispatch } = useContext(store);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [gameInstances, setGameInstance] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [pageInfo, setPageInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeInstance, setActiveInstance] = useState(false);

  useEffect(() => {
    dispatch({
      type: setPageTitleAction,
      payload: "SANDBOX"
    });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage - 1}`;
    extra += `&${qs.stringify(cleanParameters(queryParams))}`;
    getInstance(extra);
  }, [search, queryParams, currentPage]);

  const getInstance = (extra = "") => {
    axiosHandler({
      method: "get",
      url: GAME_INSTANCE_URL,
      clientID: getClientId(),
      token: getToken()
    })
      .then(res => {
        setGameInstance(res.data._embedded.gameInstances);
        setPageInfo(res.data.page);
        setFetching(false);
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
      });
  };

  return (
    <div className="singleGames">
      <br />
      <section className="search-section">
        <div className="flex justify-between">
          <div className="flex align-center flex-1">
            <div className="search-box">
              <Input
                placeholder={"Search instances..."}
                iconLeft={<AppIcon name="search" type="feather" />}
                debounce={true}
                debounceTimeout={500}
                minLength={3}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-box flex ">
            <Select
              optionList={gameStatusSort}
              placeholder="-- filter by --"
              name="status"
              onChange={e =>
                genericChangeSingle(e, setQueryParams, queryParams)
              }
            />
            <Select
              optionList={timeSortOption}
              placeholder="-- soft by --"
              name="sort"
              onChange={e =>
                genericChangeSingle(e, setQueryParams, queryParams)
              }
            />
          </div>
        </div>
      </section>
      <div className="instanceList gridMainMain">
        {fetching && (
          <>
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </>
        )}
        {!fetching &&
          gameInstances.map((item, key) => (
            <div key={key} className="instanceCard">
              <h3>{item.label}</h3>
              <small>
                created {moment(new Date(item.createdAt)).fromNow()}
              </small>
              <div>
                <span className="info">start date:</span>
                <span className="context">{item.startDate}</span>
              </div>
              <div>
                <span className="info">end date:</span>
                <span className="context">{item.endDate}</span>
              </div>
              <div className={`status active`} />
              <div className="flex align-center justify-between amount sandbox">
                N{numberWithCommas(item.amount)}
                <div
                  onClick={() => {
                    setActiveInstance(item);
                    setShowModal(true);
                  }}
                  className="play"
                >
                  PLAY
                </div>
              </div>
            </div>
          ))}
      </div>
      <br />
      {!fetching && gameInstances.length > 0 && (
        <Pagination total={1} current={1} />
      )}
      {!fetching && gameInstances.length < 1 && (
        <Result
          title="We didn't find anything"
          subTitle="We could not find any game instance for your selected game. Is either you've not created an instance or your search conditions couldn't not be met"
        />
      )}
      <br />
      <br />
      <ContentModal visible={showModal} setVisible={setShowModal}>
        <NewGame activeInstance={activeInstance} />
      </ContentModal>
    </div>
  );
}

const NewGame = props => {
  const [gameData, setGameData] = useState({
    transactionRef: "234567890",
    isSandbox: true
  });
  const [propertyType, setPropertyType] = useState("single");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    state: { userDetails }
  } = useContext(store);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    console.log(gameData);
    axiosHandler({
      method: "post",
      url: GAME_PLAY_URL + props.activeInstance.id,
      clientID: getClientId(),
      data: {
        ...gameData,
        userId: userDetails.userId
      },
      token: getToken()
    }).then(
      res => {
        Modal.info({
          title: `You ${res.data[0].status}`
        });
        setLoading(false);
      },
      err => {
        console.log(err);
        Notification.bubble({
          type: "error",
          content: errorHandler(err, true)
        });
        setLoading(false);
      }
    );
  };

  return (
    <div className="newGame">
      <h3>Play Game</h3>

      <form action="" onSubmit={onSubmit}>
        <br />
        <FormGroup label="Choose game mode">
          {/*<div className="flex align-center radio-group">*/}
          {/*  <Radio*/}
          {/*    onChange={() => setPropertyType("single")}*/}
          {/*    name="propType"*/}
          {/*    label="Single"*/}
          {/*    checked={propertyType === "single"}*/}
          {/*  />*/}
          {/*  &nbsp; &nbsp; &nbsp; &nbsp;*/}
          {/*  <Radio*/}
          {/*    onChange={() => setPropertyType("bulk")}*/}
          {/*    name="propType"*/}
          {/*    label="Bulk"*/}
          {/*    checked={propertyType === "bulk"}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<br />*/}
          {/*<br />*/}
          {propertyType === "single" && (
            <>
              {/*<FormGroup label="Phone number">*/}
              {/*  <SelectInput*/}
              {/*    defaultOption={{*/}
              {/*      title: "+234",*/}
              {/*      value: "+234"*/}
              {/*    }}*/}
              {/*    selectPosition="left"*/}
              {/*    minWidth={90}*/}
              {/*    optionList={countryCode}*/}
              {/*    selectName="country_code"*/}
              {/*    onChange={e => genericChangeMulti(e, setGameData, gameData)}*/}
              {/*    name="phone_number"*/}
              {/*    isCurrency={false}*/}
              {/*    required*/}
              {/*    type="number"*/}
              {/*    value={gameData.phone_number || ""}*/}
              {/*  />*/}
              {/*</FormGroup>*/}
              <FormGroup label="Input">
                <Input
                  name="userInput"
                  placeholder="Enter your input"
                  value={gameData.userInput}
                  onChange={e => genericChangeSingle(e, setGameData, gameData)}
                />
              </FormGroup>
              <FormGroup label="Transaction Reference">
                <Input
                  name="transactionRef"
                  disabled
                  value={gameData.transactionRef}
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
          type={"submit"}
        >
          Submit
        </Button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Sandbox;
