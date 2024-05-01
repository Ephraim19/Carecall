import React from "react";
import styles from "./SIGNUPCREATENEWACCOUNT.module.css";
import FirstNameField from "../FirstNameField";

const EmailSignup = () => {
  return (
    <div className={styles.signUpcreateNewAccount}>
      <FirstNameField />
    </div>
  );
};


export default EmailSignup;

// import React from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../Firebase";
// import { useNavigate, Link } from "react-router-dom";
// import carecall from "../carecall.svg";
// import { database } from "../Firebase";
// import { ref, push, get, update, set } from "firebase/database";

// const EmailSignup = () => {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [password1, setPassword1] = React.useState("");

//   const navigate = useNavigate();
//   const [errorCode, setErrorCode] = React.useState("");
//   const [passwordErrorCode, setPasswordErrorCode] = React.useState("");
//   const [hospital, setHospital] = React.useState("");

//   const handleHospital = (e) => {
//     setHospital(e.target.value);
//     console.log(e.target.value);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== password1) {
//       setPasswordErrorCode("Passwords do not match!");
//     } else {
//       await createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           push(ref(database, hospital + "/" + "Admins"), {
//             admin: userCredential.user.email,
//             hospital: hospital,
//           }).catch((error) => {
//             console.error("Error adding document: ", error);
//           });
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
//           navigate("/email/login");
//           // ...
//         })
//         .catch((error) => {
//           setErrorCode(error.message);
//           const errorMessage = error.message;
//           console.log(errorCode, errorMessage);
//           // ..
//         });
//     }
//   };
//   return (
//     <div>
//       <nav className="App-nav">
//         <img
//           style={{ display: "block", margin: "0 auto" }}
//           src={carecall}
//           alt="logo"
//           className="App-logo"
//         />
//       </nav>

//       <div className="dashboard">
//         <form className="newForm">
//           <h3
//             style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
//           >
//             Admin Registration portal
//           </h3>
//           <label>
//             <b>Email</b> <br />
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>
//           <br />
//           <br />
//           <label>
//             <b>Password</b> <br />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </label>
//           <br />
//           <b style={{ color: "red" }}>{passwordErrorCode}</b>
//           <br />
//           <br />
//           <label>
//             <b>Confirm Password</b> <br />
//             <input
//               type="password"
//               value={password1}
//               onChange={(e) => setPassword1(e.target.value)}
//             />
//           </label>
//           <br />
//           <b style={{ color: "red" }}>{passwordErrorCode}</b>
//           <br />
//           <br />
//           <b>Partner Hospital</b> <br />
//           <label htmlFor="Gender">
//             <select onChange={handleHospital}>
//               <option className="App-info" value="HS" key={"HS"}>
//                 Select Hospital
//               </option>
//               <option
//                 className="App-info"
//                 value="EQA_Nairobi_West_Hospital"
//                 key={"EQA_Nairobi_West_Hospital"}
//               >
//                 EQA Nairobi West Hospital
//               </option>
//               <option
//                 className="App-info"
//                 value="EQA_South_B"
//                 key={"EQA_South_B"}
//               >
//                 EQA South B
//               </option>
//               <option
//                 className="App-info"
//                 value="EQA_Kitengela"
//                 key={"EQA_Kitengela"}
//               >
//                 EQA Kitengela
//               </option>
//             </select>
//           </label>
//           <br />
//           <br />
//           <b style={{ color: "red" }}>{errorCode}</b>
//           <br />
//           <button type="submit" onClick={onSubmit}>
//             Sign up
//           </button>
//           <br />
//           <br />
//           <b>
//             Already have an account? <Link to="/email/login">Login</Link>
//           </b>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmailSignup;
