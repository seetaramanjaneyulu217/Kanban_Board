import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { populateAssigneeOption } from "../store/Slices/operationsSlice";

let assignedItems: MenuProps["items"] = [];

const AssignedItems = () => {

  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.users);

  const usernames = users.map((user: User, index: number) => {
    return {
      key: (index + 1).toString(),
      label: <button onClick={() => dispatch(populateAssigneeOption({ assigneeName: user.name }))}>{user.name}</button>,
    };
  });

  assignedItems = [...usernames]

  return assignedItems
};

export default AssignedItems;