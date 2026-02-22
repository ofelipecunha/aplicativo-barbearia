import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { dashboardDonoGuard, dashboardRecepcaoGuard, webPerfilGuard } from './guards/dashboard-perfil.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'cadastro', loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent) },
  { path: 'esqueci-senha', loadComponent: () => import('./pages/esqueci-senha/esqueci-senha.component').then(m => m.EsqueciSenhaComponent) },
  { path: 'reset-senha', loadComponent: () => import('./pages/reset-senha/reset-senha.component').then(m => m.ResetSenhaComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard-wrapper.component').then(m => m.DashboardWrapperComponent), canActivate: [authGuard, webPerfilGuard, dashboardDonoGuard] },
  { path: 'dashboard-recepcao', loadComponent: () => import('./pages/dashboard-recepcao/dashboard-recepcao.component').then(m => m.DashboardRecepcaoComponent), canActivate: [authGuard, webPerfilGuard, dashboardRecepcaoGuard] },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent), canActivate: [authGuard, webPerfilGuard] },
  { path: '**', redirectTo: 'login' },
];
