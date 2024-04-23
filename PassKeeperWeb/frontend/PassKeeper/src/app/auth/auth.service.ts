import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginCredentials, LoginResponse } from './auth.models';
import { Observable } from 'rxjs';
import {enviroment} from '../../../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl=enviroment.api_Url +'account/login/';

  constructor(private http: HttpClient,) { }
  
  logIn(credentials:LoginCredentials):Observable<LoginResponse> {
    return  this.http.post<LoginResponse>(this.loginUrl, credentials)
  }

  logOut(){}
}
