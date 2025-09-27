import React from 'react';
import { useFormik } from 'formik';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from './utils/constants';
import { usePatchApi } from './services/usePatchApi';
import { editProfileSchema } from './validation/editProfileSchema';
import UserCard from './components/UserCard';
const EditProfile = () => {
  const [success, setSuccess] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Custom hook for edit profile API
  const { loading, error, execute: editApi, reset: resetApi } = usePatchApi(`${BASE_URL}/profile/edit`, {
    withCredentials: true
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      photoUrl: user?.photoUrl || '',
      age: user?.age || '',
      gender: user?.gender || '',
      about: user?.about || '',
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      setSuccess('');
      try {
        const responseData = await editApi(values);
        // console.log("Edit Profile Response:", responseData);

        dispatch(setUser(responseData));
        // setSuccess("Profile updated successfully!");

        // Redirect back to profile page after short delay
        setTimeout(() => {
          navigate('/profile');
        }, 800);
      } catch (err) {
        // console.error(err);
      }
    }
  });

  // Auto-hide success toast
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-hide error toast
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        resetApi();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, resetApi]);

  return (
    <>   
    <div className='flex justify-center items-center gap-24 mt-24'>
     <div className="flex justify-center items-center bg-base-200">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.5 }}
        className="card bg-base-300 text-primary-content w-[32rem] p-6"
      >
        <div className="card-body">
          <h2 className="card-title text-center text-3xl mb-4">
            Edit Profile
          </h2>

          <form onSubmit={formik.handleSubmit}>
            {/* First Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered text-white mt-2 text-lg py-3"
                placeholder="Enter first name"
                disabled={loading}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-sm mt-1">
                  {formik.errors.firstName}
                </motion.div>
              )}
            </div>

            {/* Last Name */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white text-lg">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered text-white mt-2 text-lg py-3"
                placeholder="Enter last name"
                disabled={loading}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-sm mt-1">
                  {formik.errors.lastName}
                </motion.div>
              )}
            </div>

            {/* Photo URL */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white text-lg">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formik.values.photoUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered text-white mt-2 text-lg py-3"
                placeholder="Enter photo URL"
                disabled={loading}
              />
              {formik.touched.photoUrl && formik.errors.photoUrl && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-sm mt-1">
                  {formik.errors.photoUrl}
                </motion.div>
              )}
            </div>

            {/* Age */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white text-lg">Age</span>
              </label>
              <input
                type="number"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered text-white mt-2 text-lg py-3"
                placeholder="Enter your age"
                disabled={loading}
              />
              {formik.touched.age && formik.errors.age && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-sm mt-1">
                  {formik.errors.age}
                </motion.div>
              )}
            </div>

            {/* Gender */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white text-lg">Gender</span>
              </label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="select select-bordered text-white mt-2 text-lg py-3"
                disabled={loading}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-sm mt-1">
                  {formik.errors.gender}
                </motion.div>
              )}
            </div>

            {/* About */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white text-lg">About</span>
              </label>
              <textarea
                name="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="textarea textarea-bordered text-white mt-2 text-lg py-3"
                placeholder="Tell us about yourself..."
                disabled={loading}
              />
              {formik.touched.about && formik.errors.about && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-sm mt-1">
                  {formik.errors.about}
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Toasts */}
      <div className="toast toast-bottom toast-end z-50">
        {success && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="alert alert-success shadow-lg">
            <span>{success}</span>
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="alert alert-error shadow-lg">
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
    <UserCard user={formik.values} />
    </div>
    </>

  );
};

export default EditProfile;
