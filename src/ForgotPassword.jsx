import React from 'react';
import { useFormik } from 'formik';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
import { BASE_URL } from './utils/constants';
import { usePostApi } from './services/usePostApi';
import * as Yup from 'yup';

// Validation schema for forgot password
const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
});

const ForgotPassword = () => {
  const [success, setSuccess] = React.useState('');
  const navigate = useNavigate();
  
  // Use the custom hook for API calls
  const { loading, error, execute: forgotPasswordApi, reset: resetApi } = usePostApi(`${BASE_URL}/forgot-password`);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setSuccess('');

      try {
        await forgotPasswordApi({
          emailId: values.email
        });

        setSuccess('OTP sent to your email!');
        
        // Show success message for a moment before navigating to OTP screen
        setTimeout(() => {
          navigate('/otp', { state: { email: values.email } });
        }, 2000);
      } catch (err) {
        // Error is already handled by the custom hook
      }
    }
  });

  // Auto-hide success toast after 2 seconds
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-hide error toast after 3 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        resetApi(); // Clear error state
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, resetApi]);

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
            Forgot Password
          </h2>
          
          <p className="text-center text-white/80 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
                className="input input-bordered text-white mt-2 placeholder-white text-lg py-3"
                disabled={loading}
              />
              {formik.touched.email && formik.errors.email && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-1"
                >
                  {formik.errors.email}
                </motion.div>
              )}
            </div>
            
            <div className="card-actions justify-center mt-8">
              <motion.button
                type="submit"
                className="btn btn-accent btn-lg w-80"
                disabled={loading || !formik.isValid}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            </div>

            {/* Back to Login link */}
            <div className="text-center mt-4">
              <span className="text-white">Remember your password? </span>
              <motion.button
                type="button"
                onClick={() => navigate('/login')}
                className="link link-accent text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Login
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

export default ForgotPassword;
