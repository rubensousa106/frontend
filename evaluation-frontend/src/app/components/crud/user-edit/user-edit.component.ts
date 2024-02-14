import {Component, Input, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {NgbActiveModal, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})


export class UserEditComponent implements OnInit {
  @Input() user: any;
  userForm: FormGroup;
  userId!: number;
  protected readonly close = close;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private route: ActivatedRoute  // Adicione o ActivatedRoute ao construtor
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      username: [''],
      password: [''],
      email: [''],
      role: [''],
      dateOfRegistration: ['']


    });
  }

  ngOnInit() {
    // Obtenha o ID do usuário da rota
    this.route.params.subscribe(params => {
      const idParam = params['id'];

      if (!isNaN(idParam)) {  // Verifique se é um número
        this.userId = +idParam;

        // Obtenha os detalhes do usuário usando o serviço
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


  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = {
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        email: this.userForm.get('email')?.value,
        dateOfRegistration: this.userForm.get('dateOfRegistration')?.value,
        role: this.userForm.get('role')?.value,
      };

      // Chame o serviço para atualizar o usuário
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (response: any) => {
          if (response && typeof response === 'string') {
            // Verifique se a resposta é uma mensagem de sucesso em formato de texto
            console.log('Resposta do servidor:', response);
            // Trate a resposta conforme necessário, por exemplo, exibindo uma mensagem para o usuário
          } else {
            // A resposta não é uma mensagem de sucesso em formato de texto, pode ser um JSON
            console.warn('Resposta inesperada do servidor:', response);
            // Trate a resposta conforme necessário para o seu caso
          }

          // Aqui você pode adicionar mais lógica conforme necessário
          this.activeModal.close('Update successful');
        },
        (error: HttpErrorResponse) => {
          // Lida com erros durante a atualização
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    }
  }


  onCancel() {
    this.activeModal.close('Cancel')
  }
}
