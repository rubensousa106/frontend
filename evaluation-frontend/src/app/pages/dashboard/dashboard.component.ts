import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserCreateComponent} from "../crud/user-create/user-create.component";
import {UserAllComponent} from "../crud/user-all/user-all.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {

   constructor(private _dialog: MatDialog) {}


    openAddForm()
    {
      this._dialog.open(UserCreateComponent);
    }

  openShowAll() {
    this._dialog.open(UserAllComponent);
  }
}
