import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
private readonly TOKEN_KEY = 'fh_token';
private readonly USER_KEY = 'fh_user';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  // ---- User management -----------------------------------

  setUser(user: object): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser<T> (): T | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) as T : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // ---- Clear all -----------------------------------------
  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}