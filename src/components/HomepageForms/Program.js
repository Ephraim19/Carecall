import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Program.module.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { database } from "../Firebase";
import { ref, push } from "firebase/database";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "react-bootstrap";

const Program = () => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [hospital, setHospital] = React.useState("");
  const [passwordErrorCode, setPasswordErrorCode] = React.useState("");
  
  const [program, setProgram] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [stage, setStage] = React.useState("");
  const [careManager, setCareManager] = React.useState("");
  const [nutritionist, setNutritionist] = React.useState("");
  const [engagementLead, setEngagementLead] = React.useState("");

  useEffect(() => {
    setHospital(Cookies.get("hospital"));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    push(ref(database), {
      program: program,
      status: status,
      stage: stage,
      careManager: careManager,
      nutritionist: nutritionist,
      engagementLead: engagementLead,
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        toast.success("Document written with ID: " + docRef.id);
      })
      .catch((error) => {
        toast.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>Program, Status & Assignees</b>
        <input
          className={styles.firstNameField1}
          placeholder="PROGRAM"
          type="text"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="STATUS"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="STAGE"
          type="text"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        />
        <input
          className={styles.emailAddress}
          placeholder="CARE MANAGER"
          type="email"
          value={careManager}
          onChange={(e) => setCareManager(e.target.value)}
        />

        <input
          className={styles.firstNameField11}
          placeholder="NUTRITIONIST"
          type="text"
          value={nutritionist}
          onChange={(e) => setNutritionist(e.target.value)}
        />
        <input
          className={styles.lastNameField1}
          placeholder="ENGAGEMENT LEAD"
          type="text"
          value={engagementLead}
          onChange={(e) => setEngagementLead(e.target.value)}
        />

        <button className={styles.signUpButton} onClick={onSubmit}>
          <div className={styles.signUpButton1}>
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>CREATE ACCOUNT</b>
          </div>
          <b style={{ color: "red" }}>{passwordErrorCode}</b>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Program;
