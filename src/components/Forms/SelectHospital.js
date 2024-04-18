import styles from "./ACCOUNTCREATEDSUCCESSFULLY.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const SelectHospital = () => {
  const navigate = useNavigate();
  const logIn = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className={styles.accountCreatedSuccessfully}>
      <div className={styles.resetPasswordField}>
        <div className={styles.resetPasswordFieldInner}>
          <div className={styles.carecallParent}>
            <h1 className={styles.carecall}>CareCall</h1>
            <div className={styles.connectedContinuousCareWrapper}>
              <b className={styles.connectedContinuousCare}>
                Connected. Continuous. Care
              </b>
            </div>
          </div>
        </div>
        <div className={styles.liParent}>
          <div className={styles.li}>
            <b className={styles.yourAccountHas}>Select partner facility</b>
          </div>

          <form className={styles.logInToYourCarecallAccounParent}>
            <label htmlFor="Hos">
              <select className={styles.emailFieldForLogin}>
                <option value="HS" key={"HS"}>
                  Select Hospital
                </option>
                <option
                  className="App-info"
                  value="EQA_Nairobi_West_Hospital"
                  key={"EQA_Nairobi_West_Hospital"}
                >
                  EQA Nairobi West
                </option>
                <option
                  className="App-info"
                  value="EQA_South_B"
                  key={"EQA_South_B"}
                >
                  EQA South B
                </option>
                <option
                  className="App-info"
                  value="EQA_Kitengela"
                  key={"EQA_Kitengela"}
                >
                  EQA Kitengela
                </option>
              </select>
            </label>
          </form>
          <div className={styles.bottomNavigationWrapper}>
            <div className={styles.bottomNavigation}>
              <b onClick={logIn} className={styles.clickHere}>
                Click here
              </b>
              <div className={styles.toLogIn}>to sign up.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectHospital;
