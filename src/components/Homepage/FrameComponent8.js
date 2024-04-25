import styles from "./FrameComponent8.module.css";

const FrameComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.engagementParent}>
          <h3 className={styles.engagement}>Engagement</h3>
          <div className={styles.lineWrapper}>
            <img className={styles.frameChild} loading="lazy" alt="" />
          </div>
        </div>
        <h3 className={styles.forms}>Forms</h3>
        <div className={styles.workflowWrapper}>
          <h3 className={styles.workflow}>Workflow</h3>
        </div>
        <h1 className={styles.h1}>{`>`}</h1>
      </div>
      <div className={styles.tasksParent}>
        <h3 className={styles.tasks}>Tasks</h3>
        <div className={styles.frameWrapper}>
          <div className={styles.rectangleParent}>
            <div className={styles.frameItem} />
            <img
              className={styles.expandSvgrepocomIcon}
              loading="lazy"
              alt=""
              src="/expand-svgrepocom.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.memberJourneyParent}>
        <b className={styles.memberJourney}>Member Journey</b>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameInner} />
          <img
            className={styles.expandSvgrepocomIcon1}
            alt=""
            src="/expand-svgrepocom.svg"
          />
        </div>
      </div>
      <div className={styles.frameContainer}>
        <div className={styles.rectangleContainer}>
          <div className={styles.rectangleDiv} />
          <img
            className={styles.expandSvgrepocomIcon2}
            alt=""
            src="/expand-svgrepocom.svg"
          />
        </div>
        <h3 className={styles.appointments}>Appointments</h3>
      </div>
      <div className={styles.groupDiv}>
        <img
          className={styles.groupIcon}
          loading="lazy"
          alt=""
          src="/group-26.svg"
        />
        <h3 className={styles.engagementPanel}>Engagement Panel</h3>
      </div>
    </div>
  );
};

export default FrameComponent;
