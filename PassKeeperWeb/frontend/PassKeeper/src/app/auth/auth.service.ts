import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginCredentials, LoginResponse } from './auth.models';
import { BehaviorSubject, Observable } from 'rxjs';
import {enviroment} from '../../../enviroment/enviroment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl=enviroment.api_Url +'account/login/';
  
  private islogged = new BehaviorSubject<boolean>(false); 

  constructor(private http: HttpClient,) {
    if (this.checkToken()) {
      this.islogged.next(true);
     
    } else {
      this.islogged.next(false);
    }
   }
  
  logIn(credentials:LoginCredentials):Observable<LoginResponse> {
    return  this.http.post<LoginResponse>(this.loginUrl, credentials)
  }

  logOut(){}

  setIsLogged(islogged:boolean){
    this.islogged.next(islogged);
  }

  getIsLogged(): Observable<boolean> {
    return this.islogged.asObservable();
  }
  
  checkToken():boolean {
    return true
  }
}
