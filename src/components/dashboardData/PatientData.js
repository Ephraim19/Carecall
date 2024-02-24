import React, { useEffect, useState } from "react";
import { get, push, ref, update } from "firebase/database";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { database } from "../Firebase";
import {
  FaBomb,
  FaBusinessTime,
  FaCalendarDay,
  FaCartPlus,
  FaEdit,
  FaHome,
  FaImages,
  FaLanguage,
  FaMale,
  FaPhone,
  FaPlusSquare,
  FaRegAddressBook,
  FaSmile,
  FaTimes,
  FaTimesCircle,
  FaUserGraduate,
  FaUserTimes,
} from "react-icons/fa";
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiCalendar,
  FiAlertCircle,
  FiAlertTriangle,
  FiActivity,
  FiEdit,
} from "react-icons/fi";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

const PatientData = (props) => {
  const dbRef = ref(database, "clients");
  const cookie = Cookies.get("name");
  const navigate = useNavigate();

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const Edit = () => {
    navigate("/edit");
  };

  const EditStatus = () => {
    navigate("/edit/status");
  };

  //Time preference
  const prefTime = (e) => {
    //Update tasks progress
    const updates = {};
    updates[props.patientToDisplay[0].id + "/prefTime"] = e.target.value;
    update(dbRef, updates);
  };

  //Day preference
  const prefDay = (e) => {
    //Update tasks progress
    const updates = {};
    updates[props.patientToDisplay[0].id + "/prefDay"] = e.target.value;
    update(dbRef, updates);
  };

  //Language preference
  const prefLang = (e) => {
    //Update tasks progress
    const updates = {};
    updates[props.patientToDisplay[0].id + "/prefLang"] = e.target.value;
    update(dbRef, updates);
  };
  const Logout = () => {
    //remove all cookies first
    Cookies.remove("user");
    Cookies.remove("userName");
    Cookies.remove("patient");
    navigate("/");
  };

  useEffect(() => {
    console.log(props.patientToDisplay);
    console.log(props.healthSDisplay);
  }
  );


  return (
    <div>
      <Sidebar
        collapsed={menuCollapse}
        style={{ marginTop: "7%", marginLeft: "0" }}
      >
        <div className="logotext">
          {/* small and big change using menucollapse state */}
          {props.healthSDisplay.length === 0 ? (
            <h3 style={{ color: "purple", fontSize: "23px" }}>
              {menuCollapse ? (
                " "
              ) : (
                <button>
                  <Link className="link" to="/forms/status">
                    Health Status
                  </Link>
                </button>
              )}
            </h3>
          ) : (
            ""
          )}
        </div>
        <div className="closemenu" onClick={menuIconClick}>
          {/* changing menu collapse icon on click */}
          {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
        </div>
        {props.patientToDisplay.map((patient) => (
          <div key={patient.key}>
            <Menu iconShape="square" className="menuItems">
              <MenuItem active={true} icon={<FaMale />}>
                Name: {patient.patient}
              </MenuItem>
              <MenuItem active={true} icon={<FiCalendar />}>
                DOB: {patient.age.slice(4, 17)}
              </MenuItem>
              <MenuItem icon={<FaMale />}>
                Gender:<b>{patient.gender}</b>
              </MenuItem>
              <MenuItem icon={<FaPhone />}>
                Phone:<b>{patient.Phone}</b>
              </MenuItem>
              <MenuItem icon={<FaHome />}>
                Home:<b>{patient.Address}</b>
              </MenuItem>
              <MenuItem icon={<FaRegAddressBook />}>
                Office:<b>{patient.Address1}</b>
              </MenuItem>

              <MenuItem icon={<FaLanguage />}>
                <form>
                  <label htmlFor="language">
                    <select onChange={prefLang}>
                      <option className="App-info" value="Preferred language">
                        {patient.prefLang
                          ? patient.prefLang
                          : "Preferred Language"}
                      </option>
                      <option className="App-info" value="Kiswahili">
                        Kiswahili
                      </option>
                      <option className="App-info" value="English">
                        English
                      </option>
                    </select>
                  </label>
                </form>
              </MenuItem>

              <MenuItem icon={<FaBusinessTime />}>
                <form>
                  <label htmlFor="language">
                    <select onChange={prefTime}>
                      <option className="App-info" value="Preferred time">
                        {patient.prefTime ? patient.prefTime : "Preferred Time"}
                      </option>
                      <option className="App-info" value="Morning">
                        Morning
                      </option>
                      <option className="App-info" value="Afternoon">
                        Afternoon
                      </option>
                      <option className="App-info" value=" Evening">
                        Evening
                      </option>
                    </select>
                  </label>
                </form>
              </MenuItem>

              <MenuItem icon={<FaCalendarDay />}>
                <form>
                  <label htmlFor="language">
                    <select onChange={prefDay}>
                      <option className="App-info" value="Preferred day">
                        {patient.prefDay ? patient.prefDay : "Preferred Day"}
                      </option>
                      <option className="App-info" value="Monday/Tuesday">
                        Monday/Tuesday
                      </option>
                      <option className="App-info" value="Wednesday/Thursday">
                        Wednesday/Thursday
                      </option>
                      <option className="App-info" value="Friday/Saturday">
                        Friday/Saturday
                      </option>
                    </select>
                  </label>
                </form>
              </MenuItem>
            </Menu>
          </div>
        ))}

        <Menu iconShape="square">
          <MenuItem icon={<FiEdit />}>
            <button className="App-info" onClick={Edit}>
              <b>Edit</b>
            </button>
          </MenuItem>
        </Menu>

        {props.healthSDisplay.map((hs) => (
          <div key={hs.key}>
            <Menu iconShape="square" className="menuItems">
              <MenuItem icon={<FiActivity />}>
                <u>Current chronic conditions</u>
              </MenuItem>
              <MenuItem>
                {hs.cConditions.map((c) => (
                  <ul>
                    <li>{c.condition}</li>
                  </ul>
                ))}
              </MenuItem>
              <MenuItem icon={<FaImages />}>
                <u>Family conditions</u>
              </MenuItem>

              <MenuItem>
                {hs.FConditions.map((c) => (
                  <ul>
                    <li>{c.condition}</li>
                  </ul>
                ))}
              </MenuItem>

              <MenuItem icon={<FiAlertCircle />}>
                Drugs:<b>{hs.drugUse[0].condition}</b>
              </MenuItem>
              <MenuItem icon={<FaSmile />}>
                Improve:<b>{hs.improve}</b>
              </MenuItem>
              <MenuItem icon={<FaBomb />}>
                activities:<b>{hs.activity[0].condition}</b>
              </MenuItem>
              <MenuItem icon={<FaSmile />}>
                Sleep:<b>{hs.sleep} Hrs</b>
              </MenuItem>
            </Menu>
          </div>
        ))}

        <Menu iconShape="square">
          {props.healthSDisplay.length > 0 && (
            <MenuItem icon={<FiEdit />}>
              <button className="App-info" onClick={EditStatus}>
                <b>Edit</b>
              </button>
            </MenuItem>
          )}

          <MenuItem icon={<FaUserGraduate />}>{cookie}</MenuItem>

          <MenuItem icon={<FiLogOut />}>
            <button className="App-info" onClick={Logout}>
              <b>Logout</b>
            </button>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default PatientData;
