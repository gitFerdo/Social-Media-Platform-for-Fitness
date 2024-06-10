package com.linhtch90.psnbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutPlanByFollowing {
    private UserEntity user;
    WorkoutPlanEntity workoutPlan;
}
