import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {LayoutComponent} from "./pages/layout/layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {UserEditComponent} from "./components/crud/user-edit/user-edit.component";
import {UserCreateComponent} from "./components/crud/user-create/user-create.component";
import {UserAllComponent} from "./components/crud/user-all/user-all.component";
import {HomeComponent} from "./pages/home/home.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {path:'home',component:HomeComponent},
   {path:'all',component:UserAllComponent,canActivate: [authGuard]},
   {path:'add',component:UserCreateComponent,canActivate: [authGuard]},
   {path:'edit/:id',component:UserEditComponent,canActivate: [authGuard]},
   {path:'', redirectTo:'home', pathMatch:'full'},

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
