import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactUrl = environment.apiUrl + '/contact/messages/';

  constructor(private http: HttpClient) {
    console.log('*** Servicio Mensajes de contacto corriendo ***');
  }

  sendMessage(mensaje: any): Observable<any> {
    return this.http.post<any>(this.contactUrl, mensaje);
  }
}
