import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaNivelPageRoutingModule } from './prueba-nivel-routing.module';

import { PruebaNivelPage } from './prueba-nivel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaNivelPageRoutingModule
  ],
  declarations: [PruebaNivelPage]
})
export class PruebaNivelPageModule {}
