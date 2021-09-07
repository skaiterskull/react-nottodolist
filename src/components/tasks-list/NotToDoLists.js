import { Table, Button } from "react-bootstrap";
import { AlertDisplay } from "../alert/AlertDisplay";
import { useSelector, useDispatch } from "react-redux";
import { switchTask } from "./taskAction";
import { setIdToDelete } from "./taskSlice";

export const NotToDoLists = () => {
  const dispatch = useDispatch();
  const { badList, idToDelete } = useSelector((state) => state.task);
  const badListOnlyHour = badList.reduce(
    (subTtl, item) => subTtl + +item.hr,
    0
  );
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
          {badList.map((items, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={items._id}
                  checked={idToDelete.includes(items._id)}
                  onChange={(e) => {
                    dispatch(setIdToDelete(e.target));
                  }}
                />{" "}
                <label>{items.task}</label>
              </td>
              <td>{items.hr}</td>
              <td>
                <Button
                  onClick={() => {
                    return dispatch(switchTask({ id: items._id, todo: true }));
                  }}
                >
                  Move To Do List
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {badListOnlyHour > 1 && (
        <AlertDisplay
          color="success"
          text={`Total hours saved = ${badListOnlyHour}/week`}
        />
      )}
    </div>
  );
};
