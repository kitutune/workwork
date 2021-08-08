import React, { useState } from 'react';

export default function sample() {
  const [uploadedFile, setUploadedFile] = useState({});
  const onChange = (e) => {
    setUploadedFile(e.target.files[0]);
    var selectedFile = e.target.files[0];
    var reader = new FileReader();
    var imgtag = document.getElementById('myimage');
    imgtag.title = selectedFile.name;
    reader.onload = function (event) {
      imgtag.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <p>{uploadedFile.name}</p>
      <img style={{ width: '100%' }} id="myimage" alt="" />
      <input
        type="file"
        className="custom-file-input"
        id="customFile"
        onChange={onChange}
      />
    </>
  );
}
