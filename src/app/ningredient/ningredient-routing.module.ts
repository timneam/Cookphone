import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NingredientPage } from './ningredient.page';

const routes: Routes = [
  {
    path: '',
    component: NingredientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NingredientPageRoutingModule {}
