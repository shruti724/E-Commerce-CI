import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`/api/new/password`, {
        password,
        token,
      });

      setMessage(response.data.message);
      console.log("Response: ", response.data)
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (
        err.response &&
        err.response.data.message === "Invalid or expired token"
      ) {
        setError("Your reset token has expired. Please request a new one.");
        setMessage("");
        setTimeout(() => {
          navigate("/reset-password"); 
        }, 5000);
      } else {
        setError("Error resetting password. Try again.");
        setMessage("");
      }
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />

        <label htmlFor="confirm-password">Confirm New Password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />

        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default NewPassword;
