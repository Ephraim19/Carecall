import styles from "./ACCOUNTCREATEDSUCCESSFULLY.module.css";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import Cookies from "js-cookie";

const ACCOUNTCREATEDSUCCESSFULLY = () => {
  const [hospital, setHospital] = React.useState("");
  const navigate = useNavigate();
  const logIn = useCallback(() => {
    navigate("/email/signup");
  }, [navigate]);

  const partnerName = (e) => {
    setHospital(e.target.value);
    Cookies.set("hospital", e.target.value, { expires: 1 });
  };

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
            <b className={styles.yourAccountHas}>Partner facility</b>
          </div>

          <div className={styles.li1}>
            <b className={styles.yourAccountHas1}></b>
            <form className={styles.logInToYourCarecallAccounParent}>
              <label htmlFor="Hos">
                <select
                  className={styles.emailFieldForLogin}
                  onChange={partnerName}
                >
                  <option value="HS" key={"HS"}>
                    Select the partner facility you represent
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
          </div>

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

export default ACCOUNTCREATEDSUCCESSFULLY;
