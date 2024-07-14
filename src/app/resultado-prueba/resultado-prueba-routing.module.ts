import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoPruebaPage } from './resultado-prueba.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoPruebaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoPruebaPageRoutingModule {}
