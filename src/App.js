import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import "./App.css";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TasksList } from "./components/tasks-list/TasksList";
import { NotToDoLists } from "./components/tasks-list/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { postTask, fetchAllTask, deleteTask, updateTask } from "./apis/taskApi";

function App() {
  const [tasks, settasks] = useState([]);
  const [hrsError, setHrsError] = useState(false);
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const taskListOnly = tasks.filter((item) => item.todo);
  const badListOnly = tasks.filter((item) => !item.todo);
  const totalHrs = tasks.reduce((subTtl, item) => subTtl + +item.hr, 0);
  const badListOnlyHour = badListOnly.reduce(
    (subTtl, item) => subTtl + +item.hr,
    0
  );
  const ttlPwK = 168;

  useEffect(() => {
    setIsLoading(true);
    const loadAllData = async () => {
      const { result } = await fetchAllTask();
      setIsLoading(false);
      settasks(result);
    };
    loadAllData();
    console.log("database loaded when reload page");
  }, []);

  const loadAllData = async () => {
    const { result } = await fetchAllTask();
    settasks(result);
    console.log("database loaded");
  };
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
            tasks={taskListOnly}
            markAsBadList={switchTask}
            handleOnTaskChecked={handleOnTaskChecked}
            indexToDeleteFromTask={indexToDeleteFromTask}
          />
        </Col>
        <Col md="6">
          <NotToDoLists
            badListOnlyHour={badListOnlyHour}
            badTasks={badListOnly}
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
