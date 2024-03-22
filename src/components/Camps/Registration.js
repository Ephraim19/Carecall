import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { ref, push } from "firebase/database";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const Registration = () => {
  const [member, setMember] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [phoneErr, setPhoneErr] = React.useState("");
  const [occupation, setOccupation] = React.useState("");

  const handleSelect = (e) => {
    setGender(e.target.value);
  };

  // React.useEffect(() => {
  //   const camp = Cookies.get("camp");

  // });

  //handlephone change
  const phoneNo = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 10) {
      setPhoneErr("Phone number should be 10 digits");
    } else if (e.target.value.length === 10) {
      setPhoneErr(" ");
    } else {
      setPhoneErr("Please input a valid phone number");
    }
  };

  const Push = (e) => {
    e.preventDefault();
    if (member && Phone && age && gender) {
      push(ref(database, "camps/" + Cookies.get("camp")), {
        member,
        age,
        Phone,
        gender,
        occupation,
      })
        .then(() => {
          toast.success("Data saved successfully");
          setMember("");
          setAge("");
          setPhone("");
          setGender("");
          setOccupation("");
        })
        .catch((error) => {
          toast.error("Data not saved");
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="dashboard">
      <form>
        <h4 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Member Biodata
        </h4>
        <label>
          <b>Member's full name*</b> <br />
          <input
            type="text"
            value={member}
            onChange={(e) => setMember(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <b>Phone number*</b> <br />
          <input
            type="text"
            value={Phone}
            onChange={phoneNo}
            // onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        <b style={{ color: "red" }}>{phoneErr}</b>
        <br />
        <br />
        <label>
          <b>Age</b> <br />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <br />
        <b>Gender</b> <br />
        <label htmlFor="Gender">
          <select onChange={handleSelect}>
            <option className="App-info" value="MF" key={"MF"}>
              Select Gender
            </option>
            <option className="App-info" value="M" key={"M"}>
              Male
            </option>
            <option className="App-info" value="F" key={"F"}>
              Female
            </option>
          </select>
        </label>
        <br />
        <br />
        <label>
          <b>Occupation</b> <br />
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button onClick={Push}>Submit</button>
      </form>
      <div>
        <h4 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Data
        </h4>
        <p>Name:{member}</p>
        <p>Phone number:{Phone}</p>
        <p>Age:{age}</p>
        <p>Gender:{gender}</p>
        <p>Occupation:{occupation}</p>

        <button onClick={Push}>Edit</button>
        <br />
        <br />
        <button onClick={Push}>Add Members</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
