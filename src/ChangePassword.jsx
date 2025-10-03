import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { motion } from "framer-motion";
import { changePasswordSchema } from './validation/changePasswordSchema';
import { useNavigate, useLocation } from 'react-router';
import { BASE_URL } from './utils/constants';
import { usePostApi } from './services/usePostApi';
const ChangePassword = () => {
  const [success, setSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from location state or redirect to login
  const email = location.state?.email;
  
  // Use the custom hook for API calls
  const { loading, error, execute: changePasswordApi, reset: resetApi } = usePostApi(`${BASE_URL}/change-password`, {
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
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      setSuccess('');

      try {
        const responseData = await changePasswordApi({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        });

        setSuccess('Password changed successfully!');
        
        // Show success message and navigate to login
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } catch (err) {
        // Error is already handled by the custom hook
      }
    }
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
            Change Password
          </h2>
          
          <p className="text-center text-white/80 mb-6">
            Create a new password for<br />
            <span className="font-semibold text-accent">{email}</span>
          </p>

          <form onSubmit={formik.handleSubmit}>
            {/* Current Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">Current Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswords.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter current password"
                  className="input input-bordered text-white mt-2 placeholder-white text-lg py-3 w-full pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('currentPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  disabled={loading}
                >
                  {showPasswords.currentPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formik.touched.currentPassword && formik.errors.currentPassword && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-1"
                >
                  {formik.errors.currentPassword}
                </motion.div>
              )}
            </div>

            {/* New Password */}
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text text-white text-lg">New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter new password"
                  className="input input-bordered text-white mt-2 placeholder-white text-lg py-3 w-full pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  disabled={loading}
                >
                  {showPasswords.newPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-1"
                >
                  {formik.errors.newPassword}
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text text-white text-lg">Confirm New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm new password"
                  className="input input-bordered text-white mt-2 placeholder-white text-lg py-3 w-full pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  disabled={loading}
                >
                  {showPasswords.confirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-1"
                >
                  {formik.errors.confirmPassword}
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
                    Changing Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </motion.button>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-4">
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

export default ChangePassword;
