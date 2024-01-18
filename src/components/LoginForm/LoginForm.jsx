import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginForm.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiBaseURL } from "../../configs/api";

const LoginForm = ({ openLoginForm, setOpenLoginForm }) => {
  const [timer, setTimer] = useState(59);
  const [buttonText, setButtonText] = useState("Submit");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [userDetails, setUserDetails] = useState({
    phoneNumber: "",
    email: "",
    name: "",
    vehichleNumber: "",
  });

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
    });

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;

    if (phoneRegex.test(value)) {
      setPhoneNumberError(false);
    } else {
      setPhoneNumberError(true);
    }
  };

  const handleInputChange = (field, value, validator) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));

    if (validator) {
      validator(value);
    }
  };

  const handleNextButtonClick = async () => {
    try {
      const response = await axios.post(apiBaseURL + "/saveUserDetails", {
        ...userDetails,
        phoneNumber: "91" + userDetails.phoneNumber,
      });

      if (response.status === 201) {
        console.log("User details saved successfully!");
        setIsFormSubmitted(true);
        setTimer(59);
        sessionStorage.setItem("phoneNumber", userDetails.phoneNumber);
      } else {
        console.error("Failed to save user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const storedPhoneNumber = sessionStorage.getItem("phoneNumber");

      const response = await axios.post(apiBaseURL + "/verifyOTP", {
        phoneNumber: "91" + storedPhoneNumber,
        otp: Array.from(document.querySelectorAll(".otp input"))
          .map((input) => input.value)
          .join(""),
      });

      if (response.status === 200) {
        console.log("OTP verified successfully!");
        setOpenLoginForm(false);
        notify("OTP verified Successfully");
      } else {
        console.error("Failed to verify OTP");
        notify("Invalid OTP !");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resendOTP = async (resendOTP = true) => {
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber");

    const response = await axios.post(apiBaseURL + "/verifyOTP", {
      phoneNumber: "91" + storedPhoneNumber,
      resendOTP,
    });

    if (response.status === 200) {
      console.log("OTP resend successfully!");
      setButtonText("Submit");
    } else {
      console.error("Failed to resend OTP");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isFormSubmitted, timer]);

  useEffect(() => {
    if (timer === 0) {
      setButtonText("Resend OTP");
    }
  }, [timer]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <>
      <div className="login-form">
        <div className="login-heading">
          <h5>Want to buy a car ?</h5>
          <p>
            {isFormSubmitted
              ? "Enter OTP to verify your number"
              : "Please fill out the details"}
          </p>
          <div className="close-icon">
            <CloseOutlinedIcon
              onClick={() => setOpenLoginForm(!openLoginForm)}
            />
          </div>
        </div>
        {isFormSubmitted ? (
          <div className="otp-inputs">
            <div className="otp">
              {/* <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" /> */}
              <OtpInput />
            </div>
            <p>
              OTP will expire with in <span>{`00:${formatTime(timer)}`}</span>
            </p>
            <button
              className="submit-button"
              onClick={buttonText === "Submit" ? handleOTPSubmit : resendOTP()}
            >
              {buttonText}
            </button>
            <ToastContainer />
          </div>
        ) : (
          <div className="form-inputs">
            <TextField
              id="outlined-phone-number"
              label="Enter your number *"
              type="text"
              value={userDetails.phoneNumber}
              onChange={(e) =>
                handleInputChange(
                  "phoneNumber",
                  e.target.value,
                  validatePhoneNumber
                )
              }
              error={phoneNumberError}
              helperText={phoneNumberError ? "Invalid phone number" : ""}
              sx={{
                marginBottom: 2,
                height: "10px",
                borderRadius: "10px",
              }}
            />

            <TextField
              id="outlined-name"
              label="Enter your name"
              type="text"
              value={userDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              sx={{
                marginBottom: 2,
                height: "10px",
                borderRadius: "10px",
              }}
            />

            <TextField
              id="outlined-email"
              label="Enter your email"
              type="text"
              value={userDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              sx={{
                marginBottom: 2,
                height: "10px",
                borderRadius: "10px",
              }}
            />

            <TextField
              id="outlined-vehicle"
              label="Enter Vehicle Number"
              type="text"
              value={userDetails.vehicleNumber}
              onChange={(e) =>
                handleInputChange("vehicleNumber", e.target.value)
              }
              sx={{
                marginBottom: 2,
                height: "10px",
                borderRadius: "10px",
              }}
            />

            <button className="next-button" onClick={handleNextButtonClick}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = Array.from({ length: 4 }, () => React.createRef());

  const handleInputChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      // Move to the next input
      if (index < 3 && value !== "") {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleInputKeyDown = (index, event) => {
    // Move to the previous input on backspace
    if (event.key === "Backspace" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="otp">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
          ref={inputRefs[index]}
        />
      ))}
    </div>
  );
};

export default LoginForm;
