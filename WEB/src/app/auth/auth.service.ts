import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { JwtTokens, LoginCredentials, LoginResponse,User } from './auth.models';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { StoreService } from './store.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl=environment.apiUrl +'/account/login/';
  refreshTokenUrl=environment.apiUrl+'/account/refresh/';
  registerUrl=environment.apiUrl+'/account/register/';

  private islogged = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private storeService: StoreService,private router: Router) {
    
    if (this.checkTokenRefresh()){
      this.islogged.next(true);
      const user = this.storeService.getUser();
      this.currentUser.next(user ? JSON.parse(user) : null);
      
    }else{
      this.logOut()
    }
  }
  
  logIn(credentials:LoginCredentials):Observable<LoginResponse> {
    return  this.http.post<LoginResponse>(this.loginUrl, credentials)
  }
  register(credentials:LoginCredentials):Observable<LoginResponse> {
    return  this.http.post<LoginResponse>(this.registerUrl, credentials)
  }
  logOut(){
    this.storeService.clearLocalStorage()
    this.islogged.next(false);
    this.currentUser.next(null);
    this.router.navigate(['/'])
  }

  refreshToken(): Observable<HttpResponse<JwtTokens>> {
    const refreshToken = {"refresh":this.storeService.getRefreshToken()};
    console.log(refreshToken)
    if (!refreshToken) {
      this.logOut();
      return throwError(() => new Error('Refresh token no disponible'));
    }

    return this.http.post<HttpResponse<JwtTokens>>(this.refreshTokenUrl,refreshToken)

  }
  setIsLogged(islogged:boolean){
    this.islogged.next(islogged);
  }

  getIsLogged(): Observable<boolean> {
    return this.islogged.asObservable();
  }

  checkTokenAccess():boolean{
    const accessToken = this.storeService.getAccessToken();
    return !this.isTokenExpired(accessToken);
  }
  checkTokenRefresh(): boolean {
    const refreshToken = this.storeService.getRefreshToken();
    return !this.isTokenExpired(refreshToken);
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      console.log('Token not found.');
      return true;
    }
  
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    const currentTime = Math.floor((new Date).getTime() / 1000);
    const timeLeft = expiry - currentTime;
  
    if (timeLeft > 0) {
      console.log(`Token will expire in ${timeLeft} seconds.`);
    } else {
      console.log('Token has expired.');
    }
  
    return currentTime >= expiry;
  }
 
getCurrentUser(): Observable<User | null> {
  return this.currentUser.asObservable();
}

// Método para establecer el usuario actual
setCurrentUser(user: User | null): void {
  
  if (user) {
    this.storeService.setUser(user);  // Asumiendo que tienes un método para guardar el usuario en localStorage
    
}}}

