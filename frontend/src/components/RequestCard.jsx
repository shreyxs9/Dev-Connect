import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../Redux/requestSlice';

const RequestCard = ({requests}) => {
  const dispatch= useDispatch();

  if (!Array.isArray(requests) || requests.length === 0) {
    return <div className='flex justify-center mt-20'>No Requests available</div>;
  } 
  const reviewReq= async (status, _id) =>{
    try {
      const res= await axios.post(BASE_URL +"/request/review/"+status+"/"+_id ,{},{
        withCredentials: true,
      })
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.response.data);
    }
  }
  
 return (
    <div className="max-w-2xl mx-auto mt-24 space-y-2 ">
    {requests.map((request) => (
      
      <div key={request._id} className="flex items-center  bg-base-300  shadow-md rounded-lg p-1 md:p-2 border border-gray-50 justify-between">
         <div className="flex">
        <img
          src={request.fromUserId.photoUrl || "https://via.placeholder.com/80"} // Default Image
          alt={request.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
        />

        {/* Right Side - Details */}
        
        <div className="ml-2">
          <h3 className="text-lg font-semibold">{request.fromUserId.firstName + " "}{request.fromUserId.lastName } </h3>
          <span className="text-sm text-gray-600"> {request.fromUserId.gender +" " } {request.fromUserId.age}</span>
        </div>
        </div>
        <div className="card-actions justify-center ">
        <button className="btn btn-sm btn-primary" onClick={()=>reviewReq("rejected",request._id)}>Reject</button>
        <button className="btn btn-sm btn-secondary ml-3"  onClick={()=>reviewReq("accepted",request._id)}>Accept</button>
      </div>
      
      </div>
    ))}
  </div>
  )
}

export default RequestCard;
