import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateTaskRequest, Task, TaskCategory, TaskPriority, UpdateTaskRequest } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface TaskDialogData {
  task?: Task;    // si défini = mode édition, sinon = mode création
}


@Component({
  selector: 'app-task-dialog',
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule,
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {

private fb      = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<TaskDialog>>(MatDialogRef);

  @Inject(MAT_DIALOG_DATA) data: TaskDialogData =
    inject<TaskDialogData>(MAT_DIALOG_DATA);

  isEditMode = !!this.data?.task;

  categories: { value: TaskCategory; label: string }[] = [
    { value: 'PERSONNEL', label: '👤 Personnel' },
    { value: 'FAMILLE',   label: '👨‍👩‍👧 Famille'  },
    { value: 'COURSES',   label: '🛒 Courses'   },
    { value: 'TRAVAIL',   label: '💼 Travail'   },
    { value: 'SANTE',     label: '❤️ Santé'     },
  ];

  priorities: { value: TaskPriority; label: string }[] = [
    { value: 'BASSE'   as TaskPriority, label: 'Basse'   },
    { value: 'NORMALE' as TaskPriority, label: 'Normale' },
    { value: 'HAUTE'   as TaskPriority, label: 'Haute'   },
  ];

  form: FormGroup = this.fb.group({
    title:    [this.data?.task?.title    ?? '', Validators.required],
    note:     [this.data?.task?.note     ?? ''],
    dueDate:  [this.data?.task?.dueDate  ?? new Date().toISOString().split('T')[0]],
    category: [this.data?.task?.category ?? ('PERSONNEL' as TaskCategory), Validators.required],
    priority: [this.data?.task?.priority ?? ('NORMALE' as TaskPriority),   Validators.required],
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const value = this.form.value;

    if (this.isEditMode) {
      const update: UpdateTaskRequest = { ...value };
      this.dialogRef.close({ mode: 'edit', data: update });
    } else {
      const create: CreateTaskRequest = { ...value };
      this.dialogRef.close({ mode: 'create', data: create });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
