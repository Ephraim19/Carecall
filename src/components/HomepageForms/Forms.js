import React from "react";
import "../Homepage/FrameComponent.css";
import styles from "./Forms.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
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
                    <div className="view-all-members">INTERACTION</div>
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
                    <div className="view-all-members">BMI INDEX</div>
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
                    <div className="view-all-members">BLOOD PRESSURE</div>
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
                    <div className="view-all-members">PRESCRIPTION</div>
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
                    <div className="view-all-members">BLOOD SUGAR</div>
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
                    <div className="view-all-members">APPOINTMENT</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <Appointment />
              </Popup>
            </div>
          </div>
          <div
            className={styles.firstNameField112}
            placeholder="PRIMARY MEMBER"
          >
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button type="button" className="frame-button">
                    <div className="view-all-members">DOCTOR</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <BloodSugar />
              </Popup>
            </div>
          </div>
          <div className={styles.lastNameField12} placeholder="PRIMARY MEMBER">
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button className="frame-button" type="button">
                    <div className="view-all-members">NUTRITIONIST</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <Appointment />
              </Popup>
            </div>
          </div>
          <div
            className={styles.firstNameField1122}
            placeholder="PRIMARY MEMBER"
          >
            <div className="frame-wrapper6">
              <Popup
                trigger={
                  <button type="button" className="frame-button">
                    <div className="view-all-members">PYSCHOLOGIST</div>
                  </button>
                }
                position="left center"
                contentStyle={{ width: "auto", maxWidth: "600px" }}
              >
                <BloodSugar />
              </Popup>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forms;
