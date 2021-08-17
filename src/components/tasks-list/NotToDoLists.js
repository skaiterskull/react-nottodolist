import { Table, Button } from "react-bootstrap";
import { AlertDisplay } from "../alert/AlertDisplay";

export const NotToDoLists = ({
  badTasks,
  markAsGoodList,
  handleOnBadTaskChecked,
  indexToDeleteFromBadTask,
  badHrs,
}) => {
  return (
    <div>
      <h2>Bad Task Lists</h2>
      <Table striped bordered hover size="sm">
        <thead className="text-center">
          <tr>
            <th>Task</th>
            <th>Hour</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {badTasks.map((items, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={i}
                  checked={indexToDeleteFromBadTask.includes(i)}
                  onChange={handleOnBadTaskChecked}
                />{" "}
                <label>{items.task}</label>
              </td>
              <td>{items.hr}</td>
              <td>
                <Button
                  onClick={() => {
                    return markAsGoodList(i);
                  }}
                >
                  Move To Do List
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {badHrs > 1 ? (
        <AlertDisplay
          color="success"
          text={`Total hours saved = ${badHrs}/week`}
        />
      ) : (
        ""
      )}
    </div>
  );
};
