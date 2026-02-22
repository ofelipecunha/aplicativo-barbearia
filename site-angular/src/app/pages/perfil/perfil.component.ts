import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  loading = false;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private message: MessageService,
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      senha_atual: [''],
      nova_senha: [''],
      nova_senha_confirmation: [''],
    });
  }

  ngOnInit(): void {
    this.user = this.auth.user() ?? null;
    this.form.patchValue({ nome: this.user?.nome ?? '' });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.user) {
      this.form.markAllAsTouched();
      return;
    }
    const { nome, senha_atual, nova_senha } = this.form.value;

    this.loading = true;
    try {
      if (nome?.trim()) {
        await firstValueFrom(this.api.patch(`/usuarios/${this.user.id}`, { nome: nome.trim() }));
        this.auth.updateUser({ ...this.user, nome: nome.trim() });
      }
      if (senha_atual?.length && nova_senha?.length) {
        await firstValueFrom(
          this.api.post(`/usuarios/${this.user.id}/senha`, {
            senha_atual: senha_atual,
            nova_senha: nova_senha,
          })
        );
      }
      this.message.add({ severity: 'success', summary: 'Perfil atualizado!' });
      this.router.navigate(['/dashboard']);
    } catch (e: unknown) {
      const err = e as { error?: { error?: string } };
      const msg = err?.error?.error ?? 'Erro ao atualizar perfil. Tente novamente.';
      this.message.add({ severity: 'error', summary: 'Erro', detail: msg });
    } finally {
      this.loading = false;
    }
  }

  avatarUrl(): string {
    const u = this.user;
    if (u?.avatar) return u.avatar;
    const nome = u?.nome ?? 'U';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=ff9000&color=312e38`;
  }
}
