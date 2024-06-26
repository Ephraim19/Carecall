import React, { useEffect, useState } from "react";
import "./FrameComponent5.css";
import { FiArrowLeftCircle } from "react-icons/fi";
import Cookies from "js-cookie";

const FrameComponent5 = (patientData) => {
  const [patientData1, setPatientData1] = useState([]);
  const [careId, setCareId] = React.useState("");

  const hideBio = (e) => {};

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
        <div className="frame-parent15">
          <div className="frame-parent16">
            <div className="felix-wandera-wrapper">
              <h2 className="felix-wandera">{patient.patient}</h2>
            </div>
            <FiArrowLeftCircle className="group-icon" onClick={hideBio} />
          </div>
          <div className="id-20387-parent">
            <div className="id-20387">
              <span>ID:</span>
              <span className="span2">{` `}</span>
              <span className="span3">
                {patient.idc ? patient.idc : Cookies.get("careId")}
              </span>
            </div>
            <div className="age-37-y-container">
              <span>Age:</span>
              <span className="span4">{` `}</span>
              <span className="y">
                {patient.age} {patient.age ? "y" : " "}{" "}
              </span>
            </div>
            <div className="gender-m">
              <span>Gender:</span>
              <span className="span5">{` `}</span>
              <span className="m">{patient.gender}</span>
            </div>
          </div>
          <div className="facility-eqa-nairobi-container">
            <span>Facility:</span>
            <span className="span6">{` `}</span>
            <span className="eqa-nairobi-west">{patient.hospital}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameComponent5;
