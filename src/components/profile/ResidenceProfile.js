import React, { useEffect, useState } from "react";
import FormGroup from "../formGroup/formGroup";
import { Button } from "../button/Button";
import Input from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";
import { axiosHandler } from "../../utils/axiosHandler";
import { USER_RESIDENCE } from "../../utils/urls";
function ResidenceProfile() {
  const [loading, setLoading] = useState(true);
  const [residenceProfile, setResidenceProfile] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosHandler(
      "GET",
      `${USER_RESIDENCE}?user_id=14`,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyOTY1Mzc5LCJqdGkiOiJmMmNhNGYwZmQwZDk0ZTYzODg4NjIxYmM0ZDgwNmQ4ZCIsInVzZXJfaWQiOjE1fQ.fRmTknnEfzVi_QQL3YepIhX4HtcI0kgA-9mDkRqcRdI"
    ).then(res => {
      setResidenceProfile(res.data.results.results);
      setLoading(false);
    });
  }, []);
  return (
    <div className="ResidenceProfile">
      <div className="form-wrapper">
        <form action="">
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

export default ResidenceProfile;
