import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';


const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'Auth',
    component: AuthComponent,

  },
  {
    path: 'Preview',
    loadComponent: () =>
      import('../app/preview/preview.component').then((mod) => mod.PreviewComponent),
  },
  {
    path: 'Data',
    loadComponent: () =>
      import('../app/data/data.component').then((mod) => mod.DataComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
