import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../style/Register.css";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidIndianNumber = (num) => /^[6-9]\d{9}$/.test(num);

  const sendCode = async () => {
    if (!isValidIndianNumber(phone)) {
      setError("Enter valid 10 digit Indian mobile number");
      return;
    }

    try {
      await api.post(
        "/register",
        new URLSearchParams({
          phone,
          dial_code: dialCode,
        })
      );

      navigate("/verify", { state: { phone, dialCode } });
    } catch {
      setError("Failed to send OTP");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 10) {
      setPhone(value);
      setError("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendCode();
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Enter Your Mobile Number</h1>
        <p className="register-subtitle">
          We will send you the 4 digit verification code
        </p>

        <div className="phone-input-container">
          <div className="country-code-selector">
            <span className="country-flag">🇮🇳</span>
            <select 
              className="country-select" 
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+971">+971 (UAE)</option>
            </select>
            <div className="dropdown-arrow">▼</div>
          </div>

          <div className="phone-input-wrapper">
            <input
              className="phone-input"
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              maxLength="10"
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="send-code-btn" onClick={sendCode}>
          Send Code
        </button>
      </div>
    </div>
  );
};

export default Register;