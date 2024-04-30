import React, { useEffect } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Family = (familyDisplay) => {
  const dbRef = ref(database, "Family");
  const [primaryMember, setPrimaryMember] = React.useState("");
  const [spouse, setSpouse] = React.useState("");
  const [child, setChild] = React.useState("");
  const [age1, setAge1] = React.useState("");
  const [age2, setAge2] = React.useState("");
  const [age3, setAge3] = React.useState("");

  //   useEffect(() => {
  //     console.log(familyDisplay.familyDisplay.familyDisplay);
  //     if (familyDisplay.familyDisplay.familyDisplay.length > 0) {
  //       setPrimaryMember(familyDisplay.familyDisplay.familyDisplay[0].primaryMember);
  //       setSpouse(familyDisplay.familyDisplay.familyDisplay[0].spouse);
  //       setChild(familyDisplay.familyDisplay.familyDisplay[0].child);
  //       setAge1(familyDisplay.familyDisplay.familyDisplay[0].age1);
  //       setAge2(familyDisplay.familyDisplay.familyDisplay[0].age2);
  //       setAge3(familyDisplay.familyDisplay.familyDisplay[0].age3);
  //     }
  //   }, [familyDisplay.familyDisplay.familyDisplay]);

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     if (familyDisplay.familyDisplay.familyDisplay.length > 0) {
  //       const updates = {};
  //       updates[familyDisplay.familyDisplay.familyDisplay.id + "/primaryMember"] =
  //         primaryMember;
  //       updates[familyDisplay.familyDisplay.familyDisplay[0].id + "/spouse"] = spouse;
  //       updates[familyDisplay.familyDisplay.familyDisplay[0].id + "/child"] = child;
  //       updates[familyDisplay.familyDisplay.familyDisplay[0].id + "/age1"] = age1;
  //       updates[familyDisplay.familyDisplay.familyDisplay[0].id + "/age2"] = age2;
  //       updates[familyDisplay.familyDisplay.familyDisplay[0].id + "/age3"] = age3;
  //       update(dbRef, updates)
  //         .then(() => {
  //           toast.success("Successfully updated data! ");
  //         })
  //         .catch((error) => {
  //           toast.error("Error updating document: ", error);
  //         });
  //     } else {
  //       push(dbRef, {
  //         member: Cookies.get("memberId"),
  //         primaryMember: primaryMember,
  //         spouse: spouse,
  //         child: child,
  //         age1: age1,
  //         age2: age2,
  //         age3: age3,
  //       })
  //         .then(() => {
  //           toast.success("Successfully added data! ");
  //         })
  //         .catch((error) => {
  //           toast.error("Error adding document: ", error);
  //         });
  //     }
  //   };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>PRESCRIPTIONS</b>

        <input
          className={styles.firstNameField1}
          placeholder="Medication"
          type="text"
          value={primaryMember}
          onChange={(e) => setPrimaryMember(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="Duration"
          type="text"
          value={age1}
          onChange={(e) => setAge1(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="Medication"
          type="text"
          value={spouse}
          onChange={(e) => setSpouse(e.target.value)}
        />
        <input
          className={styles.emailAddress}
          placeholder="Duration"
          type="text"
          value={age2}
          onChange={(e) => setAge2(e.target.value)}
        />
        <input
          className={styles.firstNameField11}
          placeholder="Medication"
          type="text"
          value={child}
          onChange={(e) => setChild(e.target.value)}
        />
        <input
          className={styles.lastNameField1}
          placeholder="Duration"
          type="text"
          value={age3}
          onChange={(e) => setAge3(e.target.value)}
        />

        <button className={styles.signUpButton5}>
          <div className={styles.signUpButton1}>
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>SUBMIT DATA</b>
          </div>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Family;
