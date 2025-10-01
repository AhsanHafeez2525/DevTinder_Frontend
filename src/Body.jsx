import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate, useLocation } from 'react-router'
import Footer from './Footer'
import { BASE_URL } from './utils/constants'
import { setUser } from './store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    // Only fetch user data if we don't have it in the store
    if (userData && userData.firstName) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      dispatch(setUser(response.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response?.status === 401) {
        // Only redirect to login if not already on a public page
        if (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot-password') {
          navigate('/login');
        }
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If no user data and not on a public page, don't render (will redirect to login)
  if (!userData || !userData.firstName) {
    if (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot-password') {
      return null;
    }
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
