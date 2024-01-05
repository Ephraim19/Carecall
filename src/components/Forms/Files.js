import React, { useState } from "react";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref, push } from "firebase/database";
import carecall from "../carecall.png";
import { storage, database } from "../Firebase";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const Files = () => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const navigate = useNavigate();

  // Handle file upload event and update state
  function handleChange(event) {
    console.log(event.target.files[0])
    setFile(event.target.files[0]);
  }

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      console.log("fail");
    } else {
      
      const storageRef = sRef(storage, `/files/${file.name}`);
      console.log("success");
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            if (description && dueDate && url) {
              push(ref(database, "Files"), {
                patient: Cookies.get("patient"),
                description,
                url,
                dueDate: dateStrip(3, dueDate),
              }).then((data) => {
                console.log(data);
                navigate("/dashboard");
              });
            }
            navigate("/dashoard");
          });
        }
      );
    }
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
      </nav>

      <form className="App-info">
        <label>
          <b>Description:</b> <br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <br />
          <br />
          <b>File</b>
          <br />
          <input type="file" onChange={handleChange} accept="media_type" />{" "}
          <br />
          <br />
        </label>

        <label>
          <b>Date</b>
          <br />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
          <br />
          <p>{percent} "% done"</p>
          <br />
          <button onClick={handleUpload}>Upload File</button>
        </label>
      </form>
    </div>
  );
};

export default Files;
