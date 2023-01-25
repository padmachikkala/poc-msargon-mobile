import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidersRegPageRoutingModule } from './providers-reg-routing.module';

import { ProvidersRegPage } from './providers-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidersRegPageRoutingModule
  ],
  declarations: [ProvidersRegPage]
})
export class ProvidersRegPageModule {}
