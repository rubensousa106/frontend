import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrl: './user-all.component.css'
})
export class UserAllComponent implements OnInit{

  users: User[] = [];
  message: string = '';

  // Exemplo: Navegar para a página de edição ao clicar em um botão "Editar"



  constructor(private service: UserService, private modalService: NgbModal, private router: Router) {
  }

  editUser(userId: number) {
    this.router.navigate(['/edit', userId]);
  }

  ngOnInit(): void {
  this.getAllUsers();
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

  deleteUser(id : number) {
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
    const modalRef = this.modalService.open(UserEditComponent);
    modalRef.componentInstance.userId = userId; // Passe o ID do usuário para o componente de edição
  }

}
