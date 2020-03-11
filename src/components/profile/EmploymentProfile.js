import React, { useState, useEffect, useContext } from "react";
import Input from "../input/Input";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import AppIcon from "../icons/Icon";
import FormGroup from "../formGroup/formGroup";
import { USER_EMPLOYMENT } from "../../utils/urls";
import { axiosHandler } from "../../utils/axiosHandler";
import EmploymentForm from "./EmploymentForm";
import { Spinner } from "../spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { getToken } from "../../utils/helper";
import { store } from "../../stateManagement/store";
import { Notification } from "../notification/Notification";

function EmploymentProfile() {
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [employmentProfile, setEmploymentProfile] = useState([]);
  const {
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    if (userDetails.user) {
      axiosHandler(
        "GET",
        `${USER_EMPLOYMENT}?user_id=${userDetails.user.id}`,
        getToken()
      ).then(res => {
        setEmploymentProfile(res.data.results.results);
        setLoading(false);
      });
    }
  }, [userDetails]);

  const onChange = (ind, e) => {
    let activeEmployement = employmentProfile.map((item, id) => {
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
    setEmploymentProfile(activeEmployement);
  };

  const onRemove = id => {
    setEmploymentProfile(employmentProfile.filter((_, ind) => ind !== id));
  };

  const renderEmployment = () => {
    if (loading) {
      return <Spinner size={15} color={secondaryColor} />;
    } else {
      if (employmentProfile.length === 0) {
        return (
          <div className="no-profile-data">
            <h3>You've not provided any employment information.</h3>
            <p>Use the button below to add employment data</p>
          </div>
        );
      } else {
        return employmentProfile.map((ep, id) => (
          <EmploymentForm
            key={id}
            data={ep}
            id={id}
            onRemove={e => onRemove(id)}
            onChange={e => onChange(id, e)}
          />
        ));
      }
    }
  };

  const addMore = () => {
    setEmploymentProfile([...employmentProfile, {}]);
  };

  const Submit = e => {
    e.preventDefault();
    setSubmit(true);
    axiosHandler("post", USER_EMPLOYMENT, getToken(), employmentProfile).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Employment information saved successfully"
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

  return (
    <div className="EmploymentProfile">
      <div className="form-wrapper">
        <form onSubmit={Submit}>
          <div>{renderEmployment()}</div>

          {!loading && (
            <>
              <div
                className={`flex align-center ${
                  employmentProfile.length < 1
                    ? "justify-center"
                    : "justify-between"
                }`}
              >
                <div className="add-button">
                  <Button color="default" onClick={addMore}>
                    Add{" "}
                    {employmentProfile.length > 0 ? "More" : "Employment Info"}
                  </Button>
                </div>
                {employmentProfile.length > 0 && (
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

export default EmploymentProfile;
