// ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import './style.css'

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to request password reset link
      const response = await axios.post("/api/reset/password", { email });
      setMessage(response.data.message);
      
      console.log("sending email: ",email);
      console.log(response)
      setError("");
    } catch (err) {
      setError("Error sending reset link. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;
