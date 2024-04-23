import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials, LoginResponse } from '../auth.models';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  public errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required,Validators.email],
      password: ['', [Validators.required, ]]
    });
  }
  ngOnDestroy(): void {
      
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.authService.logIn(credentials).subscribe({
        next:(response: LoginResponse) => {
          if (response.access && response.refresh && response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            console.log('Login successful');
            this.router.navigate([''])
          } else {
            // Maneja el caso donde no hay tokens en la respuesta.
            console.error('Invalid credentials', response);
          }
        },
        error: (err) => {
          let errorMessage = 'An error occurred during login.';
          if (err.status === 400) {
            // Puedes obtener el mensaje de error de la respuesta del backend aquí
            errorMessage = err.error.message || 'Credentials are incorrect.';
          }
          console.error(errorMessage);
          // Aquí podrías mostrar el mensaje de error en la interfaz de usuario
        }
    });
    }
        
      

    }
}  
  

  

  

