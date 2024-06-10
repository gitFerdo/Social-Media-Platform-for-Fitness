package com.linhtch90.psnbackend.repository;

import java.util.List;
import java.util.Optional;

import com.linhtch90.psnbackend.entity.WorkoutPlanEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlanEntity, String> {
    Optional<List<WorkoutPlanEntity>> findByUserId(String id);
}
