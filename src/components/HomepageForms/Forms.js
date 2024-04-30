import React from "react";
import "../Homepage/FrameComponent.css";
import styles from "./Forms.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Program from "./Program";
import Interaction from "./Interaction";
import BMI from "./BMI";
import Prescription from "./Prescription";
import BloodPressure from "./BloodPressure";
import BloodSugar from "./BloodSugar";
import Appointment from "./Appointment";
const Forms = () => {
  return (
    <div className="frame-parent25">
      <div className="tasks-parent">
        <div className="tasks1">Forms</div>

        <form className={styles.firstNameField}>
          <div className={styles.firstNameField1} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button className="frame-button" type="button">
                    <div className="view-all-members">Interaction</div>
                  </button>
                }
                position="left top"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <Interaction />
              </Popup>
            </div>
          </div>

          <div className={styles.lastNameField} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button type="button" className="frame-button">
                    <div className="view-all-members">BMI index</div>
                  </button>
                }
                position="left top"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <BMI />
              </Popup>
            </div>
          </div>
          <div className={styles.phoneNumber} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button className="frame-button" type="button">
                    <div className="view-all-members">Blood pressure</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <BloodPressure />
              </Popup>
            </div>
          </div>
          <div className={styles.emailAddress} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button className="frame-button" type="button">
                    <div className="view-all-members">Prescription</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <Prescription />
              </Popup>
            </div>
          </div>
          <div className={styles.firstNameField11} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button type="button" className="frame-button">
                    <div className="view-all-members">Blood sugar</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <BloodSugar />
              </Popup>
            </div>
          </div>
          <div className={styles.lastNameField1} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button className="frame-button" type="button">
                    <div className="view-all-members">Appointment</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <Appointment />
              </Popup>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forms;
