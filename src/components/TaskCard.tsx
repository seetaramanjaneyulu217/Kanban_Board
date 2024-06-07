import { FaCircleCheck } from "react-icons/fa6";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {

  const severityColor = task.severity === 'Low' 
  ? '#fad82f' 
  : task.severity === 'Medium'
  ? '#f7a014'
  : task.severity === 'High'
  ? '#fa5311'
  : '#f50c05'

  return (
    <div className="flex flex-col border border-gray-400 rounded-md px-4 py-2 max-w-72">
      {/* 1st row */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-x-2">
          <div className="text-sm">#{task.id}</div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="text-gray-400 text-xs">
            {task.dateAndTime.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>

        <div>
          <FaCircleCheck />
        </div>
      </div>

      {/* 2nd row */}
      <div className="text-lg break-words mb-3">
        <div className="line-clamp-2">{task.name}</div>
      </div>

      {/* 3rd row */}
      <div>
        <div style={{ backgroundColor: severityColor, border: severityColor}} className="border text-white rounded-full inline-block px-2 text-sm">{task.severity}</div>
      </div>
    </div>
  );
};

export default TaskCard;
