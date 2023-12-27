import React, { useState } from "react";
import { database } from "../Firebase";
import { set, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export const Patient = ({childData, ageData}) => {
  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  
  const Push = (event) => {
    event.preventDefault();
    if (patient && age) {
      //push data to firebase
      set(
        push(ref(database), {
          patient,
          age,
        }).then((data) => {
          console.log(data.key);
          Cookies.set('FirebaseKey', data.key, { expires: 2 });
          console.log("success");
        })
      ).catch((error) => {
        console.log(error);
      });
      navigate("/dashboard");
    };
  };

  return (
    <div>

    </div>
  );
};
