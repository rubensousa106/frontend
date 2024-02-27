import {Component} from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  username = '';
  password = '';
  newToken: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  public login(event: Event) {
    event.preventDefault();
    console.log(`Login clicked: ${this.username} / ${this.password}`); //remove this line

    this.authService
      .login({
        username: this.username,
        password: this.password
      })
      .subscribe(() => {
        alert('Login successful');
        this.router.navigate(['/']).then(r => console.log(r)); //remove console.log
      });
  }

  public logout() {
    this.authService.logout();
  }

}
