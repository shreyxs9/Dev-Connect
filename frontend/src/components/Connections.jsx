import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../Redux/connectionSlice';
import ConnectionCard from './ConnectionCard';
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    if(!connections)  return ;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
        dispatch(addConnection(res.data.data));
     
    } catch (error) {
      console.error("API Error:", error.response.data);
    }
  }

  useEffect(() => {
    getConnections();
  }, []);


// if (connections.length === 0) return <div>Loading...</div>;

return ( connections && (
    <div className=' mt-20'>
    <ConnectionCard connections={connections}/>
    </div>
)
  )
}


export default Connections;
