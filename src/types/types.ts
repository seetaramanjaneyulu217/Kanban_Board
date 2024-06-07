interface TasksColumn {
    status: string;
    statusColor: string;
    tasks: Task[];
}

interface Task {
    id: number;
    name: string;
    severity: string;
    labels?: string[];
    dateAndTime: Date
}