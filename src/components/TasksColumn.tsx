import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import TaskCard from "./TaskCard";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { dragAndDropTask } from "../store/Slices/TasksSlice";

const TasksColumn = ({ status, statusColor, tasks }: TasksColumn) => {

  const dispatch = useDispatch()

  const [ _, drop] = useDrop(() => ({
    accept: "TaskCard",
    drop: (item: { id: string; status: string; }) => dropTheCard(item.id),
  }));

  const dropTheCard = (id: string) => {
    dispatch(dragAndDropTask({ id: id, status: status }))
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      {/* For the status and new task add option */}
      <div className="flex items-center justify-between max-w-72 mb-5">
        {/* for status and its color */}
        <div className="flex items-center gap-x-2">
          <div
            style={{ backgroundColor: statusColor }}
            className="rounded-full w-2 h-2"
          ></div>
          <div className="font-semibold">{status}</div>
          <div className="text-gray-500">{tasks.length}</div>
        </div>

        {/* For adding new task */}
        <div
          className={`${
            status === "Solved" ? "hidden" : "block"
          } flex items-center gap-x-2`}
        >
          <BiDotsHorizontalRounded className="cursor-pointer text-gray-500" />
          <LuPlus
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer text-gray-500"
          />
        </div>
      </div>

      {/* for displaying tasks */}
      <div className="h-[50vh]" ref={drop}>
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {isModalOpen && (
        <TaskForm
          formType="New"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          status={status}
        />
      )}
    </div>
  );
};

export default TasksColumn;
