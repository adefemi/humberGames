import React, { useContext, useEffect, useState } from "react";
import { Button } from "../button/Button";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_RESIDENCE } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { store } from "../../stateManagement/store";
import { Spinner } from "../spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { Notification } from "../notification/Notification";
import ResidenceForm from "./ResidenceForm";
function ResidenceProfile() {
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [residenceProfile, setResidenceProfile] = useState([]);

  const {
    state: { userDetails }
  } = useContext(store);

  useEffect(() => {
    if (userDetails.user) {
      axiosHandler(
        "GET",
        `${USER_RESIDENCE}?user_id=${userDetails.user.id}`,
        getToken()
      ).then(res => {
        setResidenceProfile(res.data.results.results);
        setLoading(false);
      });
    }
  }, [userDetails]);

  const onChange = (ind, e) => {
    let activeResident = residenceProfile.map((item, id) => {
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
    setResidenceProfile(activeResident);
  };

  const onRemove = id => {
    setResidenceProfile(residenceProfile.filter((_, ind) => ind !== id));
  };

  const renderResident = () => {
    if (loading) {
      return <Spinner size={15} color={secondaryColor} />;
    } else {
      if (residenceProfile.length === 0) {
        return (
          <div className="no-profile-data">
            <h3>You've not provided any resident information.</h3>
            <p>Use the button below to add resident data</p>
          </div>
        );
      } else {
        return residenceProfile.map((ep, id) => (
          <ResidenceForm
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
    setResidenceProfile([...residenceProfile, {}]);
  };

  const Submit = e => {
    e.preventDefault();
    setSubmit(true);
    axiosHandler("post", USER_RESIDENCE, getToken(), residenceProfile).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Resident information saved successfully"
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
    <div className="ResidenceProfile">
      <div className="form-wrapper">
        <form onSubmit={Submit}>
          <div>{renderResident()}</div>

          {!loading && (
            <>
              <div
                className={`flex align-center ${
                  residenceProfile.length < 1
                    ? "justify-center"
                    : "justify-between"
                }`}
              >
                <div className="add-button">
                  <Button color="default" onClick={addMore}>
                    Add {residenceProfile.length > 0 ? "More" : "Resident Info"}
                  </Button>
                </div>
                {residenceProfile.length > 0 && (
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

export default ResidenceProfile;
