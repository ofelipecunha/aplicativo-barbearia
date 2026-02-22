import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Apenas RECEPCAO e DONO podem acessar o sistema web. Cada um só acessa sua dashboard. */
const PERFIS_RECEPCAO = ['RECEPCAO', 'RECEPCIONISTA'];
const PERFIS_DONO = ['DONO', 'ADMIN'];
const PERFIS_WEB = [...PERFIS_RECEPCAO, ...PERFIS_DONO];

/** Guarda que garante que só perfis RECEPCAO e DONO acessam a área logada do web. */
export const webPerfilGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  const perfil = (auth.user()?.perfil ?? '').toUpperCase();
  if (PERFIS_WEB.includes(perfil)) return true;
  router.navigate(['/login'], { queryParams: { motivo: 'perfil' } });
  return false;
};

export const dashboardRecepcaoGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  const perfil = (auth.user()?.perfil ?? '').toUpperCase();
  if (PERFIS_RECEPCAO.includes(perfil)) return true;
  if (PERFIS_DONO.includes(perfil)) {
    router.navigate(['/dashboard']);
    return false;
  }
  router.navigate(['/login'], { queryParams: { motivo: 'perfil' } });
  return false;
};

export const dashboardDonoGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  const perfil = (auth.user()?.perfil ?? '').toUpperCase();
  if (PERFIS_RECEPCAO.includes(perfil)) {
    router.navigate(['/dashboard-recepcao']);
    return false;
  }
  if (PERFIS_DONO.includes(perfil)) return true;
  router.navigate(['/login'], { queryParams: { motivo: 'perfil' } });
  return false;
};
