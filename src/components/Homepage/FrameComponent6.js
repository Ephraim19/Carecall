import "./FrameComponent6.css";
import carecall from "../carecall.png";
import {FaBars,FaSearch,FaCircle } from "react-icons/fa"
const FrameComponent6 = () => {
  return (
    <header className="home-page-inner">
      <div className="frame-parent11">
        <div className="frame-parent12">
          <div className="navigation-svgrepocom-wrapper">
            <FaBars
              className="navigation-svgrepocom-icon"
            />
          </div>
          <div className="carecall-logo-parent">
            <img
              className="carecall-logo-icon"
              loading="lazy"
              alt=""
              src={carecall}
            />
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
            />
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
            <FaCircle
              className="profile-circle-svgrepocom-icon"

            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrameComponent6;
