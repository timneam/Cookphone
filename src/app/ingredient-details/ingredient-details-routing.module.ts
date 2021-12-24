import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientDetailsPage } from './ingredient-details.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientDetailsPageRoutingModule {}
