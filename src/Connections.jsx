import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const Connections = () => {
  // http://localhost:3000/user/connections

  const fecthConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log("Connections=>", res);
  };
  useEffect(() => {
    fecthConnections();
  }, []);
  return (
    <div className="flex justify-center my-10">
      <h1 className="text-2xl font-bold">Connections</h1>
    </div>
  );
};

export default Connections;
