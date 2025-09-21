import React from 'react';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log("redux user navabr=>", user);
  const isLoggedIn = user && user.firstName; 
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.5
      }}
      className="navbar bg-base-300 shadow-sm"
    >
      <div className="flex-1">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          className="btn btn-ghost text-xl"
        >
          👨🏻‍💻 DevTinder
        </motion.a>
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
                src={user.photoUrl}
              />
            </div>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <motion.a 
                whileHover={{ x: 5 }}
                className="justify-between"
              >
                Profile
                <span className="badge">New</span>
              </motion.a>
            </li>
            <li>
              <motion.a 
                whileHover={{ x: 5 }}
              >
                Settings
              </motion.a>
            </li>
            <li>
              <motion.a 
                whileHover={{ x: 5 }}
              >
                Logout
              </motion.a>
            </li>
          </motion.ul>
        </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;