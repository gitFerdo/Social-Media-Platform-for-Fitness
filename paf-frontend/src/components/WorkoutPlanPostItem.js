import React, { useEffect, useState } from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { Button, Modal, Row, Form } from "react-bootstrap";
import { RiPencilLine, RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  deleteWorkoutPlan,
  editWorkoutPlan,
} from "../feature/followingWorkoutPlan/followingWorkoutPlanSlice";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

function WorkoutPlanPostItem(props) {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [currentWorkoutPlan, setCurrentWorkoutPlan] = useState({
    ...props,
  });

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      console.log("Attempting to delete post with ID:", props.postId);
      dispatch(deleteWorkoutPlan({ postId: props.postId }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      console.log("Editing workout plan with ID:", props.postId);

      const response = await dispatch(
        editWorkoutPlan({
          workoutPlanId: props.postId,
          updatedWorkoutPlan: currentWorkoutPlan,
        })
      );
      if (response.payload.status === "success") {
        console.log("Post updated successfully");
        setEditing(false); // Close the modal after successful update
      } else {
        console.error("Failed to update post:", response.payload.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="border shadow rounded-3 border-primary p-3 mt-3">
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="mx-3">
            <Hashicon value={props.userId} size={50} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bold">
              {props.firstName + " " + props.lastName}
            </div>
          </div>
        </div>

        <div className="mx-3">
          <h3>My Workout Plan</h3>

          <div>
            <p>Routine: {props.routine}</p>
            <p>Exercise: {props.exercise}</p>
            <p>Sets: {props.sets}</p>
            <p>Repetitions: {props.repetitions}</p>
          </div>

          <div className="d-flex justify-content-end align-items-center">
            <div className="mx-3">
              <Button variant="danger" onClick={handleDeleteClick}>
                <RiDeleteBin6Fill />
              </Button>
            </div>
            <div className="mx-3">
              <Button variant="primary" onClick={handleEditClick}>
                <RiPencilLine />
              </Button>
            </div>
          </div>
        </div>
      </Row>

      {/* Edit Workout Plan Modal */}
      <Modal show={editing} onHide={() => setEditing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Routine</Form.Label>
              <Form.Control
                type="text"
                value={currentWorkoutPlan.routine}
                onChange={(e) =>
                  setCurrentWorkoutPlan({
                    ...currentWorkoutPlan,
                    routine: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Exercise</Form.Label>
              <Form.Control
                type="text"
                value={currentWorkoutPlan.exercise}
                onChange={(e) =>
                  setCurrentWorkoutPlan({
                    ...currentWorkoutPlan,
                    exercise: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sets</Form.Label>
              <Form.Control
                type="text"
                value={currentWorkoutPlan.sets}
                onChange={(e) =>
                  setCurrentWorkoutPlan({
                    ...currentWorkoutPlan,
                    sets: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repetitions</Form.Label>
              <Form.Control
                type="text"
                value={currentWorkoutPlan.repetitions}
                onChange={(e) =>
                  setCurrentWorkoutPlan({
                    ...currentWorkoutPlan,
                    repetitions: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WorkoutPlanPostItem;
