package com.linhtch90.psnbackend.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "WorkoutPlan")
public class WorkoutPlanEntity{
    @Id
    private String workoutPlanID;
    private String userId;
    private String userFullname;
    private String routine;
    private String exercise;
    private String sets;
    private String repetitions;
}