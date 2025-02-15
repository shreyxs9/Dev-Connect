import React, { useEffect } from 'react'
import RequestCard from './RequestCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../Redux/requestSlice';
import { Link } from 'react-router-dom';
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store)=>store.request);
  const getRequests = async () =>{
    try {
        const res = await axios.get(BASE_URL+"/user/requests/received",{
            withCredentials:true,
        })
        dispatch(addRequest(res.data.data));
    } catch (error) {
        console.error(error.response.data);
    }
};
useEffect(()=>{
  getRequests();
},[])

  return ( requests && (
    <div>
    <RequestCard requests={requests}/>
    <div className="text-center mt-4">
          <Link to="/connections" className="text-blue-500 hover:underline">
            See All Connections
          </Link>
        </div>
    </div>
  )
  )
}

export default Requests;
