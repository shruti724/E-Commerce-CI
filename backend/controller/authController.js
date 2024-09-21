const crypto = require("crypto");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("user: ", user._id.toString());

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if there's already an existing valid reset token
    if (user.resetPasswordExpires > Date.now()) {
      return res.status(400).json({
        message: "A reset token is already active. Please check your email.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHashed = await bcrypt.hash(resetToken, 10);
    const expire = Date.now() + 3600000;
    console.log(expire);

    const tokenSent = await User.findByIdAndUpdate(user._id.toString(), {
      resetPasswordToken: resetTokenHashed,
      resetPasswordExpires: expire,
    });

    if (!tokenSent) {
      throw new Error("Failed to update user document");
    }

    // Set the reset token and expiration in cookies
    res.cookie("resetPasswordToken", resetToken, {
      expires: new Date(expire),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("resetoken", req.cookies.resetPasswordToken);

    res.cookie("userData", {
      userdata: user._id.toString(),
    });
    console.log(req.cookies.userData);

    // Send the new reset token via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "dummymail01145@gmail.com",
      subject: "Password Reset",
      text: `You requested a password reset. Click the link below to reset your password:
      http://localhost:3000/reset/${resetToken}
      This link will expire in 1 hour.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email.", tokenSent });
  } catch (error) {
    console.error("Error during password reset:", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};

// Update password using the token

exports.updatePassword = async (req, res) => {
  const { password, token } = req.body;
  const cookieData = req.cookies.resetPasswordToken;
  const userID = req.cookies.userData.userdata;

  console.log("Received token: ", token);
  console.log("Password: ", password);
  console.log("Cookie data: ", cookieData);
  console.log("userID", userID);

  try {
    // Ensure there's a cookie data
    if (!cookieData) {
      return res
        .status(400)
        .json({ message: "No reset token found in cookies" });
    }

    // Ensure the received token matches the cookie token
    if (cookieData !== token) {
      return res.status(400).json({ message: "Token does not match" });
    }

    // Find the user by ID
    const user = await User.findById(userID);
    console.log("id: ", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and remove the reset token fields
    await User.findByIdAndUpdate(userID, {
      password: hashedPassword,
    });

    res.clearCookie("resetPasswordToken");

    res.json({ message: "Password successfully updated." });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ message: "Error updating password.", error: error.message });
  }
};
