import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../feature/followingPost/followingPostSlice";

function PostCompose({ template }) {
  const dispatch = useDispatch();

  const storeFollowingPosts = useSelector(
    (state) => state.followingPostReducer.followingPosts
  );

  const [userFullname] = useState(
    localStorage.getItem("psnUserFirstName") +
      " " +
      localStorage.getItem("psnUserLastName")
  );

  const [userId] = useState(localStorage.getItem("psnUserId"));
  const [postContent, setPostContent] = useState("");
  const [postContentCount, setPostContentCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);

  const handleContentChange = (e) => {
    const content = e.target.value;
    setPostContent(content);
    setPostContentCount(content.length);
    setDisablePostButton(content.length === 0 || content.length > 200);
  };

  const showSuccessMessage = (inputMessage) => {
    toast.success(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const showFailMessage = (inputMessage) => {
    toast.error(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const createPost = async (inputContent) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/insertpost",
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
        data: {
          id: null,
          userId: localStorage.getItem("psnUserId"),
          content: inputContent,
          image: file64StringWithType,
          createdAt: null,
          love: null,
          share: null,
          comment: null,
        },
      });

      if (response.data !== null && response.data.status === "success") {
        showSuccessMessage("Posted successfully!");
        setPostContent("");
        setPostContentCount(0);
        setDisablePostButton(true);
        setFile64String(null);
        setFile64StringWithType(null);
      }

      if (response.data !== null && response.data.status === "fail") {
        showFailMessage("Post failed. Please try again later!");
      }
    } catch (error) {
      showFailMessage("Post failed. Please try again later!");
    }
  };

  const onUploadFileChange = (e) => {
    setFile64String(null);
    if (e.target.files < 1 || !e.target.validity.valid) {
      return;
    }
    compressImageFile(e);
  };

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const compressImageFile = async (event) => {
    const imageFile = event.target.files[0];
    const options = {
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      fileToBase64(compressedFile, (err, result) => {
        if (result) {
          setFile(result);
          setFile64StringWithType(result);
          setFile64String(String(result.split(",")[1]));
        }
      });
    } catch (error) {
      setFile64String(null);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    createPost(postContent);
    dispatch(getFollowingPosts());
  };

  let placeholder = "";
  let buttonVariant = "";
  switch (template) {
    case "Template 1":
      placeholder = "Enter your thoughts here...";
      buttonVariant = "primary";
      break;
    case "Template 2":
      placeholder = "Share your favorite quote...";
      buttonVariant = "success";
      break;
    case "Template 3":
      placeholder = "What's on your mind today?";
      buttonVariant = "warning";
      break;
    case "Template 4":
      placeholder = "Tell us about your day...";
      buttonVariant = "danger";
      break;
    default:
      placeholder = "Write something...";
      buttonVariant = "primary";
      break;
  }

  return (
    <div className="border rounded-3 border-success p-3 shadow">
      <ToastContainer />

      <Form className="d-flex flex-column">
        <Form.Group className="mb-3">
          <Form.Label>
            <div className="d-flex align-items-center mb-1">
              <div className="mx-3">
                <Hashicon value={userId} size={60} />
              </div>

              <div className="fs-4 fw-bold">{userFullname}</div>
            </div>
          </Form.Label>

          <Form.Control
            as="textarea"
            row={4}
            placeholder={placeholder}
            value={postContent}
            onChange={handleContentChange}
            style={{ resize: "none", height: "7rem" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image or Video (Optional)</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg, .jpeg, .png, .mp4"
            multiple
            onChange={onUploadFileChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-end align-items-center">
          <span>Characters: {postContentCount}/200</span>
          <Button
            onClick={handleCreatePost}
            variant={buttonVariant}
            disabled={disablePostButton}
            className="col-2 mx-3"
          >
            Post
          </Button>
        </div>
      </Form>
      {file64String !== null ? (
        <img src={file64StringWithType} alt="chosen" />
      ) : (
        <span></span>
      )}
    </div>
  );
}

function PostComposeWrapper() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div>
      <div>
        <h3>Whats New Updates.....</h3>
        <Button
          onClick={() => handleTemplateSelect("Template 1")}
          disabled={selectedTemplate === "Template 1"}
          variant="primary"
          className="mx-1"
        >
          Add a Post
        </Button>
        {/* <Button
          onClick={() => handleTemplateSelect("Template 2")}
          disabled={selectedTemplate === "Template 2"}
          variant="success"
          className="mx-1"
        > */}
        {/* Template 2
        </Button>
        <Button
          onClick={() => handleTemplateSelect("Template 3")}
          disabled={selectedTemplate === "Template 3"}
          variant="warning"
          className="mx-1"
        >
          Template 3
        </Button>
        <Button
          onClick={() => handleTemplateSelect("Template 4")}
          disabled={selectedTemplate === "Template 4"}
          variant="danger"
          className="mx-1"
        >
          Template 4
        </Button> */}
      </div>
      {selectedTemplate && <PostCompose template={selectedTemplate} />}
    </div>
  );
}

export default PostComposeWrapper;
