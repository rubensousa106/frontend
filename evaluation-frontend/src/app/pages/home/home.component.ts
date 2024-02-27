import {Component, inject} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  authService = inject(AuthService);
  user?: any;
  loginData = { username: '', password: '' };

  /*constructor() {
    this.authService.login({
      username: 'rubensousa', //estes dados tem que ser fornecidos pelo login e nao podem ser estaticos
      password: '12345'
    }).subscribe((r)=>{
      this.authService.getCurrentAuthUser().subscribe((r)=>{
        console.log(r);
        this.user = r;
      }); //this will return the user data
    });
  }*/

  constructor() {}

  performLogin(): void {
    // Use as credenciais fornecidas no formulário
    const { username, password } = this.loginData;

    this.authService.login({
      username: username,
      password: password
    }).subscribe(() => {
      this.fetchCurrentUser();
    });
  }

  fetchCurrentUser(): void {
    this.authService.getCurrentAuthUser().subscribe((userData) => {
      console.log(userData);
      this.user = userData;
    });
  }

}
