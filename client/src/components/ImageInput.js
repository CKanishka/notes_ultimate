import React from "react";

const ImageInput = ({ addImage, file, fileObj }) => {
  return (
    <>
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          id="imgInput"
          onChange={addImage}
        />
        <label class="custom-file-label" for="imgInput">
          {file ? fileObj.name : "Choose file"}
        </label>
      </div>
      <div className="form-text text-muted" id="imgFile" muted>
        Allowed extensions are .jpg, .jpeg and .png
      </div>
      {file && <img src={file} alt="img1" className="mt-4 input-img" />}
    </>
  );
};

export default ImageInput;
