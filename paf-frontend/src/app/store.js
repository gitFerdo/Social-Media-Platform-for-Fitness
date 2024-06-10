import { configureStore } from "@reduxjs/toolkit";
import followingPostReducer from "../feature/followingPost/followingPostSlice";
import followingWorkoutStatusReducer from "../feature/followingWorkoutStatus/followingWorkoutStatusSlice";
import followingWorkoutPlanReducer from "../feature/followingWorkoutPlan/followingWorkoutPlanSlice";
import followingAccountReducer from "../feature/followingAccounts/followingAccountSlice";
import checkProfileReducer from "../feature/checkProfile/checkProfileSlice";

export const store = configureStore({
    reducer: {
        followingWorkoutPlanReducer: followingWorkoutPlanReducer,
        followingWorkoutStatusReducer: followingWorkoutStatusReducer,
        followingPostReducer: followingPostReducer,
        followingAccountReducer: followingAccountReducer,
        checkProfileReducer: checkProfileReducer,
    },
});