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
    if (!coverImage) {
      setCoverImage(imageList[0]);
    }

    pushImageData();
  }, [imageList, coverImage]);

  useEffect(() => {
    if (props.defaultImages) {
      let tempImageList = [];
      let coverImage = null;
      props.defaultImages.map(item => {
        if (item.cover) {
          coverImage = item;
        }
        tempImageList.push({
          id: item.image.id,
          src: item.image.file,
          completed: true
        });
        return null;
      });
      setCoverImage(coverImage ? coverImage : tempImageList[0]);
      setImageList(tempImageList);
    }
  }, []);

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
      if (coverImage && coverImage.id === imageList[i].id) {
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
            isCover={coverImage ? coverImage.id === item.id : false}
            changeCover={changeCover}
            removeImage={removeImage}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
