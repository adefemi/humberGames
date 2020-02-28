import React from "react";
import Input from "../input/Input";
import { Button } from "../button/Button";
import AppIcon from "../icons/Icon";
import FormGroup from "../formGroup/formGroup";
import Select from "../select/Select";
import { useState } from "react";
import { useEffect } from "react";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_PROFILE } from "../../utils/urls";
import _ from "lodash";
import moment from "moment";
import { getFullPhone } from "../../utils/helper";
function BasicProfile() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosHandler(
      "GET",
      `${USER_PROFILE}/14`,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyOTY1Mzc5LCJqdGkiOiJmMmNhNGYwZmQwZDk0ZTYzODg4NjIxYmM0ZDgwNmQ4ZCIsInVzZXJfaWQiOjE1fQ.fRmTknnEfzVi_QQL3YepIhX4HtcI0kgA-9mDkRqcRdI"
    ).then(res => {
      setLoading(false);
      setUserProfile(res.data.results);
    });
  }, []);

  return (
    <div className="BasicProfile">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="top-section flex">
            <div className="image-wrapper">
              <div className="edit-button">
                <AppIcon name="edit2" type="feather" />
              </div>
              <div
                className="image-circle"
                style={{
                  backgroundImage: `url(${_.get(
                    userProfile,
                    "user_profile.profile_picture.file"
                  )})`
                }}
              ></div>
            </div>
            <div className="profile-details">
              <h3>Janet Doe</h3>
              <div className="location">Lagos, Nigeria</div>
            </div>
          </div>
          <div className="form-wrapper">
            <form action="">
              <div className="grid grid-2">
                <FormGroup label="First Name" required>
                  <Input value={userProfile.first_name} />
                </FormGroup>
                <FormGroup label="Last Name" val required>
                  <Input value={userProfile.last_name} />
                </FormGroup>
              </div>
              <div className="grid grid-2">
                <FormGroup label="Phone Number" required>
                  <Input
                    value={`${getFullPhone(
                      _.get(userProfile, "user_profile.country_code"),
                      _.get(userProfile, "user_profile.phone_number")
                    )}`}
                  />
                </FormGroup>
                <FormGroup label="Other Phone" required>
                  <Input />
                </FormGroup>
              </div>
              <div className="grid grid-2">
                <FormGroup label="Date of Birth" required>
                  <Input
                    value={moment(
                      _.get(userProfile, "user_profile.date_of_birth"),
                      "YYYY-MM-DD"
                    ).format("DD MMMM, YYYY")}
                  />
                </FormGroup>
                <FormGroup label="Gender" required>
                  <Input />
                </FormGroup>
              </div>
              <div className="form-row">
                <FormGroup required label="Email Address">
                  <Input value={userProfile.email} />
                </FormGroup>
              </div>
              <div className="submit-button flex justify-center">
                <Button color="success">Save Changes</Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default BasicProfile;
