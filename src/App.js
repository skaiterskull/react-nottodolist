import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import "./App.css";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TasksList } from "./components/tasks-list/TasksList";
import { NotToDoLists } from "./components/tasks-list/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { postTask, fetchAllTask } from "./apis/taskApi";

// import { Button, Alert } from "react-bootstrap";

function App() {
  const [tasks, settasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [hrsError, setHrsError] = useState(false);
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  const [indexToDeleteFromBadTask, setIndexToDeleteFromBadTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const goodHrs = tasks.reduce((subTtl, item) => subTtl + +item.hr, 0);
  const badHrs = badTasks.reduce((badTtl, item) => badTtl + +item.hr, 0);

  const totalHrs = goodHrs + badHrs;
  const ttlPwK = 168;

  useEffect(() => {
    setIsLoading(true);
    const loadAllData = async () => {
      const { result } = await fetchAllTask();
      setIsLoading(false);
      settasks(result);
    };
    loadAllData();
  }, []);

  const handleSubmit = async (data) => {
    if (totalHrs + +data.hr > ttlPwK) {
      setHrsError(true);
      return;
    }
    settasks([...tasks, data]);
    setHrsError(false);

    //send the data to server
    const result = await postTask(data);
    console.log(result, "from api");
  };

  //mark task list as bad task list
  const markAsBadList = (i) => {
    const selectedItem = tasks[i];
    setBadTasks([...badTasks, selectedItem]);

    const tempArg = tasks.filter((item, index) => index !== i);
    settasks(tempArg);
  };

  const markAsGoodList = (i) => {
    const selectedBadItem = badTasks[i];
    settasks([...tasks, selectedBadItem]);

    const tempArg1 = badTasks.filter((item, index) => index !== i);
    setBadTasks(tempArg1);
  };

  const handleOnTaskChecked = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setIndexToDeleteFromTask([...indexToDeleteFromTask, +value]);
    } else {
      const tempArg = indexToDeleteFromTask.filter((item) => item !== +value);
      setIndexToDeleteFromTask(tempArg);
    }
  };

  const handleOnBadTaskChecked = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setIndexToDeleteFromBadTask([...indexToDeleteFromBadTask, +value]);
    } else {
      const tempArg = indexToDeleteFromBadTask.filter(
        (item) => item !== +value
      );
      setIndexToDeleteFromBadTask(tempArg);
    }
  };

  const deleteOnClick = () => {
    const tempArg = tasks.filter(
      (item, i) => !indexToDeleteFromTask.includes(i)
    );
    const tempArg1 = badTasks.filter(
      (item, i) => !indexToDeleteFromBadTask.includes(i)
    );
    settasks(tempArg);
    setBadTasks(tempArg1);
    setIndexToDeleteFromTask([]);
    setIndexToDeleteFromBadTask([]);
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
            tasks={tasks}
            markAsBadList={markAsBadList}
            handleOnTaskChecked={handleOnTaskChecked}
            indexToDeleteFromTask={indexToDeleteFromTask}
          />
        </Col>
        <Col md="6">
          <NotToDoLists
            badHrs={badHrs}
            badTasks={badTasks}
            markAsGoodList={markAsGoodList}
            handleOnBadTaskChecked={handleOnBadTaskChecked}
            indexToDeleteFromBadTask={indexToDeleteFromBadTask}
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
