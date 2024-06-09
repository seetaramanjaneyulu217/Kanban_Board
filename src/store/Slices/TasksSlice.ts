import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  tasks: Task[];
}

const initialState: InitialState = {
  tasks: [
    {
      id: 1,
      status: "Draft",
      name: "Draft task",
      severity: "Medium",
      severityValue: 2.0,
      assignee: "all",
      dateAndTime: new Date(),
    },
    {
      id: 2,
      status: "Unsolved",
      name: "task",
      severity: "Low",
      severityValue: 2.0,
      assignee: "all",
      dateAndTime: new Date(),
    },
    {
      id: 3,
      status: "Under Review",
      name: "task",
      severity: "High",
      severityValue: 2.0,
      assignee: "all",
      dateAndTime: new Date(),
    },
    {
      id: 4,
      status: "Solved",
      name: "task",
      severity: "Critical",
      severityValue: 2.0,
      assignee: "all",
      dateAndTime: new Date(),
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action) => {
      const task = {
        id: state.tasks.length + 1,
        ...action.payload,
      };
      state.tasks.push(task);
    },
    editTask: (state, action) => {
      const tasks: Task[] = state.tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      const updatedTask = {
        id: action.payload.id,
        status: action.payload.status,
        name: action.payload.name,
        severity: action.payload.severity,
        severityValue: action.payload.severityValue,
        assignee: action.payload.assignee,
        dateAndTime: new Date(),
      };
      tasks.push(updatedTask);
      state.tasks = tasks;
    },
    deleteTask: (state, action) => {
      const tasks: Task[] = state.tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      state.tasks = tasks;
    },
    createLabelsForTask: (state, action) => {
      const tasks: Task[] = state.tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      const task: Task[] = state.tasks.filter(
        (task: Task) => task.id === action.payload.id
      );
      const updatedTask = {
        ...task[0],
        labels: [...task[0].labels ?? [], action.payload.label],
      };
      tasks.push(updatedTask);
      state.tasks = tasks;
    },
    dragAndDropTask: (state, action) => {
      const task: Task[] = state.tasks.filter(
        (task: Task) => task.id === action.payload.id
      );
      const tasks: Task[] = state.tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );

      const updatedTask = {
        ...task[0],
        status: action.payload.status,
      };

      state.tasks = [...tasks, updatedTask];
    },
  },
});

export const {
  createTask,
  editTask,
  deleteTask,
  createLabelsForTask,
  dragAndDropTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
