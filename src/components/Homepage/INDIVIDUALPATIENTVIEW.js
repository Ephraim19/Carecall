import FrameComponent7 from "./FrameComponent7";
import styles from "./INDIVIDUALPATIENTVIEW.module.css";


const INDIVIDUALPATIENTVIEW = () => {
  return (
    <div className={styles.individualPatientView}>
      <FrameComponent7 />
      <main className={styles.frameParent}>
        <div className={styles.frameChild} />
        <div className={styles.frame5defaultWrapper}>
          <div className={styles.frame5default}>
            <div className={styles.frame5defaultChild} />
          </div>
        </div>
        <div className={styles.frameItem} />
      </main>
    </div>
  );
};

export default INDIVIDUALPATIENTVIEW;
