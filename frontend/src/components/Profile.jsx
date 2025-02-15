import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import Connections from './Connections';

const Profile = () => {
  const userData = useSelector((store) => store.user) ;
  return (
    userData && (
   
      <div className="md:flex md:justify-center w-full h-[125vh] md:h-full">
      <EditProfile userData={userData}/>
    
      </div>
    
    )
  )
}

export default Profile;
