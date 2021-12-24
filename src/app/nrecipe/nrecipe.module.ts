import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NrecipePageRoutingModule } from './nrecipe-routing.module';

import { NrecipePage } from './nrecipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NrecipePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NrecipePage]
})
export class NrecipePageModule {}
