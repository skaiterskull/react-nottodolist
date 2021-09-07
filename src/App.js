import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import "./App.css";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TasksList } from "./components/tasks-list/TasksList";
import { NotToDoLists } from "./components/tasks-list/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import {
  loadAllData,
  handleOnDelete,
} from "./components/tasks-list/taskAction.js";

function App() {
  const dispatch = useDispatch();

  const { totalHrs, isLoading, status, message, idToDelete } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(loadAllData());
  }, []);

  return (
    <Container>
      <Row className="mt-5 mt text-center">
        <Col>
          <h1>Not to Do Task List</h1>
        </Col>
      </Row>
      <hr />

      {isLoading && (
        <Row className="mt-5 mt text-center">
          <Col>
            <Spinner variant="primary" animation="border"></Spinner>
          </Col>
        </Row>
      )}
      {status && (
        <Row className="mt-5 mt text-center">
          <Col>
            <AlertDisplay
              color={status === "Success" ? "success" : "danger"}
              text={message}
            />
          </Col>
        </Row>
      )}
      <AddTaskForm />
      <hr />
      <Row>
        <Col md="6">
          <TasksList />
        </Col>
        <Col md="6">
          <NotToDoLists />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <div className="d-grid gap-2">
            <Button
              variant="danger"
              size="lg"
              onClick={() => dispatch(handleOnDelete(idToDelete))}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <AlertDisplay
            color="info"
            text={`Total hours allocated = ${totalHrs}/week`}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default App;
