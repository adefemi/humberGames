import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import logo from "../../assets/images/logo.jpg";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { errorHandler, genericChangeSingle } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { USERTOKEN } from "../../utils/data";
import { axiosHandler } from "../../utils/axiosHandler";
import { RESET_CODE_URL } from "../../utils/urls";
import { store } from "../../stateManagement/store";
import { Link } from "react-router-dom";

function Login(props) {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    state: { activeClient }
  } = useContext(store);

  useEffect(() => {
    if (localStorage.getItem(USERTOKEN)) {
      props.history.push("/");
    } else if (!activeClient) {
      props.history.push("/client/info");
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const clientID = activeClient.clientId;
    axiosHandler({
      method: "get",
      url: RESET_CODE_URL + `?email=${loginData.email}`,
      clientID
    })
      .then(_ => {
        Notification.bubble({
          type: "success",
          content: "Password reset code has been sent to your email"
        });
        props.history.push("/login");
      })
      .catch(err => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err)
        });
        setLoading(false);
      });
  };

  return (
    <div className="login">
      <form action="" onSubmit={onSubmit}>
        <center>
          {" "}
          <img src={logo} alt="" />
          <h3>Forgot Password</h3>
          <small className="info">
            Retrieve your password by specifying the email you registered with.
          </small>
          <br />
          <br />
        </center>

        <FormGroup label="Email">
          <Input
            placeholder={"Enter your email"}
            value={loginData.email || ""}
            required
            name="email"
            onChange={e => genericChangeSingle(e, setLoginData, loginData)}
          />
        </FormGroup>
        <div className="flex align-center justify-between">
          <Link to="/reset-password">
            <div className="link">Reset Password</div>
          </Link>
          <Link to="/login">
            <div className="link">Back to Login</div>
          </Link>
        </div>
        <br />
        <Button loading={loading} disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
