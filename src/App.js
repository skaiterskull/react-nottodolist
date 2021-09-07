import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import "./App.css";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TasksList } from "./components/tasks-list/TasksList";
import { NotToDoLists } from "./components/tasks-list/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { deleteTask } from "./apis/taskApi";
import { loadAllData } from "./components/tasks-list/taskAction.js";

function App() {
  const dispatch = useDispatch();
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  const { totalHrs, isLoading, status, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(loadAllData());
  }, []);

  const handleOnTaskChecked = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setIndexToDeleteFromTask([...indexToDeleteFromTask, value]);
    } else {
      const tempArg = indexToDeleteFromTask.filter((item) => item !== value);
      setIndexToDeleteFromTask(tempArg);
    }
  };
  const deleteOnClick = async () => {
    const { status } = await deleteTask(indexToDeleteFromTask);
    console.log(status);
    if (status === "Success") {
      loadAllData();
    }
    setIndexToDeleteFromTask([]);
  };

  return (
    <Container>
      <Row className="mt-5 mt text-center">
        <Col>
          <h1>Not to Do Task List</h1>
        </Col>
      </Row>

      <hr />

      {isLoading && <Spinner variant="primary" animation="border"></Spinner>}
      {status && (
        <AlertDisplay
          color={status === "Success" ? "success" : "danger"}
          text={message}
        />
      )}
      <AddTaskForm />
      <hr />
      <Row>
        <Col md="6">
          <TasksList
            handleOnTaskChecked={handleOnTaskChecked}
            indexToDeleteFromTask={indexToDeleteFromTask}
          />
        </Col>
        <Col md="6">
          <NotToDoLists
            handleOnTaskChecked={handleOnTaskChecked}
            indexToDeleteFromTask={indexToDeleteFromTask}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <div className="d-grid gap-2">
            <Button variant="danger" size="lg" onClick={deleteOnClick}>
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
