import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersRegPage } from './providers-reg.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidersRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersRegPageRoutingModule {}
