import React, { useEffect, useState } from "react";
import AppIcon from "../../components/icons/Icon";
import FileDragger from "../../components/fileDragger/fileDragger";
import ImageCard from "../../components/imageCard/imageCard";

function ImageUpload(props) {
  const [imageList, setImageList] = useState([]);
  const [coverImage, setCoverImage] = useState({});
  const [deleteTrigger, setTrigger] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const maxImageUpload = 15;
  useEffect(() => {
    if (!coverImage.id && imageList.length > 0) {
      setCoverImage(imageList[0]);
    }
    pushImageData();
  }, [imageList]);

  const pushImageData = () => {
    let canPush = true;
    let imageData = [];
    for (let i = 0; i < imageList.length; i++) {
      if (!imageList[i].completed) {
        canPush = false;
        break;
      }
      let tempData = {
        image_id: imageList[i].id,
        unit_id: props.unit_id
      };
      if (coverImage.id && coverImage.id === imageList[i].id) {
        tempData.cover = true;
      }
      imageData.push(tempData);
    }
    if (canPush) {
      props.updateImages(imageData);
    } else {
      props.updateImages([]);
    }

    if (imageList.length > 0) props.updateImageState(true);
  };

  const changeCover = id => {
    setCoverImage(imageList.filter(item => item.id === id)[0]);
  };

  const removeImage = id => {
    if (coverImage.id === id) {
      setCoverImage({});
    }
    setFileToDelete(id);
    setTrigger(true);
  };
  return (
    <div>
      {imageList.length <= maxImageUpload - 1 && (
        <FileDragger
          onChange={e => setImageList(e)}
          fileIdToRemove={fileToDelete}
          updateTrigger={() => setTrigger(false)}
          removeTrigger={deleteTrigger}
          maxUpload={maxImageUpload}
        >
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
      )}
      <div className="image-list-grid">
        {imageList.map((item, id) => (
          <ImageCard
            item={item}
            key={id}
            isCover={coverImage.id === item.id}
            changeCover={changeCover}
            removeImage={removeImage}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
