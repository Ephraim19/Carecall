import React, { useEffect } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const InsuranceEmployer = (insDisplay) => {
  const dbRef = ref(database, "InsuranceEmployer");
  const [employer, setEmployer] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [insurer, setInsurer] = React.useState("");
  const [insuranceId, setInsuranceId] = React.useState("");

  useEffect(() => {
    if (insDisplay.insDisplay) {
      setEmployer(insDisplay.insDisplay.employer);
      setDepartment(insDisplay.insDisplay.department);
      setInsurer(insDisplay.insDisplay.insurer);
      setInsuranceId(insDisplay.insDisplay.insuranceId);
    }
  }, [insDisplay]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (insDisplay.insDisplay) {
      const updates = {};
      updates[insDisplay.insDisplay.id + "/employer"] = employer;
      updates[insDisplay.insDisplay.id + "/department"] = department;
      updates[insDisplay.insDisplay.id + "/insurer"] = insurer;
      updates[insDisplay.insDisplay.id + "/insuranceId"] = insuranceId;
      console.log(insDisplay.insDisplay.id + "/employer");

      update(dbRef, updates)
        .then(() => {
          toast.success("Successfully updated data! ");
        })
        .catch((error) => {
          toast.error("Error updating document: ", error);
        });
    } else {
      push(ref(database, "InsuranceEmployer"), {
        member: Cookies.get("memberId"),
        employer: employer,
        department: department,
        insurer: insurer,
        insuranceId: insuranceId,
      })
        .then(() => {
          toast.success("Successfully submitted data! ");
        })
        .catch((error) => {
          toast.error("Error adding document: ", error);
        });
    }
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>Insurance & Employer</b>

        <input
          className={styles.firstNameField1}
          placeholder="EMPLOYER"
          type="text"
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="DEPARTMENT"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="INSURER"
          type="text"
          value={insurer}
          onChange={(e) => setInsurer(e.target.value)}
        />
        <input
          className={styles.emailAddress}
          placeholder="INSURANCE ID"
          type="text"
          value={insuranceId}
          onChange={(e) => setInsuranceId(e.target.value)}
        />

        <div className={styles.signUpButton} onClick={onSubmit}>
          <div className={styles.signUpButton1}>
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>SUBMIT DATA</b>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default InsuranceEmployer;
