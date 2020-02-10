import React from "react";
import AnimateHeight from "react-animate-height";
import "./Accordion.css";
import AppIcon from "../icons/Icon";

export function Accordion({
  accordionState,
  id,
  children,
  title,
  changeAccordionState,
  onClick
}) {
  return (
    <div className="Accordion">
      <div className="row">
        <div className="col">
          <div className="tabs">
            <div
              className="tabs-header dflex align-center"
              onClick={() => {
                onClick && onClick();
                changeAccordionState(id, accordionState[id.toString()]);
              }}
            >
              {title}

              <AppIcon
                name={
                  !accordionState[id.toString()] ? "chevronDown" : "chevronUp"
                }
                type="feather"
                size={16}
              />
            </div>
            <AnimateHeight
              duration={500}
              height={accordionState[id.toString()] ? "auto" : 0}
            >
              {children}
            </AnimateHeight>
          </div>
        </div>
      </div>
    </div>
  );
}
