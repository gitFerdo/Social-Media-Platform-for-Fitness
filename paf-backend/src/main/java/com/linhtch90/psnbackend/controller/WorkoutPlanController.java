package com.linhtch90.psnbackend.controller;

import com.linhtch90.psnbackend.entity.DoubleIdObjectEntity;
import com.linhtch90.psnbackend.entity.IdObjectEntity;
import com.linhtch90.psnbackend.entity.WorkoutPlanEntity;
import com.linhtch90.psnbackend.service.WorkoutPlanService;
import com.linhtch90.psnbackend.service.ResponseObjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/v1")
public class WorkoutPlanController {
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/insertWorkoutPlan")
    public ResponseEntity<ResponseObjectService> insertWorkoutPlan(@RequestBody WorkoutPlanEntity inputWorkoutPlan) {
        return new ResponseEntity<ResponseObjectService>(workoutPlanService.insertWorkoutPlan(inputWorkoutPlan), HttpStatus.OK);
    }

    @PutMapping("/updateWorkoutPlan/{postId}")
    public ResponseEntity<ResponseObjectService> editWorkoutPlan(@PathVariable String postId, @RequestBody WorkoutPlanEntity updatedWorkoutPlan) {
        updatedWorkoutPlan.setWorkoutPlanID(postId);
        return new ResponseEntity<ResponseObjectService>(workoutPlanService.editWorkoutPlan(updatedWorkoutPlan), HttpStatus.OK);
    }

    @DeleteMapping("/deleteWorkoutPlan/{postId}")
    public ResponseEntity<ResponseObjectService> deleteWorkoutPlan(@PathVariable String postId) {
        IdObjectEntity deleteWorkoutPlan = new IdObjectEntity();
        deleteWorkoutPlan.setId(postId);
        return new ResponseEntity<ResponseObjectService>(workoutPlanService.deleteWorkoutPlan(postId), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/followingWorkoutPlan")
    public ResponseEntity<ResponseObjectService> findWorkoutPlanByFollowing(@RequestBody IdObjectEntity inputUserId) {
        return new ResponseEntity<ResponseObjectService>(workoutPlanService.findWorkoutPlanByFollowing(inputUserId), HttpStatus.OK);
    }
}
