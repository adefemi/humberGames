import React from "react";
import AppIcon from "../../components/icons/Icon";
import gardenIcon from "../../assets/images/garden.svg";
import moneyMouth from "../../assets/images/money_mouth.svg";
import iwwa from "../../assets/images/iwwa_good.svg";
import flatFile from "../../assets/images/flat_file.svg";

export const ListingSteps = ({ title, content, active, icon, completed }) => {
  return (
    <div className={`tracker-item ${active ? "active" : ""}`}>
      <div className="img-con">
        <img src={icon} alt="title" />
      </div>
      <div className="context">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      {completed && (
        <div className="marker">
          <AppIcon name="checkCircle" type="feather" />
        </div>
      )}
    </div>
  );
};

export const InformationBanner = ({ activePage }) => {
  const InformationBanner = [
    {
      icon: gardenIcon,
      title: "Basic Information",
      content: `Hooray!, we are ready to start listing. Ain’t you excited to
            list your property? ... if you are lets do this, also, if you
            are not ... lets still do this.`
    },
    {
      icon: moneyMouth,
      title: "Property Terms",
      content: `Don’t get tired yet, you are just two (2) steps away.`
    },
    {
      icon: flatFile,
      title: "Property Description",
      content: `I hope it has not been too boring, just one more step to go from here. `
    },
    {
      icon: iwwa,
      title: "Property Verification",
      content: `Yeah, you've got a chance to always come around and evaluate your property`
    }
  ];
  return (
    <section className={`heading-context bg${activePage}`}>
      <img src={InformationBanner[activePage - 1].icon} alt="garden" />
      <div className="context">
        <h3>{InformationBanner[activePage - 1].title}</h3>
        <p>{InformationBanner[activePage - 1].content}</p>
      </div>
    </section>
  );
};
