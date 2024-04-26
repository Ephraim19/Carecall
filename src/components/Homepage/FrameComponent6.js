import React, { useEffect, useState } from "react";
import "./FrameComponent6.css";
import carecall from "../carecall.png";
import { FaBars, FaSearch, FaCircle, FaUser } from "react-icons/fa";
const FrameComponent6 = (allData) => {
  const [searched, setSearched] = useState([]);
  const [dataKitengela, setDataKitengela] = useState([]);
  const [dataNairobiWestHospital, setDataNairobiWestHospital] = useState([]);
  const [dataSouthB, setDataSouthB] = useState([]);

  useEffect(() => {
    //get the members
    //partner hospitals
    var EQA_Nairobi_West_Hospital = allData.allData.filter(
      (data) => data.id === "EQA_Nairobi_West_Hospital"
    );
    var EQA_South_B = allData.allData.filter(
      (data) => data.id === "EQA_South_B"
    );
    var EQA_Kitengela = allData.allData.filter(
      (data) => data.id === "EQA_Kitengela"
    );
    var dataArray, dataArray1, dataArray2, dataArray3;

    if (EQA_Kitengela.length > 0) {
      dataArray = Object.entries(EQA_Kitengela[0].clients).map(
        ([id, data]) => ({
          id,
          ...data,
        })
      );
      setDataKitengela(dataArray);
    }
    if (EQA_Nairobi_West_Hospital.length > 0) {
      dataArray1 = Object.entries(EQA_Nairobi_West_Hospital[0].clients).map(
        ([id, data]) => ({
          id,
          ...data,
        })
      );
      setDataNairobiWestHospital(dataArray1);
    }
    if (EQA_South_B.length > 0) {
      dataArray2 = Object.entries(EQA_South_B[0].clients).map(([id, data]) => ({
        id,
        ...data,
      }));
      setDataSouthB(dataArray2);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value.length > 4) {
      var allPatients = dataKitengela.concat(
        dataNairobiWestHospital,
        dataSouthB
      );
      var searches = allPatients.filter(
        (name) =>
          name.patient.toLowerCase().includes(e.target.value.toLowerCase()) ||
          name.Phone.includes(e.target.value)
      );
      setSearched(searches);
    } else {
      setSearched([]);
    }
  };

  const handleResultClick = (patient) => {
    console.log(patient);
  }

  return (
    <header className="home-page-inner">
      <div className="frame-parent11">
        <div className="frame-parent12">
          <div className="navigation-svgrepocom-wrapper">
            <FaBars className="navigation-svgrepocom-icon" />
          </div>
          <div className="carecall-logo-parent">
            {/* <img
              className="carecall-logo-icon"
              loading="lazy"
              alt=""
              src={carecall}
            /> */}
            <div className="frame-wrapper4">
              <div className="carecall-parent">
                <h1 className="carecall">
                  <span>Care</span>
                  <span className="call">Call</span>
                </h1>
                <div className="connected-continuous-care-wrapper">
                  <b className="connected-continuous-care">
                    Connected. Continuous. Care
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-wrapper5">
          <div className="frame-parent13">
            <div className="vector-wrapper">
              <FaSearch className="vector-icon" />
            </div>

            <input
              className="search-by-patient"
              placeholder="name, phone or CareCall ID "
              type="text"
              onChange={handleSearch}
            />
          </div>
          <div>
          {searched ? (
            <ul className="searchable">
              {searched.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => handleResultClick(patient)}
                >
                  {patient.patient}
                </li>
              ))}
            </ul>
          ) : (
            " "
          )}
        </div>
        </div>

        <div className="frame-wrapper6">
          <button className="frame-button">
            <div className="frame-child1" />
            <div className="view-all-members">Members</div>
          </button>
        </div>
        <div className="frame-wrapper7">
          <div className="frame-parent14">
            <div className="frame-wrapper8">
              <button className="rectangle-parent1">
                <div className="frame-child2" />
                <div className="add-new-member">New Member</div>
              </button>
            </div>
            <FaUser className="profile-circle-svgrepocom-icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrameComponent6;
