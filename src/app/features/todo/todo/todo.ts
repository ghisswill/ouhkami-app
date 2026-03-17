import { Component, computed, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Task, TaskCategory } from '../../../core/models/task.model';
import { TaskDialog, TaskDialogData } from '../components/task-dialog/task-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskList } from '../components/task-list/task-list';
import { CategoryFilter } from '../components/category-filter/category-filter';
import { ProgressBar } from '../components/progress-bar/progress-bar';

@Component({
  selector: 'app-todo',
  imports: [
    MatButtonModule, MatIconModule,
    MatDialogModule, MatSnackBarModule,
    TaskList, CategoryFilter, ProgressBar,
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
private taskService = inject(TaskService);
  private dialog      = inject(MatDialog);
  private snackBar    = inject(MatSnackBar);

  filteredTasks = this.taskService.filteredTasks;
  stats         = this.taskService.stats;

  percentage = computed(() => {
    const s = this.stats();
    return s.total === 0 ? 0 : Math.round(s.done / s.total * 100);
  });

  ngOnInit(): void {
    this.taskService.loadTasks().subscribe();
    this.taskService.loadStats().subscribe();
  }

  // ── Filtre catégorie ───────────────────────────────────
  onFilterChange(cat: TaskCategory | null): void {
    this.taskService.setFilter(cat);
  }

  // ── Ouvrir dialog création ─────────────────────────────
  openCreateDialog(): void {
    const ref = this.dialog.open(TaskDialog, {
      data: {} as TaskDialogData,
      panelClass: 'task-dialog',
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      this.taskService.createTask(result.data).subscribe({
        next: () => this.snackBar.open('✅ Tâche ajoutée !', '', { duration: 2000 }),
        error: () => this.snackBar.open('Erreur lors de l\'ajout', '', { duration: 2000 }),
      });
    });
  }

  // ── Ouvrir dialog édition ──────────────────────────────
  openEditDialog(task: Task): void {
    const ref = this.dialog.open(TaskDialog, {
      data: { task } as TaskDialogData,
      panelClass: 'task-dialog',
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      this.taskService.updateTask(task.id, result.data).subscribe({
        next: () => this.snackBar.open('✏️ Tâche modifiée !', '', { duration: 2000 }),
        error: () => this.snackBar.open('Erreur lors de la modification', '', { duration: 2000 }),
      });
    });
  }

  // ── Toggle ─────────────────────────────────────────────
  onToggle(id: string): void {
    this.taskService.toggleTask(id).subscribe();
  }

  // ── Supprimer ──────────────────────────────────────────
  onDelete(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.snackBar.open('🗑 Tâche supprimée', '', { duration: 2000 }),
    });
  }
}
