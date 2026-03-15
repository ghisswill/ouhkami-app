import { Task } from "./task.model";

export const mockTasks: Task[] = [
  {
    id: '1', title: 'Appeler le médecin',
    note: 'Renouveler ordonnance',
    dueDate: new Date(),
    isDone: false, category: 'SANTE', priority: 'HAUTE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2', title: 'Courses du week-end',
    dueDate: new Date(),
    isDone: true, category: 'COURSES', priority: 'MOYENNE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3', title: 'Réunion école Tima',
    dueDate: new Date(),
    isDone: false, category: 'FAMILLE', priority: 'HAUTE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
