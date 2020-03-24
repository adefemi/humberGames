import React, { useContext } from "react";
import Input from "../input/Input";
import { Button } from "../button/Button";
import AppIcon from "../icons/Icon";
import FormGroup from "../formGroup/formGroup";
import { Select } from "../select/Select";
import { useState } from "react";
import { useEffect } from "react";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_BASIC, USER_PROFILE, USER_PROFILE_MAIN } from "../../utils/urls";
import _ from "lodash";
import moment from "moment";
import {
  getActiveAddress,
  getActivePosition,
  getToken
} from "../../utils/helper";
import { Spinner } from "../spinner/Spinner";
import { countryCode, genderOptions, secondaryColor } from "../../utils/data";
import "./profile.css";
import FileUploadNew from "../fileUploadNew/fileUploadNew";
import AddressController from "../addressController/addressController";
import SelectInput from "../selectInput/selectInput";
import { Notification } from "../notification/Notification";
import { store } from "../../stateManagement/store";

function BasicProfile(props) {
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [newProfile, setNewProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userProfileMain, setUserProfileMain] = useState({});
  const [loadingPic, setLoadingPic] = useState(false);
  const [mode, setMode] = useState(0); // 0 for view and 1 for Edit
  const {
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    if (userDetails.user || props.userId) {
      axiosHandler(
        "GET",
        `${USER_PROFILE}/${props.userId ? props.userId : userDetails.user.id}`,
        getToken()
      ).then(
        res => {
          setUserProfile(res.data.results);
          if (res.data.results.user_profile) {
            setUserProfileMain(res.data.results.user_profile);
          } else {
            setNewProfile(true);
          }

          setLoading(false);
        },
        err => {
          setLoading(false);
        }
      );
    }
  }, [userDetails, props.userId]);

  const getCurrentLocation = () => {
    getActivePosition((loc, status) => {
      if (status) {
        getActiveAddress(
          loc.lat,
          loc.lng,
          (res, sta) => {
            setUserProfileMain({
              ...userProfileMain,
              address_info: { ...userProfileMain.address_info, ...res }
            });
          },
          "single"
        );
      }
    });
  };

  const updateProfile = e => {
    e.preventDefault();
    const dataToSave = {
      gender: userProfileMain.gender,
      date_of_birth: userProfileMain.date_of_birth,
      phone_number: userProfileMain.phone_number,
      country_code: userProfileMain.country_code,
      address: userProfileMain.address_info.address,
      city: userProfileMain.address_info.city,
      state: userProfileMain.address_info.state,
      country: userProfileMain.address_info.country
    };

    if (userProfileMain.profile_picture) {
      dataToSave.profile_picture_id = userProfileMain.profile_picture.id;
    } else {
      Notification.bubble({
        type: "info",
        content: "You need to provide your profile picture."
      });
      return;
    }
    setSubmit(true);
    axiosHandler(
      newProfile ? "post" : "patch",
      `${USER_PROFILE_MAIN}${newProfile ? "" : "/" + userDetails.user.id}`,
      getToken(),
      dataToSave
    ).then(
      res => {
        setSubmit(false);
        Notification.bubble({
          type: "success",
          content: "Profile updated successfully"
        });
        setNewProfile(false);
        setMode(0);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, An error occurred"
        });
        setSubmit(false);
      }
    );
  };

  const onChangeAddress = e => {
    setUserProfileMain({
      ...userProfileMain,
      address_info: { ...userProfileMain.address_info, ...e }
    });
  };

  const onValueChange = e => {
    try {
      let data = {};
      e.map(item => {
        data[item.target.name] = item.target.value;
        return null;
      });
      setUserProfileMain({
        ...userProfileMain,
        ...data
      });
    } catch (v) {
      setUserProfileMain({
        ...userProfileMain,
        [e.target.name]: e.target.value
      });
    }
  };

  const fileChange = e => {
    if (!e[0]) return;
    setLoadingPic(true);
    if (e[0].completed) {
      setLoadingPic(false);
      setUserProfileMain({
        ...userProfileMain,
        profile_picture: {
          file: e[0].src,
          id: e[0].id
        }
      });
    }
  };

  return (
    <div className="BasicProfile">
      {loading ? (
        <Spinner size={15} color={secondaryColor} />
      ) : (
        <>
          {mode === 1 && (
            <div onClick={() => setMode(0)} className="pointer">
              <AppIcon name="chevronLeft" type="feather" />
            </div>
          )}
          <div className="top-section flex align-center justify-center column">
            <div className="image-wrapper">
              {mode === 1 && (
                <div className="edit-button">
                  <FileUploadNew
                    disabled={loadingPic}
                    multiple={false}
                    single={true}
                    onChange={fileChange}
                    token={getToken()}
                  >
                    {loadingPic ? (
                      <Spinner size={10} color={"#ffffff"} />
                    ) : (
                      <AppIcon name="edit2" type="feather" />
                    )}
                  </FileUploadNew>
                </div>
              )}

              <div
                className="image-circle"
                style={{
                  backgroundImage:
                    userProfileMain.profile_picture &&
                    `url(${userProfileMain.profile_picture.file})`
                }}
              />
            </div>
            <div className="profile-details">
              <h3>{`${userProfile.first_name} ${userProfile.last_name}`}</h3>
              <div className="location">
                {newProfile
                  ? "Not defined"
                  : `${userProfileMain.address_info.state} ${userProfileMain.address_info.country}`}
              </div>
            </div>
          </div>
          {mode === 1 && (
            <div className="form-wrapper">
              <form action="" onSubmit={updateProfile}>
                <div className="grid grid-2">
                  <FormGroup label="First Name" required>
                    <Input disabled value={userProfile.first_name} />
                  </FormGroup>
                  <FormGroup label="Last Name" val required>
                    <Input disabled value={userProfile.last_name} />
                  </FormGroup>
                </div>

                <div className="grid grid-2">
                  <FormGroup required label="Email Address">
                    <Input disabled value={userProfile.email} />
                  </FormGroup>
                  <FormGroup label="Phone Number" required>
                    <SelectInput
                      defaultOption={{
                        title: `+${userProfileMain.country_code || "234"}`,
                        value: userProfileMain.country_code || "234"
                      }}
                      selectPosition="left"
                      minWidth={90}
                      optionList={countryCode}
                      selectName="country_code"
                      onChange={onValueChange}
                      name="phone_number"
                      isCurrency={false}
                      required
                      type="number"
                      value={userProfileMain.phone_number || ""}
                    />
                  </FormGroup>
                </div>
                <div className="grid grid-2">
                  <FormGroup label="Date of Birth" required>
                    <Input
                      type="date"
                      onChange={onValueChange}
                      name={"date_of_birth"}
                      required
                      value={userProfileMain.date_of_birth}
                    />
                  </FormGroup>
                  <FormGroup label="Gender" required>
                    <Select
                      optionList={genderOptions}
                      defaultOption={
                        !newProfile && {
                          title: userProfileMain.gender
                            .toLowerCase()
                            .replace(/_/g, " "),
                          value: userProfileMain.gender
                        }
                      }
                      name="gender"
                      onChange={onValueChange}
                      placeholder="--choose your gender--"
                      required
                    />
                  </FormGroup>
                </div>

                <div className="flex align-center justify-between">
                  <h4>Location</h4>
                  <div className="link" onClick={getCurrentLocation}>
                    Use current location
                  </div>
                </div>
                <div className="address-con">
                  <AddressController
                    onChange={onChangeAddress}
                    disableAnim
                    disableGrid
                    addressData={userProfileMain.address_info}
                  />
                </div>
                <div className="submit-button flex justify-center">
                  <Button
                    type="submit"
                    color="success"
                    loading={submit}
                    disabled={submit}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}
          {mode === 0 &&
            (userProfileMain ? (
              <UserViewDetails
                data={userProfile}
                profile={userProfileMain}
                setMode={setMode}
                {...props}
              />
            ) : (
              <div className="flex align-center justify-center column newProfile">
                We couldn't find a profile associated with your account
                <br />
                <br />
                <Button onClick={() => setMode(1)}>Create Profile</Button>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

const UserViewDetails = props => {
  return (
    <div className="proview">
      <div className="profile-viewer">
        <div className="label">Full name</div>
        <div className="context">{`${props.data.first_name} ${props.data.last_name}`}</div>
      </div>
      <div className="profile-viewer">
        <div className="label">Email Address</div>
        <div className="context">{props.data.email}</div>
      </div>
      <div className="profile-viewer">
        <div className="label">Phone numbers</div>
        <div className="context">{`${props.profile.country_code || ""} - ${props
          .profile.phone_number || ""}`}</div>
      </div>
      <div className="profile-viewer">
        <div className="label">Date of Birth</div>
        <div className="context">
          {moment(
            props.profile.date_of_birth || new Date(),
            "YYYY-MM-DD"
          ).format("DD MMMM, YYYY")}
        </div>
      </div>
      <div className="profile-viewer">
        <div className="label">Gender</div>
        <div className="context">{props.profile.gender}</div>
      </div>

      <div className="profile-viewer">
        <div className="label">Location</div>
        <div className="context">
          {props.profile.address_info ? (
            `${props.profile.address_info.address}, 
            ${props.profile.address_info.city} 
            ${props.profile.address_info.state}, 
            ${props.profile.address_info.country}`
          ) : (
            <div className="info">Not defined</div>
          )}
        </div>
      </div>
      <br />
      {!props.preview && (
        <div className="submit-button flex justify-center">
          <Button onClick={() => props.setMode(1)} color="primary">
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default BasicProfile;
