import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'dashboard/analytics', pathMatch: 'full' },

  // Routes publiques
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },

  // Routes sécurisées
  {
    path: '',
    component: AdminLayoutComponent,
  //  canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'} },
      { path: 'others', loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule), data: { title: 'Others', breadcrumb: 'OTHERS'} },
      { path: 'forms', loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule), data: { title: 'Forms', breadcrumb: 'FORMS'} },
      { path: 'ahmedbaba', loadChildren: () => import('./views/ahmedbaba/ahmedbaba.module').then(m => m.AhmedbabaModule), data: { title: 'Ahmed Baba', breadcrumb: 'AHMED BABA'} },
      { path: 'search', loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule) }
    ]
  },

  // Fallback
  //{ path: '**', redirectTo: 'sessions/signup' }
  { path: '**', redirectTo: 'sessions/404' }
];
