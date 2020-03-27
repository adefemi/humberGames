import React, { useContext, useEffect, useState } from "react";
import { DropDown } from "../dropdown/Dropdown";
import { store } from "../../stateManagement/store";
import { Spinner } from "../spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { setGlobalLoader, setUserDetails } from "../../stateManagement/actions";
import { axiosHandler } from "../../utils/axiosHandler";
import { SWITCH_ROLE, USER_ME } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../notification/Notification";

function Settings(props) {
  return (
    <div className="settings-main">
      <div className="heading">Settings</div>
      <div className="settings-con">
        <div className="settings-viewer">
          <div className="label">Active Role</div>
          <RoleSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Settings;

export const RoleSwitcher = props => {
  const [activeRole, setActiveRole] = useState("");
  const [fetching, setFetching] = useState(true);
  const [rolesData, setRoles] = useState([]);
  const {
    state: { roles, userDetails },
    dispatch
  } = useContext(store);
  useEffect(() => {
    if (userDetails.role) {
      setActiveRole(userDetails.role.name);
      setFetching(false);
    }
    if (roles.length > 0) {
      setRoles(formattedRoles(roles));
    }
  }, [roles, userDetails]);

  const formattedRoles = rols => {
    const newArray = [];
    rols.map(item => {
      newArray.push({
        value: item.name,
        content: item.name
      });
      return null;
    });
    return newArray;
  };

  const onChangeRole = e => {
    dispatch({
      type: setGlobalLoader,
      payload: { status: true, content: "Switching user role..." }
    });
    const choosenRole = roles.filter(item => item.name === e.value)[0];
    axiosHandler("post", SWITCH_ROLE + `/${choosenRole.id}`, getToken()).then(
      res => {
        axiosHandler("get", USER_ME, getToken()).then(rep => {
          dispatch({ type: setUserDetails, payload: rep.data });
          dispatch({
            type: setGlobalLoader,
            payload: { status: false, content: "" }
          });
          Notification.bubble({
            content: "Role updated successfully",
            type: "success"
          });
        });
      }
    );
  };

  if (fetching) {
    return <Spinner size={15} color={secondaryColor} />;
  }
  return (
    <div className="context">
      {!props.hideTitle && activeRole}
      <DropDown
        children={<small>{props.hideTitle ? activeRole : "Switch"}</small>}
        static
        onChange={onChangeRole}
        options={rolesData}
      />
    </div>
  );
};
