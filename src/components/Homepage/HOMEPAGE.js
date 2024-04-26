import React, { useState, useEffect } from "react";
import FrameComponent6 from "./FrameComponent6";
import FrameComponent5 from "./FrameComponent5";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent1 from "./FrameComponent1";
import FrameComponent from "./FrameComponent";
import "./HOMEPAGE.css";
import { FiActivity } from "react-icons/fi";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { get, onValue, ref, update } from "firebase/database";

const HOMEPAGE = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const dbAll = ref(database);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    //read the whole database
    get(dbAll).then((snapshot) => {
      if (snapshot.exists()) {
        const allDataArray = Object.entries(snapshot.val()).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        setAllData(allDataArray);
        console.log(allDataArray);
      }
    });
  }, []);

  return (
    <div className="home-page">
      <FrameComponent6 allData={allData} />
      <main className="frame-parent">
        <div className="frame-group">
          <FrameComponent5 />
          <div className="frame-container">
            <div className="rectangle-parent">
              <div className="frame-child" />
              <div className="personal">Personal</div>
            </div>
            <div className="rectangle-group">
              <div className="frame-item" />
              <div className="clinical">Clinical</div>
            </div>
          </div>

          <div className="frame-div">
            <div className="frame-parent1">
              <div className="program-status-assignees-parent">
                <h3 className="program-status">{`Program, Status & Assignees`}</h3>
                <div className="frame-parent2">
                  <div className="program-parent">
                    <div className="program">PROGRAM</div>
                    <div className="status">STATUS</div>
                  </div>
                  <div className="frame-parent3">
                    <div className="vitalcare360-parent">
                      <div className="vitalcare360">VitalCare360</div>
                      <div className="stage">STAGE</div>
                    </div>
                    <div className="pen-tool">
                      <div className="eraser-tool">
                        <div className="active">Active</div>
                        <div className="data-hub-wrapper">
                          <FiActivity className="data-hub-icon" />
                        </div>
                      </div>
                      <div className="care-manager">CARE MANAGER</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="frame-wrapper">
                <div className="rectangle-container">
                  <div className="frame-inner" />
                  <div className="edit">EDIT</div>
                </div>
              </div>
            </div>
            <div className="frame-parent4">
              <div className="frame-wrapper1">
                <div className="onboarded-parent">
                  <div className="onboarded">Onboarded</div>
                  <div className="nutritionist-parent">
                    <div className="nutritionist">NUTRITIONIST</div>
                    <div className="alice-akoth">Alice Akoth</div>
                  </div>
                </div>
              </div>
              <div className="ebenezer-mokamba-parent">
                <div className="ebenezer-mokamba">Ebenezer Mokamba</div>
                <div className="engagement-lead-parent">
                  <div className="engagement-lead">ENGAGEMENT LEAD</div>
                  <div className="aaron-macharia">Aaron Macharia</div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-parent5">
            <div className="frame-parent6">
              <div className="contacts-parent">
                
                <h3 className="contacts">Contacts</h3>
                <div className="frame-parent7">
                  <div className="frame-parent8">
                    <div className="frame-parent9">
                      <div className="phone-1-parent">
                        <div className="phone-1">PHONE 1</div>
                        <div className="div">+254793612375</div>
                      </div>
                      <div className="email">EMAIL</div>
                    </div>
                    <div className="phone-2-parent">
                      <div className="phone-2">PHONE 2</div>
                      <div className="div1">+254701453608</div>
                    </div>
                  </div>
                  <div className="felixwandera398gmailcom">
                    felixwandera398@gmail.com
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
                    <span className="albert1">Albert</span>
                  </span>
                </div>
              </div>
              <div className="phone-254706003310">
                <span>Phone:</span>
                <span className="span">
                  <b className="b1">{` `}</b>
                  <span className="span1">+254706003310</span>
                </span>
              </div>
            </div>
          </div>
          <FrameComponent4 />
          <FrameComponent3 />
          <FrameComponent2 />
        </div>
        <div className="frame-wrapper3">
          <FrameComponent1 />
        </div>
        <FrameComponent />
      </main>
    </div>
  );
};

export default HOMEPAGE;
