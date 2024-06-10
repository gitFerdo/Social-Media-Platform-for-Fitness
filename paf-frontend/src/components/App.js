import React, { useState } from "react";
import WorkoutStatusForm from "./WorkoutStatusForm";
import WorkoutStatusList from "./WorkoutStatusList";

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormSubmit = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <h1>Fitness Social Media Platform</h1>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Hide Form" : "Add Workout Status"}
      </button>
      {isFormVisible && <WorkoutStatusForm onSubmit={handleFormSubmit} />}
      <WorkoutStatusList />
    </div>
  );
};

export default App;
