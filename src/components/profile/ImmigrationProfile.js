import React, { useContext } from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Button } from "../button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { USER_EMPLOYMENT, USER_IMMIGRATION } from "../../utils/urls";
import { axiosHandler } from "../../utils/axiosHandler";
import ImmigrationForm from "./ImmigrationForm";
import { Spinner } from "../spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { getToken } from "../../utils/helper";
import { store } from "../../stateManagement/store";
import EmploymentForm from "./EmploymentForm";
import { Notification } from "../notification/Notification";

function ImmigrationProfile(props) {
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [immigrationProfile, setImmigrationProfile] = useState([]);
  const {
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    if (userDetails.user || props.userId) {
      axiosHandler(
        "GET",
        `${USER_IMMIGRATION}?user_id=${
          props.userId ? props.userId : userDetails.user.id
        }`,
        getToken()
      ).then(res => {
        setImmigrationProfile(res.data.results.results);
        setLoading(false);
      });
    }
  }, [userDetails, props.userId]);

  const onChange = (ind, e) => {
    let activeImmigration = immigrationProfile.map((item, id) => {
      let activeItem = item;
      if (id === ind) {
        try {
          let data = {};
          e.map(item => {
            data[item.target.name] = item.target.value;
            return null;
          });
          activeItem = {
            ...activeItem,
            ...data
          };
        } catch (v) {
          activeItem = {
            ...activeItem,
            [e.target.name]: e.target.value
          };
        }
      }
      return activeItem;
    });
    setImmigrationProfile(activeImmigration);
  };

  const onRemove = id => {
    setImmigrationProfile(immigrationProfile.filter((_, ind) => ind !== id));
  };

  const addMore = () => {
    setImmigrationProfile([...immigrationProfile, {}]);
  };

  const Submit = e => {
    e.preventDefault();
    setSubmit(true);
    axiosHandler("post", USER_IMMIGRATION, getToken(), immigrationProfile).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Immigration information saved successfully"
        });
        setSubmit(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops, an error occurred"
        });
        setSubmit(false);
      }
    );
  };

  const renderImmigration = () => {
    if (loading) {
      return <Spinner size={15} color={secondaryColor} />;
    } else {
      if (immigrationProfile.length === 0) {
        return (
          <div className="no-profile-data">
            <h3>You've not provided any immigration information.</h3>
            {!props.preview && (
              <p>Use the button below to add immigration data</p>
            )}
          </div>
        );
      } else {
        return (
          <>
            {immigrationProfile.map((immigrationData, id) => (
              <ImmigrationForm
                key={id}
                data={immigrationData}
                id={id}
                preview={props.preview}
                onRemove={e => onRemove(id)}
                onChange={e => onChange(id, e)}
              />
            ))}
          </>
        );
      }
    }
  };

  return (
    <div className="ImmigrationProfile">
      <div className="form-wrapper">
        <form onSubmit={Submit}>
          <div>{renderImmigration()}</div>
          {!loading && !props.preview && (
            <>
              <div
                className={`flex align-center ${
                  immigrationProfile.length < 1
                    ? "justify-center"
                    : "justify-between"
                }`}
              >
                <div className="add-button">
                  <Button color="default" onClick={addMore}>
                    Add{" "}
                    {immigrationProfile.length > 0
                      ? "More"
                      : "Immigration Info"}
                  </Button>
                </div>
                {immigrationProfile.length > 0 && (
                  <div className="submit-button">
                    <Button
                      type="submit"
                      color="success"
                      loading={submit}
                      disabled={submit}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
              <br />
              <br />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ImmigrationProfile;
