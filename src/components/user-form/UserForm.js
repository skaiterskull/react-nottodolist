import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";

export const UserForm = () => {
  return (
    <div className="user-form mt-5 pt-5 text-center">
      <h1>Welcome to task time management</h1>

      <div className="text-muted mb-3">
        This app will allow you to list yout weekly tasj and let you mark your
        tasks as not to do so that you can see how many hours you could have
        saved.
      </div>

      <Row>
        <Col sm="12">
          <Card className="p-3">
            <h2 className="mb-3">Login</h2>
            <Form.Control type="email" placeholder="Enter email" />
            <Button variant="success" type="submit" className="mt-3">
              Login
            </Button>
          </Card>
        </Col>
        <Col sm="12">
          <Card className="p-3">
            <h2 className="mb-3">Register</h2>
            <Form.Control type="email" placeholder="Enter email" />
            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
