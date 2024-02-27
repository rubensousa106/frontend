import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | undefined>(undefined);
  private router = inject(Router);

  constructor(private http: HttpClient) {
  }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http
      .post('http://localhost:9898/user/authenticate', user).pipe(
        tap((response: any) => this.doLoginUser(user.username, JSON.stringify(response)))
      );
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next(undefined);
    this.router.navigate(['/home']);
  }

  getCurrentAuthUser() {
    //let token = localStorage.getItem(this.JWT_TOKEN);
    return this.http.get('http://localhost:9898/user/authenticate/me', {
      /* headers: {
         Authorization: `Bearer ` + token,
       },*/
      responseType: 'text' //indica que e o backend retorna uma string e nao um Json
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN); //retorna true se o token existir
  }

  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
    this.usernameSubject.next(username); //envia o nome do usuario para o observable
  }

  private storeJwtToken(jwt: string) {
    //alert(jwt);
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getUsername(): Observable<string | undefined> {
    return this.usernameSubject.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);

    if (!tokens) {
      return true;
    }
    const token = JSON.parse(tokens).access_token;
    const decodedToken = jwtDecode(tokens); //npm install jwt-decode

    if (!decodedToken || typeof decodedToken.exp === 'undefined') {
      return true;
    }

    const expirationDate = decodedToken.exp! * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

}
