import React, { useState } from "react";
import db from "./models/db";
db.open();

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [audioCheck, setAudioCheck] = useState(false);
  const [audioFile, setAudioFile] = useState();
  var reader = new FileReader();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async (event) => {
    var audio1 = "audio";
    console.log("change event fired for input field");
    reader.readAsDataURL(selectedFile);
    reader.onload = async function () {
      audio1 = await reader.result;
      console.log(audio1);
      await db.audios.put({
        id: "User",
        name: audio1,
      });
      dbChecker();
    };

    const dbChecker = async (event) => {
      const audio = await db.audios.where("id").equals("User").toArray();
      console.log(audio[0].name);
      setAudioCheck(true);
      setAudioFile(audio[0].name);
    };
  };
  return (
    <div>
      {audioCheck ? (
        <div>
          <audio
            controls="controls"
            autobuffer="autobuffer"
            autoplay="autoPlay"
          >
            <source src={audioFile} />
          </audio>
        </div>
      ) : (
        <div>fails</div>
      )}
      <input type="file" name="file" onChange={changeHandler} />

      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
};

export default App;
