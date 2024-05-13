import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = "http://localhost:8000/API/";

  constructor(private http: HttpClient) { }

  sendMessage(mensaje: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mensaje);
  }

}
