// import React from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { motion } from "motion/react"
// import { loginSchema } from './validation/loginSchema';
// const Login = () => {
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState('');
//   const [success, setSuccess] = React.useState('');

//   const formik = useFormik({
//     initialValues: {
//       email: 'dhone12@gmail.com',
//       password: 'Dhoni@78901122!'
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//       setLoading(true);
//       setError('');
//       setSuccess('');

//       try {
//         // Added a minimum loading time of 1 second to prevent flash
//         const [response] = await Promise.all([
//           axios.post('http://localhost:3000/login', {
//             emailId: values.email,
//             password: values.password
//           },{
//              withCredentials: true
//          }
//         ),
//           new Promise(resolve => setTimeout(resolve, 1000)) // Minimum loading time
//         ]);

//         console.log('API Response:', response.data);
//         setSuccess('Login successful!');
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || 'Login failed. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   });

//   // Auto-hide toast after 3 seconds
//   React.useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => {
//         setSuccess('');
//         setError('');
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <div className="card bg-base-300 text-primary-content w-[28rem] p-6">
//         <div className="card-body">
//           <h2 className="card-title text-center text-3xl mb-4">
//             Welcome to DevTinder
//           </h2>

//           <form onSubmit={formik.handleSubmit}>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-white text-lg">Email</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 placeholder="Enter your email"
//                 className="input input-bordered text-white mt-2 placeholder-white text-lg py-3"
//                 disabled={loading}
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <div className="text-error text-sm mt-1">{formik.errors.email}</div>
//               )}
//             </div>

//             <div className="form-control mt-6">
//               <label className="label">
//                 <span className="label-text text-white text-lg">Password</span>
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 placeholder="Enter your password"
//                 className="input input-bordered text-white mt-2 placeholder-white text-lg py-3"
//                 disabled={loading}
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-error text-sm mt-1">{formik.errors.password}</div>
//               )}
//             </div>
            
//             <div className="card-actions justify-center mt-8 pr-8">
//   <button
//     type="submit"
//     className="btn btn-accent btn-lg w-80"
//     disabled={loading || !formik.isValid}
//   >
//     {loading ? (
//       <>
//         <span className="loading loading-spinner"></span>
//         Logging in...
//       </>
//     ) : (
//       "Login"
//     )}
//   </button>
// </div>

//           </form>
//         </div>
//       </div>
      
//       {/* Toast notifications outside the card for better positioning */}
//       <div className="toast toast-top toast-end">
//         {success && (
//           <div className="alert alert-success">
//             <span>{success}</span>
//           </div>
//         )}
//         {error && (
//           <div className="alert alert-error">
//             <span>{error}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from "framer-motion";
import { loginSchema } from './validation/loginSchema';

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: 'dhone12@gmail.com',
      password: 'Dhoni@78901122!'
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      setSuccess('');

      try {
        // Added a minimum loading time of 1 second to prevent flash
        const [response] = await Promise.all([
          axios.post('http://localhost:3000/login', {
            emailId: values.email,
            password: values.password
          }, {
            withCredentials: true
          }),
          new Promise(resolve => setTimeout(resolve, 1000)) // Minimum loading time
        ]);

        console.log('API Response:', response.data);
        setSuccess('Login successful!');
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  // Auto-hide toast after 3 seconds
  React.useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

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
          </form>
        </div>
      </motion.div>
      
      {/* Toast notifications with motion */}
      <div className="toast toast-top toast-end">
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="alert alert-success"
          >
            <span>{success}</span>
          </motion.div>
        )}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="alert alert-error"
          >
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Login;