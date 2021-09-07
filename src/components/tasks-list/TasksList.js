import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { switchTask } from "./taskAction.js";

export const TasksList = ({
  markAsBadList,
  handleOnTaskChecked,
  indexToDeleteFromTask,
}) => {
  const { taskList } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Task Lists</h2>
      <Table striped bordered hover size="sm">
        <thead className="text-center">
          <tr>
            <th>Task</th>
            <th>Hour</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {taskList.map((items, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={items._id}
                  checked={indexToDeleteFromTask.includes(items._id)}
                  onChange={handleOnTaskChecked}
                />{" "}
                <label>{items.task}</label>
              </td>
              <td>{items.hr}</td>
              <td>
                <Button
                  onClick={() => {
                    return dispatch(switchTask({ id: items._id, todo: false }));
                  }}
                >
                  Move to Not-to-do List
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
