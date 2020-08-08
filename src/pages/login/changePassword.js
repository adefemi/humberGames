import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import logo from "../../assets/images/logo.jpg";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import {
  errorHandler,
  genericChangeSingle,
  getClientId
} from "../../utils/helper";
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

    const clientID = getClientId();
    if (loginData.password !== loginData.cpassword) {
      Notification.bubble({
        type: "error",
        content: "Your passwords do not match"
      });
      return;
    }
    setLoading(true);
    delete loginData.cpassword;
    axiosHandler({
      method: "post",
      url: RESET_CODE_URL,
      data: loginData,
      clientID
    })
      .then(_ => {
        Notification.bubble({
          type: "success",
          content: "Your password has been reset successfully."
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
          <h3>Reset Password</h3>
          <small className="info">
            Enter your email along side the CODE sent to you, then specify your
            new password.
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

        <FormGroup label="Code">
          <Input
            placeholder={"Enter your code sent to your"}
            value={loginData.code || ""}
            required
            name="code"
            onChange={e => genericChangeSingle(e, setLoginData, loginData)}
          />
        </FormGroup>

        <FormGroup label="New Password">
          <Input
            placeholder={"Enter your new password"}
            value={loginData.password || ""}
            required
            type="password"
            name="password"
            onChange={e => genericChangeSingle(e, setLoginData, loginData)}
          />
        </FormGroup>

        <FormGroup label="Confirm Password">
          <Input
            placeholder={"Retype your password for confirmation"}
            value={loginData.cpassword || ""}
            required
            type="password"
            name="cpassword"
            onChange={e => genericChangeSingle(e, setLoginData, loginData)}
          />
        </FormGroup>
        <div className="flex align-center justify-end">
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
