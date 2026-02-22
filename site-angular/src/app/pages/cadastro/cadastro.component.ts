import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  form: FormGroup;
  loading = false;
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private message: MessageService,
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      perfil: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    try {
      const { nome, login, perfil, senha } = this.form.value;
      await firstValueFrom(
        this.api.post('/usuarios', {
          nome: nome.trim(),
          login: login.trim(),
          senha,
          perfil,
        })
      );
      this.message.add({
        severity: 'success',
        summary: 'Usuário cadastrado',
        detail:
          'Você foi cadastrado com sucesso. Agora é só aguardar o responsável do estabelecimento aprovar seu cadastro.',
        life: 6000,
      });
      this.router.navigate(['/login']);
    } catch (e: unknown) {
      const err = e as { error?: { error?: string }; status?: number };
      let msg = 'Erro ao fazer cadastro. Tente novamente.';
      if (err?.error?.error) {
        msg = err.error.error;
      } else if (err?.status === 409) {
        msg = 'Login já está em uso';
      }
      this.errorMessage.set(msg);
    } finally {
      this.loading = false;
    }
  }
}
