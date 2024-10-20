// src/components/Forms/CaptchaVerification.tsx
import React, { useState } from 'react';
import { captchaService } from '../../services/captchaService';

const CaptchaVerification: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleCaptchaResponse = async (response: string) => {
    const valid = await captchaService.verifyCaptcha(response);
    setIsVerified(valid);
  };

  return (
    <div className="captcha-container">
      {/* Replace this with actual Google reCAPTCHA */}
      <p>{isVerified ? 'Captcha Verified' : 'Please complete CAPTCHA'}</p>
      <div onClick={() => handleCaptchaResponse('test-captcha-response')} className="mock-captcha">
        Click to verify
      </div>
    </div>
  );
};

export default CaptchaVerification;
