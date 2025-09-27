import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { removeUser } from "./store/userSlice";
import { useNavigate } from "react-router";
const MotionLink = motion.create(Link);
const Navbar = () => {
  const user = useSelector((store) => store.user);
  // console.log("redux user navbar=>", user);
  // console.log("user.firstName=>", user?.firstName);
  // console.log("user.photoUrl=>", user?.photoUrl);
  const isLoggedIn = user && user.firstName;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // http://localhost:3000/logout
    try {
      const res = await axios.post(BASE_URL + "/logout", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(removeUser());

      return navigate("/login");
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      }}
      className="navbar bg-base-300 shadow-sm"
    >
      <div className="flex-1">
        <MotionLink
          to="/"
          whileHover={{ scale: 1.05 }}
          className="btn btn-ghost text-xl"
        >
          👨🏻‍💻 DevTinder
        </MotionLink>
      </div>
      <div className="flex gap-2">
        {/* {user && ( */}
        {isLoggedIn && (
          <div className="dropdown dropdown-end mx-5 flex">
            <p className="text-white mt-2 mr-4">Welcome, {user.firstName}</p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={
                    user.photoUrl || "https://via.placeholder.com/40x40?text=U"
                  }
                />
              </div>
            </motion.div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <MotionLink
                  to="/profile"
                  whileHover={{ x: 5 }}
                  className="justify-between"
                >
                  Profile
                  <span className="badge">New</span>
                </MotionLink>
              </li>
              <li>
                <MotionLink to="/connections" whileHover={{ x: 5 }}>
                  Connections
                </MotionLink>
              </li>
              <li>
                <MotionLink to="/requests" whileHover={{ x: 5 }}>
                  Requests
                </MotionLink>
              </li>
              <li>
                <motion.a onClick={handleLogout} whileHover={{ x: 5 }}>
                  Logout
                </motion.a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
