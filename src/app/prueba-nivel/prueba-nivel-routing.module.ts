import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaNivelPage } from './prueba-nivel.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaNivelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaNivelPageRoutingModule {}
