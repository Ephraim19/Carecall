import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Patient } from "./Forms/Patient";
import { HealthGoals } from "./Forms/HealthGoals";
import { HealthStatus } from "./Forms/HealthStatus";
import { ActiveCondtions } from "./Forms/ActiveCondtions";
import { ActiveInterventions } from "./Forms/ActiveInterventions";
import { NewPatient } from "./Forms/NewPatient";
import { Tasks } from "./Forms/Tasks";
import BloodPressure from "./Forms/BloodPressure";
import Clinicals from "./Forms/Clinicals";
import Interactions from "./Forms/Interactions";
import Prescriptions from "./Forms/Prescriptions";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/patient" Component={Patient} />
        <Route path="/goals" Component={HealthGoals} />
        <Route path="/status" Component={HealthStatus} />
        <Route path="/conditions" Component={ActiveCondtions} />
        <Route path="/interventions" Component={ActiveInterventions} />
        <Route path="/new" Component={NewPatient} />
        <Route path="/task" Component={Tasks} />
        <Route path="/blood" Component={BloodPressure} />
        <Route path="/clinic" Component={Clinicals} />
        <Route path="/interaction" Component={Interactions} />
        <Route path="/prescription" Component={Prescriptions} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
