import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescriptionPadPage } from './prescription-pad.page';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionPadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionPadPageRoutingModule {}
