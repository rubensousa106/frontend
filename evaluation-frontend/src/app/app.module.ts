import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { UserAllComponent } from './components/crud/user-all/user-all.component';
import { UserCreateComponent } from './components/crud/user-create/user-create.component';
import { UserEditComponent } from './components/crud/user-edit/user-edit.component';
import { UserLoginComponent } from './components/security/user-login/user-login.component';



@NgModule({

  declarations: [
    AppComponent,
    UserAllComponent,
    UserCreateComponent,
    UserEditComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Module for making HTTP requests
    FormsModule, // Module for two-way data binding
    ReactiveFormsModule,
    NgbModalModule,

  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
