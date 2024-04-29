import "./FrameComponent4.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import InsuranceEmployer from "../HomepageForms/InsuranceEmployer";

const FrameComponent4 = (InsuranceEmployer) => {
  return (
    <div className="frame-parent17">
      <div className="frame-parent18">
        <div className="insurance-employer-parent">
          <h3 className="insurance-employer">{`Insurance & Employer`}</h3>
          <div className="employer-parent">
            <div className="employer">EMPLOYER</div>
            <div className="department">DEPARTMENT</div>
          </div>
        </div>
        <div className="frame-wrapper9">
          <Popup
            trigger={
              <button className="rectangle-parent2">
                <div className="frame-child3" />
                <div className="edit2">EDIT</div>
              </button>
            }
            position="right center"
            contentStyle={{ width: "auto", maxWidth: "600px" }}
          >
            <InsuranceEmployer InsuranceEmployer={InsuranceEmployer} />
          </Popup>
        </div>
      </div>
      <div className="frame-parent19">
        <div className="carecall-group">
          <div className="carecall1">CareCall</div>
          <div className="insurer">INSURER</div>
        </div>
        <div className="motivational-design-parent">
          <div className="motivational-design">Motivational Design</div>
          <div className="insurance-id">INSURANCE ID</div>
        </div>
      </div>
      <div className="frame-parent20">
        <div className="britam-wrapper">
          <div className="britam">BRITAM</div>
        </div>
        <div className="ins077t7t6r76290">INS077T7T6R76290</div>
      </div>
    </div>
  );
};

export default FrameComponent4;
