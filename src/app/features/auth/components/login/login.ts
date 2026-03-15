import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule }       from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  isLoading = false;
  showPassword = false;

  form: FormGroup = this.fb.group({
    email: ['', [
      Validators.required, Validators.email,
    ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailError(): string {
    const crtl = this.form.get('email');
    if(crtl?.hasError('requered')) return 'Email requis';
    if(crtl?.hasError('email')) return 'Email invalide';
    return '';
  }

  get passwordError(): string {
    const crtl = this.form.get('password');
    if(crtl?.hasError('required')) return 'Mot de passe requis';
    if(crtl?.hasError('minLength')) return 'Minimum 6 caractères';
    return '';
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if(this.form.invalid) return;

    this.isLoading = true;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/hub']);
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open(
          err.error?.message ?? 'Erreur de connexion', 'Fermer',
          {duration: 3000, panelClass: ['snack-error']}
        )
      }
    });
  }
}
