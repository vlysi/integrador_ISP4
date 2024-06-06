import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  isLogged = false;
  user: any;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.getIsLogged().subscribe(logged => {
      this.isLogged = logged; // Actualiza isLogged cuando cambia el estado de autenticación

      if (logged) {
        const userData = localStorage.getItem('user');// Obtiene los datos del usuario 
        if (userData) {
          this.user = JSON.parse(userData);// Almacena los datos del usuario en user
        }
      } else {
        this.user = null;
      }
    });
  }

  onButtonClick() {
    if (this.isLogged) {
      //Si el usuario está logeado redirige a la página de pagos
      this.router.navigate(['/payments/']);
    } else {
      // si no lo está redirige a la página de login
      this.router.navigate(['/login']);
    }
  }
}
