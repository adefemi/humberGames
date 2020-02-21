import React from "react";
import "./fileDragger.css";
import { FileUpload } from "../fileUpload/FileUpload";
import fileDragImg from "../../assets/images/file-drag.svg";

function FileDragger(props) {
  return (
    <div className="file-dragger">
      <div className="content-dragger">
        <img src={fileDragImg} alt="" />
        {props.children}
      </div>
      <FileUpload className="file-dragger-inner" dragger />
    </div>
  );
}

export default FileDragger;
