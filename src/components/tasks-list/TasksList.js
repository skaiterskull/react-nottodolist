import { Table, Button } from "react-bootstrap";

export const TasksList = ({
  tasks,
  markAsBadList,
  handleOnTaskChecked,
  indexToDeleteFromTask,
}) => {
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
          {tasks.map((items, i) => (
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
                    return markAsBadList({ id: items._id, todo: false });
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
