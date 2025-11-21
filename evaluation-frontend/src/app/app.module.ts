import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {UserAllComponent} from './pages/crud/user-all/user-all.component';
import {UserCreateComponent} from './pages/crud/user-create/user-create.component';
import {UserEditComponent} from './pages/crud/user-edit/user-edit.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {HomeComponent} from './pages/home/home.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {LoginComponent} from "./pages/login/login.component";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "./pages/navbar/navbar.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";


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
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatMenu,
    MatMenuTrigger

  ],
  providers: [NgbActiveModal, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
