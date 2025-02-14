import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from "../Redux/feedSlice.js"
import { BASE_URL } from '../utils/constant.js'
import Usercard from './Usercard.jsx';
const Feed = () => {
  
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
// feedData && console.log(feedData.feed[0]);
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
  useEffect(() =>{
    getFeed();
},[])

  return ( feedData && (
  
    <Usercard user={feedData.feed[0]}/>
  )
  
  )
}

export default Feed
