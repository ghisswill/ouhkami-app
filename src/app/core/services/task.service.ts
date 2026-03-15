import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  CreateTaskRequest,
  Task,
  TaskCategory,
  TaskStats,
  UpdateTaskRequest,
} from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  private _tasks = signal<Task[]>([]);
  private _stats = signal<TaskStats>({
    total: 0,
    done: 0,
    pending: 0,
    overdue: 0,
  });
  private _activeFilter = signal<TaskCategory | null>(null);
  private _isLoading = signal<boolean>(false);

  readonly tasks = computed(() => this._tasks());
  readonly stats = computed(() => this._stats());
  readonly isLoading = computed(() => this._isLoading());
  readonly activeFilter = computed(() => this._activeFilter());

  readonly filteredTasks = computed(() => {
    const filter = this._activeFilter();
    const tasks = this._tasks();
    return filter ? tasks.filter((t) => t.category === filter) : tasks;
  });

  readonly todayTasks = computed(() => {
    const today = new Date();
    return this._tasks().filter(
      (t) => t.dueDate instanceof Date && t.dueDate.toDateString() === today.toDateString(),
    );
  });

  constructor(private http: HttpClient) {}

  loadTasks(): Observable<Task[]> {
    this._isLoading.set(true);
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
          this._isLoading.set(false);
        },
        error: () => this._isLoading.set(false),
      }),
    );
  }

  loadStats(): Observable<TaskStats> {
    return this.http
      .get<TaskStats>(`${this.apiUrl}/stats`)
      .pipe(tap((stats) => this._stats.set(stats)));
  }

  createTask(data: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data).pipe(
      tap((newTask) => {
        this._tasks.update((tasks) => [newTask, ...tasks]);
        this.refreshStats();
      }),
    );
  }

  updateTask(id: string, data: UpdateTaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, data).pipe(
      tap((updated) => {
        this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? updated : t)));
        this.refreshStats();
      }),
    );
  }

  toggleTask(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/toggle`, {}).pipe(
      tap((updated) => {
        this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? updated : t)));
        this.refreshStats();
      }),
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
        this.refreshStats();
      }),
    );
  }

  setFilter(category: TaskCategory | null): void {
    this._activeFilter.set(category);
  }

  private refreshStats(): void {
    this.loadStats().subscribe();
  }
}
