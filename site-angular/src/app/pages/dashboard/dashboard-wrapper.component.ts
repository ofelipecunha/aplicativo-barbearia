import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DashboardComponent } from './dashboard.component';
import { DashboardRecepcaoComponent } from '../dashboard-recepcao/dashboard-recepcao.component';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [CommonModule, DashboardComponent, DashboardRecepcaoComponent],
  template: `
    @if (isRecepcao()) {
      <app-dashboard-recepcao />
    } @else {
      <app-dashboard />
    }
  `,
  styles: [':host { display: block; width: 100%; height: 100%; }'],
})
export class DashboardWrapperComponent {
  private perfil = computed(() => (this.auth.user()?.perfil ?? '').toUpperCase());

  isRecepcao = computed(() => {
    const p = this.perfil();
    return p === 'RECEPCAO' || p === 'RECEPCIONISTA';
  });

  constructor(public auth: AuthService) {}
}
