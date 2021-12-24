import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErecipeDetailsPageRoutingModule } from './erecipe-details-routing.module';

import { ErecipeDetailsPage } from './erecipe-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErecipeDetailsPageRoutingModule
  ],
  declarations: [ErecipeDetailsPage]
})
export class ErecipeDetailsPageModule {}
