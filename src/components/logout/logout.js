import React, { useContext, useEffect } from "react";
import { store } from "../../stateManagement/store";
import { setGlobalLoader } from "../../stateManagement/actions";
import { axiosHandler } from "../../utils/axiosHandler";
import { LOGOUT } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { loginUrl } from "../../utils/data";

function Logout(props) {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({
      type: setGlobalLoader,
      payload: {
        content: "Logging out...",
        status: true
      }
    });
    logoutMain();
  }, []);

  const logoutMain = () => {
    axiosHandler("post", LOGOUT, getToken()).then(res => {
      localStorage.clear();
      window.location.href = loginUrl + "?redirect=/&notactive=true";
    });
  };

  return <div>Logout</div>;
}

export default Logout;
