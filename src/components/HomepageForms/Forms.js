import React from "react";
import "../Homepage/FrameComponent.css";
import styles from "./Forms.module.css";

import { FiExternalLink } from "react-icons/fi";
const Forms = () => {
  const [primaryMember, setPrimaryMember] = React.useState("");
  const [spouse, setSpouse] = React.useState("");
  const [child, setChild] = React.useState("");
  const [age1, setAge1] = React.useState("");
  const [age2, setAge2] = React.useState("");
  const [age3, setAge3] = React.useState("");

  return (
    <div className="frame-parent25">
      <div className="tasks-parent">
        <div className="tasks1">Forms</div>

        <form className={styles.firstNameField}>
          <div className={styles.firstNameField1} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <button className="frame-button">
                <div className="view-all-members">Interaction</div>
              </button>
            </div>
          </div>

          <div className={styles.lastNameField} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <button className="frame-button">
                <div className="view-all-members">BMI index</div>
              </button>
            </div>
          </div>
          <div className={styles.phoneNumber} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <button className="frame-button">
                <div className="view-all-members">Blood pressure</div>
              </button>
            </div>
          </div>
          <div className={styles.emailAddress} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <button className="frame-button">
                <div className="view-all-members">Prescription</div>
              </button>
            </div>
          </div>
          <div className={styles.firstNameField11} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <button className="frame-button">
                <div className="view-all-members">Blood sugar</div>
              </button>
            </div>
          </div>
          <div className={styles.lastNameField1} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <button className="frame-button">
                <div className="view-all-members">Appointment</div>
              </button>
            </div>
          </div>
        </form>

        {/* </div>
      <div className="member-journey-parent">
        <b className="member-journey">Member Journey</b>
        <div className="rectangle-parent9">
          <div className="frame-child12" />
          <FiExternalLink
            className="expand-svgrepocom-icon1"
          />
        </div>
      </div>
      <div className="frame-parent27">
        <div className="rectangle-parent10">
          <div className="frame-child13" />
          <FiExternalLink
            className="expand-svgrepocom-icon2"
          />
        </div>
        <h3 className="appointments">Appointments</h3>
      </div>
      <div className="frame-parent27">
        <div className="rectangle-parent10">
          <div className="frame-child13" />
          <FiExternalLink
            className="expand-svgrepocom-icon2"
          />
        </div> */}
        {/* <h3 className="appointments">Engagement Panel</h3> */}
      </div>
    </div>
  );
};

export default Forms;
