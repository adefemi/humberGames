import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import logo from "../../assets/images/logo.jpg";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { store } from "../../stateManagement/store";
import { secondaryColor, tempClientList } from "../../utils/data";
import { setActiveClient } from "../../stateManagement/actions";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler } from "../../utils/axiosHandler";
import { CLIENT_FETCH_URL } from "../../utils/urls";
import { errorHandler } from "../../utils/helper";
import { Spinner } from "../../components/spinner/Spinner";

function ClientDefinition(props) {
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [fetching, setfetching] = useState(true);
  const { dispatch } = useContext(store);

  useEffect(() => {
    if (props.match.params.name && props.match.params.name !== "info") {
      checkIfClientExist(props.match.params.name);
    }
    fetchClients();
    localStorage.clear();
  }, []);

  const fetchClients = () => {
    axiosHandler({
      method: "get",
      url: CLIENT_FETCH_URL,
      clientID: "default"
    }).then(
      res => {
        setClients(res.data.data);
        setfetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          err: errorHandler(err)
        });
      }
    );
  };

  const checkIfClientExist = clientNameMain => {
    let checker = clients.filter(
      item =>
        item.name.trim().toLowerCase() === clientNameMain.toLowerCase().trim()
    );
    if (checker.length > 0) {
      dispatch({ type: setActiveClient, payload: checker[0] });
      props.history.push("/login");
    } else {
      Notification.bubble({
        type: "error",
        content: "We can't find entry for client"
      });
      setLoading(false);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      checkIfClientExist(clientName);
    }, 1000);
  };

  return (
    <div className="login">
      <form action="" onSubmit={onSubmit}>
        <center>
          {" "}
          <img src={logo} alt="" />
          <h3>Client Info</h3>
        </center>

        {fetching ? (
          <center>
            <br />
            <Spinner color={secondaryColor} />
          </center>
        ) : (
          <>
            <FormGroup label="Client Name">
              <Input
                placeholder={"Enter your client name"}
                value={clientName || ""}
                required
                onChange={e => setClientName(e.target.value)}
              />
            </FormGroup>
            <br />
            <Button loading={loading} disabled={loading} type="submit">
              Proceed to Login
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

export default ClientDefinition;
