import { Component,ViewChild, OnInit, Injectable  } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedTest = true;
  isLogged = true;
  user: any;
  isStaff = false;
  mostrarLogin = false;
  isPremium = false;

  constructor(public authService: AuthService) {
    this.authService.getIsLogged().subscribe(logged => {
      this.isLogged = logged;

      if (logged) {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
          this.checkIsStaff(); // Comprobar si el usuario es admin al Iniciar sesion
          this.checkIsPremium();// Comprobar si el usuario es premium al iniciar sesion
        }
      } else {
        this.user = null;
      }
    });
  }


  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  


  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      if (this.isLogged) { // Verificar la propiedad isStaff en la carga inicial si se inicia sesión
        this.checkIsStaff();
        this.checkIsPremium();
      }
    }


    if (window.innerWidth < 768) {
      this.isMenuOpen = true;
    }
  }


  toogleLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }

  cerrarLogin() {
    this.mostrarLogin = false;
  }

  logOut(){
    this.authService.logOut()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private checkIsStaff() {
    if (this.user && this.user.is_staff) {
      // Update navbar to display "este usuario es admin"
      console.log('Este usuario es admin');
      this.isStaff = true;
    } else {
      // Update navbar to display "este usuario es cliente"
      console.log('Este usuario es cliente');
      this.isStaff = false;
    }
  }

  private checkIsPremium() {
    if (this.user && this.user.is_premium) {
      console.log('Este usuario es premium');
      this.isPremium = true;
    } else {
      console.log('Este usuario no es premium');
      this.isPremium = false;
    }
  }
}
