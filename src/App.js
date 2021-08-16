import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
// import { Button, Alert } from "react-bootstrap";

function App() {
  const [tasks, settasks] = useState([]);

  console.log(tasks);
  const handleSubmit = (data) => {
    settasks([...tasks, data]);
  };

  return (
    <Container>
      <Row className="mt-5 text-center">
        <Col>
          <h1>Not to Do Task List</h1>
          <hr />
        </Col>
      </Row>
      <AddTaskForm handleSubmit={handleSubmit} />
      <hr />
      <hr />
    </Container>
  );
}

export default App;
