import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connections: [], 
};

const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => null,
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;