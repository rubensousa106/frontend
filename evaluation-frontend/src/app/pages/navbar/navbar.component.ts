import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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

  logout() {
    this.authService.logout();
  }
}
