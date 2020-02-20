import React from "react";
import Slider from "../../components/slider/slider";
import fileEditImg from "../../assets/svgs/file-search.svg";
import applicationImg from "../../assets/svgs/foundation-page.svg";
import coinImg from "../../assets/svgs/money-coin.svg";
import inspectionImg from "../../assets/svgs/wpf_inspection.svg";
import { Link } from "react-router-dom";
import "./quickLink.css";

function QuickLinksData(props) {
  return (
    <div className="quicklinks">
      <div className="questions">Quick Links</div>
      <br />
      <Slider className="flex align-center">
        <QuickLinkCard
          color="green"
          icon={applicationImg}
          title="Edit Property"
          link="/"
        />
        <QuickLinkCard
          color="blue"
          icon={fileEditImg}
          title="Check Applications"
          link="/"
        />
        <QuickLinkCard
          color="purple"
          icon={coinImg}
          title="Collect Rent"
          link="/"
        />
        <QuickLinkCard
          color="greyBlue"
          icon={inspectionImg}
          title="Schedule Inspection"
          link="/"
        />
      </Slider>
      <br />
      <br />
      <br />
    </div>
  );
}

const QuickLinkCard = ({ color, icon, title, link }) => {
  return (
    <Link to={link}>
      <div className={`quickLinkCard ${color ? color : ""}`}>
        <div className="img-con">
          <img src={icon} alt="" />
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default QuickLinksData;
