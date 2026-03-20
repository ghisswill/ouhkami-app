import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Map catégorie → label + couleur
const CAT_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  PERSONNEL: { label: '👤 Personnel', bg: '#E8E4FF', color: '#6C63FF' },
  FAMILLE:   { label: '👨‍👩‍👧 Famille',  bg: '#E8E4FF', color: '#6C63FF' },
  COURSES:   { label: '🛒 Courses',   bg: '#D4F5EE', color: '#1D9E75' },
  TRAVAIL:   { label: '💼 Travail',   bg: '#FFF3E0', color: '#E65100' },
  SANTE:     { label: '❤️ Santé',     bg: '#FFE4EC', color: '#FF6584' },
};

const PRIORITY_COLOR: Record<string, string> = {
  HAUTE:   '#FF6584',
  NORMALE: '#6C63FF',
  BASSE:   '#43C6AC',
};

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {

  @Input() task!: Task;
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  get priorityColor(): string {
    return PRIORITY_COLOR[this.task.priority] ?? '#6C63FF';
  }

  get catConfig() {
    return CAT_CONFIG[this.task.category]
      ?? { label: this.task.category, bg: '#EEE', color: '#999' };
  }

  get formattedDate(): string {
    if (!this.task.dueDate) return '';
    const today = new Date().toISOString().split('T')[0];
    const dueDateStr = new Date(this.task.dueDate).toISOString().split('T')[0];
    if (dueDateStr === today) return "Aujourd'hui";
    return new Date(this.task.dueDate)
      .toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
}
