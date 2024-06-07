

const TasksColumn = ({ status, statusColor, tasks }: TasksColumn) => {
  return (
    <div>
        {/* For the status and new task add option */}
        <div>
            <div style={{ backgroundColor: statusColor }} className="rounded-full w-2 h-2"></div>
            <div>{status}</div>
        </div>
    </div>
  )
}

export default TasksColumn