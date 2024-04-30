import React, { useEffect } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get, off } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Addresses = (addressDisplay) => {
  const [home, setHome] = React.useState("");
  const [office, setOffice] = React.useState("");
  const [geolocation, setGeolocation] = React.useState("");
  const [county, setCounty] = React.useState("");
  const [town, setTown] = React.useState("");
  const [deliveryInstructions, setDeliveryInstructions] = React.useState("");
  const dbRef = ref(database, "Addresses");

  useEffect(() => {
    console.log(addressDisplay.addressDisplay.addressDisplay);
    setHome(addressDisplay.addressDisplay.addressDisplay.home || "");
    setOffice(addressDisplay.addressDisplay.addressDisplay.office || "");
    setCounty(addressDisplay.addressDisplay.addressDisplay.county || "");
    setTown(addressDisplay.addressDisplay.addressDisplay.town || "");
    setDeliveryInstructions(
      addressDisplay.addressDisplay.addressDisplay.deliveryInstructions || ""
    );
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (addressDisplay.addressDisplay.addressDisplay) {
      const updates = {};
      updates[addressDisplay.addressDisplay.addressDisplay.id + "/home"] = home;
      updates[addressDisplay.addressDisplay.addressDisplay.id + "/office"] =
        office;
      updates[addressDisplay.addressDisplay.addressDisplay.id + "/county"] =
        county;
      updates[addressDisplay.addressDisplay.addressDisplay.id + "/town"] = town;
      updates[
        addressDisplay.addressDisplay.addressDisplay.id +
          "/deliveryInstructions"
      ] = deliveryInstructions;
      update(dbRef, updates)
        .then(() => {
          toast.success("Successfully updated data! ");
        })
        .catch((error) => {
          toast.error("Error updating document: ", error);
        });
    } else {
      const data = {
        member: Cookies.get("memberId"),
        home: home,
        office: office,
        geolocation: geolocation,
        county: county,
        town: town,
        deliveryInstructions: deliveryInstructions,
      };
      push(dbRef, data)
        .then(() => {
          toast.success("Successfully added data! ");
        })
        .catch((error) => {
          toast.error("Error adding data: ", error);
        });
    }

    //     e.preventDefault();
    //     const updates = {};
    //     updates[patient.patient.id + "/Phone"] = phone1;
    //     updates[patient.patient.id + "/Phone2"] = phone2;
    //     updates[patient.patient.id + "/email"] = email;
    //     updates[patient.patient.id + "/CareGiver"] = careGiver;
    //     updates[patient.patient.id + "/CareGiverPhone"] = careGiverPhone;
    //     update(dbRef, updates)
    //       .then(() => {
    //         toast.success("Successfully updated data! ");
    //       })
    //       .catch((error) => {
    //         toast.error("Error updating document: ", error);
    //       });
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>Contacts</b>

        <input
          className={styles.firstNameField1}
          placeholder="Home"
          type="text"
          value={home}
          onChange={(e) => setHome(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="OFFICE"
          type="text"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="COUNTY"
          type="text"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />

        <input
          className={styles.emailAddress}
          placeholder="TOWN"
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
        />

        <input
          className={styles.firstNameField11}
          placeholder="DELIVERY INSTRUCTIONS"
          type="text"
          value={deliveryInstructions}
          onChange={(e) => setDeliveryInstructions(e.target.value)}
        />
        {/* <input
          className={styles.lastNameField1}
          placeholder="Caregiver Phone"
          type="text"
          value={careGiverPhone}
          onChange={(e) => setCareGiverPhone(e.target.value)}
        /> */}

        <button className={styles.signUpButton} onClick={onSubmit}>
          <div className={styles.signUpButton1}>
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>SUBMIT DATA</b>
          </div>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Addresses;
