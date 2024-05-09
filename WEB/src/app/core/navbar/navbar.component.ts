import { Component,ViewChild  } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged=false;
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  constructor(public authService: AuthService){
    this.authService.getIsLogged().subscribe(logged => {
      this.isLogged = logged;
    });
  }
  mostrarLogin = false;

  toogleLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }

  cerrarLogin() {
    this.mostrarLogin = false;
  }

  logOut(){
    this.authService.logOut()
  }
}
