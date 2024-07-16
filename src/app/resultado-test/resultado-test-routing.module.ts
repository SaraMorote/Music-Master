import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoTestPage } from './resultado-test.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoTestPageRoutingModule {}
