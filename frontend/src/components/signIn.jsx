import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigate("/add-employees");
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  if (loading) {
    return (
      <div className="loaderCont">
        <div class="loader"></div>
      </div>
    );
  }

  return (
    <div className="formContainer">
      <h1>WELCOME BACK</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User name</label>
        <input
          id="username"
          name="username"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="submitBtn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
