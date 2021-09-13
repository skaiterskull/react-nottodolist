import React from "react";
import { useRef } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, loginUser } from "./userAction";
import { AlertDisplay } from "../alert/AlertDisplay";

export const UserForm = () => {
  const userRefLogin = useRef("");
  const userRefRegister = useRef("");
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.user);

  const handleOnLogin = () => {
    const userName = userRefLogin.current.value;
    if (!userName) {
      return alert("User name must be provided");
    }

    dispatch(loginUser({ userName }));
  };

  const handleOnRegister = () => {
    const userName = userRefRegister.current.value;
    if (!userName) {
      return alert("User name must be provided");
    }

    dispatch(createNewUser({ userName }));
  };

  return (
    <div className="user-form mt-5 pt-5  text-center">
      <h1 className="mb-3">WELCOME TO TASK MANAGEMENT</h1>

      <div className="text-muted mb-3">
        This app will allow you to list your weekly task and let you mark your
        tasks as not to do task so that you can see how many hours you could
        have saved.
      </div>
      {message && (
        <AlertDisplay
          color={status === "Success" ? "success" : "danger"}
          text={message}
        ></AlertDisplay>
      )}
      <Row>
        <Col md="6" className="p-4">
          <Card className="p-3">
            <h2 className="mb-3">Login</h2>
            <Form.Control
              ref={userRefLogin}
              type="email"
              placeholder="Enter username"
            />
            <Button
              variant="success"
              type="submit"
              className="mt-3"
              onClick={handleOnLogin}
            >
              Login
            </Button>
          </Card>
        </Col>
        <Col md="6" className="p-4">
          <Card className="p-3">
            <h2 className="mb-3">Register</h2>
            <Form.Control
              ref={userRefRegister}
              type="email"
              placeholder="Enter username"
            />
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={handleOnRegister}
            >
              Register
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
