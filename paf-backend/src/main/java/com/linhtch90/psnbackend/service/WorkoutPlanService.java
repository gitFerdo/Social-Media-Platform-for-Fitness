package com.linhtch90.psnbackend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.linhtch90.psnbackend.entity.DoubleIdObjectEntity;
import com.linhtch90.psnbackend.entity.IdObjectEntity;
import com.linhtch90.psnbackend.entity.WorkoutPlanByFollowing;
import com.linhtch90.psnbackend.entity.WorkoutPlanEntity;
import com.linhtch90.psnbackend.entity.UserEntity;
import com.linhtch90.psnbackend.repository.WorkoutPlanRepository;
import com.linhtch90.psnbackend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkoutPlanService {
    @Autowired
    private WorkoutPlanRepository workoutPlanRepo;
    @Autowired
    private UserRepository userRepo;


    public ResponseObjectService insertWorkoutPlan(WorkoutPlanEntity inputWorkoutPlan) {
        ResponseObjectService responseObj = new ResponseObjectService();
        // inputWorkoutPlan.setCreatedAt(Instant.now());
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        responseObj.setPayload(workoutPlanRepo.save(inputWorkoutPlan));
        return responseObj;
    }

    public ResponseObjectService deleteWorkoutPlan(String postId) {
    ResponseObjectService responseObj = new ResponseObjectService();
    Optional<WorkoutPlanEntity> optWorkoutPlan = workoutPlanRepo.findById(postId);
    if (optWorkoutPlan.isPresent()) {
        workoutPlanRepo.delete(optWorkoutPlan.get());
        responseObj.setStatus("success");
        responseObj.setMessage("Workout plan deleted successfully");
        responseObj.setPayload(null);
    } else {
        responseObj.setStatus("fail");
        responseObj.setMessage("Workout plan not found");
        responseObj.setPayload(null);
    }
    return responseObj;
}

public ResponseObjectService editWorkoutPlan(WorkoutPlanEntity updatedWorkoutPlan) {
    ResponseObjectService responseObj = new ResponseObjectService();
    Optional<WorkoutPlanEntity> optWorkoutPlan = workoutPlanRepo.findById(updatedWorkoutPlan.getWorkoutPlanID());
    if (optWorkoutPlan.isPresent()) {
        WorkoutPlanEntity workoutPlan = optWorkoutPlan.get();
        workoutPlan.setUserId(updatedWorkoutPlan.getUserId());
        workoutPlan.setUserFullname(updatedWorkoutPlan.getUserFullname());
        workoutPlan.setRoutine(updatedWorkoutPlan.getRoutine());
        workoutPlan.setExercise(updatedWorkoutPlan.getExercise());
        workoutPlan.setSets(updatedWorkoutPlan.getSets());
        workoutPlan.setRepetitions(updatedWorkoutPlan.getRepetitions());
        workoutPlanRepo.save(workoutPlan);
        responseObj.setStatus("success");
        responseObj.setMessage("Workout plan updated successfully");
        responseObj.setPayload(workoutPlan);
    } else {
        responseObj.setStatus("fail");
        responseObj.setMessage("Workout plan not found");
        responseObj.setPayload(null);
    }
    return responseObj;
}

    public ResponseObjectService findWorkoutPlanByFollowing(IdObjectEntity inputUserId) {
        ResponseObjectService responseObj = new ResponseObjectService();
        Optional<UserEntity> optUser = userRepo.findById(inputUserId.getId());
        if (optUser.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find any workoutPlan from user id: " + inputUserId.getId());
            responseObj.setPayload(null);
            return responseObj;
        } else {
            UserEntity user = optUser.get();
            if (user.getFollowing() != null) {
                // if user followed someone, get their ids
                List<String> followingIds = new ArrayList<>();
                for (String id : user.getFollowing()) {
                    followingIds.add(id);
                }
                // based on these ids, get their equivalent WorkoutPlans
                List<WorkoutPlanByFollowing> listWorkoutPlans = new ArrayList<>();
                for (String followingId : followingIds) {
                    // get following user info based on Id
                    UserEntity followingUser = new UserEntity();
                    Optional<UserEntity> optFollowingUser = userRepo.findById(followingId);
                    if (optFollowingUser.isPresent()) {
                        followingUser = optFollowingUser.get();
                    }

                    followingUser.setPassword("");
                    
                    // get equivalent WorkoutPlans
                    Optional<List<WorkoutPlanEntity>> followingWorkoutPlansOpt = workoutPlanRepo.findByUserId(followingId);
                    if (followingWorkoutPlansOpt.isPresent()) {
                        // if followed account has any WorkoutPlan, collect them
                        List<WorkoutPlanEntity> followingWorkoutPlans = followingWorkoutPlansOpt.get();
                        if (followingWorkoutPlans != null) {
                            for (WorkoutPlanEntity item : followingWorkoutPlans) {
                                listWorkoutPlans.add(new WorkoutPlanByFollowing(followingUser, item));
                            }
                        }
                    }
                }
                // Collections.sort(listWorkoutPlans, (o1, o2) -> o2.getWorkoutPlan().compareTo(o1.getWorkoutPlan()));
                responseObj.setStatus("success");
                responseObj.setMessage("success");
                responseObj.setPayload(listWorkoutPlans);
                return responseObj;
            } else {
                responseObj.setStatus("fail");
                responseObj.setMessage("user id: " + inputUserId.getId() + " has empty following list");
                responseObj.setPayload(null);
                return responseObj;
            }
        }
    }

}
