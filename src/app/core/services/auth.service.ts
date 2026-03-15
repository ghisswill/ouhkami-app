import { computed, Injectable, signal } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  // -- Signal :  etat de l'utilisateur connecté
  private _currentUser = signal<User | null>(null);

  readonly currentUser = computed(() => this._currentUser.asReadonly());
  readonly isLoggedIn = computed(() => !!this._currentUser());
  readonly userName = computed(() => this._currentUser()?.name ?? ' ');

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
  ) {
    // Restaure l'utilisateur connecté depuis le stockage local
    this.restoreSession();
  }

    // ── Données mockées ────────────────────────────────────
  private mockResponse: AuthResponse = {
    token: 'mock-jwt-token-familyhub-2026',
    userId: 'mock-user-001',
    name: 'Tima',
    email: 'tima@familyhub.com',
  };

  register(data: RegisterRequest): Observable<AuthResponse> {
    // Utilise le nom saisi dans le formulaire
    const response: AuthResponse = {
      ...this.mockResponse,
      name:  data.name,
      email: data.email,
    };

    return of(response).pipe(
      delay(800),
      tap(res => this.handleAuthResponse(res))
    );
    /* return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(tap((response) => this.handleAuthResponse(response))); */
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return of<AuthResponse>(this.mockResponse).pipe(
      delay(800),    // simule un délai réseau de 800ms
      tap(response => this.handleAuthResponse(response))
    );
    /* return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(tap((response) => this.handleAuthResponse(response))); */
  }

  logout(): void {
    this.storage.clear();
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  // Sauvegarde token + user apres login/register
  handleAuthResponse(response: AuthResponse): void {
    this.storage.setToken(response.token);
    const user: User = {
      id: response.userId,
      name: response.name,
      email: response.email,
    };
    this.storage.setUser(user);
    this._currentUser.set(user);
  }

  // Recharge la session depuis localStorage
  restoreSession() {
    if (this.storage.hasToken()) {
      const user = this.storage.getUser<User>();
      if (user) {
        this._currentUser.set(user);
      }
    }
  }
}
