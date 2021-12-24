import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MrecipeDetailsPage } from './mrecipe-details.page';

const routes: Routes = [
  {
    path: '',
    component: MrecipeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MrecipeDetailsPageRoutingModule {}
