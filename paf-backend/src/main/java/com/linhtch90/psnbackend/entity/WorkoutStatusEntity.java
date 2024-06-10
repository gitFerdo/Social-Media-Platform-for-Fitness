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
@Document(collection = "WorkoutStatus")
public class WorkoutStatusEntity{
    @Id
    private String workoutStatusID;
    private String userId;
    private String userFullname;
    private double distance;
    private int pushups;
    private int weight;
    private String description;
}