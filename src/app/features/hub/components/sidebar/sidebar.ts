import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  available: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private authService = inject(AuthService);
  private taskService = inject(TaskService);

  // Donnée utilisateur depuis signal
  userName = this.authService.userName;
  pendingCount = computed(()=>this.taskService.stats().pending);

  today = new Date().toLocaleTimeString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  navItems: NavItem[] = [
    { label: 'Hub',       icon: 'home',          route: '/hub',  available: true  },
    { label: 'To Do List',icon: 'check_circle',   route: '/todo', available: true  },
    { label: 'Planning',  icon: 'calendar_today', route: '',      available: false },
    { label: 'Courses',   icon: 'shopping_cart',  route: '',      available: false },
    { label: 'Dépenses',  icon: 'account_balance_wallet', route: '', available: false },
    { label: 'Recettes',  icon: 'restaurant_menu',route: '',      available: false },
    { label: 'Tracker',   icon: 'bar_chart',      route: '',      available: false },
    { label: 'Ecommence', icon: 'bar_chart',      route: '',      available: false },
  ];

  logout(): void {
    this.authService.logout();
  }
}
