import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import api from "../api";
import { setToken } from "../utils/auth";
import "../style/OtpVerify.css";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { phone, dialCode } = state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    let timer;
    if (resendTimer > 0 && !showResend) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setShowResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer, showResend]);

  // Resend OTP functionality
  const resendOtp = async () => {
    if (isResending) return;

    setIsResending(true);
    setError("");

    try {
      await api.post(
        "/register",
        new URLSearchParams({
          phone,
          dial_code: dialCode,
        })
      );

      // Start 30-second timer
      setResendTimer(30);
      setShowResend(false);
      setIsResending(false);
    } catch (error) {
      setError("Failed to resend OTP");
      setIsResending(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter 6 digit OTP");
      return;
    }

    setError("");

    try {
      const res = await api.post(
        "/login",
        new URLSearchParams({
          phone,
          otp,
          dial_code: dialCode,
        })
      );
      if (res?.data?.status_code === 200) {
        setToken(res.data.data.token);
        navigate("/products");
      }
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="otp-verify-container">
      <div className="otp-verify-card">
        <h1 className="otp-verify-title">OTP Verification</h1>
        <p className="otp-verify-subtitle">
          Enter the verification code we just sent on your Mobile Number.
        </p>

        <div className="otp-input-container">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle="otp-input-wrapper"
            inputStyle="otp-input-box"
            focusStyle="otp-input-focus"
            shouldAutoFocus
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="verify-btn" onClick={verifyOtp}>
          Verify
        </button>

        <div className="resend-section">
          <p className="resend-text">
            Didn't receive code?{" "}
            {showResend ? (
              <button
                className="resend-link"
                onClick={resendOtp}
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            ) : (
              <span className="resend-timer">
                Resend in <span className="timer-count">{resendTimer}s</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
