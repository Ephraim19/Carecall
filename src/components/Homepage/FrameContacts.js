import React, { useState, useEffect } from "react";
import "./HOMEPAGE.css";

const FrameContacts = (patientData) => {
  const [patientData1, setPatientData1] = useState([]);

  useEffect(() => {
    const patientArray = Object.entries(patientData).map(([id, data]) => ({
      id,
      ...data,
    }));
    setPatientData1(patientArray);
  }, [patientData]);

  return (
    <div>
      {patientData1.map((patient) => (
        <div className="frame-parent5">
          <div className="frame-parent6">
            <div className="contacts-parent">
              <h3 className="contacts">Contacts</h3>
              <div className="frame-parent7">
                <div className="frame-parent8">
                  <div className="frame-parent9">
                    <div className="phone-1-parent">
                      <div className="phone-1">PHONE 1</div>
                      <div className="div">{patient.Phone ? patient.Phone:"--" }</div>
                    </div>
                    <div className="email">EMAIL</div>
                  </div>
                  <div className="phone-2-parent">
                    <div className="phone-2">PHONE 2</div>
                    <div className="div1">{patient.Phone2 ? patient.Phone2: "--"}</div>
                  </div>
                </div>
                <div className="felixwandera398gmailcom">
                  {patient.email ? patient.email : "--"}
                </div>
              </div>
              <div className="caregiver-next">CAREGIVER / NEXT OF KIN</div>
            </div>
            <div className="frame-wrapper2">
              <div className="group-div">
                <div className="rectangle-div" />
                <div className="edit1">EDIT</div>
              </div>
            </div>
          </div>
          <div className="frame-parent10">
            <div className="name-albert-wrapper">
              <div className="name-albert">
                <span>Name:</span>
                <span className="albert">
                  <b className="b">{` `}</b>
                  <span className="albert1">{patient.CareGiver ? patient.CareGive : "--" }</span>
                </span>
              </div>
            </div>
            <div className="phone-254706003310">
              <span>Phone:</span>
              <span className="span">
                <b className="b1">{` `}</b>
                <span className="span1">{patient.CareGiverPhone ? patient.CareGiverPhone : "--" }</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameContacts;
