// src/components/Login/OTPInput.tsx

import React, { useState } from 'react';

interface OTPInputProps {
  onVerify: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value);

  const handleOtpSubmit = () => {
    onVerify(otp);
  };

  return (
    <div className="otp-input">
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleOtpChange}
        maxLength={6}
      />
      <button onClick={handleOtpSubmit} className="btn-primary">Verify</button>
    </div>
  );
};
