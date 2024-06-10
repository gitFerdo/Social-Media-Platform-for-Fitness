import React, { useState } from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import {
  RiHeartFill,
  RiHeartLine,
  RiMessage2Fill,
  RiShareForwardFill,
  RiSendPlane2Fill,
  RiDeleteBin6Fill,
  RiPencilLine,
} from "react-icons/ri";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import styles from "./styles/PostItem.module.css";
import { useDispatch } from "react-redux";
import {
  addLove,
  addShare,
  addComment,
  deletePost,
  getFollowingPosts,
  updatePost,
} from "../feature/followingPost/followingPostSlice";

function PostItem(props) {
  const dispatch = useDispatch();

  const [loveStatus, setLoveStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("psnUserId")
  );
  const [postId, setPostId] = useState(props.postId);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(props.content);
  // const [propsImageFile, setPropsImageFile] = useState(null);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  function handleLoveClick(e) {
    if (!props.loveList.includes(currentUserId)) {
      setLoveStatus(true);
      dispatch(addLove({ postId: postId, userId: currentUserId }));
    } else {
      setLoveStatus(false);
      dispatch(addLove({ postId: postId, userId: currentUserId }));
    }
  }

  function handleShareClick(e) {
    dispatch(addShare({ postId: postId, userId: currentUserId }));
    dispatch(getFollowingPosts());
  }

  function handleCommentButtonClick(e) {
    setCommentStatus(!commentStatus);
  }

  function handleCommentContentChange(e) {
    e.preventDefault();
    setCommentContent(e.target.value);

    if (e.target.value.length > 0 && e.target.value.length <= 100) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);
    }
  }

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      console.log("Deleting post with ID:", props.postId);
      dispatch(deletePost({ postId: props.postId }));
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true); // Open the edit modal
  };

  const handleEditModalClose = () => {
    setShowEditModal(false); // Close the edit modal
  };

  const handleEditSave = async () => {
    setShowEditModal(false);
    try {
      const response = await dispatch(
        updatePost({
          postId: postId,
          updatedContent: editedContent,
        })
      );
      if (response.payload.status === "success") {
        console.log("Post updated successfully");
      } else {
        console.error("Failed to update post:", response.payload.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  function sendComment(e) {
    dispatch(
      addComment({
        postId: postId,
        newComment: {
          userId: localStorage.getItem("psnUserId"),
          userFullname:
            localStorage.getItem("psnUserFirstName") +
            " " +
            localStorage.getItem("psnUserLastName"),
          content: commentContent,
        },
      })
    );
    setCommentContent("");
  }

  // function handleDeleteClick() {
  //   dispatch(deletePost(postId));
  // }

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

            <div className="text-secondary">
              {timeAgo.format(new Date(props.postDate).getTime())}
            </div>
          </div>
        </div>

        <div className="mx-3">
          <div>
            <p>{props.content}</p>
          </div>

          {props.image !== null ? (
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src={props.image} alt="" />
            </div>
          ) : (
            <span></span>
          )}
        </div>

        {/* Sub-functions of a post */}

        <div className="d-flex justify-content-center align-items-center">
          {/* Sub-function love button */}
          <div className="mx-3">
            <span
              className={`${styles.loveButton} mx-1 fs-4`}
              onClick={handleLoveClick}
            >
              {loveStatus ? (
                <RiHeartFill className="text-danger" />
              ) : (
                <RiHeartLine className="text-danger" />
              )}
            </span>

            <span>
              {props.loveList.length > 0 ? props.loveList.length : null}
            </span>
          </div>

          {/* Sub-function comment button */}
          <div className="mx-3">
            <span
              className={`${styles.commentButton} mx-1 fs-4`}
              onClick={handleCommentButtonClick}
            >
              <RiMessage2Fill className="text-primary" />
            </span>

            <span>
              {props.commentList.length > 0 ? props.commentList.length : null}
            </span>
          </div>

          {/* Sub-function share button */}
          <div className="mx-3">
            <span
              className={`${styles.shareButton} mx-1 fs-4`}
              onClick={handleShareClick}
            >
              <RiShareForwardFill className="text-success" />
            </span>

            <span>
              {props.shareList.length > 0 ? props.shareList.length : null}
            </span>
          </div>

          {/* Delete & Edit button */}
          {currentUserId === props.userId && (
            <div className="mx-3">
              <span
                className={`${styles.deleteButton} mx-1 fs-4`}
                onClick={handleDeleteClick}
              >
                <RiDeleteBin6Fill className="text-danger" />
              </span>
              <span
                className={`${styles.editButton} mx-1 fs-4`}
                onClick={handleEditClick}
              >
                <RiPencilLine className="text-primary" />
              </span>
            </div>
          )}
        </div>

        {/* List of comments and comment input box */}
        {commentStatus === true ? (
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <Form className="w-100 mx-1">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={handleCommentContentChange}
                  />
                </Form.Group>
              </Form>

              <span className="mx-1">{commentContent.length}/100</span>
              <div className="ms-auto">
                <Button
                  variant="success"
                  className="p-1"
                  disabled={sendButtonDisable}
                  onClick={sendComment}
                >
                  <RiSendPlane2Fill className="fs-4" />
                </Button>
              </div>
            </div>
            {props.commentList.map((commentItem, index) => (
              <div
                key={index}
                className="border rounded border-info my-3 px-2 pb-2"
              >
                <div className="d-flex align-items-center my-2">
                  <div className="me-auto mx-1">
                    <Hashicon value={commentItem.userId} size={30} />
                  </div>
                  <div className="w-100 mx-1 fw-bold">
                    <span>{commentItem.userFullname}</span>
                  </div>
                </div>
                <div>{commentItem.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
      </Row>

      {/* Edit Post Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            as="textarea"
            row={4}
            placeholder="Edit your post..."
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ resize: "none", height: "7rem" }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
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

export default PostItem;
