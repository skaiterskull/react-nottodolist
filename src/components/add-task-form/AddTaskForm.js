import { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";

const initialFromDt = {
  task: "",
  hr: 0,
};

export const AddTaskForm = ({ handleSubmit }) => {
  const [formDt, setFormDt] = useState(initialFromDt);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formDt);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col md={7}>
          <Form.Control
            name="task"
            placeholder="Task"
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            name="hr"
            placeholder="Hour"
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col>
          <Button type="submit">Add Task</Button>
        </Col>
      </Row>
    </Form>
  );
};
