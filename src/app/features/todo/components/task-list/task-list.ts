import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  @Input()  tasks:  Task[]             = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() edit   = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
}
