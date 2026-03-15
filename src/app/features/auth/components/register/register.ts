import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatProgressSpinnerModule, MatSnackBarModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  isLoading = false;
  showPassword = false;

  form: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  get nameError(): string {
    const c = this.form.get('name');
    if(c?.hasError('required')) return 'Nom requis';
    if(c?.hasError('minLength')) return 'Minimum 2 Carateres';
    return '';
  }

  get emailError(): string {
    const c = this.form.get('email');
    if(c?.hasError('required')) return 'Email requis';
    if(c?.hasError('email')) return 'Email invalide';
    return '';
  }

  get passwordError(): string {
    const c = this.form.get('password');
    if(c?.hasError('required')) return 'Mot de passe requis';
    if(c?.hasError('minLength')) return 'Minimum 6 caratères';
    return '';
  }

  get confirmError(): string {
    if(this.form.hasError('passwordMismatch') && this.form.get('confirmPassword')?.touched) {
      return 'Les mots de passe ne correspondent pas';
    }
    return '';
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    this.isLoading = true;
    const { confirmPassword, ...data } = this.form.value;

    this.authService.register(data).subscribe({
      next: ()=> this.router.navigate(['/hub']),
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open(
          err.error?.message ?? 'Erreur lors de l\'inscription',
          'Fermer',
          { duration: 3000, panelClass: ['snack-error'] }
        );
      }
    });
  }
}
