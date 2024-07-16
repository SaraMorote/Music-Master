import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoTestPageRoutingModule } from './resultado-test-routing.module';

import { ResultadoTestPage } from './resultado-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoTestPageRoutingModule
  ],
  declarations: [ResultadoTestPage]
})
export class ResultadoTestPageModule {}
