import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

const STORAGE_KEY = '@Barbearia:user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(this.loadStoredUser());

  user = computed(() => this.userSignal());
  isLoggedIn = computed(() => !!this.userSignal());

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  private loadStoredUser(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  async login(login: string, senha: string): Promise<void> {
    const user = await firstValueFrom(this.api.post<User>('/auth/login', { login: login.trim(), senha }));
    if (!user) throw new Error('Resposta inválida');
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  updateUser(user: User): void {
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}
