interface TasksColumn {
    status: string;
    statusColor: string;
    tasks: Tasks[];
}

interface Tasks {
    name: string;
    severity: string;
    labels?: string[];
    dateAndTime: Date
}