import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import { populateAssigneeOption } from "../store/Slices/operationsSlice";

let assignedItems: MenuProps["items"] = [];

const AssignedItems = () => {

  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.users);

  const usernames = users.map((user: User, index: number) => {
    return {
      key: (index + 1).toString(),
      label: <button className="flex items-center gap-x-2 w-full" onClick={() => dispatch(populateAssigneeOption({ assigneeName: user.name }))}><CiUser size={20}/> {user.name}</button>,
    };
  });

  assignedItems = [{ key: '0', label: <button className="flex items-center gap-x-2 w-full" onClick={() => dispatch(populateAssigneeOption({ assigneeName: 'all' }))}><CiUser size={20}/> All</button>}, ...usernames]

  return assignedItems
};

export default AssignedItems;