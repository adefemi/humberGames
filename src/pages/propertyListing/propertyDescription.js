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
  UNIT_CONTROLLER_URL,
  UNIT_FACILITY_URL,
  UNIT_IMAGE_URL
} from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";
import { getToken } from "../../utils/helper";
import { secondaryColor } from "../../utils/data";

function PropertyDescription(props) {
  const [showNext, setShowNext] = useState(props.edit ? 10 : 0);
  const [facilities, setFacilities] = useState([]);
  const [images, setImages] = useState([]);
  const [imageState, setImageState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [haveShown, setHaveShown] = useState([]);
  const [scroll, setScroll] = useState(0);

  const proceedControl = () => {
    if (props.edit) {
      submit();
      return;
    }
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
    if (props.edit && !props.fetching) {
      setDescription(props.unitInfo.description || "");
    }
  }, [props.fetching]);

  useEffect(() => {
    if (props.edit) return;
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
      axiosHandler(
        "patch",
        UNIT_CONTROLLER_URL + `/${props.unitInfo.id}`,
        getToken(),
        {
          description
        }
      ),
      axiosHandler("post", UNIT_IMAGE_URL, getToken(), images),
      axiosHandler(
        "post",
        UNIT_FACILITY_URL,
        getToken(),
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
        unit_id: props.unitInfo.id,
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

  if (props.fetching) {
    return (
      <>
        <br />
        <Spinner size={15} color={secondaryColor} />
      </>
    );
  }
  return (
    <div className="description-container">
      <div
        className="questions flex align-center"
        data-aos={!props.edit && "slide-right"}
        data-aos-delay="200"
      >
        Tell us about your property!&nbsp;
        <AppIcon name="checkCircle" className="check" type="feather" />
      </div>
      <br />
      <div data-aos={!props.edit && "fade-up"} data-aos-delay="300">
        <FormGroup
          label="Described your property"
          subLabel="Provide as much information you want to provide as possible. However, don’t put your phone number or email there is really no need for that. "
        />
      </div>
      <div data-aos={!props.edit && "fade-up"} data-aos-delay="500">
        <Ckeditor
          value={description}
          onChange={data => setDescription(data)}
          onBlur={() => {
            if (description && !props.edit) {
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
            unit_id={props.unitInfo.id}
            updateImages={e => setImages(e)}
            updateImageState={e => setImageState(e)}
            defaultImages={props.edit && props.unitInfo.unit_images}
          />
        </>
      )}
      <br />
      <p />
      {showNext > 1 && (
        <>
          <div className="questions">Lets include some facilities okay!</div>
          <br />
          <FacilityDocument
            onAdd={e => setFacilities(e)}
            type="facility"
            defaultContent={props.edit && props.unitInfo.facilities}
          />
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
