import { Modal, Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask } from "../store/Slices/TasksSlice";

interface TaskFormProps {
  task?: Task;
  formType: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}

interface TaskDetails {
  taskName: string;
  taskPriority: string;
  priorityValue: number;
  assignee: string;
}

interface TaskEditDetails {
  taskName?: string;
  taskPriority?: string;
  priorityValue?: number;
  assignee?: string;
}

const TaskForm = ({
  task,
  formType,
  isModalOpen,
  setIsModalOpen,
  status,
}: TaskFormProps) => {


  const users = useSelector((state: any) => state.users.users)
  const usernames = users.map((user: User) => {
    return { value: user.name, label: <span>{user.name}</span> }
  })

  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    taskName: "",
    taskPriority: "",
    priorityValue: 0.9,
    assignee: ''
  });

  const [editTaskDetails, setEditTaskDetails] = useState<TaskEditDetails>({
    taskName: task?.name,
    taskPriority: task?.severity,
    priorityValue: task?.severityValue,
    assignee: task?.assignee
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

    dispatch(
      createTask({
        status: status,
        name: taskDetails.taskName,
        severity: taskDetails.taskPriority,
        severityValue: taskDetails.priorityValue,
        assignee: taskDetails.assignee,
        dateAndTime: new Date(),
      })
    );

    setIsModalOpen(false);
  };

  const handleEditFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      editTaskDetails.taskName === "" ||
      editTaskDetails.taskPriority === "" ||
      editTaskDetails.priorityValue === 0.9
    ) {
      toast.error("Fill all the details");
      return;
    }

    if (editTaskDetails.priorityValue! > 10 || editTaskDetails.priorityValue! < 1) {
      toast.error("Priority value should be < 10 and >= 1");
      return;
    }

    dispatch(
      editTask({
        id: task?.id,
        status: status,
        name: editTaskDetails.taskName,
        severity: editTaskDetails.taskPriority,
        severityValue: editTaskDetails.priorityValue,
        assignee: editTaskDetails.assignee,
        dateAndTime: new Date(),
      })
    );

    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={`${formType === 'New' ? 'Create' : 'Edit' } task`}
        open={isModalOpen}
        okText={formType === 'New' ? "Create" : 'Edit'}
        onOk={
          formType === "New" ? handleFormSubmission : handleEditFormSubmission
        }
        onCancel={() => setIsModalOpen(false)}
      >
        <form className="mt-10 flex flex-col gap-y-5">
          <h3 className="mt-5 text-lg font-semibold">
            Task will be {formType === 'New' ? "created" : "edited"} in {status} category
          </h3>
          <div>
            <input
              defaultValue={formType === "Edit" ? task?.name : ""}
              onChange={(e) => {
                formType === "New"
                  ? setTaskDetails({ ...taskDetails, taskName: e.target.value })
                  : setEditTaskDetails({
                      ...editTaskDetails,
                      taskName: e.target.value,
                    });
              }}
              type="text"
              placeholder="Task name"
              className="border border-gray-400 px-5 py-2 rounded-xl outline-none w-96"
            />
          </div>

          <div>
            <Select
              defaultValue={formType === "Edit" ? task?.severity : ""}
              onChange={(value) => {
                formType === "New"
                  ? setTaskDetails({ ...taskDetails, taskPriority: value })
                  : setEditTaskDetails({
                      ...editTaskDetails,
                      taskPriority: value,
                    });
              }}
              placeholder="Select Priority"
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
            <Select
              defaultValue={formType === "Edit" ? task?.assignee : ""}
              onChange={(value) => {
                formType === "New"
                  ? setTaskDetails({ ...taskDetails, assignee: value })
                  : setEditTaskDetails({
                      ...editTaskDetails,
                      assignee: value,
                    });
              }}
              placeholder="Select assignee"
              className="w-96"
              options={usernames}
            />
          </div>

          <div>
            <input
              defaultValue={formType === "Edit" ? task?.severityValue : ""}
              onChange={(e) => {
                formType === "New"
                  ? setTaskDetails({
                      ...taskDetails,
                      priorityValue: parseFloat(e.target.value),
                    })
                  : setEditTaskDetails({
                      ...editTaskDetails,
                      priorityValue: parseFloat(e.target.value),
                    });
              }}
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
