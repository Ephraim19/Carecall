import "./FrameComponent.css";

const FrameComponent = () => {
  return (
    <div className="frame-parent25">
      <div className="frame-parent26">
        <div className="engagement-parent">
          <h3 className="engagement">Engagement</h3>
          <div className="line-wrapper">
            <img className="line-icon" loading="lazy" alt="" />
          </div>
        </div>
        <h3 className="forms">Forms</h3>
        <div className="workflow-wrapper">
          <h3 className="workflow">Workflow</h3>
        </div>
        <h1 className="h11">{`>`}</h1>
      </div>
      <div className="tasks-parent">
        <h3 className="tasks">Tasks</h3>
        <div className="frame-wrapper15">
          <div className="rectangle-parent8">
            <div className="frame-child11" />
            <img
              className="expand-svgrepocom-icon"
              loading="lazy"
              alt=""
              src="/expand-svgrepocom.svg"
            />
          </div>
        </div>
      </div>
      <div className="member-journey-parent">
        <b className="member-journey">Member Journey</b>
        <div className="rectangle-parent9">
          <div className="frame-child12" />
          <img
            className="expand-svgrepocom-icon1"
            alt=""
            src="/expand-svgrepocom.svg"
          />
        </div>
      </div>
      <div className="frame-parent27">
        <div className="rectangle-parent10">
          <div className="frame-child13" />
          <img
            className="expand-svgrepocom-icon2"
            alt=""
            src="/expand-svgrepocom.svg"
          />
        </div>
        <h3 className="appointments">Appointments</h3>
      </div>
      <div className="frame-parent28">
        <img
          className="frame-child14"
          loading="lazy"
          alt=""
          src="/group-26.svg"
        />
        <h3 className="engagement-panel">Engagement Panel</h3>
      </div>
    </div>
  );
};

export default FrameComponent;
