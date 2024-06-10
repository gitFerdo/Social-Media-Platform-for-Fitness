import React, { useState } from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteWorkoutStatus,
  updateWorkoutStatus,
} from "../feature/followingWorkoutStatus/followingWorkoutStatusSlice";
import { RiDeleteBin6Fill, RiPencilLine } from "react-icons/ri";

function WorkoutStatusPostItem(props) {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({
    distance: props.distance,
    pushups: props.pushups,
    weight: props.weight,
    description: props.description,
  });

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    dispatch(
      updateWorkoutStatus({
        workoutStatusId: props.postId,
        updatedWorkoutStatus: editedData,
      })
    );
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      console.log("Attempting to delete post with ID:", props.workoutStatusID);
      dispatch(deleteWorkoutStatus({ postId: props.workoutStatusID }));
    }
  };

  return (
    <div className="border shadow rounded-3 border-primary p-3 mt-3">
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="mx-3">
            <Hashicon value={props.Id} size={50} />
          </div>
          <div className="d-flex flex-column">
            <div className="fw-bold">
              {props.firstName + " " + props.lastName}
            </div>
          </div>
        </div>
        <div className="mx-3">
          <h3>Workout Status</h3>
          <div>
            <p>{props.description}</p>
            <h5>Distance Ran: {props.distance}</h5>
            <h5>Push Ups Count: {props.pushups}</h5>
            <h5>Weight Lifted: {props.weight}</h5>
          </div>
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
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="distance">
              <Form.Label>Distance Ran (miles)</Form.Label>
              <Form.Control
                type="number"
                value={editedData.distance}
                onChange={(e) =>
                  setEditedData({ ...editedData, distance: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="pushups">
              <Form.Label>Number of Pushups</Form.Label>
              <Form.Control
                type="number"
                value={editedData.pushups}
                onChange={(e) =>
                  setEditedData({ ...editedData, pushups: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight Lifted (lbs)</Form.Label>
              <Form.Control
                type="number"
                value={editedData.weight}
                onChange={(e) =>
                  setEditedData({ ...editedData, weight: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Brief Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editedData.description}
                onChange={(e) =>
                  setEditedData({ ...editedData, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WorkoutStatusPostItem;
