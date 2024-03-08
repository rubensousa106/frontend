import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from "../../../service/user.service";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from '@angular/router';
import {UserRole} from "../../../model/userRole";
import {AuthService} from "../../../service/auth.service";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrl: './user-all.component.css'
})


export class UserAllComponent implements OnInit {

  users: User[] = [];
  message: string = '';
  displayedColumns: string[] = ['id', 'username', 'password', 'email', 'dateOfRegistration', 'role', 'operation'];
  isUserAdmin$!: Observable<boolean>;
  showTable: boolean = true;
  constructor(private service: UserService, private modalService: NgbModal, private router: Router, private authService: AuthService, private cdRef: ChangeDetectorRef) {

  }

  editUser(userId: number) {
    this.router.navigate(['/edit', userId]);
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.isUserAdmin$ = this.authService.isUserAdmin();
    this.isUserAdmin$.subscribe(isAdmin => {
      console.log('isAdmin$:', isAdmin);
      this.cdRef.detectChanges(); // force change detection
    });
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        this.users = [];
        console.log(error);
      }
    );
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(
      data => {
        this.message = data;
        this.getAllUsers();
      },
      error => {
        console.log(error);
      }
    );
  }

  openEditModal(userId: number) {
    this.showTable = false;// Esconder a tabela ao abrir o modal
    const modalRef = this.modalService.open(UserEditComponent);
    modalRef.componentInstance.userId = userId; // Passe o ID do usuário para o componente de edição
    // Opção para reexibir a tabela quando o modal for fechado
    modalRef.result.then((result) => {
      this.showTable = true;
    },(reason) => {
      this.showTable = true;
    });
  }



}

