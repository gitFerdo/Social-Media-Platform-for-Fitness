import React, { useEffect } from "react";
import PostCompose from "./PostCompose";
import PostItem from "./PostItem";
import { Spinner } from "react-bootstrap";
import { getFollowingPosts } from "../feature/followingPost/followingPostSlice";
import { getFollowingWorkoutStatuss } from "../feature/followingWorkoutStatus/followingWorkoutStatusSlice";
import { getFollowingWorkoutPlans } from "../feature/followingWorkoutPlan/followingWorkoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import WorkoutStatusPostItem from "./WorkoutStatusPostItem";
import WorkoutPlanPostItem from "./WorkoutPlanPostItem";
import { RiDivideLine } from "react-icons/ri";

function NewsFeedContent() {
  const dispatch = useDispatch();
  const storeFollowingPosts = useSelector(
    (state) => state.followingPostReducer.followingPosts
  );
  const storeFollowingWorkoutStatus = useSelector(
    (state) => state.followingWorkoutStatusReducer.followingWorkoutStatuss
  );
  const storeFollowingWorkoutPlan = useSelector(
    (state) => state.followingWorkoutPlanReducer.followingWorkoutPlans
  );

  // use redux toolkit thunk instead
  //
  // async function getFollowingPosts() {
  //   const response = await axios({
  //     method: "post",
  //     url: "/api/v1/followingposts",
  //     headers: {
  //       Authorization: localStorage.getItem("psnToken"),
  //     },
  //     data: {
  //       id: localStorage.getItem("psnUserId"),
  //     },
  //   });

  //   if (response.data !== null && response.data.status === "success") {
  //     setPosts(response.data.payload);
  //   }
  // }

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getFollowingWorkoutStatuss());
    dispatch(getFollowingWorkoutPlans());
  }, []);

  return (
    <div>
      <PostCompose />
      {storeFollowingPosts !== null ? (
        storeFollowingPosts.map((post) => {
          return (
            <PostItem
              key={post.post.id}
              postId={post.post.id}
              userId={post.user.id}
              firstName={post.user.firstName}
              lastName={post.user.lastName}
              content={post.post.content}
              image={post.post.image}
              loveList={post.post.love}
              shareList={post.post.share}
              commentList={post.post.comment}
              postDate={post.post.createdAt}
            />
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <h1 style={{ margin: "50px 0" }}>Workout Status Section</h1>

      {storeFollowingWorkoutStatus !== null ? (
        storeFollowingWorkoutStatus.map((post, index) => {
          return (
            <WorkoutStatusPostItem
              key={index}
              postId={index}
              userId={post.user.id}
              firstName={post.user.firstName}
              lastName={post.user.lastName}
              description={post.workoutStatus.description}
              distance={post.workoutStatus.distance}
              pushups={post.workoutStatus.pushups}
              weight={post.workoutStatus.weight}
            />
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <h1 style={{ margin: "50px 0" }}>Workout Plans Section</h1>

      {storeFollowingWorkoutPlan !== null ? (
        storeFollowingWorkoutPlan.map((post, index) => {
          return (
            <WorkoutPlanPostItem
              key={index}
              postId={index}
              userId={post.user.id}
              firstName={post.user.firstName}
              lastName={post.user.lastName}
              routine={post.workoutPlan.routine}
              exercise={post.workoutPlan.exercise}
              sets={post.workoutPlan.sets}
              repetitions={post.workoutPlan.repetitions}
            />
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
}

export default NewsFeedContent;
