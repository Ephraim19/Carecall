import "./FrameComponent3.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Family from "../HomepageForms/Family";
import Addresses from "../HomepageForms/Addresses";

const FrameComponent3 = (addressDisplay) => {
  return (
    <div className="frame-parent21">
      <div className="layout-combinator-parent">
        <div className="layout-combinator">
          <div className="color-palette">
            <h3 className="addresses">Addresses</h3>
            <div className="home">HOME</div>
          </div>
          <div className="layout-combinator-inner">
            <Popup
              trigger={
                <button className="rectangle-parent3">
                  <div className="frame-child4" />
                  <div className="edit3">
                    {" "}
                    {addressDisplay.addressDisplay ? "EDIT" : "ADD"}
                  </div>
                </button>
              }
              position="right center"
              contentStyle={{ width: "auto", maxWidth: "600px" }}
            >
              <Addresses addressDisplay ={addressDisplay} />
            </Popup>
          </div>
        </div>
        <div className="court-316-kiu">
          {addressDisplay.addressDisplay
            ? addressDisplay.addressDisplay.home
            : "--"}
        </div>
      </div>
      <div className="office-parent">
        <div className="office">OFFICE</div>
        <div className="th-ave-suits">
          {addressDisplay.addressDisplay
            ? addressDisplay.addressDisplay.office
            : "--"}
        </div>
      </div>
      <div className="geolocation-parent">
        <div className="geolocation">GEOLOCATION</div>
        <div className="open-in-maps">Open in Maps</div>
      </div>
      <div className="star-shape">
        <div className="star-shape-inner">
          <div className="county-parent">
            <div className="county">COUNTY</div>
            <div className="nairobi-county">
              {addressDisplay.addressDisplay
                ? addressDisplay.addressDisplay.county
                : "--"}
            </div>
          </div>
        </div>
        <div className="path-exclusion">
          <div className="town">TOWN</div>
          <div className="nairobi">
            {addressDisplay.addressDisplay
              ? addressDisplay.addressDisplay.town
              : "--"}
          </div>
        </div>
      </div>
      <div className="image-importer">
        <div className="delivery-instructions">DELIVERY INSTRUCTIONS</div>
        <div className="always-deliver-at">
          {addressDisplay.addressDisplay
            ? addressDisplay.addressDisplay.deliveryInstructions
            : "--"}
        </div>
      </div>
    </div>
  );
};

export default FrameComponent3;
