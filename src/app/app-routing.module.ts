import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'prueba-nivel',
    loadChildren: () => import('./prueba-nivel/prueba-nivel.module').then( m => m.PruebaNivelPageModule)
  },
  {
    path: 'resultado-prueba/:numAciertos/:idCurso',
    loadChildren: () => import('./resultado-prueba/resultado-prueba.module').then( m => m.ResultadoPruebaPageModule)
  },
  {
    path: 'apuntes/:idLeccion',
    loadChildren: () => import('./apuntes/apuntes.module').then( m => m.ApuntesPageModule)
  },
  {
    path: 'ejercicios/:idLeccion',
    loadChildren: () => import('./ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
