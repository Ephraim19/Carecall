import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Forms = () => {
  const [cookie, setCookie] = useState("");

  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [hospital, setHospital] = useState("");
  const [medication, setMedication] = useState("");
  const [carecall, setCarecall] = useState("");

  useEffect(() => {
    setCookie(Cookies.get("userId"));
  }, [cookie]);

  return <div>Forms</div>;
};

export default Forms;
