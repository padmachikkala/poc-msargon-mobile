import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatedByDoctorPage } from './treated-by-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: TreatedByDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatedByDoctorPageRoutingModule {}
