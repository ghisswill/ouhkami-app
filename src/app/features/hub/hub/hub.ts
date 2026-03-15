import { Component, inject, OnInit } from '@angular/core';
import { ModuleGrid } from '../components/module-grid/module-grid';
import { StatCard } from '../components/stat-card/stat-card';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-hub',
  imports: [StatCard, ModuleGrid],
  templateUrl: './hub.html',
  styleUrl: './hub.scss',
})
export class Hub implements OnInit{
  
private taskService = inject(TaskService);

  stats = this.taskService.stats;

  ngOnInit(): void {
    this.taskService.loadStats().subscribe();
  }
}
