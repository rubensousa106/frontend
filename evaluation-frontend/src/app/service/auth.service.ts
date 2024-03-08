import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";

import {UserRole} from "../model/userRole";
import {jwtDecode} from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected readonly UserRole = UserRole;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | undefined>(undefined);
  private router = inject(Router);
  private role?: string;
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

  getUsername(): Observable<string | undefined> {
    return this.usernameSubject.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  /**
   * metodo para verificar se o token expirou
   */
  /*isTokenExpired() {
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
  }*/

  isUserAdmin(): Observable<boolean> {
    const token: string | null = localStorage.getItem(this.JWT_TOKEN);

    if (token !== null) {
      const decodedToken: any = jwtDecode(token);

      // Imprimir informações detalhadas para depuração
      console.log("Decoded Token:", decodedToken);

      // Verifique se a propriedade 'role' está presente no token
      const userRole: UserRole | undefined = decodedToken?.role;

      if (userRole) {
        // Agora, verifique se o usuário tem a função de administrador
        const isAdmin = userRole === UserRole.ADMIN;
        console.log("User Role:", userRole);
        console.log("isAdmin:", isAdmin);

        return of(isAdmin);
      } else {
        // Se a propriedade 'role' não estiver presente, retorne false (ou outra lógica adequada)
        console.log("isAdmin: false (Role not present in token)");
        return of(false);
      }
    }

    // Se o token não estiver presente, retorne false (ou outra lógica adequada)
    console.log("isAdmin: false (Token not present)");
    return of(false);
  }


  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;

    // Verificar se a propriedade 'role' está presente no token
    const decodedToken: any = jwtDecode(token);

    if (decodedToken && decodedToken.role) {
      // Se a propriedade 'role' estiver presente, armazenar o token
      this.storeJwtToken(token);
    } else {
      // Se 'role' não estiver presente, modificar o token para incluir 'USER' como padrão
      const modifiedToken = { ...decodedToken, role: 'USER' };
      this.storeJwtToken(JSON.stringify(modifiedToken));

    }

    this.isAuthenticatedSubject.next(true);
    this.usernameSubject.next(username);
  }



  private storeJwtToken(jwt: string) {
    //alert(jwt);
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }


}
