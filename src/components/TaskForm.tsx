import { Modal, Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createTask } from "../store/Slices/TasksSlice";

interface TaskFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}

interface TaskDetails {
  taskName: string;
  taskPriority: string;
  priorityValue: number;
}

const TaskForm = ({ isModalOpen, setIsModalOpen, status }: TaskFormProps) => {
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    taskName: "",
    taskPriority: "",
    priorityValue: 0.9,
  });
  const dispatch = useDispatch();

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      taskDetails.taskName === "" ||
      taskDetails.taskPriority === "" ||
      taskDetails.priorityValue === 0.9
    ) {
      toast.error("Fill all the details");
      return;
    }

    if (taskDetails.priorityValue > 10 || taskDetails.priorityValue < 1) {
      toast.error("Priority value should be < 10 and >= 1");
      return;
    }

    dispatch(createTask({
      status: status,
      name: taskDetails.taskName,
      severity: taskDetails.taskPriority,
      severityValue: taskDetails.priorityValue,
      dateAndTime: new Date()
    }));

    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Create task"
        open={isModalOpen}
        okText={"Submit"}
        onOk={handleFormSubmission}
        onCancel={() => setIsModalOpen(false)}
      >
        <form className="mt-10 flex flex-col gap-y-5">
          <h3 className="mt-5 text-lg font-semibold">
            Task will be created in {status} category
          </h3>
          <div>
            <input
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, taskName: e.target.value })
              }
              type="text"
              placeholder="Task name"
              className="border border-gray-400 px-5 py-2 rounded-xl outline-none w-96"
            />
          </div>

          <div>
            <Select
              onChange={(value) =>
                setTaskDetails({ ...taskDetails, taskPriority: value })
              }
              placeholder="Select priority"
              className="w-96"
              options={[
                { value: "Low", label: <span>Low</span> },
                { value: "Medium", label: <span>Medium</span> },
                { value: "High", label: <span>High</span> },
                { value: "Critical", label: <span>Critical</span> },
              ]}
            />
          </div>

          <div>
            <input
              onChange={(e) =>
                setTaskDetails({
                  ...taskDetails,
                  priorityValue: parseFloat(e.target.value),
                })
              }
              type="number"
              min={1}
              max={10}
              placeholder="Enter the priority out of 10"
              className="border border-gray-400 px-5 py-2 rounded-xl outline-none w-96"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskForm;
