import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { setRequests } from "./store/RequestSlice";
import { useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.request.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localRequests, setLocalRequests] = useState([]);

  const reviewRequest = async (_id, action, status) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{}, {withCredentials: true});
      console.log("Review request response:", res.data);
      fetchRequests();
    } catch (err) {
      console.error("Error reviewing request:", err);
      setError("Failed to review request. Please try again.");
    }
  }

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching requests from API...");
      
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      
      console.log("API Response:", res.data);
      
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        console.log("Dispatching requests to Redux:", res.data.data);
        dispatch(setRequests(res.data.data));
        setLocalRequests(res.data.data); // Fallback to local state
        console.log("Requests dispatched successfully");
      } else {
        console.log("No valid requests data found");
        dispatch(setRequests([]));
        setLocalRequests([]);
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRequests();
  }, []);
  
  // Monitor Redux store changes
  useEffect(() => {
    console.log("Redux store updated - requests:", requests);
    console.log("Requests length:", requests?.length);
    console.log("Local requests:", localRequests);
    console.log("Local requests length:", localRequests?.length);
  }, [requests, localRequests]);
  
  console.log("Current requests from Redux:", requests);
  console.log("Requests type:", typeof requests);
  console.log("Is array:", Array.isArray(requests));
  console.log("Length:", requests?.length);
  
  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center my-10 text-red-500">
        {error}
      </div>
    );
  }
  
  // Use Redux data if available, otherwise fall back to local state
  const displayRequests = (requests && Array.isArray(requests) && requests.length > 0) ? requests : localRequests;
  
  console.log("Display requests:", displayRequests);
  console.log("Display requests length:", displayRequests?.length);
  
  if (!displayRequests || !Array.isArray(displayRequests) || displayRequests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1>No requests found</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Connection Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRequests.map((request) => {
          const { _id, fromUserId } = request;
          const { firstName, lastName, photoUrl, about, skills } = fromUserId;

          return (
            <div
              key={_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Profile Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&size=200`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {firstName} {lastName}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {about || "No description available"}
                </p>

                {/* Skills */}
                {skills && skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200" onClick={() => reviewRequest(request._id, "accept", "accepted")}>
                    Accept
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200" onClick={() => reviewRequest(request._id, "reject", "rejected")}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
