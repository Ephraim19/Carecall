import styles from "./FrameComponent7.module.css";
import carecall from "../carecall.png";
import { FaSearchPlus} from "react-icons/fa";

const FrameComponent7 = () => {
  return (
    <div className={styles.individualPatientViewInner}>
      <header className={styles.frameParent}>
        <div className={styles.careCallLogoWrapper}>
          <div className={styles.careCallLogo}>
            <img
              className={styles.carecallLogoIcon}
              loading="lazy"
              alt=""
              src={carecall}
            />
            <div className={styles.careCallLogoInner}>
              <div className={styles.carecallParent}>
                <h1 className={styles.carecall}>CareCall</h1>
                <div className={styles.connectedContinuousCareWrapper}>
                  <b className={styles.connectedContinuousCare}>
                    Connected. Continuous. Care
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.frameGroup}>
          <div className={styles.vectorWrapper}>
            <FaSearchPlus className={styles.vectorIcon} />
          </div>
          <div className={styles.search}>Search</div>
        </button>
        <div className={styles.frameChild} />
      </header>
      
    </div>
  );
};

export default FrameComponent7;
