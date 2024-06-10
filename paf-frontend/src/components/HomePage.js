import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  BsFillBookFill,
  BsGithub,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill,
} from "react-icons/bs";

import {
  RiLoginBoxFill,
  RiLoginBoxLine,
  RiLoginCircleLine,
  RiUserAddFill,
} from "react-icons/ri";

import styles from "./styles/HomePage.module.css";

import psnLogo from "./assets/psn-Logo-large.jpg";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("psnToken") !== null) {
      navigate("/newsfeed");
    }
  });

  return (
    <Container fluid>
      <Row className={styles.container}>
        <Col className={`${styles.colContainerLeft} ${styles.leftBackground}`}>
          <div>
            <Row>
              <h2 className="my-3">FITness</h2>
            </Row>
            {/* <Row>
              <h3 className="my-3">
                <BsFillCpuFill /> ReactJS + Java Spring + MongoDB
              </h3>
            </Row>
            <Row>
              <h3 className="my-3">
                <BsGithub /> The source code is open
              </h3>
            </Row>
            <Row>
              <h3 className="my-3">
                <BsFillShareFill /> Join and share this project to your friends
              </h3>
            </Row> */}
          </div>
        </Col>
        <Col className={styles.colContainerRight}>
          <div className={styles.colWithButtons}>
            <img src={psnLogo} alt="PSN logo" width={120} className="mb-3" />
            <Row>
              <h1 className="text-primary mb-3">
                Join our vibrant community and thrive in your fitness journey.
              </h1>
            </Row>
            <br />
            <Row>
              <h3 className="text-primary mb-3">Join Fitness network today</h3>
            </Row>{" "}
            <br />
            <Row>
              <Link to="/signin" className={styles.linkTextFormat}>
                <Button
                  variant="primary"
                  className={`${styles.btnHomePage} mb-3`}
                >
                  Sign In <RiLoginBoxFill />
                </Button>
              </Link>
            </Row>
            <Row>
              <Link to="/signup" className={styles.linkTextFormat}>
                <Button variant="primary" className={styles.btnHomePage}>
                  Sign Up <RiUserAddFill />
                </Button>
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
