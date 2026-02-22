import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.scss',
})
export class EsqueciSenhaComponent {
  constructor(private message: MessageService) {}

  info(): void {
    this.message.add({
      severity: 'info',
      summary: 'Recuperação de senha',
      detail: 'Entre em contato com o administrador para redefinir sua senha.',
    });
  }
}
