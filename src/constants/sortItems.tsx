import type { MenuProps } from "antd";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { checkSortByDate } from "../store/Slices/operationsSlice";

const SortItems = () => {

  const dispatch = useDispatch()

  const sortItems: MenuProps["items"] = [
    {
      key: "1",
      label: <button className="flex items-center gap-x-2" onClick={() => dispatch(checkSortByDate({ sortByDate: true }))}><CiCalendarDate size={20}/> Date</button>,
    },
  ];

  return sortItems
};


export default SortItems