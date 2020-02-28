import React, { useEffect, useState } from "react";
import AppIcon from "../../components/icons/Icon";
import FormGroup from "../../components/formGroup/formGroup";
import Ckeditor from "../../components/ckeditor/ckeditor";
import infoIcon from "../../assets/images/cloud-info.svg";
import FacilityDocument from "../../components/facilityDocument/facilityDocument";
import ImageUpload from "./imageUpload";
import { Notification } from "../../components/notification/Notification";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  PROPERTY_CONTROLLER_URL,
  tempToken,
  UNIT_CONTROLLER_URL,
  UNIT_FACILITY_URL,
  UNIT_IMAGE_URL
} from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";

function PropertyDescription(props) {
  const getUnitId = () => {
    let pathList = props.match.params.uuid.split("_");
    return pathList[pathList.length - 1];
  };
  const unit_id = getUnitId();
  const [showNext, setShowNext] = useState(0);
  const [facilities, setFacilities] = useState([]);
  const [images, setImages] = useState([]);
  const [imageState, setImageState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [haveShown, setHaveShown] = useState([]);
  const [scroll, setScroll] = useState(0);
  const proceedControl = () => {
    if (showNext === 0) {
      if (description.length < 1) {
        Notification.bubble({
          type: "info",
          content:
            "Please kindly give some helpful information about this property."
        });
        return;
      }
      setShowNext(1);
    } else if (showNext === 1) {
      if (!imageState) {
        Notification.bubble({
          type: "info",
          content:
            "Kindly provide your property images. (The cleaner the better)"
        });
        return;
      }
      setShowNext(2);
    } else {
      submit();
    }
  };

  useEffect(() => {
    if (haveShown.includes("desc")) return;
    if (description.length > 0) setHaveShown([...haveShown, "desc"]);
    setScroll(scroll + 1);
  }, [description]);
  useEffect(() => {
    if (haveShown.includes("images")) return;
    if (imageState) setHaveShown([...haveShown, "images"]);
    setScroll(scroll + 1);
  }, [images]);
  useEffect(() => {
    if (haveShown.includes("fac")) return;
    if (facilities.length > 0) setHaveShown([...haveShown, "fac"]);
    setScroll(scroll + 1);
  }, [facilities]);

  useEffect(() => {
    setTimeout(() => {
      try {
        document
          .getElementById("section1")
          .scrollIntoView({ behavior: "smooth" });
      } catch (e) {}
    }, 100);
  }, [scroll]);

  const submit = _ => {
    if (!validateSubmit()) return;
    setLoading(true);
    Promise.all([
      axiosHandler("patch", UNIT_CONTROLLER_URL + `/${unit_id}`, tempToken, {
        description
      }),
      axiosHandler("post", UNIT_IMAGE_URL, tempToken, images),
      axiosHandler(
        "post",
        UNIT_FACILITY_URL,
        tempToken,
        formatFacility(facilities)
      )
    ])
      .then(() => {
        props.history.push(props.location.pathname + "?stage=3");
      })
      .catch(e => {
        Notification.bubble({
          content: "an error occurred",
          type: "error"
        });
        setLoading(false);
      });
  };

  const formatFacility = fac => {
    let tempList = [];
    fac.map(item => {
      tempList.push({
        unit_id,
        facility_id: item
      });
      return null;
    });
    return tempList;
  };

  const validateSubmit = _ => {
    if (description.length < 1) {
      Notification.bubble({
        type: "error",
        content:
          "Please kindly give some helpful information about this property."
      });
      return false;
    }
    if (!imageState) {
      Notification.bubble({
        type: "error",
        content: "Please, you need to provide your images. Its very important"
      });
      return false;
    } else if (images.length < 1) {
      Notification.bubble({
        type: "error",
        content: "Please wait while your images completely uploads"
      });
      return false;
    } else if (images.length < 4) {
      Notification.bubble({
        type: "error",
        content: "Kindly provide a minimum of 4 images"
      });
      return false;
    }
    if (facilities.length < 1) {
      Notification.bubble({
        type: "error",
        content: "We advice to provide some facilities"
      });
      return false;
    }
    return true;
  };

  return (
    <div className="description-container">
      <div
        className="questions flex align-center"
        data-aos="slide-right"
        data-aos-delay="200"
      >
        Tell us about your property!&nbsp;
        <AppIcon name="checkCircle" className="check" type="feather" />
      </div>
      <br />
      <div data-aos="fade-up" data-aos-delay="300">
        <FormGroup
          label="Described your property"
          subLabel="Provide as much information you want to provide as possible. However, don’t put your phone number or email there is really no need for that. "
        />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <Ckeditor
          value={description}
          onChange={data => setDescription(data)}
          onBlur={() => {
            if (description) {
              setShowNext(1);
            }
          }}
        />
      </div>
      <br />
      <p />
      {showNext > 0 && (
        <>
          <div className="questions flex align-center">
            Lets Add images to your property shall we!&nbsp;
            <AppIcon name="checkCircle" className="check" type="feather" />
          </div>
          <div className="banner">
            <img src={infoIcon} alt="" />
            <div className="context">
              <h4>Quick Information</h4>
              <p>
                Provide your property images, ensure you use a good image as
                this would help promote your property well.
              </p>
            </div>
            <div className="cast">
              NB. Max image is 15, hence, provide relevant images
            </div>
          </div>
          <p />
          <ImageUpload
            unit_id={unit_id}
            updateImages={e => setImages(e)}
            updateImageState={e => setImageState(e)}
          />
        </>
      )}
      <br />
      <p />
      {showNext > 1 && (
        <>
          <div className="questions">Lets include some facilities okay!</div>
          <br />
          <FacilityDocument onAdd={e => setFacilities(e)} type="facility" />
        </>
      )}
      {loading ? (
        <div className="loading-bar">
          <br />
          <Spinner />
        </div>
      ) : (
        <div className="proceed" onClick={proceedControl}>
          Proceed &nbsp; <AppIcon name="ic_trending_flat" type="md" />
        </div>
      )}
      <br />
      <div id="section1" />
      <br />
      <br />
    </div>
  );
}

export default PropertyDescription;
