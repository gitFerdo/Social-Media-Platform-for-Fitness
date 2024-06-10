import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingWorkoutStatuss: null,
};

export const getFollowingWorkoutStatuss = createAsyncThunk(
  "/api/v1/followingWorkoutStatus",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/v1/followingWorkoutStatus",
      headers: {
        Authorization: localStorage.getItem("psnToken"),
      },
      data: {
        id: localStorage.getItem("psnUserId"),
      },
    });
    return response.data.payload;
  }
);

// Action for updating a workout status
export const updateWorkoutStatus = createAsyncThunk(
  "workoutStatus/update",
  async ({ workoutStatusId, updatedWorkoutStatus }, thunkAPI) => {
    // corrected the parameter name
    const response = await axios.put(
      `/api/v1/updateWorkoutStatus/${workoutStatusId}`,
      updatedWorkoutStatus,
      {
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
      }
    );
    return response.data.payload;
  }
);

// Action for deleting a workout status
export const deleteWorkoutStatus = createAsyncThunk(
  "workoutStatus/delete",
  async (workoutStatusId, thunkAPI) => {
    // corrected the parameter name
    const response = await axios.delete(
      `/api/v1/deleteWorkoutStatus/${workoutStatusId}`,
      {
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
      }
    );
    return response.data.payload;
  }
);

export const followingWorkoutStatusSlice = createSlice({
  name: "followingWorkoutStatusSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateWorkoutStatus.fulfilled, (state, action) => {
        state.workoutStatus = action.payload;
      })
      .addCase(deleteWorkoutStatus.fulfilled, (state, action) => {
        state.workoutStatus = null;
      })
      .addCase(getFollowingWorkoutStatuss.fulfilled, (state, action) => {
        state.followingWorkoutStatuss = action.payload;
      });
  },
});

export const { extraReducers } = followingWorkoutStatusSlice.actions;
export default followingWorkoutStatusSlice.reducer;
