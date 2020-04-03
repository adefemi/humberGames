import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import AppIcon from "../../components/icons/Icon";
import { Spinner } from "../../components/spinner/Spinner";
import { axiosHandler } from "../../utils/axiosHandler";
import { UNIT_CONTROLLER_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import { getToken } from "../../utils/helper";
import QuickLinksData from "./quickLinksData";
import AOS from "aos";
import { secondaryColor } from "../../utils/data";

function CompletionPage(props) {
  const [showModal, setShowModal] = useState(false);
  const [activeUnit, setActiveUnit] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [addAnother, setAddProperty] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setAddProperty(false);
  };
  const submit = _ => {
    setPublishing(true);
    axiosHandler(
      "patch",
      UNIT_CONTROLLER_URL + `/${props.unitInfo.id}`,
      getToken(),
      {
        published: !(activeUnit && activeUnit.published)
      }
    ).then(
      res => {
        setPublishing(false);
        getActiveUnit();
        if (activeUnit && activeUnit.published) {
          Notification.bubble({
            type: "success",
            content: "Property un-published"
          });
          setShowModal(false);
          return;
        }
        Notification.bubble({
          type: "success",
          content: "Congrats, we've published your property."
        });
        setShowModal(false);
        if (activeUnit.property.multi_unit) {
          setAddProperty(true);
          setTimeout(() => setShowModal(true), 1000);
        }
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, and error occurred"
        });
        setPublishing(false);
      }
    );
  };
  useEffect(() => {
    if ((props.edit || props.view || props.continue) && !props.fetching) {
      setActiveUnit(props.unitInfo);
      setFetching(false);
      AOS.init();
    }
  }, [props.fetching]);

  const pushState = () => {
    props.history.push(`/edit-property/${props.match.params.uuid}`);
  };

  const editProperty = () => {
    if (activeUnit && !activeUnit.published) {
      pushState();
      return;
    }
    setPublishing(true);
    axiosHandler(
      "patch",
      UNIT_CONTROLLER_URL + `/${props.unitInfo.id}`,
      getToken(),
      {
        published: !(activeUnit && activeUnit.published)
      }
    ).then(res => {
      pushState();
    });
  };

  const getActiveUnit = () => {
    axiosHandler(
      "get",
      UNIT_CONTROLLER_URL + `/${props.unitInfo.id}`,
      getToken()
    ).then(
      res => {
        setActiveUnit(res.data.results);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, and error occurred while fetching unit..."
        });
      }
    );
  };

  if (fetching) {
    return (
      <>
        <br />
        <Spinner size={15} color={secondaryColor} />
      </>
    );
  }

  return (
    <>
      <Modal
        onClose={() => setShowModal(false)}
        visible={showModal}
        closable={false}
      >
        <div className="confirm-publish">
          <div className="flex align-center justify-between">
            <div className="head">
              {addAnother
                ? "Quick One"
                : activeUnit && activeUnit.published
                ? "Confirm Un-Publish"
                : "Confirm Publish"}
            </div>
            <div className="close" onClick={closeModal}>
              <AppIcon name="x" type="feather" />{" "}
            </div>
          </div>
          {addAnother ? (
            <p>
              We noticed your property is a multi-unit property and would like
              to know if you wish to add another unit
            </p>
          ) : activeUnit && activeUnit.published ? (
            <p>
              You about to un-publish your property, doing this would remove
              your property from public view. Do you want to continue?
            </p>
          ) : (
            <p>
              Click publish to make this listing available to prospects. <br />
              Know that from here on, your property would be visible to the
              world!
            </p>
          )}
          <div className="flex align-center justify-between">
            <div />
            <div className="flex align-center">
              <Button color="danger" onClick={closeModal}>
                Cancel
              </Button>
              &nbsp;&nbsp;
              <Button color="primary" onClick={submit}>
                {addAnother ? (
                  "Add unit"
                ) : publishing ? (
                  <Spinner color="#ffffff" size={13} />
                ) : activeUnit && activeUnit.published ? (
                  "Yes"
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="completionPage" data-aos="fade-up" data-aos-delay="200">
        {(!activeUnit || !activeUnit.property.property_owner) && (
          <>
            <div className="questions">Getting Set...</div>
            <p>
              Before proceeding to publish your property, it would be nice to
              provide the property’s owners information now, however, you can do
              that later
            </p>
            <Button disabled={fetching}>Setup Property Owner</Button>
            <br />
          </>
        )}
        <p />
        {activeUnit && activeUnit.published ? (
          <div className="questions">Your property is public</div>
        ) : (
          <div className="questions">Property is ready for Publish</div>
        )}

        <p>
          To check how your potential tenants/buyers will view your listing,
          click
          <span className="previewListing"> preview listing</span>.{" "}
          {!activeUnit ||
            (!activeUnit.published && (
              <span>
                Or you can just go ahead and hit the publish button to make this
                listing public.
              </span>
            ))}
        </p>
        <Button
          disabled={fetching}
          className={`publishBtn ${
            activeUnit && activeUnit.published ? "danger" : ""
          }`}
          onClick={() => setShowModal(true)}
        >
          {activeUnit && activeUnit.published ? "Un-publish " : "Publish "}
          Property
        </Button>
      </div>
      {activeUnit && activeUnit.published && (
        <div data-aos="slide-right" data-aos-delay="200">
          <br />
          <div className="questions">Share with the world</div>
          <div className="share-container">
            <div className="share-item facebook">
              <AppIcon name="facebook" type="fa" /> facebook
            </div>
            <div className="share-item twitter">
              <AppIcon name="twitter" type="fa" /> twitter
            </div>
            <div className="share-item instagram">
              <AppIcon name="instagram" type="fa" /> instagram
            </div>
            <div className="share-item linkedin">
              <AppIcon name="linkedin" type="fa" /> linkedIn
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <QuickLinksData editProperty={editProperty} />
    </>
  );
}

export default CompletionPage;
