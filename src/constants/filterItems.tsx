import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { populateLabel } from "../store/Slices/operationsSlice";

const FilterItems = () => {

  const dispatch = useDispatch()
  let labels = useSelector((state: any) => state.labels.allLabels)
  labels = labels.map((label: string, index: number) => {
    return {
        key: (index + 1).toString(),
        label: <button className="flex items-center gap-x-2" onClick={() => dispatch(populateLabel({ labelText: label }))}>{label}</button>
    }
  })

  const filterItems: MenuProps["items"] = labels;

  return filterItems
};


export default FilterItems