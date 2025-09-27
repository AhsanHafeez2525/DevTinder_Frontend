import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../store/feedSlice';

const UserCard = ({user}) => {
    const {_id, firstName, lastName, photoUrl, about, skills} = user;
    const dispatch = useDispatch();
    
    const handleSendRequest = async (userId, status) => {
      try {
        const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, {withCredentials: true});
        console.log("Request sent successfully:", res.data);
        dispatch(removeFeed(userId));
      } catch (error) {
        console.error("Error sending request:", error);
      }
    }

    const handleIgnore = async (status, userId) => {
      try {
        const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, {withCredentials: true});
        console.log("Request ignored successfully:", res.data);
        dispatch(removeFeed(userId));
      } catch (error) {
        console.error("Error ignoring request:", error);
      }
    }
  return (
<div className="card bg-base-300 w-96 shadow-sm mb-24">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl}
      alt={`${firstName} ${lastName}`} 
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleIgnore("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
