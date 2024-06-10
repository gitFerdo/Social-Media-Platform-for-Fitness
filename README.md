# Social Media Platform for Fitness

This project is designed to create a social media platform tailored for fitness enthusiasts. The platform allows users to share their fitness journeys, workouts, and healthy lifestyle tips through a Java-based Spring Boot REST API and a React-based client web application. The application emphasizes user-friendliness and simplicity, catering to individuals with varying levels of technical expertise.

### Key Features:
- **Media Sharing -** Users can upload photos showcasing their fitness activities.
- **Workout Status Updates**: Users can share updates on their current workout status with predefined templates.
- **Workout Plan Sharing -** Users can share and customize their workout plans.
- **Interaction -** Users can like and comment on posts, with notifications for interactions.
- **Profiles -** Users can view and follow other profiles, displaying all fitness-related posts and activities.

### Technologies Used:
- **Backend -** Spring Boot, Spring Security, OAuth 2.0
- **Frontend -** React
- **Database -** MySQL (or other relational databases)
- **Version Control -** Git, GitHub

## How to Install and Run the Project

### Prerequisites:
- Java Development Kit (JDK) 11 or later
- Node.js and npm
- MySQL or other relational database

### Backend (Spring Boot):
1. Clone the repository:
    ```sh
    git clone https://github.com/gitFerdo/Social-Media-Platform-for-Fitness.git
    ```
2. Navigate to the backend directory:
    ```sh
    cd Social-Media-Platform-for-Fitness/paf-backend
    ```
3. Update the `application.properties` file with your database credentials.
    ```sh
    spring.data.mongodb.uri=your_mongodb_uri
    spring.data.mongodb.database=your_database_name
    ```

## Tests

To run tests for the application:

### Backend:
1. Navigate to the backend directory:
    ```sh
    cd Social-Media-Platform-for-Fitness/paf-backend
    ```
2. Run the tests:
    ```sh
    ./mvnw test
    ```

### Frontend:
1. Navigate to the frontend directory:
    ```sh
    cd Social-Media-Platform-for-Fitness/paf-backend
    ```
2. Run the tests:
    ```sh
    npm test
    ```

5. Build and run the Spring Boot application:
    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend (React):
1. Navigate to the frontend directory:
    ```sh
    cd Social-Media-Platform-for-Fitness/paf-frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the React application:
    ```sh
    npm start
    ```

## How to Contribute to the Project

1. Fork the repository.
2. Create your feature branch:
    ```sh
    git checkout -b feature/YourFeature
    ```
3. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/YourFeature
    ```
5. Open a pull request.
