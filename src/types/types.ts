interface TasksColumn {
    status: string;
    statusColor: string;
    tasks: Task[];
}

interface Task {
    id: number;
    status: string;
    name: string;
    severity: string;
    severityValue: number;
    assignee: string;
    labels?: string[];
    dateAndTime: Date
}

interface User {
    name: string;
    email: string;
    password: string;
}