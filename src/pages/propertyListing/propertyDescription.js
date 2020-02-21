import React from "react";
import AppIcon from "../../components/icons/Icon";
import Input from "../../components/input/Input";
import FormGroup from "../../components/formGroup/formGroup";
import Ckeditor from "../../components/ckeditor/ckeditor";
import infoIcon from "../../assets/images/cloud-info.svg";
import { Select } from "../../components/select/Select";
import FileDragger from "../../components/fileDragger/fileDragger";

function PropertyDescription(props) {
  return (
    <div className="description-container">
      <div className="questions flex align-center">
        Tell us what your property fee will be like!&nbsp;
        <AppIcon name="checkCircle" className="check" type="feather" />
      </div>
      <br />
      <FormGroup
        label="Described your property"
        subLabel="Provide as much information you want to provide as possible. However, don’t put your phone number or email there is really no need for that. "
      />
      <Ckeditor />
      <br />
      <p />
      <div className="questions flex align-center">
        Lets Add images to your property shall we!&nbsp;
        <AppIcon name="checkCircle" className="check" type="feather" />
      </div>
      <div className="banner">
        <img src={infoIcon} alt="" />
        <div className="context">
          <h4>Quick Information</h4>
          <p>
            Provide your property images, ensure you use a good image as this
            would help promote your property well.
          </p>
        </div>
        <div className="cast">
          NB. Max image is 15, hence, provide relevant images
        </div>
      </div>
      <p />
      <FileDragger>
        <div className="dragger-content">
          <p>
            <span>Upload Photos</span> or just drag and drop
          </p>
          <p>
            <AppIcon name="plus" type="feather" /> &nbsp; Add at least 4
            pictures{" "}
          </p>
        </div>
      </FileDragger>
      <br />
      <p />
      <div className="questions">Lets include some facilities okay!</div>
      <br />
      <div className="facility-con">
        <Select
          placeholder="Search facilities (e.g Balcony...)"
          name="propertyType"
          optionList={[
            { title: "apartment", value: "apartment" },
            { title: "bungalow", value: "bungalow" },
            { title: "studio", value: "studio" },
            { title: "house", value: "house" }
          ]}
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default PropertyDescription;
