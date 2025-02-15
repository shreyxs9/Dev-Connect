import React, { useEffect } from 'react'
import RequestCard from './RequestCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../Redux/requestSlice';
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store)=>store.request);
  const getRequests = async () =>{
    try {
        const res = await axios.get(BASE_URL+"/user/requests/received",{
            withCredentials:true,
        })
        dispatch(addRequest(res.data.data));
        console.log(requests);
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
    </div>
  )
  )
}

export default Requests;
