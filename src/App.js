import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import "./App.css";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TasksList } from "./components/tasks-list/TasksList";
import { NotToDoLists } from "./components/tasks-list/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { postTask, fetchAllTask, deleteTask, updateTask } from "./apis/taskApi";
import { loadAllData } from "./components/tasks-list/taskAction.js";

function App() {
  const dispatch = useDispatch();
  const [hrsError, setHrsError] = useState(false);
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  const { totalHrs, isLoading } = useSelector((state) => state.task);
  console.log(totalHrs);

  const ttlPwK = 168;

  useEffect(() => {
    dispatch(loadAllData());
  }, []);

  const handleSubmit = async (data) => {
    if (totalHrs + +data.hr > ttlPwK) {
      setHrsError(true);
      return;
    }
    setHrsError(false);
    const { status } = await postTask(data);
    console.log(status);
    if (status === "Success") {
      loadAllData();
    }
  };
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
  const switchTask = async (obj) => {
    const { status } = await updateTask(obj);
    if (status === "Success") {
      loadAllData();
    }
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
      {hrsError && (
        <AlertDisplay
          color="warning"
          text={`You dont have hours left to allocate this task`}
        />
      )}

      <AddTaskForm handleSubmit={handleSubmit} />
      <hr />
      <Row>
        <Col md="6">
          <TasksList
            markAsBadList={switchTask}
            handleOnTaskChecked={handleOnTaskChecked}
            indexToDeleteFromTask={indexToDeleteFromTask}
          />
        </Col>
        <Col md="6">
          <NotToDoLists
            markAsGoodList={switchTask}
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
