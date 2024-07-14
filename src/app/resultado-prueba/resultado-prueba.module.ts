import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoPruebaPageRoutingModule } from './resultado-prueba-routing.module';

import { ResultadoPruebaPage } from './resultado-prueba.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoPruebaPageRoutingModule
  ],
  declarations: [ResultadoPruebaPage]
})
export class ResultadoPruebaPageModule {}
