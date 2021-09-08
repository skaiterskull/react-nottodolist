import React from "react";
import { useEffect } from "react";
import { Row, Col, Spinner, Button } from "react-bootstrap";
import { loadAllData, handleOnDelete } from "../tasks-list/taskAction";
import { useDispatch, useSelector } from "react-redux";
import { AddTaskForm } from "../add-task-form/AddTaskForm";
import { AlertDisplay } from "../alert/AlertDisplay";
import { TasksList } from "../tasks-list/TasksList";
import { NotToDoLists } from "../tasks-list/NotToDoLists";

export const MainContent = () => {
  useEffect(() => {
    dispatch(loadAllData());
  }, []);
  const dispatch = useDispatch();

  const { totalHrs, isLoading, status, message, idToDelete } = useSelector(
    (state) => state.task
  );
  return (
    <>
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
    </>
  );
};

export default MainContent;
