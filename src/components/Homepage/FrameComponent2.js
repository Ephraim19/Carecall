import React, { useEffect, useState } from "react";
import "./FrameComponent2.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import InsuranceEmployer from "../HomepageForms/InsuranceEmployer";
import Family from "../HomepageForms/Family";
const FrameComponent2 = (familyDisplay) => {
  // useEffect(() => {
  //   console.log(familyDisplay.familyDisplay[0].id);
  // }, [familyDisplay]);

  return (
    <div className="frame-parent22">
      <div className="frame-parent23">
        <div className="household-parent">
          <h3 className="household">Household</h3>
          <div className="frame-wrapper10">
            <Popup
              trigger={
                <button className="rectangle-parent4">
                  <div className="frame-child5" />
                  <div className="edit4">{familyDisplay.familyDisplay.length > 0 ? "EDIT":"ADD"}</div>
                </button>
              }
              position="right center"
              contentStyle={{ width: "auto", maxWidth: "600px" }}
            >
              <Family familyDisplay ={familyDisplay} />
            </Popup>
          </div>
        </div>
        <div className="rectangle-parent5">
          <div className="frame-child6" />
          <div className="felix-wandera-37-parent">
            <div className="felix-wandera-37">{familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].primaryMember : "--"}, {familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].age1 : "--"}</div>
            <div className="primary-member">Primary member</div>
          </div>
          <div className="frame-wrapper11">
            <div className="vector-parent">
              <img className="rectangle-icon" alt="" src="/rectangle-4.svg" />
              <b className="active1">ACTIVE</b>
            </div>
          </div>
        </div>
      </div>
      <div className="rectangle-parent6">
        <div className="frame-child7" />
        <div className="mary-akinyi-35-parent">
          <div className="mary-akinyi-35">{familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].spouse : "--"}, {familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].primaryMember : "--"}, {familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].age2 : "--"}</div>
          <div className="spouse">Spouse</div>
        </div>
        <div className="frame-wrapper12">
          <div className="vector-group">
            <img className="frame-child8" alt="" src="/rectangle-4.svg" />
            <b className="inactive">INACTIVE</b>
          </div>
        </div>
      </div>
      <div className="rectangle-parent7">
        <div className="frame-child9" />
        <div className="henry-wandera-10-parent">
          <div className="henry-wandera-10">{familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].child : "--"} ,  {familyDisplay.familyDisplay.length > 0 ? familyDisplay.familyDisplay[0].age3 : "--"}</div>
          <div className="child">Child</div>
        </div>
        <div className="frame-wrapper13">
          <div className="vector-container">
            <img className="frame-child10" alt="" src="/rectangle-4.svg" />
            <b className="not-onboarded">NOT ONBOARDED</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
