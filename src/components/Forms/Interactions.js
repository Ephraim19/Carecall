import React from "react";
import styles from "../LOGINPAGE.module.css";
import NewInt from "./NewInt";

const Interactions = () => {
  return (
    <div className={styles.logInPage}>
      <NewInt />
    </div>
  );
};

export default Interactions;


// import React, { useState } from "react";
// import carecall from "../carecall.png";
// import DatePicker from "react-datepicker";
// import { ref, push } from "firebase/database";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { database } from "../Firebase";

// const Interactions = () => {
//   const [interaction, setInteraction] = useState("");
//   const [dueDate, setDueDate] = useState(new Date());
//   const [mode, setMode] = useState("");
//   const [call, setCall] = useState("Phone call");
//   const [sms, setSms] = useState("SMS");
//   const [whatsapp, setWhatsapp] = useState("WhatsApp");
//   const [email, setEmail] = useState("Email");

//   const navigate = useNavigate();

//   const dateStrip = (numOfHours, date) => {
//     const dateCopy = new Date(date.getTime());
//     dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
//     const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
//       1,
//       -5
//     );
//     return stringDate;
//   };

//   const NewInteraction = (event) => {
//     event.preventDefault();
//     if (interaction && dueDate) {
//       push(ref(database, "Interaction"), {
//         patient: Cookies.get("patient"),
//         interaction,
//         mode,
//         Hc: Cookies.get("name"),
//         dueDate: dateStrip(3, dueDate),
//       }).then((data) => {
//         console.log(data);
//         navigate("/dashboard");
//       });
//     }
//   };

//   const handleStatus = (e) => {
//     setMode(e.target.value);
//     console.log(e.target.value);
//   }
//   return (
//     <div>
//       <nav className="App-nav">
//         <img src={carecall} alt="logo" className="App-logo" />
//         <form className="App-info"></form>
//       </nav>
//       <form className="newForm">
//         <label>
//           <b>Message:</b> <br />
//           <input
//             type="text"
//             value={interaction}
//             onChange={(e) => setInteraction(e.target.value)}
//           />
//         </label>
//         <br />
//         <br />
//         <label htmlFor="status">
//           <select onChange={handleStatus} >
//             <option className="App-info" value={"outreach"}>
//               Select the mode of outreach 
//             </option>
//             <option className="App-info" value={call}>
//               Phone call
//             </option>
//             <option className="App-info" value={sms}>
//               SMS
//             </option>
//             <option className="App-info" value={whatsapp}>
//               WhatsApp
//             </option>
//             <option className="App-info" value={email}>
//               Email
//             </option>
//           </select>
//         </label>
//         <br />
//         <br />
//         <b>Date</b>
//         <br />
//         <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />

//         <br />
//         <br />
        
//         <button className="App-info" onClick={NewInteraction}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Interactions;
