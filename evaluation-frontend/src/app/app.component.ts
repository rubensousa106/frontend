import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // admin module
  title = 'frontend';
  emitMenu = false;

  getEmit(val: boolean) {
    this.emitMenu = val;
  }




  isAuthenticated = false;
  username: string | undefined;

  constructor() {}

  ngOnInit() {
    // ... o restante do código
  }
}
