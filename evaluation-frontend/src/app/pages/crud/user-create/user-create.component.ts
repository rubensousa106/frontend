import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  userForm: FormGroup;

  userRoles: string[] = ['ADMIN', 'USER', 'TeachingStaff', 'NonTeachingStaff'];
  isSubmitting = false;


  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfRegistration: [new Date(), Validators.required],
      role: ['', Validators.required] // 0 = Admin, 1 = User, 2 = TeachingStaff, 3 = NonTeachingStaff
    });
  }

  onSubmit() {
    console.log('Formulário enviado:', this.userForm.value);
    // Evitar envios duplicados
    if (this.isSubmitting || !this.userForm.valid) {
      return;
    }

    // Defina o estado de envio
    this.isSubmitting = true;


    this.userService.addUser(this.userForm.value).subscribe({
      next: () => {
        this.userForm.reset();
        console.log('Usuário adicionado com sucesso!');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao adicionar usuário:', error);
      },
      complete: () => {
        // Reset ao estado de envio após o término, independentemente de sucesso ou falha
        this.isSubmitting = false;
      },
    });
  }

  onCancel() {
    this.userForm.reset();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}


