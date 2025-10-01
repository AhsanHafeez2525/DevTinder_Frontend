import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { motion } from "framer-motion";
import { otpSchema } from './validation/otpSchema';
import { useNavigate, useLocation } from 'react-router';
import { BASE_URL } from './utils/constants';
import { usePostApi } from './services/usePostApi';

const OTP = () => {
  const [success, setSuccess] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  
  // Get email from location state or redirect to login
  const email = location.state?.email;
  
  // Use the custom hook for API calls
  const { loading, error, execute: verifyOtpApi, reset: resetApi } = usePostApi(`${BASE_URL}/verify-otp`, {
    withCredentials: true
  });

  const { loading: resendLoading, execute: resendOtpApi } = usePostApi(`${BASE_URL}/resend-otp`, {
    withCredentials: true
  });

  // Redirect to login if no email
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      setSuccess('');

      try {
        const responseData = await verifyOtpApi({
          emailId: email,
          otp: values.otp
        });

        setSuccess('OTP verified successfully!');
        
        // Show success message and navigate
        setTimeout(() => {
          navigate('/change-password', { state: { email } });
        }, 1000);
      } catch (err) {
        // Error is already handled by the custom hook
      }
    }
  });

  const handleOtpChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Update formik value
    const otpString = newOtpValues.join('');
    formik.setFieldValue('otp', otpString);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtpValues = pastedData.split('');
      setOtpValues(newOtpValues);
      formik.setFieldValue('otp', pastedData);
      
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtpApi({ emailId: email });
      setSuccess('OTP resent successfully!');
    } catch (err) {
      // Error is already handled by the custom hook
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-hide error toast after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        resetApi();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, resetApi]);

  if (!email) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      {/* Card with motion animation */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          duration: 0.5
        }}
        className="card bg-base-300 text-primary-content w-[28rem] p-6"
      >
        <div className="card-body">
          <h2 className="card-title text-center text-3xl mb-2">
            Verify OTP
          </h2>
          
          <p className="text-center text-white/80 mb-6">
            We've sent a 6-digit code to<br />
            <span className="font-semibold text-accent">{email}</span>
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">Enter OTP</span>
              </label>
              
              <div className="flex justify-center gap-3 mt-4">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="input input-bordered text-white text-center text-2xl font-bold w-12 h-12"
                    disabled={loading}
                  />
                ))}
              </div>
              
              {formik.touched.otp && formik.errors.otp && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-2 text-center"
                >
                  {formik.errors.otp}
                </motion.div>
              )}
            </div>
            
            <div className="card-actions justify-center mt-8">
              <motion.button
                type="submit"
                className="btn btn-accent btn-lg w-80"
                disabled={loading || formik.values.otp.length !== 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </motion.button>
            </div>

            {/* Resend OTP */}
            <div className="text-center mt-4">
              <span className="text-white/80">Didn't receive the code? </span>
              <motion.button
                type="button"
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="link link-accent text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </motion.button>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-2">
              <motion.button
                type="button"
                onClick={() => navigate('/login')}
                className="link link-accent text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Login
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
      
      {/* Toast notifications with motion */}
      <div className="toast toast-bottom toast-end z-50">
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="alert alert-success shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </motion.div>
        )}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="alert alert-error shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OTP;
