import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {UserRole} from "../../../model/userRole";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})


export class UserEditComponent implements OnInit {
  @Input() user: any;
  userForm: FormGroup;
  userId!: number;
  roles = [
    {value: UserRole.ADMIN, viewValue: 'ADMIN'}, //value é o valor que será enviado para o servidor e viewValue é o valor que será exibido no menu
    {value: UserRole.USER, viewValue: 'USER'},
    {value: UserRole.TeachingStaff, viewValue: 'TeachingStaff'},
    {value: UserRole.NonTeachingStaff, viewValue: 'NonTeachingStaff'},
  ];

  protected readonly close = close;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private route: ActivatedRoute  // Adicionar o ActivatedRoute ao construtor
  ) {
    this.userForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      username: [''],
      password: [''],
      email: [''],
      role: [''],
      dateOfRegistration: ['']


    });
  }

  ngOnInit() {
    // get ID do usuário da rota
    this.route.params.subscribe(params => {
      const idParam = params['id'];

      // Verifique se o ID é um número válido
      if (!isNaN(idParam)) {
        this.userId = +idParam;

        // get dos detalhes do usuário usando o serviço
        this.userService.getUserById(this.userId).subscribe(user => {
          // Preencha o formulário com os detalhes do usuário a ser editado
          this.userForm.patchValue(user);
        });
      } else {
        // Lida com o caso em que o ID não é um número válido
        console.error('ID de usuário inválido:', idParam);
        console.log('ID do usuário a ser editado:', this.userId);
      }
    });
  }

  // Método para atualizar o utilizador
  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = {
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        email: this.userForm.get('email')?.value,
        dateOfRegistration: this.userForm.get('dateOfRegistration')?.value,
        role: this.userForm.get('role')?.value,
      };

      // Atualiza o utilizador com o ID fornecido
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (response: any) => {
          if (response && typeof response === 'string') {
            // A resposta é uma mensagem de sucesso em formato de texto
            console.log('Resposta do servidor:', response);
            // Exiba a mensagem de sucesso conforme necessário
          } else {
            // A resposta é inesperada
            console.warn('Resposta inesperada do servidor:', response);
            // Exiba a mensagem de erro conforme necessário
          }

          // Fecha a janela modal após a atualização bem-sucedida
          this.activeModal.close('Update successful');
        },
        (error: HttpErrorResponse) => {
          // Lida com erros de atualização do usuário
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    }
  }

  // Método para fechar a janela modal
  onCancel() {
    this.activeModal.close('Cancel')
  }
}
