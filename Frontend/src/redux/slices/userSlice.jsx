import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username:"",
    email:"",
    password:""
}

 const userSlice = createSlice({
  name: "userSlice",
  initialState:initialState,
  reducers: {
      addUser:(state,action)=>{
         return action.payload
      }
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
