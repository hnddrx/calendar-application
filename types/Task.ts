export interface Task {
    title: string;
    description?: string;
    date: string;
    startTime?: string; // e.g., "14:00"
    endTime?: string;   // e.g., "15:30"
    completed: boolean;
    status?: 'Not Started' | 'In Progress' | 'Completed'; // Status of the task
    urgency?: 'Low' | 'Medium' | 'High'; // Urgency level of the task
    color?: string; // Color to visually distinguish tasks
    comment?: string; // Any comments related to the task
  }
  