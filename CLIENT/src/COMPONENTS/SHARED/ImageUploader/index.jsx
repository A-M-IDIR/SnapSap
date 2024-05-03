import React from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import storage from "@/RESOURCES/HANDLERS/StorageHanlder";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function ImageUploader({ onChange, image, contentStyle, imageStyle, fileKey }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onChange(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className={C.ImageUploader}>
      <input type="file" id={fileKey} onChange={handleFileChange} />
      <label htmlFor={fileKey} style={contentStyle}>
        {SvgHandler.Camera({ width: "26px" })}
      </label>

      <div className={C.Holder}>
        {image ? (
          <img src={image} alt="Profile" style={imageStyle} />
        ) : (
          <Skeleton style={{ width: "100%", height: "100%" }} />
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
