import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NingredientPageRoutingModule } from './ningredient-routing.module';

import { NingredientPage } from './ningredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NingredientPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NingredientPage]
})
export class NingredientPageModule {}
