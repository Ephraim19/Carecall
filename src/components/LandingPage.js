import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import carecall from "./carecall.png";

function LandingPage() {
  const cookie = Cookies.get("name");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie) {
      //Cookies.remove("name");
      navigate("/");
    }
  });

  return (
    <div className="landing">
      <img src={carecall} alt="logo" className="App-logo" />
      <h2></h2>
      <button>
        <Link to="/login">sign in</Link>
      </button>
      <Outlet />
    </div>
  );
}

export default LandingPage;
