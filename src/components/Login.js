import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import carecall from "./carecall.png";
import { ref, push, get } from "firebase/database";
import { database } from "./Firebase";

const Login = () => {
  const navigate = useNavigate();
  const dbRef = ref(database, "HealthCordinator");
  const [hc, setHc] = useState("");

  useEffect(() => {
    //read HC
    let dataArray = [];

    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          setHc(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        Cookies.set("name", user.email, { expires: 7 });

        if (hc) {
          let obj = hc.find((name) => name.user === user.email);

          if (!obj) {
            push(ref(database, "HealthCordinator"), {
              user: user.email,
              tasks: 0,
            });
          }
        }else{
          push(ref(database, "HealthCordinator"), {
            user: user.email,
            tasks: 0,
          });
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="landing">
        <img src={carecall} alt="logo" className="App-logo" />
      </div>
      <div className="google">
        <button onClick={signIn}>sign in with google</button>
      </div>
    </div>
  );
};

export default Login;
