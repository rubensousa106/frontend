import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {UserAllComponent} from './components/crud/user-all/user-all.component';
import {UserCreateComponent} from './components/crud/user-create/user-create.component';
import {UserEditComponent} from './components/crud/user-edit/user-edit.component';

import {LayoutComponent} from './pages/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthModule} from "@auth0/auth0-angular";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import { HomeComponent } from './pages/home/home.component';
import { LogoutComponent } from './pages/logout/logout.component';
import {LoginComponent} from "./pages/login/login.component";
import {RouterModule} from "@angular/router";



@NgModule({

  declarations: [
    AppComponent,
    UserAllComponent,
    UserCreateComponent,
    UserEditComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    HomeComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Module for making HTTP requests
    FormsModule, // Module for two-way data binding
    ReactiveFormsModule,
    NgbModalModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      /*domain: 'https://dev-1ubkppb2o8ckfpe7.us.auth0.com/',
      clientId: '65d6a1dcfbdfdb136c6482b7',*/
      domain: 'dev-1ubkppb2o8ckfpe7.us.auth0.com',
      clientId: 'FskW2o0u4rcHlciv5UJg6WtMMg2d1BBG',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
