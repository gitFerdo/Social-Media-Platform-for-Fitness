package com.linhtch90.psnbackend.repository;

import java.util.List;
import java.util.Optional;

import com.linhtch90.psnbackend.entity.WorkoutStatusEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutStatusRepository extends MongoRepository<WorkoutStatusEntity, String> {
    Optional<List<WorkoutStatusEntity>> findByUserId(String id);
}
