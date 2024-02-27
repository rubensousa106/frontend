import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  username: string | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.getUsername().subscribe((username) => {
      this.username = username;
    });
  }
}
