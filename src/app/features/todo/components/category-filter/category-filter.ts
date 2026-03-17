import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { TaskCategory } from '../../../../core/models/task.model';

interface FilterChip {
  label:    string;
  value:    TaskCategory | null;
}

@Component({
  selector: 'app-category-filter',
  imports: [CommonModule],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss',
})
export class CategoryFilter {

  @Output() filterChange = new EventEmitter<TaskCategory | null>();

  activeFilter = signal<TaskCategory | null>(null);

  chips: FilterChip[] = [
    { label: 'Tout',       value: null         },
    { label: '👤 Personnel',value: 'PERSONNEL'  },
    { label: '👨‍👩‍👧 Famille', value: 'FAMILLE'    },
    { label: '🛒 Courses',  value: 'COURSES'    },
    { label: '💼 Travail',  value: 'TRAVAIL'    },
    { label: '❤️ Santé',    value: 'SANTE'      },
  ];

  select(chip: FilterChip): void {
    this.activeFilter.set(chip.value);
    this.filterChange.emit(chip.value);
  }
}
