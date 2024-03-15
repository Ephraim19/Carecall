import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Patient } from "./Forms/Patient";
import { Tasks } from "./Forms/Tasks";
import BloodPressure from "./Forms/BloodPressure";
import Clinicals from "./Forms/Clinicals";
import Interactions from "./Forms/Interactions";
import Prescriptions from "./Forms/Prescriptions";
import Files from "./Forms/Files";
import Bmi from "./Forms/Bmi";
import BloodSugar from "./Forms/BloodSugar";
import AllTasks from "./Forms/AllTasks";
import AllMembers from "./Forms/AllMembers";
import ExternalForm from "./Forms/ExternalForm";
import HealthStatusForm from "./Forms/HealthStatusForm";
import EditStatus from "./Forms/EditStatus";
import HealthStatusEdit from "./Forms/HealthStatusEdit";
import EditClinicals from "./Forms/EditClinicals";
import NewAdded from "./Forms/NewAdded";
import EmailLogin from "./Forms/EmailLogin";
import EmailSignup from "./Forms/EmailSignup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* //<Route path="/" Component={Login} /> */}
        <Route path="/" Component={EmailLogin} />

        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/patient" Component={Patient} />
        <Route path="/new" Component={ExternalForm} />
        <Route path="/task" Component={Tasks} />
        <Route path="/blood" Component={BloodPressure} />
        <Route path="/clinic" Component={Clinicals} />
        <Route path="/interaction" Component={Interactions} />
        <Route path="/prescription" Component={Prescriptions} />
        <Route path="/file" Component={Files} />
        <Route path="/bmi" Component={Bmi} />
        <Route path="/sugar" Component={BloodSugar} />
        <Route path="/alltasks" Component={AllTasks} />
        <Route path="/allmembers" Component={AllMembers} />

        <Route path="/forms/status" Component={HealthStatusForm} />
        <Route path="/edit" Component={EditStatus} />
        <Route path="/edit/status" Component={HealthStatusEdit} />
        <Route path="/hospitals/equityafia/form" Component={ExternalForm} />
        <Route path="/editclinical" Component={EditClinicals} />
        <Route path="/new/added" Component={NewAdded} />
        <Route path="/email/login" Component={EmailLogin} />
        <Route path="/email/signup" Component={EmailSignup} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
