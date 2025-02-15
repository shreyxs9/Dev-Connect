import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../Redux/feedSlice';

const Usercard = ({user}) => {
  if (!user) {
    return <div className='flex justify-center mt-20'>No user data available</div>;
  }
  const dispatch = useDispatch();
  const {firstName, _id,lastName, gender, age, photoUrl, skills} =user;
  const sendReq = async (status,_id) => {
    try {
      const res= await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{
        withCredentials:true,
      });
      console.log(res.data);
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <div className="flex justify-center items-center mt-20 md:mt-0 min-h-screen/2 md:min-h-screen z-0">

    <div className="card card-compact bg-base-300 w-80 md:w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" 
        className='max-h-64 md:max-h-full'
        />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+" "}{lastName}</h2>
     <span>{age+ ","}{gender}</span> <span>{skills+" "}</span>
      <div className="card-actions justify-center">
        <button className="btn btn-sm btn-primary" onClick={()=>sendReq("ignored",_id)}>Ignore</button>
        <button className="btn btn-sm btn-secondary ml-3" onClick={()=>sendReq("interested",_id)}>Interested</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Usercard;
