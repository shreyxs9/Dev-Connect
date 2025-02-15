import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../Redux/connectionSlice';
import { Link } from 'react-router-dom';
import ConnectionCard from './ConnectionCard';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    if (!connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error("API Error:", error.response.data);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    connections && (
      <div className='mt-20'>
        <ConnectionCard connections={connections} />
        <div className="text-center mt-4">
          <Link to="/requests" className="text-blue-500 hover:underline">
            See All Requests
          </Link>
        </div>
      </div>
    )
  );
};

export default Connections;
