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
      <div className="questions" data-aos="fade-up" data-aos-delay="200">
        Quick Links
      </div>
      <br />
      <Slider className="flex align-center">
        <div data-aos="fade-up" data-aos-delay="400">
          <QuickLinkCard
            color="green"
            icon={applicationImg}
            title="Edit Property"
            link="/"
          />
        </div>

        <div data-aos="fade-up" data-aos-delay="600">
          <QuickLinkCard
            color="blue"
            icon={fileEditImg}
            title="Check Applications"
            link="/"
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="800">
          <QuickLinkCard
            color="purple"
            icon={coinImg}
            title="Collect Rent"
            link="/"
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="1000">
          <QuickLinkCard
            color="greyBlue"
            icon={inspectionImg}
            title="Schedule Inspection"
            link="/"
          />
        </div>
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
