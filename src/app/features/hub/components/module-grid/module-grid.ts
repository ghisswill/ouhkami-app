import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { APP_MODULES, AppModule } from '../../../../core/models/module.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-module-grid',
  imports: [MatSnackBarModule, MatIconModule],
  templateUrl: './module-grid.html',
  styleUrl: './module-grid.scss',
})
export class ModuleGrid {

  modules = APP_MODULES;

  constructor(
    private router: Router, private snackBar: MatSnackBar
  ) {}

  navigate(module: AppModule): void {
    if (module.isAvailable) {
      this.router.navigate([module.route]);
    } else {
      this.snackBar.open(
        `${module.title} arrive bientôt 🚀`,
        'OK',
        { duration: 2000 }
      );
    }
  }
}
