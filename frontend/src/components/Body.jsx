import React, { useEffect } from 'react'
import NavBar from './navBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Redux/userSlice';
import { BASE_URL } from '../utils/constant';
import {addFeed} from "../Redux/feedSlice.js"


const Body = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const userData = useSelector((store)=>store.user);
  const feedData = useSelector((store) => store.feed);
  
   const fetchUser = async () =>{
    try {
      const res = await axios.get(BASE_URL+'/profile',{
        withCredentials:true,
      });
      dispatch(addUser(res.data.data));
    }catch(err){
      if(err.status === 401){
      navigate("/login");  
      }
      console.error(err.message);
   }
  }
  const getFeed = async (req, res )=>{
    if (feedData) return;
  try {  
    const res = await axios.get(BASE_URL+"/user/feed",{
      withCredentials:true,
    })
    dispatch(addFeed(res.data));
    
  
  } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=>{
    if(!userData){
    fetchUser();
    getFeed();
    }
  },[]);
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
