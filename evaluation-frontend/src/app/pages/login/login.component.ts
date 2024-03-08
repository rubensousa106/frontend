import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
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
    //Imprime  o username e password na consola. Apagar console.log
    // console.log(`Login clicked: ${this.username} / ${this.password}`);

    this.authService
      .login({
        username: this.username,
        password: this.password
      })
      .subscribe((response) => {
        // Imprimir o token descodificado na consola
        console.log("Decoded Token from LoginComponent:", response.decodedToken);

        alert('Login successful');

        // Navegue para a página inicial. Apagar console.log
        this.router.navigate(['/']).then(r => console.log(r));

      });
  }

  public logout() {
    this.authService.logout();
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
