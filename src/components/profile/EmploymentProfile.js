import React, { useState, useEffect } from "react";
import Input from "../input/Input";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import AppIcon from "../icons/Icon";
import FormGroup from "../formGroup/formGroup";
import { USER_EMPLOYMENT } from "../../utils/urls";
import { axiosHandler } from "../../utils/axiosHandler";
import EmploymentForm from "./EmploymentForm";

function EmploymentProfile() {
  const [loading, setLoading] = useState(true);
  const [employmentProfile, setEmploymentProfile] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosHandler(
      "GET",
      `${USER_EMPLOYMENT}?user_id=14`,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyOTY1Mzc5LCJqdGkiOiJmMmNhNGYwZmQwZDk0ZTYzODg4NjIxYmM0ZDgwNmQ4ZCIsInVzZXJfaWQiOjE1fQ.fRmTknnEfzVi_QQL3YepIhX4HtcI0kgA-9mDkRqcRdI"
    ).then(res => {
      setEmploymentProfile(res.data.results.results);
      setLoading(false);
    });
  }, []);

  const renderEmployment = () => {
    if (loading) {
      return <h1>Loading..</h1>;
    } else {
      if (employmentProfile.length === 0) {
        return <h1>No employment profile</h1>;
      } else {
        return employmentProfile.map(ep => (
          <EmploymentForm key={ep.id} data={ep} />
        ));
      }
    }
  };
  return (
    <div className="EmploymentProfile">
      <div className="form-wrapper">
        <form action="">
          {renderEmployment()}

          <div className="add-button flex justify-center">
            <Button color="success">Add More</Button>
          </div>
          <div className="submit-button flex justify-end">
            <Button color="success">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmploymentProfile;
