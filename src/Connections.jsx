import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { setConnections } from "./store/ConnectionSlice";
import { useSelector } from "react-redux";

const Connections = () => {
  const connections = useSelector((store) => store.connection.connections);
  const dispatch = useDispatch();

  const fecthConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(setConnections(res.data.data));
    console.log("Connections=>", res);
  };
  useEffect(() => {
    fecthConnections();
  }, []);
  if (!connections) return null;
  if (connections.length === 0)
    return <h1 className="flex justify-center my-10">No connections found</h1>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Connections
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, about, skills } =
            connection;

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
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    View Profile
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    Message
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

export default Connections;
