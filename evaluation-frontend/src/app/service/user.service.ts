import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {User} from "../model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:9898/user'; // URL DO REQUEST MAPPING DO CONTROLLER NO BACKEND

  constructor(private http: HttpClient, private router: Router) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/remove/${id}`, {responseType: 'text'});
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get/${userId}`);

  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user)
      .pipe(
        catchError((error) => {
          console.error("Error during user addition:", error);

          // Log o objeto de erro completo para obter detalhes específicos
          console.log("Full error object:", error);

          // Customize the error handling based on your requirements
          if (error.status === 400) {
            // Handle validation error
            // Extract error details from the 'error' object
            // For example, error.error.fieldErrors may contain validation errors
          }

          return throwError(error); // Re-throw the error after handling
        })
      );
  }


  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${userId}`, updatedUser);
  }

  editUser(userId: number) {
    this.router.navigate(['/edit', userId]);
  }
}
