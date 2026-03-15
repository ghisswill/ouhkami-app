export type TaskCategory = 'PERSONNEL' | 'FAMILLE' | 'COURSES' | 'TRAVAIL' | 'SANTE' | 'AUTRES';

export type TaskPriority = 'BASSE' | 'MOYENNE' | 'HAUTE';

export interface Task {
  id: string;
  title: string;
  note?: string;
  dueDate?: Date;
  isDone: boolean;
  category: TaskCategory;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  note?: string;
  dueDate?: Date;
  category: TaskCategory;
  priority: TaskPriority;
}

export interface UpdateTaskRequest {
  title?: string;
  note?: string;
  dueDate?: Date;
  isDone?: boolean;
  category?: TaskCategory;
  priority?: TaskPriority;
}

export interface TaskStats {
    total: number;
    done: number;
    pending: number;
    overdue: number;
}