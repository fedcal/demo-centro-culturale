import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Casa della Cultura Mediterranea — Eventi, biblioteca, corsi a Trieste'
  },
  {
    path: 'eventi',
    loadComponent: () => import('./pages/eventi/eventi.component').then((m) => m.EventiComponent),
    title: 'Eventi — Casa della Cultura Mediterranea Trieste'
  },
  {
    path: 'corsi',
    loadComponent: () => import('./pages/corsi/corsi.component').then((m) => m.CorsiComponent),
    title: 'Corsi — Casa della Cultura Mediterranea Trieste'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Casa della Cultura Mediterranea Trieste'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e Tessera Socio — Casa della Cultura Mediterranea Trieste'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
