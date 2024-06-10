import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "./assets/psn-Logo-large.jpg";

import {
  RiNewspaperLine,
  RiRadarLine,
  RiBaseStationLine,
  RiFolderUserLine,
  RiLogoutBoxLine,
  RiUserAddLine,
  RiCalendarCheckLine,
  RiUserFollowFill,
} from "react-icons/ri";

//import { BsPersonFillAdd } from "react-icons/bs";

import styles from "./styles/NewsFeed.module.css";
import { BsHouseDoorFill } from "react-icons/bs";

function NewsFeed() {
  let navigate = useNavigate();

  function handleClick(e) {
    navigate("/newsfeed/allaccounts");
  }

  function handleSignOut(e) {
    localStorage.removeItem("psnUserId");
    localStorage.removeItem("psnToken");
    localStorage.removeItem("psnUserFirstName");
    localStorage.removeItem("psnUserLastName");
    localStorage.removeItem("psnUserEmail");
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
  });

  return (
    <Container className="pt-3">
      <Row className="mb-3">
        <Col md={4}>
          <Row className="justify-content-center align-items-center">
            <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
              <img src={logo} width="125" alt="logo" />
            </Col>
            <Col className="text-sm-start text-center text-primary mb-sm-0 mb-3">
              <h1>FITness</h1>
            </Col>
          </Row>
        </Col>
        {/* <Col md={8}>
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Button variant="success" onClick={handleClick}>
              Find Friends
            </Button>
          </div>
        </Col> */}
      </Row>
      <Row>
        <Col md={4}>
          <Navbar bg="light" expand="lg" className="mb-3 mb-sm-0">
            <Container className={styles.navbarContainer}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                <Nav className={styles.navContainer}>
                  <ul className="list-group">
                    <Nav.Link>
                      <Link to="" className="text-decoration-none">
                        <li className="list-group-item fs-5 py-3 text-primary shadow">
                          <span>
                            {" "}
                            <BsHouseDoorFill /> Home
                          </span>
                        </li>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="WorkoutStatus" className="text-decoration-none">
                        <li className="list-group-item fs-5 py-3 text-primary shadow">
                          <span>
                            <RiBaseStationLine /> Workout Status
                          </span>
                        </li>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link
                        to="WorkoutStatusForm"
                        className="text-decoration-none"
                      >
                        <li className="list-group-item fs-5 py-3 text-primary shadow">
                          <span>
                            <RiCalendarCheckLine /> Workout Plan
                          </span>
                        </li>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <li
                        className={`list-group-item fs-5 py-3 text-primary shadow ${styles.signOutButton}`}
                        onClick={handleClick}
                      >
                        <span>
                          <RiUserAddLine /> Add Friends
                        </span>
                      </li>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="following" className="text-decoration-none">
                        <li className="list-group-item fs-5 py-3 text-primary shadow">
                          <span>
                            <RiUserFollowFill /> Following
                          </span>
                        </li>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="follower" className="text-decoration-none">
                        <li className="list-group-item fs-5 py-3 text-primary shadow">
                          <span>
                            <RiUserFollowFill /> Followers
                          </span>
                        </li>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="myprofile" className="text-decoration-none">
                        <li className="list-group-item fs-5 py-3 text-primary shadow">
                          <span>
                            <RiFolderUserLine /> My Posts
                          </span>
                        </li>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <li
                        className={`list-group-item fs-5 py-3 text-primary shadow ${styles.signOutButton}`}
                        onClick={handleSignOut}
                      >
                        <span>
                          <RiLogoutBoxLine /> Sign Out
                        </span>
                      </li>
                    </Nav.Link>
                  </ul>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col md={8}>
          <Outlet />{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsFeed;
