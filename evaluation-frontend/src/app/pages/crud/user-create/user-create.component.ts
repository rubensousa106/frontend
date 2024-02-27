import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfRegistration: [new Date(), Validators.required],
      role: [0, Validators.required] // Valor padrão ou o que fizer sentido para o seu caso
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(
        () => {
          // Limpar o formulário após o envio bem-sucedido
          this.userForm.reset();
          // Atualizar a lista de usuários (chame uma função para recarregar a lista, se necessário)
        },
        (error: HttpErrorResponse) => {
          console.error('Erro ao adicionar usuário:', error);
          // Tratar o erro conforme necessário (exibir uma mensagem de erro, por exemplo)
        }
      );
    }
  }

  onCancel() {
    this.userForm.reset();
  }
}


