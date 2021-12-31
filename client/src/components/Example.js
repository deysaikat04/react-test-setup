import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER;

const FileUpload = () => {
  const [img, setImg] = useState({});
  const [uploadedFile, setUploadedFile] = useState("");

  const handleChange = (e) => {
    setImg(e.target.files[0]);
    // console.log();
  };

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploadFile", img);
    axios
      .post(`${BASE_URL}/image`, formData)
      .then((res) => {
        console.log("Uploaded ", res);
        setUploadedFile(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(img);
  };

  return (
    <div>
      <form onSubmit={upload}>
        <input type="file" name="uploadFile" onChange={handleChange} />
        <input type="submit" name="Upload" value="Upload" />
      </form>
      {uploadedFile && <img src={uploadedFile} alt="test" />}
    </div>
  );
};

export default FileUpload;
