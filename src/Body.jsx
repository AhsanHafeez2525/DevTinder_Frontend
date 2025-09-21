import React,{useEffect} from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { BASE_URL } from './utils/constants'
import { setUser } from './store/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if(userData) return;
    try{
    const response = await axios.get(BASE_URL + '/profile/view',{withCredentials: true});
      console.log(response.data);
      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
      if(error.status === 401){
        navigate('/login');
      }
    }
  }
  useEffect(() => {
      fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
