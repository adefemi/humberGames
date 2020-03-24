import React, { useContext, useEffect, useState } from "react";
import "./profileNav.css";
import { store } from "../../stateManagement/store";

function ProfileNav(props) {
  const [user, setUser] = useState(null);
  const {
    state: { userDetails }
  } = useContext(store);
  useEffect(() => {
    if (userDetails.user) {
      setUser(userDetails.user);
    }
  }, [userDetails]);
  return (
    <>
      {user && (
        <div className="flex align-center">
          <div
            className="profile-img"
            style={{
              backgroundImage: `url("${user.user_profile &&
                user.user_profile.profile_picture &&
                user.user_profile.profile_picture.file}")`
            }}
          />
          <div className="username">{user.first_name}</div>
        </div>
      )}
    </>
  );
}

export default ProfileNav;
