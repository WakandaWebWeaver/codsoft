export type User = {
  id: string;
  name: string;
  avatarUrl: string | null;
  email: string | null;
};

export type Task = {
  id: string;
  title: string;
  assignedTo: User | null;
  dueDate: Date | null;
  completed: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  team: User[];
  tasks: Task[];
};

export type Notification = {
  id:string;
  projectId: string;
  projectName: string;
  taskTitle: string;
  dueDate: Date;
  type: 'deadline' | 'overdue';
};

export type AiSuggestion = {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'deadline' | 'risk';
};
