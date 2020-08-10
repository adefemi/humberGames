import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import {
  setPageTitleAction,
  setGlobalLoader,
} from "../../stateManagement/actions";
import "./simulator.css";
import { Card } from "../../components/card/Card";
import qs from "querystring";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
} from "../../utils/helper";
import {
  SIMULATION_URL,
  GAME_INSTANCE_URL,
  GAME_BUNDLE_URL,
} from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { Button } from "../../components/button/Button";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import { cleanParameters } from "../campaign/campaign";
import ContentModal from "../../components/contentModal/contentModal";
import { loadA } from "react-icons-kit/ionicons";

function Simulations(props) {
  const { dispatch } = useContext(store);
  const [simulations, setSimulations] = useState({});
  const [simulationCounts, setSimulationCounts] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [gameInstances, setGameInstance] = useState([]);
  const [gameBundles, setGameBundle] = useState([]);
  const [simulationModal, setSimulationModal] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [rule, setRule] = useState(false);
  const [ruleId, setRuleId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [simulationPayload, setSimulationPayload] = useState({});
  const [rulePayload, setRulePayload] = useState({});
  const [search, setSearch] = useState(null);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Simulations" });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage}`;
    extra += `&${qs.stringify(
      cleanParameters({ ...queryParams, keyword: search })
    )}`;
    getSimulations(extra);
    getInstance();
    getBundle();
  }, [search, queryParams, currentPage]);

  const getSimulations = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: SIMULATION_URL + "/simulations",
    }).then(
      (res) => {
        setSimulations(res.data._embedded);
        setSimulationCounts(res.data._embedded.simulators.length);
        reloadRule();
        setFetching(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const getInstance = () => {
    if (!fetching) {
      setFetching(true);
    }

    axiosHandler({
      method: "get",
      url: GAME_INSTANCE_URL,
      clientID: getClientId(),
      token: getToken(),
    }).then((res) => {
      setGameInstance(res.data._embedded.gameInstances);
      setFetching(false);
    });
  };

  const getBundle = () => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      url: GAME_BUNDLE_URL,
      token: getToken(),
      clientID: getClientId(),
    }).then((res) => {
      setGameBundle(res.data._embedded.gameBundles);
      setFetching(false);
    });
  };

  const headings = ["GameId", "Label", "Game type", "Status", "Rules", ""];
  const rulesHeading = [
    "id",
    "Game digit",
    "Game input",
    "Random",
    "Total game plays",
  ];

  const formatSimulations = () => {
    if (!simulations.simulators) return [];
    const result = [];
    simulations.simulators.map((item) => {
      result.push([
        <span>{item.gameId ? item.gameId : "N/A"}</span>,
        <span>{item.label ? item.label : "N/A"}</span>,
        <span>{item.gameType ? item.gameType : "N/A"}</span>,
        <span>{item.status}</span>,
        <span className="link" onClick={() => initRule(item.id)}>
          View rules
        </span>,
        <div>
          {item.rules.length ? (
            <span className="link" onClick={() => runSimulation(item.id)}>
              Run simulation
            </span>
          ) : (
            <span className="link fade">Run simulation</span>
          )}
        </div>,
      ]);
      return null;
    });
    return result;
  };
  const formatRules = () => {
    if (!rules) return [];
    const result = [];
    rules.map((item) => {
      result.push([
        <span>
          {item.id.substring(0, 10)}
          {item.id.length > 10 && "..."}
        </span>,
        <span>{item.gameDigit}</span>,
        <span>{item.gameInput}</span>,
        <span>{item.isRandom ? "True" : "False"}</span>,
        <span>{item.totalGamePlays}</span>,
      ]);

      return null;
    });
    return result;
  };

  const toggleSimulation = () => {
    simulationModal ? setSimulationModal(false) : setSimulationModal(true);
  };

  const toggleRule = (id) => {
    ruleModal ? setRuleModal(false) : setRuleModal(true);
  };

  const toggleNewRule = (id) => {
    rule ? setRule(false) : setRule(true);
  };

  const initRule = (id) => {
    let rules = simulations.simulators.filter((item) => item.id === id);
    rules = rules.length ? rules[0].rules : [];
    setRuleId(id);
    setRules(rules);
    toggleRule();
  };

  const reloadRule = () => {
    let id = ruleId;
    if (id) {
      let rules = simulations.simulators.filter((item) => item.id === id);
      rules = rules.length ? rules[0].rules : [];
      setRules(rules);
    }
  };

  const onChangeSimulation = (e) => {
    setSimulationPayload({
      ...simulationPayload,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeRule = (e) => {
    setRulePayload({
      ...rulePayload,
      [e.target.name]: e.target.value,
    });
  };

  const saveSimulation = (e) => {
    e.preventDefault();
    console.log(simulationPayload);
    if (!simulationPayload.gameType) {
      setError("Please choose simulation type! ");
    } else {
      setError("");
      dispatch({
        type: setGlobalLoader,
        payload: {
          status: true,
          content: "Processing Request, this may take a while, Please wait...",
        },
      });

      axiosHandler({
        method: "post",
        clientID: getClientId(),
        token: getToken(),
        url: SIMULATION_URL + "/simulations",
        data: simulationPayload,
      }).then(
        (res) => {
          if (res.data.id) {
            Notification.bubble({
              type: "success",
              content: "Simulation created successfully!",
            });
            dispatch({
              type: setGlobalLoader,
              payload: {
                status: false,
                content: "",
              },
            });
            setSimulationPayload({});
            getSimulations();
            toggleSimulation();
            return;
          }
        },
        (err) => {
          Notification.bubble({
            type: "error",
            content: errorHandler(err),
          });
          dispatch({
            type: setGlobalLoader,
            payload: {
              status: false,
              content: "",
            },
          });
        }
      );
    }
  };

  const saveRule = () => {
    let values = rulePayload;
    values.simulator = SIMULATION_URL + "/simulations/" + ruleId;
    setRulePayload(values);

    if (!rulePayload.gameDigit) {
      setError2("Please add game digit! ");
    } else if (!rulePayload.gameInput) {
      setError2("Please add game input! ");
    } else if (!rulePayload.totalGamePlays) {
      setError2("Please add total game plays! ");
    } else if (!rulePayload.userId) {
      setError2("Please add user ID! ");
    } else if (!rulePayload.isRandom) {
      setError2("Is it a random game? ");
    } else {
      setError2("");
      dispatch({
        type: setGlobalLoader,
        payload: {
          status: true,
          content: "Processing Request, this may take a while, Please wait...",
        },
      });

      axiosHandler({
        method: "post",
        clientID: getClientId(),
        token: getToken(),
        url: SIMULATION_URL + "/rule",
        data: rulePayload,
      }).then(
        (res) => {
          if (res.data.id) {
            Notification.bubble({
              type: "success",
              content: "Rules created successfully!",
            });
            dispatch({
              type: setGlobalLoader,
              payload: {
                status: false,
                content: "",
              },
            });
            setRulePayload({});
            getSimulations();
            toggleNewRule();
            return;
          }
        },
        (err) => {
          Notification.bubble({
            type: "error",
            content: errorHandler(err),
          });
          dispatch({
            type: setGlobalLoader,
            payload: {
              status: false,
              content: "",
            },
          });
        }
      );
    }
  };

  const runSimulation = (id) => {
    dispatch({
      type: setGlobalLoader,
      payload: {
        status: true,
        content: "Processing Request, this may take a while, Please wait...",
      },
    });

    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: SIMULATION_URL + "/simulations/execute/" + id,
    }).then((res) => {
      if (res) {
        dispatch({
          type: setGlobalLoader,
          payload: {
            status: false,
            content: "",
          },
        });
        setFetching(false);
        Notification.bubble({
          type: "success",
          content: "Simulation started successfully!",
        });
      }
    });
  };

  return (
    <div className="dashboard">
      <ContentModal visible={simulationModal} setVisible={toggleSimulation}>
        <div>
          <h3>New Simulation</h3>
          <p style={{ color: "#cb0000" }}>{error}</p>
          <form onSubmit={saveSimulation}>
            <p>
              <input
                type="radio"
                name="gameType"
                value="GAME_INSTANCE"
                onChange={onChangeSimulation}
              />{" "}
              Game instance &nbsp;&nbsp; &nbsp;
              <input
                type="radio"
                name="gameType"
                value="BUNDLE"
                onChange={onChangeSimulation}
              />{" "}
              Game Bundle
            </p>

            {simulationPayload.gameType === "GAME_INSTANCE" ? (
              <Select
                onChange={onChangeSimulation}
                name={"gameId"}
                placeholder="Select game instance"
                optionList={gameInstances.map((item) => ({
                  title: item.label,
                  value: item.id,
                }))}
              />
            ) : simulationPayload.gameType === "BUNDLE" ? (
              <Select
                onChange={onChangeSimulation}
                name={"gameId"}
                placeholder="Select game bundle"
                optionList={gameBundles.map((item) => ({
                  title: item.label,
                  value: item.id,
                }))}
              />
            ) : (
              ""
            )}
            <br />
            <Input
              onChange={onChangeSimulation}
              placeholder="Simulation label"
              type="text"
              name="label"
              value={simulationPayload.label ? simulationPayload.label : ""}
            />
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </ContentModal>
      <ContentModal visible={ruleModal} setVisible={toggleRule}>
        <div>
          <div className="flex align-center props">
            <h2>Rules</h2>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="custom-button" onClick={() => toggleNewRule()}>
              + New rule
            </button>
          </div>

          <TransactionTable
            keys={rulesHeading}
            loading={fetching}
            values={formatRules()}
          />
          <form style={{ display: rule ? "block" : "none" }}>
            <hr />
            <span
              className="close-2"
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => toggleNewRule()}
            >
              <AppIcon name="x" type="feather" /> Cancel
            </span>
            <h3>New Rule</h3>

            <div className="flex align-center justify-between">
              <div className="flex align-center props">
                <Input
                  type="number"
                  name="gameDigit"
                  placeholder="Game digit"
                  onChange={onChangeRule}
                  value={rulePayload.gameDigit ? rulePayload.gameDigit : ""}
                  style={{ width: 250 }}
                />
              </div>
              <div className="flex align-center props">
                <Input
                  type="text"
                  name="gameInput"
                  placeholder="Game input"
                  onChange={onChangeRule}
                  value={rulePayload.gameInput ? rulePayload.gameInput : ""}
                  style={{ width: 250 }}
                />
              </div>
            </div>
            <br />
            <div className="flex align-center justify-between">
              <div className="flex align-center props">
                <Input
                  type="number"
                  name="totalGamePlays"
                  placeholder="Total game play"
                  style={{ width: 250 }}
                  value={
                    rulePayload.totalGamePlays ? rulePayload.totalGamePlays : ""
                  }
                  onChange={onChangeRule}
                />
              </div>
              <div className="flex align-center props">
                <Input
                  type="text"
                  name="userId"
                  placeholder="User ID"
                  style={{ width: 250 }}
                  value={rulePayload.userId ? rulePayload.userId : ""}
                  onChange={onChangeRule}
                />
              </div>
            </div>

            <p>
              Random game &nbsp;&nbsp;{" "}
              <input
                type="radio"
                name="isRandom"
                onChange={onChangeRule}
                value={true}
              />{" "}
              True &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="isRandom"
                onChange={onChangeRule}
                value={false}
              />{" "}
              False
            </p>
            <hr />
            <p style={{ color: "#cb0000" }}>{error2}</p>
            <Button onClick={() => saveRule()}>Submit</Button>
          </form>
        </div>
      </ContentModal>
      <div className="flex align-center justify-between">
        <div className="flex align-center props">
          <Button onClick={() => setSimulationModal(true)}>Add New</Button>
        </div>
      </div>
      <br />
      <br />
      <span>
        {simulationCounts} {simulationCounts > 1 ? "Simulations" : "Simulation"}
      </span>
      <TransactionTable
        keys={headings}
        loading={fetching}
        values={formatSimulations()}
      />
      <br />
      {!fetching && (
        <Pagination
          counter={simulations.limit}
          total={simulations.total}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
    </div>
  );
}

export default Simulations;
