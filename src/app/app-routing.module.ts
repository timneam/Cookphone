import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home',
  loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path:'', redirectTo:"login", pathMatch:"full"},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'mrecipe-details/:docid',
    loadChildren: () => import('./mrecipe-details/mrecipe-details.module').then( m => m.MrecipeDetailsPageModule)
  },
  {
    path: 'erecipe-details/:docid',
    loadChildren: () => import('./erecipe-details/erecipe-details.module').then( m => m.ErecipeDetailsPageModule)
  },
  {
    path: 'ingredient-details/:docid',
    loadChildren: () => import('./ingredient-details/ingredient-details.module').then( m => m.IngredientDetailsPageModule)
  },
  {
    path: 'nrecipe',
    loadChildren: () => import('./nrecipe/nrecipe.module').then( m => m.NrecipePageModule)
  },
  {
    path: 'ningredient',
    loadChildren: () => import('./ningredient/ningredient.module').then( m => m.NingredientPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
