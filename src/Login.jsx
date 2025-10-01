import React from 'react';
import { useFormik } from 'formik';
import { motion } from "framer-motion";
import { loginSchema } from './validation/loginSchema';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from './utils/constants';
import { usePostApi } from './services/usePostApi';
// const BASE_URL = import.meta.env.BASE_URL || 'http://localhost:3000/login';

const Login = () => {
  const [success, setSuccess] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use the custom hook for API calls
  const { loading, error, execute: loginApi, reset: resetApi } = usePostApi(`${BASE_URL}/login`, {
    withCredentials: true
  });

  const formik = useFormik({
    initialValues: {
      email: ' ',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setSuccess('');

      try {
        const responseData = await loginApi({
          emailId: values.email,
          password: values.password
        });

        // console.log('API Response:', responseData);
        dispatch(setUser(responseData.data));
        setSuccess('Login successful!');
        
        // Show toast for a moment before navigating
        setTimeout(() => {
          navigate('/');
        }, 600);
      } catch (err) {
        console.error('Login error:', err);
        // Error is already handled by the custom hook
      }
    }
  });

  // Auto-hide toast after 1.5 seconds (matches navigation delay)
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 1500);
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
          <h2 className="card-title text-center text-3xl mb-4">
            Welcome to DevTinder
          </h2>

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

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text text-white text-lg">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className="input input-bordered text-white mt-2 placeholder-white text-lg py-3"
                disabled={loading}
              />
              {formik.touched.password && formik.errors.password && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-1"
                >
                  {formik.errors.password}
                </motion.div>
              )}
            </div>
            
            <div className="card-actions justify-center mt-8 pr-8">
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </motion.button>
            </div>

            {/* Forgot Password link */}
            <div className="text-center mt-4">
              <motion.button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="link link-accent text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot Password?
              </motion.button>
            </div>

            {/* Register link */}
            <div className="text-center mt-2">
              <span className="text-white">Don't have an account? </span>
              <motion.button
                type="button"
                onClick={() => navigate('/signup')}
                className="link link-accent text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
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

export default Login;