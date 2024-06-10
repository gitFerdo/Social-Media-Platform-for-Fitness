import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from "axios";

const WorkoutPlanForm = ({onSubmit}) => {
    const [userFullname] = useState(
        localStorage.getItem("psnUserFirstName") +
        " " +
        localStorage.getItem("psnUserLastName")
    );
    const [routine, setRoutine] = useState('');
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [repetitions, setRepetitions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // onSubmit({ plan, routine, exerciseStep, description });

        try {
            const response = await axios({
                method: "post",
                url: "/api/v1/insertWorkoutPlan",
                headers: {
                    Authorization: localStorage.getItem("psnToken"),
                },
                data: {
                    id: null,
                    userId: localStorage.getItem("psnUserId"),
                    userFullname: userFullname,
                    routine: routine,
                    exercise: exercise,
                    sets: sets,
                    repetitions: repetitions
                },
            });

            if (response.data !== null && response.data.status === "success") {
                console.log("plan shared")
                // showSuccessMessage("Posted successfully!");
                setRoutine("");
                setExercise("");
                setSets("");
                setRepetitions("");
            }

            if (response.data !== null && response.data.status === "fail") {
                console.log("Plan post failed. Please try again later!");
            }
        } catch (error) {
            console.log("Plan post failed. Please try again later!");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
        <h2>Workout Plan Sharing</h2>
            <Form.Group controlId="routine">
                <Form.Label>Routine</Form.Label>
                <Form.Control as="textarea" value={routine} onChange={(e) => setRoutine(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="exerciseStep">
                <Form.Label>Exercises</Form.Label>
                <Form.Control as="textarea" value={exercise} onChange={(e) => setExercise(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="routine">
                <Form.Label>Sets</Form.Label>
                <Form.Control as="textarea" value={sets} onChange={(e) => setSets(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="routine">
                <Form.Label>Repetitions</Form.Label>
                <Form.Control as="textarea" value={repetitions} onChange={(e) => setRepetitions(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Share Workout Plan</Button>
        </Form>
    );
};

export default WorkoutPlanForm;
