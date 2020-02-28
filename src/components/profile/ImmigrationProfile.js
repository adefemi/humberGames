import React from "react";
import FormGroup from "../formGroup/formGroup";
import Input from "../input/Input";
import { Button } from "../button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { USER_IMMIGRATION } from "../../utils/urls";
import { axiosHandler } from "../../utils/axiosHandler";
import ImmigrationForm from "./ImmigrationForm";

function ImmigrationProfile() {
  const [loading, setLoading] = useState(true);
  const [immigrationProfile, setImmigrationProfile] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosHandler(
      "GET",
      `${USER_IMMIGRATION}?user_id=14`,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyOTY1Mzc5LCJqdGkiOiJmMmNhNGYwZmQwZDk0ZTYzODg4NjIxYmM0ZDgwNmQ4ZCIsInVzZXJfaWQiOjE1fQ.fRmTknnEfzVi_QQL3YepIhX4HtcI0kgA-9mDkRqcRdI"
    ).then(res => {
      console.log(res);
      setImmigrationProfile(res.data.results.results);
      setLoading(false);
    });
  }, []);

  const renderImmigration = () => {
    if (loading) {
      return <h1>Loading profile</h1>;
    } else {
      if (immigrationProfile.length === 0) {
        return <h1>No profile data</h1>;
      } else {
        return (
          <>
            {immigrationProfile.map(immigrationData => (
              <ImmigrationForm
                key={immigrationData.id}
                data={immigrationData}
              />
            ))}
            <div className="add-button flex justify-center">
              <Button color="success">Add More</Button>
            </div>
            <div className="submit-button flex justify-end">
              <Button color="success">Save Changes</Button>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="ImmigrationProfile">
      <div className="form-wrapper">
        <form action="">{renderImmigration()}</form>
      </div>
    </div>
  );
}

export default ImmigrationProfile;
