import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import TaskCard from "./TaskCard";

const TasksColumn = ({ status, statusColor, tasks }: TasksColumn) => {
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
        <div className="flex items-center gap-x-2">
          <BiDotsHorizontalRounded className="cursor-pointer text-gray-500" />
          <LuPlus className="cursor-pointer text-gray-500" />
        </div>
      </div>


      {/* for displaying tasks */}
      <div>
        {
          tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))
        }
      </div>
    </div>
  );
};

export default TasksColumn;
