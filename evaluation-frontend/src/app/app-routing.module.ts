import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserAllComponent} from "./components/crud/user-all/user-all.component";
import {UserCreateComponent} from "./components/crud/user-create/user-create.component";
import {UserEditComponent} from "./components/crud/user-edit/user-edit.component";

const routes: Routes = [

  {path:'all',component:UserAllComponent},
  {path:'add',component:UserCreateComponent},
  {path:'edit/:id',component:UserEditComponent},
  {path:'', redirectTo:'all', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
