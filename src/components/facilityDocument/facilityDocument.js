import React, { useEffect, useState } from "react";
import AppIcon from "../icons/Icon";
import { Select } from "../select/Select";
import proptype from "prop-types";
import "./facilityDoc.css";
import { Notification } from "../notification/Notification";

function FacilityDocument(props) {
  const [tigger, setTrigger] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectTrigger, setSelectTrigger] = useState(false);

  const onSelection = e => {
    let listCheck = contentList.filter(item => {
      let tempItem = item.toLowerCase().replace(/ /g, "");
      let testValue = e.target.value.toLowerCase().replace(/ /g, "");
      if (tempItem === testValue) {
        Notification.bubble({
          type: "info",
          content: "Document already exist"
        });
        return item;
      }
      return null;
    });

    if (listCheck.length > 0) {
      setSelectTrigger(true);
      return;
    }

    setContentList([...contentList, e.target.value]);
    setSelectTrigger(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setTrigger(true);
    }, 300);
  }, []);

  const removeContent = key => {
    console.log(key);
    const newList = contentList.filter((_, id) => id !== key);
    setContentList(newList);
  };

  useEffect(() => {
    props.onAdd(contentList);
  }, [contentList]);

  return (
    <div className="falDocContainer">
      <Select
        placeholder="Search Documents (e.g Governor’s consent...)"
        optionList={[
          { title: "Governor's Consent", value: "Governor's Consent" },
          { title: "Land Survey", value: "Land Survey" }
        ]}
        name="documents"
        onChange={onSelection}
        triggerPosition={tigger}
        triggerReset={() => setTrigger(false)}
        selectTrigger={selectTrigger}
        selectTriggerReset={() => setSelectTrigger(false)}
        icon={<AppIcon name="search" type="feather" />}
      />

      {contentList.length > 0 && (
        <div className="docsList">
          {contentList.map((item, key) => {
            return (
              <DocumentCard
                onRemove={() => removeContent(key)}
                name={item}
                key={key}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

FacilityDocument.propTypes = {
  onAdd: proptype.func.isRequired,
  type: proptype.oneOf(["document", "facility"])
};

FacilityDocument.defaultProps = {
  type: document,
  onAdd: () => null
};

const DocumentCard = ({ name, onRemove }) => {
  return (
    <div className="docCard">
      {" "}
      <div className="close" onClick={onRemove}>
        <AppIcon name="withCross" type="entypo" />
      </div>{" "}
      {name}
    </div>
  );
};

export default FacilityDocument;
