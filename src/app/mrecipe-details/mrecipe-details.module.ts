import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MrecipeDetailsPageRoutingModule } from './mrecipe-details-routing.module';

import { MrecipeDetailsPage } from './mrecipe-details.page';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MrecipeDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MrecipeDetailsPage]
})
export class MrecipeDetailsPageModule {}
