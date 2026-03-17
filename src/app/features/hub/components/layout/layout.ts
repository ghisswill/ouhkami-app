import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, Topbar, AsyncPipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  private router = inject(Router);

  get pageTitle(): string {
    const url = this.router.url;
    if (url.includes('todo')) return 'To Do List';
    return 'Mon Hub';
  }
}
