import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeUserFromFeed:(state,action)=>{
            const newArr = state.filter((re)=>re._id !== action.payload);
            return newArr;
        },
    },
});

export const {addFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;