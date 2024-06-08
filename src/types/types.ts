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
    labels?: string[];
    dateAndTime: Date
}