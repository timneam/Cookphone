import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErecipeDetailsPage } from './erecipe-details.page';

const routes: Routes = [
  {
    path: '',
    component: ErecipeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErecipeDetailsPageRoutingModule {}
