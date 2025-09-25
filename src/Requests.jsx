import React from "react";
import { setRequests } from "./store/RequestSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import UserCard from "./components/UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.requests);
  const fecthRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(setRequests(res.data.data));
  };
  useEffect(() => {
    fecthRequests();
  }, []);
  if (!requests) return null;
  if (requests.length === 0) return <h1>No requests found</h1>;
  return (
    <div>
      <h1>Requests</h1>
      {requests.map((request) => (
        <UserCard key={request._id} user={request} />
      ))}
    </div>
  );
};

export default Requests;
