package com.linhtch90.psnbackend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.linhtch90.psnbackend.entity.DoubleIdObjectEntity;
import com.linhtch90.psnbackend.entity.IdObjectEntity;
import com.linhtch90.psnbackend.entity.WorkoutStatusByFollowing;
import com.linhtch90.psnbackend.entity.WorkoutStatusEntity;
import com.linhtch90.psnbackend.entity.UserEntity;
import com.linhtch90.psnbackend.repository.WorkoutStatusRepository;
import com.linhtch90.psnbackend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkoutStatusService {
    @Autowired
    private WorkoutStatusRepository workoutStatusRepo;
    @Autowired
    private UserRepository userRepo;


    public ResponseObjectService insertWorkoutStatus(WorkoutStatusEntity inputWorkoutStatus) {
        ResponseObjectService responseObj = new ResponseObjectService();
        // inputWorkoutStatus.setCreatedAt(Instant.now());
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        responseObj.setPayload(workoutStatusRepo.save(inputWorkoutStatus));
        return responseObj;
    }

    public ResponseObjectService updateWorkoutStatus(String workoutStatusId, WorkoutStatusEntity updatedWorkoutStatus) {
        ResponseObjectService responseObj = new ResponseObjectService();
        Optional<WorkoutStatusEntity> optWorkoutStatus = workoutStatusRepo.findById(workoutStatusId);
        if (optWorkoutStatus.isPresent()) {
            WorkoutStatusEntity workoutStatus = optWorkoutStatus.get();
            workoutStatus.setUserId(updatedWorkoutStatus.getUserId());
            workoutStatus.setWorkoutStatusID(updatedWorkoutStatus.getWorkoutStatusID());
            workoutStatusRepo.save(workoutStatus);
            responseObj.setStatus("success");
            responseObj.setMessage("Workout status updated successfully");
            responseObj.setPayload(workoutStatus);
        } else {
            responseObj.setStatus("fail");
            responseObj.setMessage("Workout status not found");
            responseObj.setPayload(null);
        }
        return responseObj;
    }

    public ResponseObjectService deleteWorkoutStatus(String workoutStatusId) {
        ResponseObjectService responseObj = new ResponseObjectService();
        Optional<WorkoutStatusEntity> optWorkoutStatus = workoutStatusRepo.findById(workoutStatusId);
        if (optWorkoutStatus.isPresent()) {
            workoutStatusRepo.delete(optWorkoutStatus.get());
            responseObj.setStatus("success");
            responseObj.setMessage("Workout status deleted successfully");
            responseObj.setPayload(null);
        } else {
            responseObj.setStatus("fail");
            responseObj.setMessage("Workout status not found");
            responseObj.setPayload(null);
        }
        return responseObj;
    }

    public ResponseObjectService findWorkoutStatusByFollowing(IdObjectEntity inputUserId) {
        ResponseObjectService responseObj = new ResponseObjectService();
        Optional<UserEntity> optUser = userRepo.findById(inputUserId.getId());
        if (optUser.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find any workoutStatus from user id: " + inputUserId.getId());
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
                // based on these ids, get their equivalent WorkoutStatuss
                List<WorkoutStatusByFollowing> listWorkoutStatuss = new ArrayList<>();
                for (String followingId : followingIds) {
                    // get following user info based on Id
                    UserEntity followingUser = new UserEntity();
                    Optional<UserEntity> optFollowingUser = userRepo.findById(followingId);
                    if (optFollowingUser.isPresent()) {
                        followingUser = optFollowingUser.get();
                    }

                    followingUser.setPassword("");
                    
                    // get equivalent WorkoutStatuss
                    Optional<List<WorkoutStatusEntity>> followingWorkoutStatussOpt = workoutStatusRepo.findByUserId(followingId);
                    if (followingWorkoutStatussOpt.isPresent()) {
                        // if followed account has any WorkoutStatus, collect them
                        List<WorkoutStatusEntity> followingWorkoutStatuss = followingWorkoutStatussOpt.get();
                        if (followingWorkoutStatuss != null) {
                            for (WorkoutStatusEntity item : followingWorkoutStatuss) {
                                listWorkoutStatuss.add(new WorkoutStatusByFollowing(followingUser, item));
                            }
                        }
                    }
                }
                // Collections.sort(listWorkoutStatuss, (o1, o2) -> o2.getWorkoutStatus().compareTo(o1.getWorkoutStatus()));
                responseObj.setStatus("success");
                responseObj.setMessage("success");
                responseObj.setPayload(listWorkoutStatuss);
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
