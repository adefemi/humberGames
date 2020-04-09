import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "../../assets/images/logo.jpg";
import FormGroup from "../../components/formGroup/formGroup";
import Input from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { genericChangeSingle } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";
import { USERTOKEN } from "../../utils/data";

const validCredential = {
  email: "test@test.com",
  password: "test"
};

function Login(props) {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(USERTOKEN)) {
      props.history.push("/");
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (
        loginData.email === validCredential.email &&
        loginData.password === validCredential.password
      ) {
        login();
      } else {
        Notification.bubble({
          type: "error",
          content: "Invalid email or password"
        });
        setLoading(false);
      }
    }, 1000);
  };

  const login = () => {
    localStorage.setItem(USERTOKEN, "login");
    props.history.push("/");
  };

  return (
    <div className="login">
      <form action="" onSubmit={onSubmit}>
        <center>
          {" "}
          <img src={logo} alt="" />
          <h3>Sign In</h3>
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
        <FormGroup label="Password">
          <Input
            placeholder={"Enter your password"}
            value={loginData.password || ""}
            required
            name="password"
            type="password"
            onChange={e => genericChangeSingle(e, setLoginData, loginData)}
          />
        </FormGroup>
        <br />
        <Button loading={loading} disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
