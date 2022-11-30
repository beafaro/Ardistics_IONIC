import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ardistics/arduinos',
    pathMatch: 'full'
  },
  {
    path: 'ardistics/arduinos',
    loadChildren: () => import('./ardistics/ardistics.module').then( m => m.ArdisticsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
