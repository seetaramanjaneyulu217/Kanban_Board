import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { PiDotsThreeVertical } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { deleteTask } from "../store/Slices/TasksSlice";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {

  const [ _, drag] = useDrag(() => ({
    type: 'TaskCard',
    item: { id: task.id, status: task.status }
  }))

  const dispatch = useDispatch()

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p onClick={() => setIsModalOpen(true)} className="text-base">Edit</p>,
      icon: <CiEdit className="text-blue-400" size={20} />,
    },
    {
      key: "2",
      label: <p onClick={() => dispatch(deleteTask({ id: task.id }))} className="text-base">Delete</p>,
      icon: <AiOutlineDelete className="text-red-400" size={20} />,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const severityColor =
    task.severity === "Low"
      ? "#fad82f"
      : task.severity === "Medium"
      ? "#f7a014"
      : task.severity === "High"
      ? "#fa5311"
      : "#f50c05";

  return (
    <div className="flex flex-col border border-gray-300 rounded-md px-4 py-2 max-w-72 mb-4" ref={drag}>
      {/* 1st row */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-x-2">
          <div className="text-sm">#{task.id}</div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="text-gray-400 text-xs">
            {task.dateAndTime?.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>

        <div className={`${task.status === 'Solved' ? 'hidden' : 'block'}`}>
          <Dropdown menu={{ items }}>
            <div
              className="flex items-center gap-x-2 outline-none cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <PiDotsThreeVertical className="font-semibold" />
            </div>
          </Dropdown>
        </div>
      </div>

      {/* 2nd row */}
      <div className="text-lg break-words mb-3">
        <div className="line-clamp-2">{task.name}</div>
      </div>

      {/* 3rd row */}
      <div>
        <div
          style={{ backgroundColor: severityColor, border: severityColor }}
          className="border text-white rounded-full inline-block px-2 text-sm"
        >
          {task.severity}
        </div>
      </div>

      {/* For editing the form */}
      { isModalOpen && <TaskForm task={task} formType="Edit" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} status={task.status} />}
    </div>
  );
};

export default TaskCard;
