import { createSlice, nanoid } from "@reduxjs/toolkit";

interface InitialState {
  tasks: Task[];
}

const initialState: InitialState = {
  tasks: [
    {
      id: 1,
      status: 'Draft',
      name: "taskjdnfjdjvdfjvbdfjvbvjsbvjbfjhdbjdfsvbdjhdjhbhjdfjhvbdvjhbdvhj jfhuhduvsdjdbjvd ufhsyufsu",
      severity: "Medium",
      severityValue: 2.0,
      dateAndTime: new Date(),
    },
    { id: 2, status: 'Unsolved', name: "task", severity: "Low", severityValue: 2.0,  dateAndTime: new Date() },
    { id: 3, status: 'Under Review', name: "task", severity: "High", severityValue: 2.0, dateAndTime: new Date() },
    { id: 4, status: 'Solved', name: "task", severity: "Critical", severityValue: 2.0, dateAndTime: new Date() },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action) => {
      const task = {
        id: nanoid(),
        ...action.payload,
      };
      state.tasks.push(task);
    },
    editTask: (state, action) => {
        const tasks: Task[] = state.tasks.filter((task: Task) => task.id !== action.payload.id)
        const updatedTask = {
            id: action.payload.id,
            status: action.payload.status,
            name: action.payload.name,
            severity: action.payload.severity,
            severityValue: action.payload.severityValue,
            dateAndTime: new Date()
        }
        tasks.push(updatedTask)
        state.tasks = tasks
    }
  },
});

export const { createTask } = tasksSlice.actions;

export default tasksSlice.reducer;
