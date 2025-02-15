import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from "../Redux/feedSlice.js"
import { BASE_URL } from '../utils/constant.js'
import Usercard from './Usercard.jsx';
const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

// feedData && console.log(feedData);
  const getFeed = async (req, res )=>{
  try {  
    const res = await axios.get(BASE_URL+"/user/feed",{
      withCredentials:true,
    })
    dispatch(addFeed(res.data.data));
  
  } catch (err) {
      console.error(err);
    }
  }
  useEffect(() =>{
    getFeed();
},[])

  return ( feedData && (
    <Usercard user={feedData[0]}/>
  )
  
  )
}

export default Feed
