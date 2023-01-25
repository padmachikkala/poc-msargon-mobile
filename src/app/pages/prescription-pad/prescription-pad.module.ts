import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescriptionPadPageRoutingModule } from './prescription-pad-routing.module';

import { PrescriptionPadPage } from './prescription-pad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescriptionPadPageRoutingModule
  ],
  declarations: [PrescriptionPadPage]
})
export class PrescriptionPadPageModule {}
