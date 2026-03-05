import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

const MSG_PERFIL_WEB = 'Seu perfil não tem acesso ao sistema web. Utilize o aplicativo.';

/** Apenas RECEPCAO e DONO podem acessar o sistema web. */
const PERFIS_RECEPCAO = ['RECEPCAO', 'RECEPCIONISTA'];
const PERFIS_DONO = ['DONO', 'ADMIN'];
const PERFIS_WEB = [...PERFIS_RECEPCAO, ...PERFIS_DONO];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMessage = signal<string | null>(null);
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageService,
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
      lembrar: [false],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['motivo'] === 'perfil') {
      this.message.add({
        severity: 'warn',
        summary: 'Acesso negado',
        detail: MSG_PERFIL_WEB,
        life: 6000,
      });
    }
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    try {
      const { login, senha } = this.form.value;
      await this.auth.login(login, senha);
      const user = this.auth.user();
      const perfil = (user?.perfil ?? '').toUpperCase();
      if (!PERFIS_WEB.includes(perfil)) {
        this.auth.logout();
        this.message.add({
          severity: 'warn',
          summary: 'Acesso negado',
          detail: MSG_PERFIL_WEB,
          life: 6000,
        });
        return;
      }
      const isRecepcao = PERFIS_RECEPCAO.includes(perfil);
      this.router.navigate([isRecepcao ? '/dashboard-recepcao' : '/dashboard']);
    } catch (e: unknown) {
      const msg =
        e && typeof e === 'object' && 'error' in (e as { error?: { error?: string } })
          ? (e as { error: { error?: string } }).error?.error
          : 'Erro ao fazer login. Verifique e-mail e senha.';
      this.errorMessage.set(msg ?? 'Erro ao fazer login.');
    } finally {
      this.loading = false;
    }
  }
}
