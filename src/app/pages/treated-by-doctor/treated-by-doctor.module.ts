import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatedByDoctorPageRoutingModule } from './treated-by-doctor-routing.module';

import { TreatedByDoctorPage } from './treated-by-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatedByDoctorPageRoutingModule
  ],
  declarations: [TreatedByDoctorPage]
})
export class TreatedByDoctorPageModule {}
